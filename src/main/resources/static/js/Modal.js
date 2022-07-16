class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nombreCuadernillo: "",
      materia: 0,
      publico: false,
      editable: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.redireccionTablero = this.redireccionTablero.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeMateria = this.handleChangeMateria.bind(this);
    this.handleChangePublico = this.handleChangePublico.bind(this);
    this.handleChangeEditable = this.handleChangeEditable.bind(this);
  }

  redireccionTablero() {
    var w = screen.width - 80;
    var h = screen.height - 120;
    var canvas = new fabric.Canvas("canvas", {
      width: w,
      height: h,
      isDrawingMode: false,
      backgroundColor: "#D5DFE9",
      freeDrawingCursor: "crosshair",
    });
    this.fetchData(JSON.stringify(canvas.toJSON()));
  }

  fetchData(tablero) {
    this.setState({ nombreCuadernillo: "" });
    var formData = new FormData();
    formData.append("tablero", tablero);
    formData.append("nombre", this.state.nombreCuadernillo);
    formData.append("administrador", sessionStorage.getItem("id"));
    formData.append("publico", this.state.publico);
    formData.append("editable", this.state.editable);
    formData.append("materias", this.state.materia);
    fetch("/api/cuadernillo/save", {
      method: "POST",
      body: formData,
    }).then((data) => {
      if (data.status == 200) {
        sessionStorage.setItem("tablero", this.state.nombreCuadernillo);
        window.location.href = "/tablero.html";
      } else {
        alert("Ese nombre ya existe");
      }
    });
  }

  closeModal() {
    this.setState({ show: false });
  }

  handleChangeNombre(event) {
    this.setState({ nombreCuadernillo: event.target.value });
  }

  handleChangeMateria(event) {
    this.setState({ materia: event.target.value });
  }

  handleChangePublico(event) {
    this.setState({ publico: event.target.checked });
  }

  handleChangeEditable(event) {
    this.setState({ editable: event.target.checked });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      this.setState({
        show: nextProps.show,
      });
    }
  }

  render() {
    if (this.state.show) {
      return (
        <div id="modal" className="divDialog">
          <div className="dialog">
            <div>
              <h1>Nuevo Cuadernillo</h1>
            </div>
            <div className="divSep">
              <label className="labelDialog">Nombre: </label>
              <input
                className="inputDialog"
                type="name"
                value={this.state.nombreCuadernillo}
                onChange={this.handleChangeNombre}
              />
            </div>
            <div className="divSep">
              <label className="labelDialog">Materia: </label>
              <select
                value={this.state.materia}
                onChange={this.handleChangeMateria}
              >
                <option value={0}>ARSW</option>
                <option value={1}>CVDS</option>
              </select>
            </div>
            <div className="divSep">
              <label className="labelDialog">Publico: </label>
              <input
                type="checkbox"
                checked={this.state.publico}
                onChange={this.handleChangePublico}
              />
            </div>
            <div className="divSep">
              <label className="labelDialog">Editable: </label>
              <input
                type="checkbox"
                checked={this.state.editable}
                onChange={this.handleChangeEditable}
              />
            </div>
            <div className="divSep">
              <button
                type="button"
                className="button"
                onClick={this.redireccionTablero}
              >
                <span className="buttonText"> Crear </span>
              </button>
            </div>
            <div className="divSep">
              <button
                type="button"
                className="button exitDialog"
                onClick={this.closeModal}
              >
                <span className="buttonExit">
                  <ion-icon name="arrow-back-circle-outline"></ion-icon>
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
