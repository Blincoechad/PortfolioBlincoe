// grabbing elements
const buttons = document.querySelectorAll("button");
const resultDisplay = document.getElementById("result");
// store original HTML to restore on reset
const originalResultHTML = resultDisplay.innerHTML;



// event listeners for user choice
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = getWinner(userChoice, computerChoice);
    displayResult(userChoice, computerChoice, winner);
  });
});


// function that randomly selects from the array that includes Rock,Paper,scissors
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}



// formula to decide winner
function getWinner(user, computer) {
    const userWin =  "You won! 😀"
    const compWin = "You Lost, Computer wins 😢 ";
   const tie = "It's a tie! 😐"
  if (user === computer) return tie;
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return userWin;
  } else {
    return compWin;
  }
}


// Shows result
function displayResult(user, computer, winner) {
  resultDisplay.textContent = `You chose ${user}, computer chose ${computer}. ${winner}`;
}

//   resets the output box to empty
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetGame);

// resets to original letters
function resetGame() {
  document.getElementById('result').innerHTML = originalResultHTML;
}




    


