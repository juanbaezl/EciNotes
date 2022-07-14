class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            nombreCuadernillo: ''
        };
        this.closeModal = this.closeModal.bind(this);
        this.redireccionTablero = this.redireccionTablero.bind(this);
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
    }

    redireccionTablero(){
        var w = screen.width - 80;
        var h = screen.height - 120;
        var canvas = new fabric.Canvas('canvas', {
                width: w,
                height: h,
                isDrawingMode: false,
                backgroundColor: "#D5DFE9",
                freeDrawingCursor: "crosshair"
		});
        var tableroC = JSON.stringify(canvas.toJSON());
        var nombre = this.state.nombreCuadernillo;
        this.setState({nombreCuadernillo:''});
        var formData = new FormData();
        formData.append('tablero',tableroC);
        formData.append('nombre', nombre);
        formData.append('administrador',sessionStorage.getItem('id'));
        formData.append('publico',true);
        formData.append('editable',true);
        formData.append('materias',0);
        fetch('/api/cuadernillo/save',
            { 
                method: "POST",
                body: formData
            }).then((data) => {
                if(data.status == 202){
                    sessionStorage.setItem('tablero',nombre);
                    window.location.href = "/tablero.html"
                } else {
                    alert("Ese nombre ya existe");
                }
            });
    }
    
    closeModal(){
        this.setState({show:false});
    }

    handleChangeNombre(event){
        this.setState({nombreCuadernillo: event.target.value});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.state.show) {
            this.setState({
                show: nextProps.show
            });
        }
    }

    render(){
        if(this.state.show){
            return(
                <div id="modal" className="divDialog">
                    <div className="dialog">
                        <div>
                            <h1>Nuevo Cuadernillo</h1>
                        </div>
                        <div className="divSep">
                            <label className="labelDialog">Nombre: </label>
                            <input className="inputDialog" type="name" value={this.state.nombreCuadernillo} onChange={this.handleChangeNombre}/>
                        </div>
                        <div className="divSep">
                            <button type="button" className="button" onClick={this.redireccionTablero}>
                                <span className="buttonText"> Crear </span>
                            </button>
                        </div>
                        <div className="divSep">
                            <button type="button" className="button exitDialog" onClick={this.closeModal}>
                                <span className="buttonExit"><ion-icon name="arrow-back-circle-outline"></ion-icon></span>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }
        
    }

}