const colorButtons = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue')
  };
  
  const startButton = document.getElementById('start-btn');
  const statusText = document.getElementById('status-text');
  const scoreDisplay = document.getElementById('score');
  const highScoreDisplay = document.getElementById('high-score');
  
  let gameSequence = [];
  let playerSequence = [];
  let level = 0;
  let score = 0;
  let highScore = localStorage.getItem('highScore') || 0;
  
  highScoreDisplay.textContent = highScore;
  
  function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`); // Adicione sons aqui
    audio.play();
  }
  
  function flashButton(color) {
    colorButtons[color].classList.add('active');
    playSound(color);
    setTimeout(() => {
      colorButtons[color].classList.remove('active');
    }, 500);
  }
  
  function nextRound() {
    playerSequence = [];
    level++;
    score = level - 1;  // A pontuação é baseada no nível atingido
    scoreDisplay.textContent = score;
    statusText.textContent = `Nível ${level}`;
    
    const colors = ['green', 'red', 'yellow', 'blue'];
    const nextColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(nextColor);
  
    gameSequence.forEach((color, index) => {
      setTimeout(() => {
        flashButton(color);
      }, (index + 1) * 800);
    });
  }
  
  function handlePlayerInput(color) {
    playerSequence.push(color);
    flashButton(color);
  
    const currentStep = playerSequence.length - 1;
    
    if (playerSequence[currentStep] !== gameSequence[currentStep]) {
      statusText.textContent = 'Você perdeu! Tente novamente.';
      checkHighScore();
      resetGame();
      return;
    }
  
    if (playerSequence.length === gameSequence.length) {
      setTimeout(nextRound, 1000);
    }
  }
  
  function checkHighScore() {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      highScoreDisplay.textContent = highScore;
    }
  }
  
  function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    score = 0;
    startButton.disabled = false;
  }
  
  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    statusText.textContent = 'Jogo iniciado!';
    nextRound();
  });
  
  Object.keys(colorButtons).forEach(color => {
    colorButtons[color].addEventListener('click', () => handlePlayerInput(color));
  });
  
  