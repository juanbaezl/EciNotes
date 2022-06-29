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

  getName(){
    fetch("/getname",{
        method: 'GET',
    }).then(res => res.json())
    .then((result) => {
        if(result.name != "null"){
            this.setState({
                isLoaded: true,
                username: result.username,
                password: result.password,
            });
        } else{
            this.setState({
                isLoaded: false,
            });
        }
        },
        (error) => {
                console.log(error)
        }
    )
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  } 

  handleSubmit(event) {
    fetch("/setname?"+ new URLSearchParams({
    username: this.state.username,
    password: this.state.password
    }),{
        method: 'GET',
    }).then(res => res.json())
    .then((result) => {
        this.setState({
            isLoaded: true,
        });
        },
        (error) => {
                console.log(error)
        }
    )
    window.location.replace("/home.html");
    event.preventDefault();
  }

  render() {
    this.getName();
    if (!this.state.isLoaded || this.state.name == ''){
      return (
        <form className="formLogIn" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <div className="divForm">
            <label className="labelForm">Username</label>
            <input className="inputForm" type="text" value={this.state.username} onChange={this.handleChange} />
          </div>
          <div className="divForm">
            <label className="labelForm">Password</label>
            <input className="inputForm" type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <input className="btn" type="submit" value="Submit" />
        </form>
      );
    } else {
      return(
        window.location.replace("/home.html")
      );
    }
  }
}
ReactDOM.render(
    <NameForm />,
    document.getElementById('content')
);