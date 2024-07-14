let obstacle = document.getElementById("obstacle");
let bgm = document.getElementById("BGM");
let jumpSFX = document.getElementById("jumpSFX");
let deathSFX = document.getElementById("deathSFX")
let character = document.getElementById("character");
let body = document.getElementById("body");
let startButton = document.getElementById("start");
let blackThemeButton = document.getElementById("blackTheme");
let lightThemeButton = document.getElementById("lightTheme");
let pondThemeButton = document.getElementById("pondTheme");
let scoreElement = document.getElementById("score");
let menuMusic = document.getElementById("menuTheme");
let soundIcon = document.getElementById("soundIcon");
let gameOverImg = document.getElementById("gameOverImg");
let restartButton = document.getElementById("restartButton");
let themesLabel = document.getElementById("themesLabel");
let charactersLabel = document.getElementById("charactersLabel");
let spongeButton = document.getElementById("spongebobCharsButton");
let pepeButton = document.getElementById("pepeCharsButton");
let hardmodeLabel = document.getElementById("hardmodeLabel");
let pythonButton = document.getElementById("pythonCharsButton")
let hardmodeCB = document.getElementById("hardmode");
let score = 0;
let speedValue = 1;
let obstacleLeft = 1000;
let uiColor = "black";
let theme = "light";
let isJumping = false;
let soundOn = false;
let spongeTheme = false;
let pythonTheme = false;
let hardmode = false;
let gameInterval;

function checkSoundSettings() {
    soundOn = soundIcon.src.split("/").pop() === "soundonblack.png" || soundIcon.src.split("/").pop() === "soundonwhite.png";
}

function checkHardmode(){
    hardmode = hardmodeCB.checked;
}

function soundIconChange() {
    menuMusic.loop = true;
    if(soundIcon.src.split("/").pop() === "soundoffwhite.png" || soundIcon.src.split("/").pop() === "soundoffblack.png") {
        soundIcon.src = "assets/img/soundon" + uiColor + ".png";
        menuMusic.play();
        soundOn = true;
    } else if (soundIcon.src.split("/").pop() === "soundonwhite.png" || soundIcon.src.split("/").pop() === "soundonblack.png"){
        soundIcon.src = "assets/img/soundoff" + uiColor + ".png";
        menuMusic.pause();
        menuMusic.currentTime = 0;
        soundOn = false;
    }
}

function soundIconChangeOnThemeSwap(){
    if (soundOn){
        soundIcon.src = "assets/img/soundon" + uiColor + ".png";
    } else {
        soundIcon.src = "assets/img/soundoff" + uiColor + ".png";
    }
}

function removeUI(){
    startButton.style.top = "-1000px";
    blackThemeButton.style.top = "-1000px";
    lightThemeButton.style.top = "-1000px";
    pondThemeButton.style.top = "-1000px";
    themesLabel.style.top = "-1000px";
    charactersLabel.style.top = "-1000px";
    pepeButton.style.top = "-1000px";
    spongeButton.style.top = "-1000px";
    hardmodeCB.style.top = "-1000px";
    hardmodeLabel.style.top = "-1000px";
    pythonButton.style.top = "-1000px";
}

function returnUI(){
    startButton.style.top = "50%";
    blackThemeButton.style.top = "32%";
    lightThemeButton.style.top = "32%";
    pondThemeButton.style.top = "32%";
    themesLabel.style.top = "16%";
    charactersLabel.style.top = "16%";
    pepeButton.style.top = "40%";
    spongeButton.style.top = "29%";
    hardmodeCB.style.top = "49.8%";
    hardmodeLabel.style.top = "50%";
    pythonButton.style.top = "51%";
}

function modelSwapSponge(){
    character.style.backgroundImage = "url(\"assets/img/spongegar.png\")"
    obstacle.style.backgroundImage = "url(\"assets/img/squidwalk.gif\""
    character.style.height = "180px"
    obstacle.style.height = "200px"
    spongeTheme = true;
    pythonTheme = false;
}

function modelSwapPepe(){
    character.style.backgroundImage = "url(\"assets/img/pepedance.gif\")"
    obstacle.style.backgroundImage = "url(\"assets/img/peperun.gif\")"
    character.style.height = "180px"
    obstacle.style.height = "200px"
    spongeTheme = false;
    pythonTheme = false;
}

