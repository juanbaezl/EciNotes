class NavBarText extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zona: 0,
            name: ''
        };
        this.zonaClick = this.zonaClick.bind(this);
        this.getName = this.getName.bind(this);
    }

    zonaClick(num){
        this.setState({zona: num});
    }

    salirClick(event){
        fetch("/delname",{
            method: 'GET',
        })
        window.location.replace("/index.html");
        event.preventDefault();
    }
    
    getName(){
        fetch("/getname",{
        method: 'GET',
        }).then(res => res.json())
        .then((result) => {
            this.setState({
                name: result.name
                });
            }
        );
    }

    render(){
        switch(this.state.zona){
            case 0:
                if(this.state.name == ''){
                    this.getName();
                }
                return (
                    <div>
                        <div className="topnav">
                            <a className="active" href="#inicio" onClick={this.zonaClick.bind(this,0)}>Inicio</a>
                            <a href="#cuadernillos" onClick={this.zonaClick.bind(this,1)}>Cuadernillos</a>
                            <a href="#repositorio" onClick={this.zonaClick.bind(this,2)}>Repositorio</a>
                            <a href="#salir" onClick={this.salirClick}>Salir</a>
                        </div>
                        <div className="divContent">
                            <h1> Bienvenido a ECI Notes, {this.state.name}</h1>
                            <h2 className="subtitle"> Esta plataforma es exclusivamente para la comunidad ECI</h2>
                            <h3 className="subtitle textCuadernillos">Cuadernillos recientes</h3>
                            <div className="divCuadernillos">
                                <div class="galeria-item">
                                    <img src="./img/cuadernillo.png" width="100px" height="100px" />
                                    <h3>Nombre cuadernillo</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className="topnav">
                            <a href="#inicio" onClick={this.zonaClick.bind(this,0)}>Inicio</a>
                            <a className="active" href="#cuadernillos" onClick={this.zonaClick.bind(this,1)}>Cuadernillos</a>
                            <a href="#repositorio" onClick={this.zonaClick.bind(this,2)}>Repositorio</a>
                            <a href="#salir" onClick={this.salirClick}>Salir</a>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="topnav">
                            <a href="#inicio" onClick={this.zonaClick.bind(this,0)}>Inicio</a>
                            <a href="#cuadernillos" onClick={this.zonaClick.bind(this,1)}>Cuadernillos</a>
                            <a className="active" href="#repositorio" onClick={this.zonaClick.bind(this,2)}>Repositorio</a>
                            <a href="#salir" onClick={this.salirClick}>Salir</a>
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