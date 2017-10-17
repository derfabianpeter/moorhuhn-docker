var scoreAmount = 0;
var playing = false;
var idHelp = 0;
var amountOfTargets = 0;
var helpOfCreateTargets = 0;

var speedOfTarget = 6;
var startGame;

var minutes = 0;
var seconds = 0;

var audioShotgun = [new Audio("audio/ShotguOneShot.mp3"), new Audio("audio/ShotguOneShot.mp3"), new Audio("audio/ShotguOneShot.mp3")]
var audioHelp = true;

// click on start playing
document.getElementById("startBtn").onclick = function () {

    if (!playing) {

        scoreAmount = 0;
        updateScore();
        amountOfTargets = 0;
        playing = true;
        document.getElementById("gameOverHeading").style.display = "none";

        // start button disappear
        document.getElementById("startBtn").style.display = "none";
        // starting the intro
        startMainAnimation();
        // after 5s intro disappear
        setTimeout(function () { document.getElementById("anim").style.display = "none"; }, 5000);

        // setting interval 1 second
        startGame = setInterval(function () {

            if (amountOfTargets < 30) {
                createSprite();
            }
            else{
                document.getElementById("gameOverHeading").style.display = "block";
                deleteTargets();
                playing = false;
                clearInterval(startGame);
                document.getElementById("startBtn").style.display = "block";
            }

        }, 1000)
    }
}


var startMainAnimation = function () {
    document.getElementById("anim").style.display = "block";
    document.getElementById("anim").style.animationPlayState = "running";
}

// creating new sprite = new target = new huhn
// creating new sprite = new target = new huhn
var createSprite = function () {
    var widthOfScreen = window.innerWidth;

    // creating new div
    var div = document.createElement("div");
    amountOfTargets++;
    document.body.appendChild(div);

    // styling new div
    div.style.position = "absolute";
    var randomTop = Math.floor(Math.random() * 40);
    div.style.top = randomTop+10 + "%";
    var divId = "morhuhn" + idHelp;
    div.id = divId;
    idHelp++;

    div.className += "target ";

    // Choosing left or right start position
    var leftOrRight = Math.floor(Math.random() * 2);

    // Choosing size of target
    var randomSprite = Math.floor(Math.random() * 3) + 1;

    // flying to the Right
    if (leftOrRight == 0) {
        if (randomSprite == 1)
            div.className += "spriteLiveRightL";
        if (randomSprite == 2)
            div.className += "spriteLiveRightM";
        if (randomSprite == 3)
            div.className += "spriteLiveRightS";
        div.style.left = -200 + "px";
    }

    // flying to the Left
    if (leftOrRight == 1) {
        if (randomSprite == 1)
            div.className += "spriteLiveLeftL";
        if (randomSprite == 2)
            div.className += "spriteLiveLeftM";
        if (randomSprite == 3)
            div.className += "spriteLiveLeftS";
        div.style.left = widthOfScreen + 100 + "px";
    }
   

    // CLICK ON THE TARGET
    div.onclick = function () {
        amountOfTargets--;
        var elem = document.getElementById(divId);

        // click on the Large target going to left
        if (elem.classList.contains("spriteLiveLeftL")) {
            elem.style.backgroundImage = "url(sprites/spriteDeadLeftL.png)";
            elem.style.animation = "playDL .3s steps(7) forwards, moveL linear 12s forwards";
            setTimeout(function () {
                elem.style.animationPlayState = "paused";
                elem.parentNode.removeChild(elem);
                scoreAmount += 50;
            }, 300);
            
        }
        // click on the Medium target going to left        
        if (elem.classList.contains("spriteLiveLeftM")) {
            elem.style.backgroundImage = "url(sprites/spriteDeadLeftM.png)";
            elem.style.animation = "playDM .3s steps(7) forwards, moveL linear 15s forwards";
            setTimeout(function () {
                elem.style.animationPlayState = "paused";
                elem.parentNode.removeChild(elem);
                scoreAmount += 100;
            }, 300);
            
        }
        // click on the Small target going to left        
        if (elem.classList.contains("spriteLiveLeftS")) {
            elem.style.backgroundImage = "url(sprites/spriteDeadLeftS.png)";
            elem.style.animation = "playDS .3s steps(7) forwards, moveL linear 18s forwards";
            setTimeout(function () {
                elem.style.animationPlayState = "paused";
                elem.parentNode.removeChild(elem);
                scoreAmount += 150;
            }, 300);
            
        }

        // click on the Large target going to right
        if (elem.classList.contains("spriteLiveRightL")) {
            elem.style.backgroundImage = "url(sprites/spriteDeadRightL.png)";
            elem.style.animation = "playDL .3s steps(7) forwards, moveR linear 12s forwards";
            setTimeout(function () {
                elem.style.animationPlayState = "paused";
                elem.parentNode.removeChild(elem);
                scoreAmount += 50;
            }, 300);
            
        }
        // click on the Medium target going to right        
        if (elem.classList.contains("spriteLiveRightM")) {
            elem.style.backgroundImage = "url(sprites/spriteDeadRightM.png)";
            elem.style.animation = "playDM .3s steps(7) forwards, moveR linear 15s forwards";
            setTimeout(function () {
                elem.style.animationPlayState = "paused";
                elem.parentNode.removeChild(elem);
                scoreAmount += 100;
            }, 300);
            
        }
        // click on the Small target going to right        
        if (elem.classList.contains("spriteLiveRightS")) {
            elem.style.backgroundImage = "url(sprites/spriteDeadRightS.png)";
            elem.style.animation = "playDS .3s steps(7) forwards, moveR linear 18s forwards";
            setTimeout(function () {
                elem.style.animationPlayState = "paused";
                elem.parentNode.removeChild(elem);
                scoreAmount += 150;
            }, 300);
            
        }
        updateScore();
    }
}

function updateScore(){
    document.getElementById("scoreValue").innerText = scoreAmount;
}

// audio of single shoot
var audioShot = 0;
function playAudio() {
    if (audioHelp) {
        audioShot++;
        if (audioShot >= audioShotgun.length) {
            audioShot = 0;
        }
        audioShotgun[audioShot].play();
    }
}
// Play shoot when clicked
document.body.onclick = function () {
    playAudio();
}


// SWITCH AUDIO ON/OFF
document.getElementById("offOnAudio").onclick = function () {
    if (audioHelp) {
        audioHelp = false;
        this.style.backgroundImage = "url(images/noSound.png)";
    }
    else {
        audioHelp = true;
        this.style.backgroundImage = "url(images/sound.png)";
    }
}


// DELETE TARGETS OUT OF SCREEN
function deleteTargets() {
    let cont = true;
    while(cont){
        let targets = document.getElementsByClassName("target");
        if(targets.length == 0){
            cont = false;
            break;
        }else{
            console.log(targets[0]);
            targets[0].parentNode.removeChild(targets[0]);
        }
    }

};