function modelSwapPython(){
    character.style.backgroundImage = "url(\"assets/img/python.png\")";
    obstacle.style.backgroundImage ="url(\"assets/img/semicolon"+uiColor+".png\")";
    character.style.height = "150px";
    obstacle.style.height = "200px"
    spongeTheme = false;
    pythonTheme = true;
}

function setUIcolor(){
    themesLabel.style.color = uiColor;
    charactersLabel.style.color = uiColor;
    hardmodeLabel.style.color = uiColor;
    hardmodeCB.style.color = uiColor;
    if (pythonTheme) {
        obstacle.style.backgroundImage = "url(\"assets/img/semicolon"+uiColor+".png\")";
    }
}

function blackTheme() {
    body.style.backgroundImage = "";
    body.style.background = "black";
    uiColor = "white";
    scoreElement.style.color = uiColor;
    theme = "black";
    soundIconChangeOnThemeSwap();
    setUIcolor();
}

function lightTheme(){
    body.style.backgroundImage = "";
    body.style.background = "white";
    uiColor = "black";
    scoreElement.style.color = uiColor;
    theme = "light";
    soundIconChangeOnThemeSwap();
    setUIcolor();
}

function pondTheme(){
    body.style.background = "";
    body.style.backgroundImage = "url(assets/img/background.jpg)";
    uiColor = "white";
    scoreElement.style.color = uiColor;
    theme = "pond";
    soundIconChangeOnThemeSwap();
    setUIcolor();
}

function startGame(){
    menuMusic.pause();
    menuMusic.currentTime = 0;
    checkSoundSettings();
    checkHardmode();
    if (soundOn) {
        bgm.loop = true;
        bgm.play();
    }
    removeUI()
    gameInterval = setInterval(id => {
        obstacle.style.left = obstacleLeft + "px";
        obstacleLeft -= speedValue;

        if (score < 10){
            speedValue = 40;
        } else if (score >= 10 && score < 20){
            speedValue = 50;
        } else if (score >= 20 && score < 35) {
            speedValue = 60;
        } else if (score >= 35 && score < 55){
            speedValue = 70;
        } else if (score >= 55 && score < 85){
            speedValue = 80;
        } else if (score >= 85){
            speedValue = 90;
        }

        if (obstacleLeft < 120 && !isJumping && obstacleLeft > 0) {
            gameover();
        }

        if (obstacleLeft <= -250) {
            if (hardmode) {
                obstacleLeft = 500 + Math.random() * (1100 - 500)
            } else {
                obstacleLeft = 1000;
            }
            if (spongeTheme) {
                if (Math.random() < 0.5) {
                    obstacle.style.backgroundImage = "url(\"assets/img/handsomesquidward.gif\""
                } else {
                    obstacle.style.backgroundImage = "url(\"assets/img/squidwalk.gif\""
                }
            }
            if (pythonTheme) {
                if (Math.random() < 0.5) {
                    obstacle.style.backgroundImage = "url(\"assets/img/curlybrackets"+uiColor+".png\")";
                    obstacle.style.height = "160px"
                } else {
                    obstacle.style.backgroundImage = "url(\"assets/img/semicolon"+uiColor+".png\")";
                    obstacle.style.height = "200px"
                }
            }
            score++;
            scoreElement.innerText = "Score: " + score;
        }
    }, 50);
}
function jump() {
    if (isJumping) return;
    isJumping = true;
    let characterTop = 500;
    let goingUp = true;
    if (soundOn) {
        jumpSFX.play()
    }

    let jumpInterval = setInterval(() => {
        if (goingUp) {
            characterTop -= 20;
            if (characterTop <= 280) {
                goingUp = false;
            }
        } else {
            characterTop += 20;
            if (characterTop >= 500) {
                clearInterval(jumpInterval);
                isJumping = false;
            }
        }
        character.style.top = characterTop + "px";
    }, 20);
}

function gameover() {
    clearInterval(gameInterval);
    bgm.pause();
    bgm.currentTime = 0;
    if (soundOn) {
        deathSFX.play();
    }
    gameOverImg.style.top = "50%";
    restartButton.style.top = "75%";
}

function restart(){
    if (soundOn) {
        menuMusic.play();
    }
    gameOverImg.style.top = "-1000px";
    restartButton.style.top = "-1000px";
    obstacleLeft = 1000;
    score = 0;
    speedValue = 1;
    scoreElement.innerText = "Score: 0";
    returnUI();
}

document.addEventListener("keydown", function (event){
    if (event.code === "Space"){
        event.preventDefault();
        jump();
    }
});