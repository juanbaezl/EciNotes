class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  color: '#000000',
                  response: '',
                  isLoaded: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  getName(){
    fetch("/getname",{
        method: 'GET',
    }).then(res => res.json())
    .then((result) => {
        if(result.name != "null"){
            this.setState({
                isLoaded: true,
                value: result.name,
                color: result.color,
                response: "Hello " + result.name + "!"
            });
        } else{
            this.setState({
                isLoaded: false,
                response: ""
            });
        }
        },
        (error) => {
                console.log(error)
        }
    )
  }

  handleColorChange(event) {
    this.setState({color: event.target.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  } 

  reset(event){
    
    fetch("/delname",{
        method: 'GET',
    }).then(this.setState({
        isLoaded: false,
        value: "",
        response: "",
        color:"#000000"
    }))  
    event.preventDefault();
  }

  handleSubmit(event) {
    fetch("/setname?"+ new URLSearchParams({
    name: this.state.value,
    color: this.state.color
    }),{
        method: 'GET',
    }).then(res => res.json())
    .then((result) => {
        this.setState({
            isLoaded: true,
            response: result.response
        });
        },
        (error) => {
                console.log(error)
        }
    )
    event.preventDefault();
  }

  render() {
    this.getName();
    if (!this.state.isLoaded){
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="color" value={this.state.color} onChange={this.handleColorChange}/>
          </label>
          <input type="submit" value="Submit" />
          
        </form>
      );
    } else {
      return(
        <div>
            <h1>{this.state.response}</h1>
            <div><a href="/status.html">Server status</a></div>
            <div><a href="/tablero.html">Tablero</a></div>
            <form onSubmit={this.reset}>
                <input type="submit" value="Salir"/>
            </form>
        </div>
       );
    }
  }
}
ReactDOM.render(
    <NameForm />,
    document.getElementById('content')
);