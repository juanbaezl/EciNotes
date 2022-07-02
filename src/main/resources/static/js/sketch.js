var stompClient;
var colores = "#000000";
var size = 12;

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
        this.myp5 = null;
        this.state = {loadingState: 'Loading Canvas ...'}
        this.sketch = function (p) {
            p.setup = function () {
                p.createCanvas(screen.width - 80, screen.height - 120);
                p.background("#D5DFE9");
                stomp(p);
            };
            p.draw = function () {
                if (p.mouseIsPressed === true) {
                    p.fill(colores);
                    p.stroke(colores);
                    p.strokeWeight(size);
                    p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                    var json = {
                        xPos: p.mouseX,
                        yPos: p.mouseY,
                        pXPos: p.pmouseX,
                        pYPos: p.pmouseY,
                        color: colores,
                        size: size,
                        borrar: false
                    };
                    message(json);
                }
            };
        }
        this.sketch = this.sketch.bind(this);
    }

    componentDidMount() {
        colores = this.props.color;
        this.myp5 = new p5(this.sketch, 'container');
        this.setState({loadingState: 'Canvas Loaded'});
    }

    render(){
        return(
                <div>
                    <h4 className="status">Drawing status: {this.state.loadingState}</h4>
                </div>
            );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {color: '#000000',
                      size: 12,
                      escribir: true
                      }
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);      
        this.escribir = this.escribir.bind(this);   
    }

    handleColorChange(event) {
        this.setState({color: event.target.value});
        colores = event.target.value;
    }

    handleSizeChange(event) {
        this.setState({size: event.target.value});
        size = event.target.value;
    } 

    redireccionHome(){
        window.location.href = "/home.html";
    }

    escribir(band){
        this.setState({escribir: band});
        if(!band){
            colores = "#D5DFE9";
        } else {
            colores = this.state.color;
        }
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
                            <button type="button" className="button" onClick={this.escribir.bind(this, true)}>
                                    <span className="buttonIcon"><img src="img/toolPencil.png"/></span>
                                </button>
                        </div>
                        <div className="divSelect">
                            <button type="button" className="button" onClick={this.escribir.bind(this, false)}>
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
                <BoardCanvas color={"#000000"} size={12}/>
            </div>
        )
    }
}

ReactDOM.render(
    <Board />,
    document.getElementById('tablero')
);