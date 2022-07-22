/**
 * Clase NameForm (vista del formulario de login)
 */
class NameForm extends React.Component {
  /**
   * Constructor de NameForm
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", isLoaded: false, id: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  /**
   * Maneja el cambio de la contraseña
   * @param {*} event
   */
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  /**
   * Maneja el cambio del username
   * @param {*} event
   */
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  /**
   * Manjea el submit del formulario
   * @param {*} event
   */
  handleSubmit(event) {
    fetch(
      "/api/usuario/login?name=" +
        this.state.username +
        "&passwd=" +
        this.state.password,
      {
        method: "POST",
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.name != undefined) {
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("log", true);
          sessionStorage.setItem("id", data.id);
          window.location.href = "/home.html";
        } else {
          alert("Datos erroneos");
          window.location.href = "/";
        }
      });
    event.preventDefault();
  }

  /**
   * Renderiza el componente antes de ser montado
   */
  UNSAFE_componentWillMount() {
    if (sessionStorage.getItem("log") == "true") {
      window.location.href = "/home.html";
    } else {
      sessionStorage.setItem("log", false);
    }
  }

  /**
   * Renderiza el componente
   * @returns Componente NameForm
   */
  render() {
    return (
      <form className="formLogIn" onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <div className="divForm">
          <label className="labelForm">Username</label>
          <input
            className="inputForm"
            type="name"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="divForm">
          <label className="labelForm">Password</label>
          <input
            className="inputForm"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <input className="btn" type="submit" value="Submit" />
      </form>
    );
  }
}
ReactDOM.render(<NameForm />, document.getElementById("content"));
