class Cuadernillo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuadernillos: [],
      isLoaded: false,
    };
    this.getCuadernillos = this.getCuadernillos.bind(this);
    this.construccion = this.construccion.bind(this);
    this.redireccion = this.redireccion.bind(this);
  }

  redireccion(nombre) {
    sessionStorage.setItem("tablero", nombre);
    window.location.href = "/tablero.html";
  }

  getCuadernillos(user) {
    if (user) {
      fetch(
        "/api/cuadernillo/getCuadernillos?user=" + sessionStorage.getItem("id"),
        {
          method: "GET",
        }
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({ cuadernillos: data });
        });
    } else {
      fetch("/api/cuadernillo/getPublics", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          this.setState({ cuadernillos: data });
        });
    }
  }

  construccion() {
    var cuaderno = [];
    if (!this.state.isLoaded) {
      this.getCuadernillos(this.props.user);
    }
    for (let cuadernillo of this.state.cuadernillos) {
      cuaderno.push(
        <div
          className="galeria-item"
          key={cuadernillo.nombre}
          onClick={this.redireccion.bind(this, cuadernillo.nombre)}
        >
          <img src="./img/cuadernillo.png" width="50px" height="50px" />
          <h3>{cuadernillo.nombre}</h3>
        </div>
      );
    }
    return cuaderno;
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getCuadernillos(nextProps.user);
  }

  render() {
    var cuaderno = this.construccion();
    if (this.state.isLoaded) {
      return <div className="galeria">{cuaderno}</div>;
    } else {
      return <h1>Charging...</h1>;
    }
  }
}
