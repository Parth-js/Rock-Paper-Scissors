const choices = document.querySelectorAll(".choice");
const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("comp-score");
const resultText = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");

let userScore = 0;
let compScore = 0;

const getComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
};

const getResult = (user, comp) => {
  if (user === comp) return "draw";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "scissors" && comp === "paper") ||
    (user === "paper" && comp === "rock")
  ) return "win";
  return "lose";
};

const updateResult = (user, comp, result) => {
  if (result === "win") {
    userScore++;
    resultText.textContent = `🎉 You Win! ${user} beats ${comp}`;
    resultText.style.color = "#00ffea";
  } else if (result === "lose") {
    compScore++;
    resultText.textContent = `💥 You Lose! ${comp} beats ${user}`;
    resultText.style.color = "#ff5555";
  } else {
    resultText.textContent = `😐 It's a Draw! You both chose ${user}`;
    resultText.style.color = "#f0c674";
  }

  resultText.classList.remove("fade");
  void resultText.offsetWidth; // Reset animation
  resultText.classList.add("fade");

  userScoreSpan.textContent = userScore;
  compScoreSpan.textContent = compScore;

  userScoreSpan.style.transform = "scale(1.2)";
  compScoreSpan.style.transform = "scale(1.2)";
  setTimeout(() => {
    userScoreSpan.style.transform = "scale(1)";
    compScoreSpan.style.transform = "scale(1)";
  }, 300);
};

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    const compChoice = getComputerChoice();
    const result = getResult(userChoice, compChoice);

    choice.classList.add("clicked");
    setTimeout(() => choice.classList.remove("clicked"), 300);

    updateResult(userChoice, compChoice, result);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScoreSpan.textContent = 0;
  compScoreSpan.textContent = 0;
  resultText.textContent = "Make your move!";
  resultText.style.color = "#fff";
});
