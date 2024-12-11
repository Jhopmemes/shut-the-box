//document parts
//start menu
const titleMenu=document.querySelector("#titleMenu");
const inputPlayer1Name=document.querySelector("#idInputPlayer1Name");
const inputPlayer2Name=document.querySelector("#idInputPlayer2Name");
const startBTN=document.querySelector("#idBTNStart");
//game
const gameBoard=document.querySelector("#gameBoard");
const die1=document.querySelector("#die1");
const die2=document.querySelector("#die2");
const rollBTN=document.querySelector("#rollBTN");
const bothBTN=document.querySelector("#bothBTN");
const sumBTN=document.querySelector("#sumBTN");
const endBTN=document.querySelector("#endBTN");
const rePlayBTN=document.querySelector("#rePlayBTN");
const diceSumP=document.querySelector("#diceSum");
//table
const p1NameTBL=document.querySelector("#p1NameTBL");
const p2NameTBL=document.querySelector("#p2NameTBL");
const scoreTBL=document.querySelector("#scoreTBL");
const scoreCard=document.querySelector("#scoreCard");
const gameWinner=document.querySelector("#gameWinner");
const gameLoser=document.querySelector("#gameLoser");
//player labeling
const roundPAR=document.querySelector("#round");
const roundPlayersPAR=document.querySelector("#roundPlayers");
const turnPAR=document.querySelector("#turn");

//variables
let playerNames=["",""];
//points for given round, positions of each box
const boxes=[0,0,0,0,0,0,0,0,0,0];
//who's turn and round number
let playerTurn="";
let roundNumber=0;
//number rolled on each die
let roll1=1;
let roll2=1;
//total points for each player
let player1Points=0;
let player2Points=0;

//functions
const getRandomNumber=()=>Math.floor(Math.random()*6)+1;

//updates given dice to their numbers
function updateDieFace(roll,face){
    face.innerHTML=`<i class="bi bi-dice-${roll}"></i>`;
};

//rolls the dice
function rollDice(){
    roll1=getRandomNumber();
    roll2=getRandomNumber();
    updateDieFace(roll1,die1);
    updateDieFace(roll2,die2);
};

//updates labeling
function updateRoundInfo(round,plr){
    roundPAR.textContent=`Round ${round}`;
    roundPlayersPAR.textContent=`${playerNames[0]} vs ${playerNames[1]}`;
    turnPAR.textContent=`${plr}'s Turn`;
    p1NameTBL.textContent=playerNames[0];
    p2NameTBL.textContent=playerNames[1];
};

//shuts a box visually-for teacher
function shut(boxNumber){
    const toShut=document.querySelector(`#box${boxNumber}`);
    toShut.classList.add("shut");
    toShut.textContent="X";
};

//closes a box w/all associated jobs done
function closeBox(num){
    if(num>9||num<1){
        alert("no, fuck you");
        return;
    };
    if(boxes[num]==="X"){
        alert("box already closed");
        return;
    }else{
        shut(num);
        boxes[num]="X";
        boxes[0]=boxes[0]+num;
    };
};

//builds a new row for the scoreboard
function buildRow(round,pts){
    const newRow=document.createElement("tr");
    const rowH=document.createElement("th");
    const p1td=document.createElement("td");
    const p2td=document.createElement("td");
    newRow.id=`round${round}`;
    rowH.textContent=`Round ${round}`;
    p1td.className="p1Pts";
    p1td.textContent=pts;
    p2td.className="p2Pts";
    newRow.insertAdjacentElement("beforeend",rowH);
    newRow.insertAdjacentElement("beforeend",p1td);
    newRow.insertAdjacentElement("beforeend",p2td);
    return newRow;
};

//completely resets the board but not player and round
function resetBoard(){
    boxes.fill(0);
    const allBoxes=document.querySelectorAll(".box");
    allBoxes.forEach((box,id)=>{
        box.className="box";
        box.textContent=id+1;
    });
};

//changes the state of what's displayed
function changeDisplay(state){
    titleMenu.style.display="none";
    gameBoard.style.display="none";
    scoreCard.style.display="none";
    gameWinner.style.display="none";
    gameLoser.style.display="none";
    rePlayBTN.style.display="none";
    if(state===0){
        titleMenu.style.display="flex";
    }else if(state===1){
        gameBoard.style.display="flex";
        scoreCard.style.display="flex";
    }else if(state===2){
        scoreCard.style.display="flex";
        gameWinner.style.display="block";
        gameLoser.style.display="block";
        rePlayBTN.style.display="block";
    };
};

