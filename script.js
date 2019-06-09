document.getElementById("info-object").style.display = "none";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = window.innerWidth;
const HEIGHT = window.outerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;
//faz o desenho do triângulo

var objects = []; //lista de objetos
var objectSelected = null;
var flag = 1;

function drawCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    drawAxis();
}

function drawAxis() {
    ctx.strokeStyle = "#f3c1c6";
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.setLineDash([1, 1]);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);


}

window.addEventListener("load", drawCanvas);

function pushBox() {
    var obj = new Box();
    objects.push(obj);
    objectSelected = objects[objects.length - 1];
    updateDisplay(objectSelected);
    document.getElementById("info-object").style.display = "block";
    drawCanvas();

}

function pushCircle() {
    var obj = new Circle();
    objects.push(obj);
    objectSelected = objects[objects.length - 1];
    updateDisplay(objectSelected);
    document.getElementById("info-object").style.display = "block";
    drawCanvas();
}

function updateDisplay(objectSelected) {
    document.getElementById("posx").value = objectSelected.getTranslate()[0];
    document.getElementById("posy").value = objectSelected.getTranslate()[1];
}

function updatePosition() {
    if (objectSelected != null) {
        try {
            posx = parseFloat(document.getElementById("posx").value);
            posy = parseFloat(document.getElementById("posy").value);
            objectSelected.setTranslate(posx, posy);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}

function updateRotation() {
    if (objectSelected != null) {
        try {
            angle = parseFloat(document.getElementById("angle").value);
            objectSelected.setRotate(angle);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}

function updateScale() {
    if (objectSelected != null) {
        try {
            posx = parseFloat(document.getElementById("posx_scl").value);
            posy = parseFloat(document.getElementById("posy_scl").value);
            objectSelected.setScale(posx, posy);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}
function updateFill() {
    if (objectSelected != null) {
        try {
           var color = "#" + document.getElementById("fill").value;
           
            objectSelected.setFill(color);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}


function onclickmouse(event){
    var x = event.offsetX;
    var y = event.offsetY;
    objectSelected = null;
    var b = multVec(transformToUsual(WIDTH, HEIGHT),[x, y, 1]);
    
    console.log("X cords: " + b[0] + "  Y cords:" + b[1])
     
    for (var i = 0; i < objects.length; i++){
        if (objects[i].tryIntersection(b)){
            objectSelected = objects[i];
            console.log("pegou");
        }else
        console.log("nao pegou");
    }
}

function overClick(){
    flag = 0;
}

function setMove(){
   flag = 1;
}

function moveObj(event){
    console.log("entrou no move    FLAG:" + flag )
    if(flag == 1){
        console.log("entrou no primeiro if")
        if(objectSelected != null){
            let x = event.offsetX;
            let y = event.offsetY;
            let p = multVec(transformToUsual(WIDTH, HEIGHT), [x,y,1]);
            objectSelected.setTranslate(p[0], p[1]);
            console.log("rweoneui")
            drawCanvas(); 
        }
    }
}


canvas.addEventListener("dblclick", setMove);
canvas.addEventListener("mousemove", moveObj);
canvas.addEventListener("click", overClick);