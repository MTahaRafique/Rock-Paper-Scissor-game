// ===========================
// DOM Elements
// ===========================
const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const msgEl = document.getElementById("Msg");
const resetBtn = document.createElement("button"); // Reset button

// Append reset button to body
resetBtn.textContent = "Reset Game";
resetBtn.style.marginTop = "40px";
resetBtn.style.padding = "10px 25px";
resetBtn.style.fontSize = "18px";
resetBtn.style.borderRadius = "20px";
resetBtn.style.border = "none";
resetBtn.style.cursor = "pointer";
resetBtn.style.background = "linear-gradient(90deg,#00c6ff,#0072ff)";
resetBtn.style.color = "#fff";
resetBtn.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
document.body.appendChild(resetBtn);

// ===========================
// Game Variables
// ===========================
let userScore = 0;
let compScore = 0;
const choicesArray = ["rock", "paper", "scissors"];

// ===========================
// Computer Choice Function
// ===========================
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choicesArray.length);
    return choicesArray[randomIndex];
}

// ===========================
// Play One Round
// ===========================
function playRound(userChoice) {
    const compChoice = getComputerChoice();

    // Remove previous classes
    choices.forEach(choice => {
        choice.classList.remove("win", "lose", "selected");
    });

    // Add selected animation
    document.getElementById(userChoice).classList.add("selected");

    // Determine winner
    let result = "";
    if (userChoice === compChoice) {
        result = "It's a draw!";
    } else if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        result = "You win!";
        userScore++;
        document.getElementById(userChoice).classList.add("win");
        document.getElementById(compChoice).classList.add("lose");
    } else {
        result = "You lose!";
        compScore++;
        document.getElementById(userChoice).classList.add("lose");
        document.getElementById(compChoice).classList.add("win");
    }

    // Update scores
    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;

    // Add score animation
    userScoreEl.parentElement.classList.add("updated");
    compScoreEl.parentElement.classList.add("updated");

    setTimeout(() => {
        userScoreEl.parentElement.classList.remove("updated");
        compScoreEl.parentElement.classList.remove("updated");
    }, 500);

    // Update message
    msgEl.textContent = `${result} (Computer chose ${compChoice})`;
}

// ===========================
// Add Click Listeners
// ===========================
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        playRound(choice.id);
    });
});

// ===========================
// Reset Game Function
// ===========================
function resetGame() {
    userScore = 0;
    compScore = 0;
    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;
    msgEl.textContent = "Play your move!";
    choices.forEach(choice => {
        choice.classList.remove("win", "lose", "selected");
    });
}

// ===========================
// Reset Button Event
// ===========================
resetBtn.addEventListener("click", resetGame);
