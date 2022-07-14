class Cuadernillo extends React.Component{
    constructor(props){
        super(props);
    }

    redireccion(){
        alert("Funcionalidad en construcción");
    }

    render(){
        var cuaderno = [];
        for(var i=0; i<this.props.cantidad ; i++){
            cuaderno.push(<div className="galeria-item" key={i} onClick={this.redireccion}>
                            <img src="./img/cuadernillo.png" width="50px" height="50px" />
                            <h3>Nombre cuadernillo</h3>
                          </div>)
        }
        return (
            <div className="galeria">
                {cuaderno}
            </div>
        );
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    redireccionTablero(){
        window.location.href = "/tablero.html";
    }
    
    closeModal(){
        this.setState({show:false});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.state.show) {
            this.setState({
                show: nextProps.show
            });
        }
    }

    render(){
        if(this.state.show){
            return(
                <div id="modal" className="divDialog">
                    <div className="dialog">
                        <div>
                            <h1>Nuevo Cuadernillo</h1>
                        </div>
                        <div>
                            <input className="inputDialog" type="name"/>
                        </div>
                        <div>
                            <button type="button" className="button" onClick={this.redireccionTablero}>
                                <span className="buttonText"> Crear </span>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="button" onClick={this.closeModal}>
                                <span className="buttonIcon"><ion-icon name="arrow-back-circle-outline"></ion-icon></span>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }
        
    }

}

class NavBarText extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zona: 0,
            name: '',
            dialog: false
        };
        this.zonaClick = this.zonaClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
    }

    zonaClick(num){
        this.setState({zona: num});
    }

    salirClick(event){
        sessionStorage.setItem('log',false);
        window.location.href = "/index.html";
        event.preventDefault();
    }   

    UNSAFE_componentWillMount(){
        if(sessionStorage.getItem('log')=='true'){
            var href = window.location.href;
            if (href.includes("#")){
                this.setState({zona: parseInt(href.split("#")[1]), name:sessionStorage.getItem('name')});
            }else{
                this.setState({zona: 1, name:sessionStorage.getItem('name')});
            }
        } else{
            window.location.href = "/index.html";
        }      
    }
    openModal(){    
        this.setState({dialog: true});
    }

    render(){
        switch(this.state.zona){
            case 1:
                return (
                    <div>
                        <div className="topnav">
                            <a className="active" href="#1" onClick={this.zonaClick.bind(this,1)}>Inicio</a>
                            <a href="#2" onClick={this.zonaClick.bind(this,2)}>Cuadernillos</a>
                            <a href="#3" onClick={this.zonaClick.bind(this,3)}>Repositorio</a>
                            <a onClick={this.salirClick}>Salir</a>
                        </div>
                        <div className="divContent">
                            <h1> Bienvenido a ECI Notes, {this.state.name}</h1>
                            <h2 className="subtitle"> Esta plataforma es exclusivamente para la comunidad ECI</h2>
                            <button type="button" className="button textCuadernillos" onClick={this.openModal}>
                                <span className="buttonText"> Nuevo Cuadernillo </span>
                                <span className="buttonIcon"><ion-icon name="add-outline"></ion-icon></span>
                            </button>
                            <h3 className="subtitle">Cuadernillos recientes</h3>
                            <div className="divCuadernillos">
                                <Cuadernillo cantidad={3}/>                         
                            </div>
                        </div>
                        <Modal show={this.state.dialog}/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="topnav">
                            <a href="#1" onClick={this.zonaClick.bind(this,1)}>Inicio</a>
                            <a className="active" href="#2" onClick={this.zonaClick.bind(this,2)}>Cuadernillos</a>
                            <a href="#3" onClick={this.zonaClick.bind(this,3)}>Repositorio</a>
                            <a onClick={this.salirClick}>Salir</a>
                        </div>
                        <div className="divContent">
                            <h1>Tus Cuadernillos</h1>
                            <button type="button" className="button" onClick={this.redireccionTablero}>
                                <span className="buttonText"> Nuevo Cuadernillo </span>
                                <span className="buttonIcon"><ion-icon name="add-outline"></ion-icon></span>
                            </button>
                            <div className="divCuadernillos">
                                <Cuadernillo cantidad={9}/>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="topnav">
                            <a href="#1" onClick={this.zonaClick.bind(this,1)}>Inicio</a>
                            <a href="#2" onClick={this.zonaClick.bind(this,2)}>Cuadernillos</a>
                            <a className="active" href="#3" onClick={this.zonaClick.bind(this,3)}>Repositorio</a>
                            <a onClick={this.salirClick}>Salir</a>
                        </div>
                        <div className="divContent">
                            <h1>Comunidad ECI</h1>
                            <select className="desplegable">
                                <option>Todos</option>
                                <option>ARSW</option>
                                <option>AREP</option>
                            </select>
                            <div className="divCuadernillos">
                                <Cuadernillo cantidad={9}/>
                            </div>
                        </div>
                    </div>
                    
                );
        }
        return (
                <h1>Se ha producido un error, vuelve a intentarlo</h1>
            );
        
    }
}

ReactDOM.render(
    <NavBarText />,
    document.getElementById('nav')
);