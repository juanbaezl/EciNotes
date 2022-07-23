let stompClient;
let canvas;
const button = "button";
const idSession = sessionStorage.getItem("id");
const username = sessionStorage.getItem("username");
const tablero = sessionStorage.getItem("tablero");
let click = false;
let erase = false;
let text = false;
let draw = true;
let info = null;
let socket;

/**
 * Funcion que trae el tablero a pintar
 */
async function getTablero() {
  await fetch("/api/cuadernillo/getTablero?nombre=" + tablero, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      info = data[0];
      canvas.loadFromJSON(info.tablero, function () {
        var objects = canvas.getObjects();
        objects.forEach(function (o) {
          o.set({
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false,
          });
        });
        if (objects.length > 0) {
          fabric.Object.__uid = objects[objects.length - 1].id + 1;
        }
        canvas.renderAll();
      });
    });
}

/**
 * Funcion que guarda el tablero en la base de datos
 * @param {*} tableroC Tablero a guardar
 */
function save(tableroC) {
  var formData = new FormData();
  formData.append("nombre", tablero);
  formData.append("tablero", tableroC);
  fetch("/api/cuadernillo/updateTablero", {
    method: "POST",
    body: formData,
  });
}

/**
 * Funcion que ejecuta la colaboracion en tiempo real
 * (En caso de querer usar con la memoria del servidor usar el fetch,
 * en caso de usar con la memoria local usar el stompClient descomentandolo y
 * cambiar el socket por el stompClient al enviar el mensaje)
 */
async function stomp() {
  await fetch("/api/cuadernillo/conexion?nombre=" + tablero, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      socket = new WebSocket(data.value);
    });
  socket.onopen = () => {
    console.log("Conectado");
  };
  socket.onmessage = (event) => {
    var msg = JSON.parse(event.data);
    if (msg.build == 0) {
      location.reload();
    } else if (msg.build == 1) {
      filtObjects(msg.id).forEach(function (objFilt) {
        objFilt.activeId = msg.activeId;
      });
    }
    if (msg.action == 0) {
      addObject(msg);
    } else if (msg.action == 1) {
      deleteObject(msg);
    } else if (msg.action == 2) {
      changeText(msg);
    }
  };
  socket.onerror = (event) => {
    console.log("Error: " + event.data);
  };
  socket.onclose = () => {
    console.log("Desconectado");
  };
  // var socket = new SockJS("/stompEndpoint");
  // stompClient = Stomp.over(socket);
  // stompClient.connect({}, function (frame) {
  //   stompClient.subscribe("/topic/" + tablero, function (event) {
  //     var msg = JSON.parse(event.body);
  //     if (msg.build == 0) {
  //       location.reload();
  //     } else if (msg.build == 1) {
  //       filtObjects(msg.id).forEach(function (objFilt) {
  //         objFilt.activeId = msg.activeId;
  //       });
  //     }
  //     if (msg.action == 0) {
  //       addObject(msg);
  //     } else if (msg.action == 1) {
  //       deleteObject(msg);
  //     } else if (msg.action == 2) {
  //       changeText(msg);
  //     }
  //   });
  // });
}

/**
 * Funcion que agrega un objeto al tablero
 * @param {*} msg mensaje que contiene el objeto a agregar
 */
function addObject(msg) {
  fabric.util.enlivenObjects([msg], function (objects) {
    objects.forEach(function (o) {
      o.set({
        id: fabric.Object.__uid++,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false,
      });
      console.log(o);
      canvas.add(o);
      if (msg.type === "i-text") {
        if (sessionStorage.getItem("id") == o.activeId) {
          canvas.setActiveObject(o);
          o.enterEditing();
          o.hiddenTextarea.focus();
        }
      }
    });
  });
  canvas.renderAll();
}

/**
 * Funcion que elimina un objeto del tablero
 * @param {*} msg mensaje que contiene el objeto a eliminar
 */
function deleteObject(msg) {
  filtObjects(msg.id).forEach(function (objFilt) {
    canvas.remove(objFilt);
  });
}

/**
 * Funcion que cambia el texto de un objeto tipo itext
 * @param {*} msg mensaje que contiene el objeto a cambiar
 */
