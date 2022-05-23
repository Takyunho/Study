const inputForm = document.querySelector("#input-form");
const numberInput = document.querySelector("#numberInput");
const guessNumberInput = document.querySelector("#guessNumberInput");
const playBtn = document.querySelector("#playBtn");
const result = document.querySelector("#result");
const choseResult = document.querySelector("#choseResult");
const winLoseResult = document.querySelector("#winLoseResult");


function clickButton(event) {
  event.preventDefault();                       // 기본 행동 방지

  if (parseInt(guessNumberInput.value) > parseInt(numberInput.value)) {
    alert("처음 입력한 숫자보다 큽니다!");
  }
  else if (parseInt(guessNumberInput.value) < 0 || parseInt(numberInput.value) < 0) {
    alert("음수는 입력할 수 없습니다!");
  }
  else {
    const machineChoseNumber = Math.ceil(Math.random() * parseInt(numberInput.value));
    choseResult.innerText = `You chose: ${guessNumberInput.value}, the machine chose: ${machineChoseNumber}.`;

    if (parseInt(guessNumberInput.value) === machineChoseNumber) {
      winLoseResult.innerHTML = 'You Won!';      // 내가 선택한 숫자가 랜덤 숫자와 같으면 You Won!
    }
    else {
      winLoseResult.innerHTML = 'You Lose!';    // 그렇지 않으면 You lost!
    }
  }
}

playBtn.addEventListener("click", clickButton);

/*
************************** html 답안 *****************************
<!DOCTYPE html>
<html>
  <head>
    <title>JS Casino</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Random Number Game</h1>
    <div>
      <h3 class="js-title">
        Generate a number between 0 and <input id="maxNumber" type="number" />
      </h3>
    </div>
    <form id="js-guess">
      <label>Guess the number:</label>
      <input type="number" max="200" min="5" />
      <button>Play!</button>
    </form>
    <div id="js-result">
      <span></span>
    </div>
    <script src="src/index.js"></script>
  </body>
</html>
***********************************************************************
******************************** JS 답안 *******************************
const guessForm = document.getElementById("js-guess");
const result = document.getElementById("js-result");
const maxNumber = document.getElementById("maxNumber");

function handleGuessSubmit(e) {
  e.preventDefault();
  const guessInput = guessForm.querySelector("input");
  if (guessInput.value === "" && maxNumber === "") {
    return;
  }
  const max = maxNumber.value;
  const random = Math.ceil(Math.random() * max);
  const userGuess = parseInt(guessInput.value, 10);
  const resultSpan = result.querySelector("span");
  resultSpan.innerHTML = `
  You chose: ${userGuess},
  the machine chose: ${random}.<br />
  <strong>${userGuess === random ? "You won!" : "You lost!"}</strong>
  `;
}

guessForm.addEventListener("submit", handleGuessSubmit);
*/
