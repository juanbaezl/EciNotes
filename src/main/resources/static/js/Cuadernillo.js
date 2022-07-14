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