//resets the entire game, shows score, and allows to play again
function gameOver(){
    if(player1Points===player2Points){
        //tie
        roundPlayersPAR.textContent=`Bonus Round for ${playerNames[0]} vs ${playerNames[1]}`;
        rollBTN.disabled=false;
        console.log('bonus');
        return;
    }else{
        const tbl=buildRow("Total",player1Points);
        document.querySelector("#scoreTBL tbody").insertAdjacentElement("beforeend",tbl);
        const cell=document.querySelector(`#roundTotal .p2Pts`);
        cell.textContent=player2Points;
        if(player1Points>=player2Points){
            gameWinner.textContent=`The Winner is ${playerNames[1]} with ${player2Points} points!`;
            gameLoser.textContent=`The Loser is ${playerNames[0]} with ${player1Points} points!`;
        }else if(player1Points<=player2Points){
            gameWinner.textContent=`The Winner is ${playerNames[0]} with ${player1Points} points!`;
            gameLoser.textContent=`The Loser is ${playerNames[1]} with ${player2Points} points!`;
        };
        changeDisplay(2);
        rePlayBTN.disabled=false;
    };
};

//code start
startBTN.addEventListener('click',function(){
    if(titleMenu.style.display==='none'){
        console.log("not here");
        return;
    };
    if(inputPlayer1Name.value.trim()&&inputPlayer2Name.value.trim()){
        playerNames=[inputPlayer1Name.value.trim(),inputPlayer2Name.value.trim()];
        console.log("worked");
        //sets up the game info
        roundNumber=1;
        playerTurn=playerNames[0];
        updateRoundInfo(roundNumber,playerNames[0]);
        inputPlayer1Name.disabled=true;
        inputPlayer2Name.disabled=true;
        rollBTN.disabled=false;
        changeDisplay(1);
    }else if(inputPlayer2Name.value){
        alert("Player 1 Name Missing!");
        console.log("1");
    }else if(inputPlayer1Name.value){
        alert("Player 2 Name Missing!");
        console.log("2");
    }else{
        alert("Please Enter Names!");
        console.log("3");
    };
});//end startBTN listener

//function to roll the dice
rollBTN.addEventListener('click',function(){
    rollBTN.disabled=true;
    endBTN.disabled=true;
    rollDice();
    diceSumP.textContent=`Sum is ${roll1+roll2}`;
    if((roll1===roll2)||(boxes[roll1]==="X")||(boxes[roll2]==="X")){
        bothBTN.disabled=true;
    }else{
        bothBTN.disabled=false;
    };
    if(((roll1+roll2)>9)||(boxes[roll1+roll2]>9)||(boxes[roll1+roll2]==="X")){
        sumBTN.disabled=true;
    }else{
        sumBTN.disabled=false;
    };
    if(bothBTN.disabled===true&&sumBTN.disabled===true){
        endBTN.disabled=false;
    };
});//end rollBTN listener

//bothBTN listener
bothBTN.addEventListener('click',function(){
    bothBTN.disabled=true;
    sumBTN.disabled=true;
    closeBox(roll1);
    closeBox(roll2);
    rollBTN.disabled=false;
});//end bothBTN listener

//sumBTN listener
sumBTN.addEventListener('click',function(){
    sumBTN.disabled=true;
    bothBTN.disabled=true;
    closeBox(roll1+roll2);
    rollBTN.disabled=false;
});//end sumBTN listener

//endBTN listener
endBTN.addEventListener('click',function(){
    endBTN.disabled=true;
    sumBTN.disabled=true;
    bothBTN.disabled=true;
    rollBTN.disabled=true;
    let points=45-boxes[0];

    if(playerTurn===playerNames[0]){
        player1Points=player1Points+points;
        const tbl=buildRow(roundNumber,points);
        document.querySelector("#scoreTBL tbody").insertAdjacentElement("beforeend",tbl);
        playerTurn=playerNames[1];
    }else if(playerTurn===playerNames[1]){
        player2Points=player2Points+points;
        const cell=document.querySelector(`#round${roundNumber} .p2Pts`);
        cell.textContent=points;
        playerTurn=playerNames[0];
        roundNumber++;
    }else{
        alert(`How?\nAnd why?\nWhatever, ${points} points.`);
    };
    resetBoard();
    if(roundNumber>5&&playerTurn===playerNames[0]){
        console.log("Game over");
        gameOver();
    };
    updateRoundInfo(roundNumber,playerTurn);
    rollBTN.disabled=false;
});//end endBTN listener

//rePlayBTN listener
rePlayBTN.addEventListener('click',function(){
    rePlayBTN.disabled=true;
    inputPlayer1Name.value=playerNames[0];
    inputPlayer2Name.value=playerNames[1];
    playerNames=["",""];
    player1Points=0;
    player2Points=0;
    roundNumber=0;
    playerTurn="";
    resetBoard();
    changeDisplay(0);
    const tbl=document.querySelectorAll("#scoreTBL tbody tr");
    tbl.forEach((tr)=>{
        tr.remove();
    });
    inputPlayer1Name.disabled=false;
    inputPlayer2Name.disabled=false;
    startBTN.disabled=false;
});//end rePlayBTN listener
