class NavBarText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zona: 0,
      name: "",
      dialog: false,
      filter: -1,
    };
    this.zonaClick = this.zonaClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleMateria = this.handleMateria.bind(this);
    this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
  }

  zonaClick(num) {
    this.setState({ zona: num });
  }

  salirClick(event) {
    sessionStorage.setItem("log", false);
    window.location.href = "/index.html";
    event.preventDefault();
  }

  UNSAFE_componentWillMount() {
    if (sessionStorage.getItem("log") == "true") {
      var href = window.location.href;
      if (href.includes("#")) {
        this.setState({
          zona: parseInt(href.split("#")[1]),
          name: sessionStorage.getItem("name"),
        });
      } else {
        this.setState({ zona: 1, name: sessionStorage.getItem("name") });
      }
    } else {
      window.location.href = "/index.html";
    }
  }
  openModal() {
    this.setState({ dialog: true });
  }
  handleMateria(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    switch (this.state.zona) {
      case 1:
        return (
          <div>
            <div className="topnav">
              <a
                className="active"
                href="#1"
                onClick={this.zonaClick.bind(this, 1)}
              >
                Inicio
              </a>
              <a href="#2" onClick={this.zonaClick.bind(this, 2)}>
                Cuadernillos
              </a>
              <a href="#3" onClick={this.zonaClick.bind(this, 3)}>
                Repositorio
              </a>
              <a onClick={this.salirClick}>Salir</a>
            </div>
            <div className="divContent">
              <h1> Bienvenido a ECI Notes, {this.state.name}</h1>
              <h2 className="subtitle">
                {" "}
                Esta plataforma es exclusivamente para la comunidad ECI
              </h2>
              <button
                type="button"
                className="button textCuadernillos"
                onClick={this.openModal}
              >
                <span className="buttonText"> Nuevo Cuadernillo </span>
                <span className="buttonIcon">
                  <ion-icon name="add-outline"></ion-icon>
                </span>
              </button>
            </div>
            <Modal show={this.state.dialog} />
          </div>
        );
      case 2:
        return (
          <div>
            <div className="topnav">
              <a href="#1" onClick={this.zonaClick.bind(this, 1)}>
                Inicio
              </a>
              <a
                className="active"
                href="#2"
                onClick={this.zonaClick.bind(this, 2)}
              >
                Cuadernillos
              </a>
              <a href="#3" onClick={this.zonaClick.bind(this, 3)}>
                Repositorio
              </a>
              <a onClick={this.salirClick}>Salir</a>
            </div>
            <div className="divContent">
              <h1>Tus Cuadernillos</h1>
              <button type="button" className="button" onClick={this.openModal}>
                <span className="buttonText"> Nuevo Cuadernillo </span>
                <span className="buttonIcon">
                  <ion-icon name="add-outline"></ion-icon>
                </span>
              </button>
              <div className="divCuadernillos">
                <Cuadernillo user={true} filter={-1} />
              </div>
            </div>
            <Modal show={this.state.dialog} />
          </div>
        );
      case 3:
        return (
          <div>
            <div className="topnav">
              <a href="#1" onClick={this.zonaClick.bind(this, 1)}>
                Inicio
              </a>
              <a href="#2" onClick={this.zonaClick.bind(this, 2)}>
                Cuadernillos
              </a>
              <a
                className="active"
                href="#3"
                onClick={this.zonaClick.bind(this, 3)}
              >
                Repositorio
              </a>
              <a onClick={this.salirClick}>Salir</a>
            </div>
            <div className="divContent">
              <h1>Comunidad ECI</h1>
              <select className="desplegable" onChange={this.handleMateria}>
                <option value={-1}>Todos</option>
                <option value={0}>ARSW</option>
                <option value={1}>CVDS</option>
              </select>
              <div className="divCuadernillos">
                <Cuadernillo user={false} filter={this.state.filter} />
              </div>
            </div>
          </div>
        );
    }
    return <h1>Se ha producido un error, vuelve a intentarlo</h1>;
  }
}

ReactDOM.render(<NavBarText />, document.getElementById("nav"));
