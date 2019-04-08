var cvs = document.getElementById("flappyBird");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables
// gap; is the gap in pixels between the south Pipe and North Pipe.
var gap = 100;
// the constant is the south Pipe position, and it is calculating by adding the gap to the north Pipe.
var constant;

// the bird X and Y positions.

var bX = 10;
var bY = 150;

// the bird falls by 1.5 pixels at a time.
var gravity = 1.5;
// we initiate the players score

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);
//moveUp function is applied making the Y coordinate higher up on the screen. it decreases the pressure of gravity
function moveUp(){
    bY -= 30;
    fly.play();
}

// pipe coordinates

var pipe = [];
//here is our array of pipes

pipe[0] = {
    x : cvs.width,
    y : 0
};
// here is the first pipe.  the x position is the canvas width and the y is 0

// draw images///////////////////////////////////////

function draw(){

    ctx.drawImage(bg,0,0);
    //bg is background
    //bg is the image name, x position, y position. width, height
    //this is the background image which si the size of the whole page



    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;
        //what this function does is move the pipe from the right to left of the screen. it iterates through the for loop continuosly subtracting the x position from the right of the screen to the left and constantly pushing it into the array.

        if( pipe[i].x == 90   ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                // in order to set a new pipe position, we use the math.random then we need actial sizes for the pipes which will be between 0 and the total pipe height
            });
        }
        //here if the pipe reaches the 188 pixel spot on the screen then we add a new pipe. this is responsible for the space between the pipes

        // detect collision

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    //fg stands for forground

    ctx.drawImage(bird,bX,bY);
    // this is drawing the image; we have the bird image, the x coordinate and the y coordinate..
    //var bX = 10;
    // var bY = 150;
    //above is the starting point for the coordinates


    bY += gravity;
    //this is gravity which is constantly increased by bY


    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);
    //this constantly calls the draw function, which draws the images of the pipes, the bird, the background, the forground

}

draw();
