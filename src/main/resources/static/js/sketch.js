let stompClient;
let canvas;
let messageText='Hola';
let colores = "#000000";
let text =  false;
let size = 12;

function stomp(p){
        var socket = new SockJS("/stompEndpoint");
        stompClient = Stomp.over(socket);
        stompClient.connect({},function(frame){
            stompClient.subscribe("/topic/tablero", function(event){
                var json = JSON.parse(event.body);
                if(!json.borrar){
                    p.fill(json.color);
                    p.stroke(json.color);
                    p.strokeWeight(json.size);
                    p.line(json.xPos, json.yPos, json.pXPos, json.pYPos);
                } else {
                    p.clear();
                    p.background("#D5DFE9");
                }
            });
        });
    }

function message(json){
    stompClient.send("/topic/tablero", {},JSON.stringify(json));
}

class BoardCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loadingState: 'Loading Canvas ...'}
        this.canvas = null;
    }

    componentDidMount() {
        colores = this.props.color;
        this.canvas = new fabric.Canvas('canvas', {
                isDrawingMode: true,
                backgroundColor: "#D5DFE9",
		});
        this.setState({loadingState: 'Canvas Loaded'});
    }

    render(){
        return(
                <div className="canvas">
                    <canvas id="canvas"/>
                </div>
            );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {color: '#000000',
                      size: 12,
                      escribir: true,
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
    }

    erase(){
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = this.state.size;
    }

    text(){
        text = true;
        this.setState({text: band});
    }

    componentDidMount() {
        var w = screen.width - 80;
        var h = screen.height - 120;
        canvas = new fabric.Canvas('canvas', {
                width: w,
                height: h,
                isDrawingMode: true,
                backgroundColor: "#D5DFE9",
		});
        canvas.freeDrawingBrush.width = this.state.size;
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
                        {this.state.escribir ? (<div className="divFont">
                            <center>
                                <label className="labelFont" >Color:</label>
                                <input id="colorput" className="inputColor" type="color" value={this.state.color} onChange={this.handleColorChange}/>
                            </center>
                        </div>) : (<div></div>)}
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