let boxes = document.querySelectorAll(".box");
let h2 = document.querySelector("h2");
let btn = document.querySelector(".restart-btn");

let start = 0;
let sym = "O";
let flag = 0;
let winner = "O";

const pattern = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner() {
  for (let i = 0; i < pattern.length; i++) {
    let [a, b, c] = pattern[i];
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val2 && val3 && val1 === val2 && val1 === val3) {
      flag = 1;
      winner = val1;
      break;
    }
  }
  declareWinner();
}

function declareWinner() {
  if (flag === 1) {
    h2.innerText = winner === "O" ? "Winner is Player1" : "Winner is Player2";
    disableBoard();
  } else if (start === 9) {
    h2.innerText = "Draw";
  }
}

function disableBoard() {
  boxes.forEach(box => box.classList.add("disabled"));
}

function resetGame() {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("disabled");
  });
  h2.innerText = "Start the game!";
  start = 0;
  sym = "O";
  flag = 0;
  winner = "O";
}

boxes.forEach((box, i) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = sym;
    sym = sym === "O" ? "X" : "O";
    start++;
    box.classList.add("disabled");

    if (start >= 5) {
      checkWinner();
    }
  });
});

btn.addEventListener("click", resetGame);
