/**
 * Clase de Cuadernillo (vista de las tarjetas de los cuadernillos)
 */
class Cuadernillo extends React.Component {
  /**
   * Constructor de la clase
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      cuadernillos: [],
      isLoaded: false,
      filtrado: [],
      cuaderno: [],
    };
    this.getCuadernillos = this.getCuadernillos.bind(this);
    this.construccion = this.construccion.bind(this);
    this.redireccion = this.redireccion.bind(this);
  }

  /**
   * Accion de redireccion hacia el sketch que se ejecuta al hacer click en un cuadernillo
   * @param {*} nombre Nombre del cuadernillo a ser redireccionado
   */
  redireccion(nombre) {
    sessionStorage.setItem("tablero", nombre);
    window.location.href = "/tablero.html";
  }

  /**
   * Obtiene los cuadernillos en los que participa un usuario
   * @param {*} user
   */
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
          this.construccion();
        });
    } else {
      fetch("/api/cuadernillo/getPublics", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          this.setState({ cuadernillos: data });
          this.construccion();
        });
    }
  }

  /**
   * Construye la vista de los cuadernillos
   */
  construccion() {
    this.setState({ cuaderno: [] });
    if (this.props.filter != -1) {
      var filtradoFunc = this.state.cuadernillos.filter((cuadernillo) => {
        return cuadernillo.materias.id == this.props.filter;
      });
      this.setState({ filtrado: filtradoFunc });
    } else {
      this.setState({ filtrado: this.state.cuadernillos });
    }
    for (let cuadernillo of this.state.filtrado) {
      var cuadernoFunc = this.state.cuaderno.concat(
        <div
          className="galeria-item"
          key={cuadernillo.nombre}
          onClick={this.redireccion.bind(this, cuadernillo.nombre)}
        >
          <img src="./img/cuadernillo.png" width="50px" height="50px" />
          <h3>{cuadernillo.nombre}</h3>
        </div>
      );
      this.setState({ cuaderno: cuadernoFunc });
    }
  }

  /**
   * Renderiza el componente antes de que se muestre
   */
  UNSAFE_componentWillMount() {
    this.getCuadernillos(this.props.user);
  }

  /**
   * Marca el estado como cargado al montar el componente
   */
  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  /**
   * Renderiza el componente cuando se cambian los props de llamado
   * @param {*} nextProps Siguientes props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getCuadernillos(nextProps.user);
  }

  /**
   * Renderiza el componente
   * @returns Retorna el componente
   */
  render() {
    if (this.state.isLoaded) {
      return <div className="galeria">{this.state.cuaderno}</div>;
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
