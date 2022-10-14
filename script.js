let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//winning patten array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

//player 'x' plays first
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
    btnRef.forEach((Element) => (Element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//enable all buttns (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((Element) => {
        Element.innerText = "";
        Element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

//this function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

//function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> its a draw";
};

//new game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
})

//this function is executed when a player wins
//const winFunction = (letter) => {
//    disableButtons();
//};

//win logic
const winChecker = () => {
    //loop through all win patterns
    for (let i of winningPattern) {
        let [Element1, Element2, Element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //check if elements are filled
        //if 3 empty elements are same and would give win as would
        if(Element1 != "" && Element2 != "" & Element3 != ""){
            if(Element1 == Element2 && Element2 == Element3){
                //if all 3 buttons have same value then pass the value to winfunction
                winFunction(Element1);
            }
        }

    }
};

//display x/o on click
btnRef.forEach((Element) => {
    Element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //dispay x
            Element.innerText = "X";
            Element.disabled = true;
        } else {
            xTurn = true;
            //display o
            Element.innerText = "O";
            Element.disabled = true;
        }
        //increment count of each click
        count += 1;
        if (count == 9){
            //its a draw since there are a total of 9 boxes
            drawFunction();
        }
        //check for win on every click
        winChecker();
    });
});
//enable buttons and disable popup on load page
window.onload = enableButtons;