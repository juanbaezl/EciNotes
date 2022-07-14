let stompClient;
let canvas;
const button = 'button';
const idSession = sessionStorage.getItem('id');
let click = false;
let erase = false;
let text = false;
let draw = true;

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
                console.log('Aqui:');
                console.log(JSON.stringify(canvas.toJSON(['id','activeId','action'])));
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

function eraseMessage(e){
    var object = e.target;
    if (object != null){
        var msgErase = {
            action:1,
            id:object.id
        }
        message(JSON.stringify(msgErase));
    }
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
                      selectReact: button,
                      drawReact: button + ' active',
                      textReact: button,
                      eraseReact: button
                      }
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);     
        this.draw = this.draw.bind(this); 
        this.erase = this.erase.bind(this);
        this.select = this.select.bind(this); 
        this.text = this.text.bind(this);
        this.resetCSS = this.resetCSS.bind(this);
    }

    handleColorChange(event) {
        this.setState({color: event.target.value});
        canvas.freeDrawingBrush.color = event.target.value;
    }

    handleSizeChange(event) {
        this.setState({size: event.target.value});
        canvas.freeDrawingBrush.width = event.target.value;
    } 

    resetCSS(){
        this.setState({selectReact: button,
                      drawReact: button,
                      textReact: button,
                      eraseReact: button});
    }

    resetVars(){
        draw = false;
        text = false;
        erase = false;
    }

    redireccionHome(){
        window.location.href = "/home.html";
    }

    draw(){
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        this.resetVars();
        draw = true;
        this.resetCSS();
        this.setState({drawReact: button + ' active'});
    }

    erase(){
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'pointer';
        this.resetVars();
        erase = true;
        this.resetCSS();
        this.setState({eraseReact: button + ' active'});
    }

    select(){
        canvas.defaultCursor = 'default';
        canvas.hoverCursor = 'default';
        this.resetVars();
        this.resetCSS();
        this.setState({selectReact: button + ' active'});
    }

    text(){
        canvas.defaultCursor = 'text';
        canvas.hoverCursor = 'text';
        this.resetVars();
        text = true;
        this.resetCSS();
        this.setState({textReact: button + ' active'});
    }

    

    componentDidMount() {
        stomp();
        canvas = new fabric.Canvas('canvas', {
                width: w,
                height: h,
                isDrawingMode: false,
                backgroundColor: "#D5DFE9",
                freeDrawingCursor: "crosshair"
		});
        canvas.selection = false;       
        canvas.freeDrawingBrush.width = this.state.size;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.on('mouse:down',function (e) {
            click = true;
            if(text){
                drawText(e);
            } else if(draw){
                drawMessage(e);
            } else if(erase){
                eraseMessage(e);
            }
        });

        canvas.on('mouse:move',function (e) {
            if(click){
                if(draw){
                    drawMessage(e);
                } else if (erase){
                    eraseMessage(e);
                }
                
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
                            <button type="button" className={this.state.selectReact} onClick={this.select}>
                                <span className="buttonIcon"><img src="img/toolSelect.png"/></span>
                            </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className={this.state.textReact} onClick={this.text}>
                                <span className="buttonIcon"><img src="img/toolText.png"/></span>
                            </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className={this.state.drawReact} onClick={this.draw}>
                                <span className="buttonIcon"><img src="img/toolPencil.png"/></span>
                            </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className={this.state.eraseReact} onClick={this.erase}>
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