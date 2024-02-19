let playerName;
let gameStarted = false;
let gamePaused = false;
let gameTime = 0;
let playerLives = 5;
let monsterCollisions = 0;
let trapCollisions = 0;
let gameEnded = false;

function updateTime() {
  if (gameStarted && !gamePaused) {
    let currentTime = new Date().toLocaleTimeString();
    document.getElementById('currentTime').innerText = currentTime;
    gameTime++;
    let minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;
    document.getElementById('elapsedTime').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('playerLivesDisplay').innerText = playerLives;
    if (minutes >= 2 && !gameEnded) {
      gameEnded = true;
      showGameResults();
    }
  }
}

function restartGame() {
  // Логика перезапуска игры
  document.getElementById('resultScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  // Другие действия при перезапуске игры
}

// ... (остальной код)

// Генерация монстров
function generateMonsters() {
  monsters = []; // Очищаем массив монстров
  for (let i = 0; i < 5; i++) {
    const monsterX = windowWidth + Math.random() * 200;
    const monsterY = Math.random() * (windowHeight - monsterHeight);
    monsters.push({ x: monsterX, y: monsterY });
  }
}

// Движение монстров хаотично
function moveMonstersInChaos() {
  for (let i = 0; i < monsters.length; i++) {
    // Добавим случайное изменение координат монстров
    monsters[i].x += Math.random() * 4 - 2;
    monsters[i].y += Math.random() * 4 - 2;
  }
}

// Остальной код остается без изменений

// Обработчик события для кнопки выбора карты
document.getElementById('selectMapButton').addEventListener('click', function() {
  let mapName = "название карты"; // Получите название карты из выбранных опций
  let mapImagePath = "путь к изображению карты"; // Получите путь к изображению карты из выбранных опций
  startGame(mapName, mapImagePath); // Запуск игры с выбранной картой
});

// ... (остальной код)

// Обработчик события для нажатия клавиши "Escape"
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    if (gameEnded) {
      // Если игра окончена, сбросим флаг окончания и возобновим игру
      gameEnded = false;
      restartGame(); // Ваша функция для перезапуска игры, если такая есть
    } else {
      gamePaused = !gamePaused; // Инвертируем флаг паузы, только если игра не окончена
    }
  }
});

// Запуск игры
generateMonsters();
setInterval(moveMonstersInChaos, 1000); // Добавляем вызов функции для движения монстров хаотично
gameLoop(); // Запускаем игровой цикл