function changeText(msg) {
  filtObjects(msg.id).forEach(function (objFilt) {
    objFilt.set("text", msg.target.text);
    canvas.renderAll();
  });
}

/**
 * Funcion que envia el mensaje al resto de usuarios conectados
 * (En caso de querer usar con la memoria del servidor usar el stompClient con la funcion send)
 * @param {*} msg mensaje a enviar
 */
function message(msg) {
  var formData = new FormData();
  formData.append("hub", tablero);
  formData.append("msg", msg);
  fetch("/api/cuadernillo/sendToPubSub", {
    method: "POST",
    body: formData,
  });
  save(
    JSON.stringify(
      canvas.toJSON([
        "id",
        "activeId",
        "action",
        "lockRotation",
        "lockScalingX",
        "lockScalingY",
        "lockMovementX",
        "lockMovementY",
        "hasControls",
        "hasBorders",
      ])
    )
  );
}

/**
 * Funcion que filtra los objetos con el id indicado
 * @param {*} id a filtrar
 * @returns objetos filtrados
 */
function filtObjects(id) {
  var objectsAll = canvas.getObjects();
  return objectsAll.filter(function (obj) {
    return obj.id === id;
  });
}

/**
 * Funcion que envia el mensaje de pintado al resto de usuarios conectados
 * @param {*} e evento que contiene la informacion del apuntador
 */
function drawMessage(e) {
  var pointer = canvas.getPointer(e);
  var res = canvas.freeDrawingBrush.convertPointsToSVGPath([
    { x: pointer.x, y: pointer.y },
    { x: pointer.x, y: pointer.y },
  ]);
  var path = canvas.freeDrawingBrush.createPath(res.toString());
  path.set({
    strokeWidth: canvas.freeDrawingBrush.width,
    stroke: canvas.freeDrawingBrush.color,
    selectable: false,
  });

  var msg = JSON.stringify(path);
  msg = msg.replace("{", '{"action":0,');
  message(msg);
}

/**
 * Funcion que envia el mensaje de objeto tipo itext al resto de usuarios conectados
 * @param {*} e evento que contiene la informacion del apuntador
 */
function drawText(e) {
  var pointer = canvas.getPointer(e);
  var textbox = new fabric.IText("", {
    left: pointer.x,
    top: pointer.y,
    fontFamily: "Segoe UI",
    fontSize: canvas.freeDrawingBrush.width,
    fill: canvas.freeDrawingBrush.color,
    height: canvas.freeDrawingBrush.width,
    width: 50,
    padding: 7,
  });
  var msg = JSON.stringify(textbox);
  msg = msg.replace("{", '{"action":0,"activeId":"' + idSession + '",');
  message(msg);
}

/**
 * Funcion que envia el mensaje del objeto a eliminar al resto de usuarios conectados
 * @param {*} e evento que contiene la informacion del apuntador
 */
function eraseMessage(e) {
  var object = e.target;
  if (object != null) {
    var msgErase = {
      action: 1,
      id: object.id,
    };
    message(JSON.stringify(msgErase));
  }
}

/**
 * Clase Board (Vista del tablero)
 */
class Board extends React.Component {
  /**
   * Constructor de la clase Board
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      size: 12,
      selectReact: button,
      drawReact: button + " active",
      textReact: button,
      eraseReact: button,
      public: false,
      editable: false,
      show: false,
      participante: false,
      opt: [],
      elegidos: [],
      labels: [],
      administrador: "",
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.draw = this.draw.bind(this);
    this.erase = this.erase.bind(this);
    this.select = this.select.bind(this);
    this.text = this.text.bind(this);
    this.resetCSS = this.resetCSS.bind(this);
    this.prepareModal = this.prepareModal.bind(this);
    this.handleChangePublico = this.handleChangePublico.bind(this);
    this.handleChangeEditable = this.handleChangeEditable.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.desplegarNombres = this.desplegarNombres.bind(this);
    this.getElegidos = this.getElegidos.bind(this);
    this.handleClickParticipante = this.handleClickParticipante.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * Funcion que maneja el cambio del color del lapiz
   * @param {*} event evento que contiene el color
   */
  handleColorChange(event) {
    this.setState({ color: event.target.value });
    canvas.freeDrawingBrush.color = event.target.value;
  }

