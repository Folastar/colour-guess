const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

// Predefined set of colors
const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#000080", "#808000"
];

// Function to generate a random color from the predefined set
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to initialize the game
function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;
//   colorBox.style.opacity="0"
//   colorBox.style.border="1px solid red"

  // Clear previous color options
  colorOptions.innerHTML = '';

  // Generate 6 color options, one of which is the target color
  const options = [targetColor];
  while (options.length < 6) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Create buttons for each color option
  options.forEach(color => {
    const button = document.createElement('button');
    button.setAttribute("data-testid","colorOption")
    button.style.backgroundColor = color;
    button.addEventListener('click', () => handleGuess(color));
    colorOptions.appendChild(button);
  });

  // Reset game status
  gameStatus.textContent = "Make your guess!";
}

// Function to handle user guesses
function handleGuess(selectedColor) {
  if (selectedColor === targetColor) {
    initGame()
    gameStatus.textContent = "Correct!";
    gameStatus.style.color="green"
    score++;
    scoreElement.textContent = score;
    colorBox.style.animation = "correctGuess 0.5s ease";
    colorBox.style.opacity="0.7"
  } else {

    gameStatus.textContent = "Wrong! Try again.";
    gameStatus.style.color="red"
    colorBox.style.animation = "wrongGuess 0.5s ease";
  }

  // Reset animation after it ends
  setTimeout(() => {
    colorBox.style.animation = '';
  }, 500);
}

// Event listener for the new game button
newGameButton.addEventListener('click', () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

// Initialize the game on page load
initGame();