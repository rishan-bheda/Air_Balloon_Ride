var balloon, backgroundImg, balloonImg, balloonImg2;
var database, position;

function preload(){

    backgroundImg = loadImage("pro-C35 images/Hot Air Ballon-01.png");

    balloonImg = loadAnimation("pro-C35 images/Hot Air Ballon-02.png", "pro-C35 images/Hot Air Ballon-03.png", "pro-C35 images/Hot Air Ballon-04.png");

}

function setup() {

    database = firebase.database();
    //console.log(database);

    createCanvas(800,500);

    balloon = createSprite(100,350,50,50);
    balloon.addAnimation("balloon", balloonImg);
    balloon.scale = 0.5;

    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition, showError);

}

function draw() {

    background(backgroundImg);

    if(keyDown(LEFT_ARROW)){

        updateHeight(-10,0);
        
    }

    else if(keyDown(RIGHT_ARROW)){

        updateHeight(10,0);

    }

    else if(keyDown(UP_ARROW)){

        updateHeight(0,-10);

        balloon.scale = balloon.scale - 0.01;

    }

    else if(keyDown(DOWN_ARROW)){

        updateHeight(0,10);

        balloon.scale = balloon.scale + 0.01;

    }

    textSize(15);
    text("Use arrow keys to move the hot air balloon",10,20);

    drawSprites();

}

function showError(){

    console.log("error in database")

}

function updateHeight(x,y){

    database.ref('balloon/position').set({
        'x' : position.x+x,
        'y' : position.y+y
    })

}

function readPosition(data){

    position = data.val();

    balloon.x = position.x;
    balloon.y = position.y;
}