  /**
   * Funcion que maneja el cambio de tamaño del lapiz
   * @param {*} event evento que contiene el tamaño
   */
  handleSizeChange(event) {
    this.setState({ size: event.target.value });
    canvas.freeDrawingBrush.width = event.target.value;
  }

  /**
   * Funcion que resetea el CSS de los botones
   */
  resetCSS() {
    this.setState({
      selectReact: button,
      drawReact: button,
      textReact: button,
      eraseReact: button,
    });
  }

  /**
   * Metodo que resetea las variables de seleccion
   */
  resetVars() {
    draw = false;
    text = false;
    erase = false;
  }

  /**
   * Funcion que redirecciona al usuario al home
   */
  redireccionHome() {
    window.location.href = "/home.html";
  }

  /**
   * Funcion que prepara el tablero para que permita pintar al usuario
   */
  draw() {
    canvas.defaultCursor = "crosshair";
    canvas.hoverCursor = "crosshair";
    this.resetVars();
    draw = true;
    this.resetCSS();
    this.setState({ drawReact: button + " active" });
  }

  /**
   * Funcion que prepara el tablero para que permita borrar al usuario
   */
  erase() {
    canvas.defaultCursor = "crosshair";
    canvas.hoverCursor = "pointer";
    this.resetVars();
    erase = true;
    this.resetCSS();
    this.setState({ eraseReact: button + " active" });
  }

  /**
   * Funcion que prepara el tablero para que permita seleccionar al usuario
   */
  select() {
    canvas.defaultCursor = "default";
    canvas.hoverCursor = "default";
    this.resetVars();
    this.resetCSS();
    this.setState({ selectReact: button + " active" });
  }

  /**
   * Funcion que prepara el tablero para que permita escribir al usuario
   */
  text() {
    canvas.defaultCursor = "text";
    canvas.hoverCursor = "text";
    this.resetVars();
    text = true;
    this.resetCSS();
    this.setState({ textReact: button + " active" });
  }

  /**
   * Funcion que prepara el tablero
   */
  async componentDidMount() {
    var w = screen.width - 80;
    var h = screen.height - 120;
    canvas = new fabric.Canvas("canvas", {
      width: w,
      height: h,
    });
    await this.prepareModal();
    await this.getElegidos();
    await this.desplegarNombres();
    stomp();

    if (this.state.editable) {
      canvas.defaultCursor = "crosshair";
      canvas.hoverCursor = "crosshair";
    } else {
      this.select();
    }
    var boolean1 = !this.state.elegidos.includes(username);
    var boolean2 = this.state.administrador != username;
    if (boolean1 && boolean2 && !this.state.public) {
      this.redireccionHome();
    }

    canvas.selection = false;
    canvas.freeDrawingBrush.width = this.state.size;
    canvas.on("mouse:down", function (e) {
      click = true;
      if (text) {
        drawText(e);
      } else if (draw) {
        drawMessage(e);
      } else if (erase) {
        eraseMessage(e);
      }
    });

    canvas.on("mouse:move", function (e) {
      if (click) {
        if (draw) {
          drawMessage(e);
        } else if (erase) {
          eraseMessage(e);
        }
      }
    });

    canvas.on("mouse:up", function (e) {
      click = false;
    });

    canvas.on("object:modified", function (e) {
      var msg = '{"build":1,"id":' + e.target.id + ',"activeId":null}';
      message(msg);
      canvas.discardActiveObject().renderAll();
    });

    canvas.on("text:changed", function (e) {
      var msg = JSON.stringify(e);
      msg = msg.replace(
        "{",
        '{"action":2,"activeId":"' + idSession + '","id":' + e.target.id + ","
      );
      message(msg);
    });

    canvas.on("text:selection:changed", function (e) {
      var ref = e.target.activeId;
      if (ref == null) {
        var msg =
          '{"build":1,"id":' + e.target.id + ',"activeId":"' + idSession + '"}';
        message(msg);
      } else if (ref != idSession) {
        canvas.discardActiveObject().renderAll();
      }
    });
  }

  /**
   * Funcion que prepara el modal
   */
  async prepareModal() {
    await getTablero();
    this.setState({
      public: info.publico,
      editable: info.editable,
      administrador: info.administrador.username,
      participante: idSession != info.administrador.id,
    });
  }

