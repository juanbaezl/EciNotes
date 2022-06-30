var sesiones = {
  Juan: {username:'juan.baez-l', password:'juan123'},
  Admin: {username:'admin', password:'admin123'} 
};

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '',
                  password: '',
                  isLoaded: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  } 

  handleSubmit(event) {
    for(var i in sesiones){
      if(this.state.username==sesiones[i].username && this.state.password==sesiones[i].password){
        sessionStorage.setItem('name',i);
        sessionStorage.setItem('log',true);
        window.location.href = "/home.html";
      }
    }
    if(sessionStorage.getItem('log')==false){
      alert("Datos erroneos");    
    }
    event.preventDefault();
  }

  UNSAFE_componentWillMount(){
    if(sessionStorage.getItem('log')=='true'){
      window.location.href = "/home.html"
    } else {
      sessionStorage.setItem('log',false);
    }
  }

  render() {
      return (
        <form className="formLogIn" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <div className="divForm">
            <label className="labelForm">Username</label>
            <input className="inputForm" type="name" value={this.state.username} onChange={this.handleChange} />
          </div>
          <div className="divForm">
            <label className="labelForm">Password</label>
            <input className="inputForm" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <input className="btn" type="submit" value="Submit" />
        </form>
      );
  }
}
ReactDOM.render(
    <NameForm />,
    document.getElementById('content')
);