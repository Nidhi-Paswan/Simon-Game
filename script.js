let gameSeq=[];
let userSeq=[];
//random button choose
let btns=["green","red","yellow","blue"];
let level=0;
let started=false;
let startbtn=document.getElementById("start-btn");
let h3=document.querySelector("h3");

//this is for start the game by clicking
startbtn.addEventListener("click",function(){
    if(started==false){
        console.log("Game starting by click button");
        started=true;
        levelUp();
    }
});
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game starting by pressing keys");
        started=true;
        levelUp();
    }
});
//this is for flashing the button while user is playing and when system is playing
function gameFlash(btn){
   btn.classList.add("flash");
   setTimeout(function(){
       btn.classList.remove("flash");
   }, 200);
}

//user flash function
function userFlash(btn){
   btn.classList.add("userFlash");
   setTimeout(function(){
       btn.classList.remove("userFlash");
   }, 200);
}

//this is used for incresing the level using the btn flash() when
function levelUp(){
    userSeq=[];
    level++;
    document.querySelector("h3").innerText=`Level ${level}`;
    //random button choose
    let randIdx=Math.floor(Math.random()*4);
    let randColor= btns[randIdx];
    let ranbtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(ranbtn);
    gameSeq.push(randColor);
    //console.log(gameSeq);
    gameFlash(ranbtn);
}

//for checking the right pattern
function checkAns(idx){
    //console.log("curr leve", level);
    //let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        //console.log("correct");
        if(userSeq.length===gameSeq.length){
            setTimeout(function(){
                levelUp();
            }, 1000);
        }
    }else{
         let score = level - 1; // last successfully completed level
    h3.innerText = `Game Over! Score: ${score}\nPress Any Key to Restart`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 300);
        resetGame();
    }
}

//for button press
function btnPress(){
    let btn=this;
    userFlash(btn);
    //user color
    let userColor=btn.getAttribute("id");
    //console.log(userColor);useer
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress)

}
function resetGame(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
   // h3.innerText="Press Any Key to Start";
}