  /**
   * Funcion que maneja el cambio del checkbox publico
   * @param {*} event evento que contiene el checkbox
   */
  handleChangePublico(event) {
    if (!this.state.participante) {
      this.setState({ public: event.target.checked });
    }
  }

  /**
   * Funcion que maneja el cambio del checkbox editable
   * @param {*} event evento que contiene el checkbox
   */
  handleChangeEditable(event) {
    if (!this.state.participante) {
      this.setState({ editable: event.target.checked });
    }
  }

  /**
   * Funcion que abre el modal
   */
  openModal() {
    this.setState({ show: true });
  }

  /**
   * Funcion que cierra el modal
   */
  closeModal() {
    this.setState({ show: false });
  }

  /**
   * Funcion que desplega los nombres de los participantes posibles a invitar
   */
  desplegarNombres() {
    var optFunc = [];
    fetch("/api/cuadernillo/GetUsersNotInCuadernillo?nombre=" + tablero, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        for (let user of data) {
          if (user.id != idSession) {
            optFunc.push(
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            );
          }
        }
      });
    this.setState({ opt: optFunc });
  }

  /**
   * Funcion que construye el label de elegidos
   * @param {*} usernameFunc username a mostrar
   * @returns label con el nombre del usuario
   */
  labelConstruction(usernameFunc) {
    return (
      <div key={usernameFunc}>
        {!this.state.participante ? (
          <button
            className="deleteButton"
            onClick={this.handleDelete.bind(this, usernameFunc)}
          >
            X
          </button>
        ) : (
          <div />
        )}
        <input
          type="text"
          key={usernameFunc}
          value={usernameFunc}
          className="labelPart"
          readOnly
        />
      </div>
    );
  }

  /**
   * Funcion que getea los usuarios participantes
   */
  async getElegidos() {
    var labelFunc = [];
    var elegidosFunc = [];
    await fetch("/api/cuadernillo/getParticipantes?nombre=" + tablero, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        for (let user of data) {
          elegidosFunc.push(user.username);
          labelFunc.push(this.labelConstruction(user.username));
        }
      });
    await this.setState({ elegidos: elegidosFunc, labels: labelFunc });
  }

  /**
   * Funcion que elimina un participante del cuadernillo
   * @param {*} value valor del participante a eliminar
   */
  handleDelete(value) {
    this.deleteParticipante(value);
    var optionsFunc = this.state.opt.concat(
      <option key={value} value={value}>
        {value}
      </option>
    );
    var removedLabels = this.state.labels.filter((label) => {
      return label.key != value;
    });
    var removedElegidos = this.state.elegidos.filter((elegidos) => {
      return elegidos != value;
    });
    this.setState({
      opt: optionsFunc,
      elegidos: removedElegidos,
      labels: removedLabels,
    });
  }

  /**
   * Funcion que maneja el click en un participante
   * @param {*} event evento que se produce al hacer click en un participante
   */
  handleClickParticipante(event) {
    var value = event.target.value;
    this.saveParticipante(value);
    var label = this.labelConstruction(value);
    var elegidosFunc = this.state.elegidos.concat([value]);
    var labelsFunc = this.state.labels.concat([label]);
    var removed = this.state.opt.filter((option) => {
      return option.props.value != value;
    });
    this.setState({
      opt: removed,
      elegidos: elegidosFunc,
      labels: labelsFunc,
    });
  }

  /**
   * Funcion que guarda un participante en el cuadernillo
   * @param {*} value nombre del participante a guardar
   */
  saveParticipante(value) {
    fetch(
      "/api/cuadernillo/saveParticipante?nombre=" +
        value +
        "&tablero=" +
        tablero,
      {
        method: "POST",
      }
    );
  }

  /**
   * Funcion que elimina un participante del cuadernillo
   * @param {*} value nombre del participante a eliminar
   */
  deleteParticipante(value) {
    fetch(
      "/api/cuadernillo/deleteParticipante?nombre=" +
        value +
        "&tablero=" +
        tablero,
      {
        method: "POST",
      }
    );
  }

  /**
   * Funcion que renderiza el componente antes de ser montado
   */
  async UNSAFE_componentWillMount() {
    if (sessionStorage.getItem("log") != "true") {
      window.location.href = "/index.html";
    }
  }

  /**
   * Funcion que maneja el click al guardar informacion
   */
  handleUpdate() {
    var formData = new FormData();
    formData.append("nombre", tablero);
    formData.append("publico", this.state.public);
    formData.append("editable", this.state.editable);
    fetch("/api/cuadernillo/updateBooleans", {
      method: "POST",
      body: formData,
    });
    var build = {
      build: 0,
    };
    message(JSON.stringify(build));
  }

  /**
   * Renderiza el componente
   * @returns Componente Board
   */
  render() {
    return (
      <div>
        <nav className="tools">
          <h1 className="titulo">Cuadernillo</h1>
          {this.state.editable ? (
            <div className="fuente">
              <div className="divSelect">
                <button
                  type="button"
                  className={this.state.selectReact}
                  onClick={this.select}
                >
                  <span className="buttonIcon">
                    <img src="img/toolSelect.png" />
                  </span>
                </button>
              </div>
              <div className="divSelect">
                <button
                  type="button"
                  className={this.state.textReact}
                  onClick={this.text}
                >
                  <span className="buttonIcon">
                    <img src="img/toolText.png" />
                  </span>
                </button>
              </div>
              <div className="divSelect">
                <button
                  type="button"
                  className={this.state.drawReact}
                  onClick={this.draw}
                >
                  <span className="buttonIcon">
                    <img src="img/toolPencil.png" />
                  </span>
                </button>
              </div>
              <div className="divSelect">
                <button
                  type="button"
                  className={this.state.eraseReact}
                  onClick={this.erase}
                >
                  <span className="buttonIcon">
                    <img src="img/toolEraser.png" />
                  </span>
                </button>
              </div>
              <div className="divFont">
                <span className="centrador">
                  <label className="labelFont">Font Size:</label>
                  <input
                    id="intput"
                    className="inputInt"
                    type="int"
                    required={true}
                    value={this.state.size}
                    onChange={this.handleSizeChange}
                    maxLength="2"
                  ></input>
                </span>
              </div>
              <div className="divFont">
                <span className="centrador">
                  <label className="labelFont">Color:</label>
                  <input
                    id="colorput"
                    className="inputColor"
                    type="color"
                    value={this.state.color}
                    onChange={this.handleColorChange}
                  />
                </span>
              </div>
            </div>
          ) : (
            <div className="espacio"></div>
          )}
          <div className="divConf">
            <div>
              <button type="button" className="button" onClick={this.openModal}>
                <span className="buttonIcon">
                  <ion-icon name="cog-outline"></ion-icon>
                </span>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="button"
                onClick={this.redireccionHome}
              >
                <span className="buttonIcon">
                  <ion-icon name="arrow-back-circle-outline"></ion-icon>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <canvas id="canvas" />
        {this.state.show ? (
          <div id="conf" className="divDialog">
            <div className="dialog">
              <div className="divTitle">
                <h1>{tablero}</h1>
              </div>
              <div className="divSep">
                <label className="labelDialog">Administrador:</label>
                <input
                  type="text"
                  value={this.state.administrador}
                  className="labelPart"
                  readOnly
                />
              </div>
              <div className="divSep">
                <label className="labelDialog">Publico:</label>
                <input
                  type="checkbox"
                  className="inputCheck"
                  checked={this.state.public}
                  onChange={this.handleChangePublico}
                />
              </div>
              <div className="divSep">
                <label className="labelDialog">Editable: </label>
                <input
                  type="checkbox"
                  className="inputCheck"
                  checked={this.state.editable}
                  onChange={this.handleChangeEditable}
                />
              </div>
              <div className="divSep">
                <label className="labelDialog">Participantes: </label>
                {!this.state.participante ? (
                  <select onChange={this.handleClickParticipante}>
                    <option value={-1}>Seleccione</option>
                    {this.state.opt}
                  </select>
                ) : (
                  <div></div>
                )}
                {this.state.labels}
              </div>
              {!this.state.participante ? (
                <div className="divSep">
                  <button
                    type="button"
                    className="buttonSave"
                    onClick={this.handleUpdate}
                  >
                    <span className="buttonText"> Guardar </span>
                  </button>
                </div>
              ) : (
                <div></div>
              )}
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
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById("tablero"));
