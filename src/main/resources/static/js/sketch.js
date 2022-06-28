var stompClient;
var colores;
//Este código asume que las librerías de P5.js ya están cargadas.
//Esta función se ejecuta una sola vez al inicio del script.
function setup() {
    createCanvas(1000, 600);
    background(220, 180, 200);
    stomp();
    getColor();
}
// Esta función se ejecuta repetidas veces indefinidamente.
function draw() {
    
    if (mouseIsPressed === true) {
        fill(colores);
        stroke(colores);
        line(mouseX, mouseY, pmouseX, pmouseY);
        var json = {
            xPos: mouseX,
            yPos: mouseY,
            pXPos: pmouseX,
            pYPos: pmouseY,
            color: colores,
            borrar: false
        }
        message(json)
    }
}

function stomp(){
    var socket = new SockJS("/stompEndpoint");
    stompClient = Stomp.over(socket);
    stompClient.connect({},function(frame){
        console.log(frame);
        stompClient.subscribe("/topic/tablero", function(event){
            var json = JSON.parse(event.body);
            if(!json.borrar){
                fill(json.color);
                stroke(json.color);
                line(json.xPos, json.yPos, json.pXPos, json.pYPos);
            } else {
                clear();
                background(220, 180, 200);
            }
        });
    });
}

function message(json){
    stompClient.send("/topic/tablero", {},JSON.stringify(json));
}

function getColor() {
    fetch("/getcolor",{
        method: 'GET',
    }).then(res => res.json())
    .then((result) => {
        if(result.color != "null"){
            colores = result.color;
        } else{
            window.location.href = "index.html";
        }
    }
    )
    console.log(colores);
}

function borrar(){
    clear();
    background(220, 180, 200);
    var json = {
        borrar: true
    }
    message(json)
}