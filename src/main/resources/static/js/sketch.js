let stompClient;
let canvas;
let lastPointer;
let click= false;
let erase= false;
let text= false;
let group;

function stomp(){
        var socket = new SockJS("/stompEndpoint");
        stompClient = Stomp.over(socket);
        stompClient.connect({},function(frame){
            stompClient.subscribe("/topic/tablero", function(event){
                var msg = JSON.parse(event.body);
                console.log(msg);
                if(msg.build == 0){
                    group = new fabric.Group([],{
                        id:fabric.Object.__uid++
                    });
                    console.log(group);
                    canvas.add(group);
                }
                if (msg.action == 0){
                    fabric.util.enlivenObjects([msg], function(objects) {
                        objects.forEach(function(o) {      
                            group.addWithUpdate(o);
                        });
                    });
                    canvas.renderAll();          
                }
                else if(msg.action == 1){
                    var objectsAll = canvas.getObjects();
                        console.log(objectsAll);
                        objectsAll.filter(function(obj){
                            return obj.id === msg.id;
                        }).forEach(function(objFilt){
                            canvas.remove(objFilt);
                        });
                }
            });
        });
    }

function message(msg){
    stompClient.send("/topic/tablero", {}, msg);
}

function drawMessage(e){
    var pointer = canvas.getPointer(e);  
    var res = canvas.freeDrawingBrush.convertPointsToSVGPath([{x:pointer.x,y:pointer.y},{x:pointer.x,y:pointer.y}]);
    var path = canvas.freeDrawingBrush.createPath(res.toString());
    path.set({ 
        strokeWidth: canvas.freeDrawingBrush.width,
        stroke: canvas.freeDrawingBrush.color,
    });
    var msg = JSON.stringify(path);
    msg = msg.replace('{','{"action":0,')
    message(msg);
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {color: '#000000',
                      size: 12,
                      text: false
                      }
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);     
        this.draw = this.draw.bind(this); 
        this.erase = this.erase.bind(this); 
        this.text = this.text.bind(this);
        this.select = this.select.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleColorChange(event) {
        this.setState({color: event.target.value});
        canvas.freeDrawingBrush.color = event.target.value;
    }

    handleSizeChange(event) {
        this.setState({size: event.target.value});
        canvas.freeDrawingBrush.width = event.target.value;
    } 

    redireccionHome(){
        window.location.href = "/home.html";
    }

    draw(){
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = this.state.size;
        canvas.freeDrawingBrush.color = this.state.color;
        text = false;
    }

    erase(){
        canvas.getActiveObjects().forEach((obj) => {
            var object = {
                action:1,
                id:obj.id
            }
            message(JSON.stringify(object));
        });
        canvas.discardActiveObject().renderAll();
    }

    select(){
        canvas.isDrawingMode = false;
        text = false;
    }

    text(){
        canvas.isDrawingMode = false;
        text = true;
    }

    

    componentDidMount() {
        stomp();
        var w = screen.width - 80;
        var h = screen.height - 120;
        canvas = new fabric.Canvas('canvas', {
                width: w,
                height: h,
                isDrawingMode: true,
                backgroundColor: "#D5DFE9",
                freeDrawingCursor: "crosshair"
		});       
        canvas.freeDrawingBrush.width = this.state.size;
        canvas.isDrawingMode = true;
        canvas._onMouseDownInDrawingMode = function (e) {
            canvas.defaultCursor = "crosshair";
            var build = {
                build:0
            }
            message(JSON.stringify(build));
            drawMessage(e);
            click = true;
        };
        canvas._onMouseMoveInDrawingMode = function (e) {
            canvas.defaultCursor = "crosshair";
            if(click){
                drawMessage(e)
            }
        };

        canvas.on('mouse:down',function (e) {
            if(text){
                console.log("tucson");
                var pointer = canvas.getPointer(e);
                var textbox = new fabric.IText('',{
                    left: pointer.x,
                    top: pointer.y,
                    fontFamily: 'Segoe UI',
                    fontSize: canvas.freeDrawingBrush.width,
                    fill: canvas.freeDrawingBrush.color,
                    height: canvas.freeDrawingBrush.width,
                    width: 50,
                    padding: 7
                });
                
                canvas.add(textbox);
                canvas.setActiveObject(textbox);
                textbox.enterEditing();
                textbox.hiddenTextarea.focus();
            }
        });

        canvas.on('mouse:up',function (e) {
            click = false;
        });
    }

    UNSAFE_componentWillMount(){
        if(sessionStorage.getItem('log')!='true'){
            window.location.href = "/index.html";
        }      
    }

    render(){
        return(
            <div>
                <nav className="tools">
                    <h1 className="titulo">Cuadernillo</h1>
                    <div className="fuente">
                        <div className="divSelect">
                            <button type="button" className="button" onClick={this.select}>
                                <span className="buttonIcon"><img src="img/toolSelect.png"/></span>
                            </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className="button" onClick={this.text}>
                                <span className="buttonIcon"><img src="img/toolText.png"/></span>
                            </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className="button" onClick={this.draw}>
                                <span className="buttonIcon"><img src="img/toolPencil.png"/></span>
                            </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className="button" onClick={this.erase}>
                                    <span className="buttonIcon"><img src="img/toolEraser.png"/></span>
                                </button>
                        </div>
                        <div className="divFont">
                            <center>
                                <label className="labelFont" >Font Size:</label>
                                <input id="intput" className="inputInt" type="int" required={true} value={this.state.size} onChange={this.handleSizeChange} maxLength="2"></input>
                            </center>
                        </div>
                        <div className="divFont">
                            <center>
                                <label className="labelFont" >Color:</label>
                                <input id="colorput" className="inputColor" type="color" value={this.state.color} onChange={this.handleColorChange}/>
                            </center>
                        </div>
                    </div>
                    <div className="divExit">
                        <button type="button" className="button" onClick={this.redireccionHome}>
                            <span className="buttonIcon"><ion-icon name="arrow-back-circle-outline"></ion-icon></span>
                        </button>
                    </div>
                </nav>
                <canvas id="canvas"/>
            </div>
        )
    }
}

ReactDOM.render(
    <Board />,
    document.getElementById('tablero')
);