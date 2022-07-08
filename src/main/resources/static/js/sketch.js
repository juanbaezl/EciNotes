let stompClient;
let canvas;
const idSession = sessionStorage.getItem('id');
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
                if(msg.build == 1){
                    filtObjects(msg.id).forEach(function(objFilt){
                        objFilt.activeId= msg.activeId;
                    });
                }
                if (msg.action == 0){
                    fabric.util.enlivenObjects([msg], function(objects) {
                        objects.forEach(function(o) { 
                            o.set({
                                id: fabric.Object.__uid++,
                                lockRotation: true,
                                lockScalingX: true,
                                lockScalingY: true,
                                lockMovementX: true,
                                lockMovementY: true,
                                hasControls: false,
                                hasBorders: false
                            });
                            canvas.add(o);   
                            if(msg.type === "i-text"){  
                                if(sessionStorage.getItem('id')==o.activeId){
                                    canvas.setActiveObject(o);
                                    o.enterEditing();
                                    o.hiddenTextarea.focus(); 
                                }
                            }
                        });
                    });
                    canvas.renderAll();          
                }
                else if(msg.action == 1){
                    filtObjects(msg.id).forEach(function(objFilt){
                        canvas.remove(objFilt);
                    });
                } else if(msg.action == 2){
                    filtObjects(msg.id).forEach(function(objFilt){
                        objFilt.set('text',msg.target.text);
                        canvas.renderAll();
                    });
                }
            });
        });
    }

function message(msg){
    stompClient.send("/topic/tablero", {}, msg);
}

function filtObjects(id){
    var objectsAll = canvas.getObjects();
    return(objectsAll.filter(function(obj){
        return obj.id === id;
    }));
}

function drawMessage(e){
    var pointer = canvas.getPointer(e);  
    var res = canvas.freeDrawingBrush.convertPointsToSVGPath([{x:pointer.x,y:pointer.y},{x:pointer.x,y:pointer.y}]);
    var path = canvas.freeDrawingBrush.createPath(res.toString());
    path.set({ 
        strokeWidth: canvas.freeDrawingBrush.width,
        stroke: canvas.freeDrawingBrush.color,
        selectable: false
    });
    
    var msg = JSON.stringify(path);
    msg = msg.replace('{','{"action":0,')
    message(msg);
}

function drawText(e){
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
    var msg = JSON.stringify(textbox);
    msg = msg.replace('{','{"action":0,"activeId":"'+idSession+'",');
    message(msg);  
}

function initMessage(){
    var build = {
        build:0
    }
    message(JSON.stringify(build));
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
        canvas.selection = false;       
        canvas.freeDrawingBrush.width = this.state.size;
        canvas.isDrawingMode = true;
        canvas._onMouseDownInDrawingMode = function (e) {
            canvas.defaultCursor = "crosshair";
            drawMessage(e);
            click = true;
        };
        canvas._onMouseMoveInDrawingMode = function (e) {
            canvas.defaultCursor = "crosshair";
            if(click){
                drawMessage(e);
            }
        };

        canvas.on('mouse:down',function (e) {
            if(text){
                drawText(e);
            }
        });

        canvas.on('mouse:up',function (e) {
            click = false;
        });

        canvas.on('object:modified',function(e){
            var msg = '{"build":1,"id":'+e.target.id+',"activeId":null}';
            message(msg);
            canvas.discardActiveObject().renderAll();
        });

        canvas.on('text:changed',function(e){
            var msg = JSON.stringify(e);
            msg = msg.replace('{','{"action":2,"activeId":"'+idSession+'","id":'+e.target.id+',');
            message(msg); 
        });

        canvas.on('text:selection:changed',function(e){
            var ref = e.target.activeId;
            if(ref == null){
                var msg = '{"build":1,"id":'+e.target.id+',"activeId":"'+idSession+'"}';
                message(msg);
            } else if (ref != idSession){
                canvas.discardActiveObject().renderAll();
            }
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