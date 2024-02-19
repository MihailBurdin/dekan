let playerName;
let gameStarted = false;
let gamePaused = false;
let gameTime = 0;
let playerLives = 5;
let monsterCollisions = 0;
let trapCollisions = 0;
let gameEnded = false;
let selectedMap = null;
let mapImage = null;

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
          // Действия при достижении финиша (например, показать результаты и остановить игру)
          showGameResults();
      }
    }
}


function startGame(mapName, mapImage) {
  // Показываем игровой экран
  document.getElementById("loginScreen").style.display = "block";
  document.getElementById("mapSelection").style.display = "none";

  // Устанавливаем выбранную карту в качестве фона
  document.getElementById("map").style.backgroundImage = "url('./map1.png')";;

  // Ваш остальной код игры здесь
}

function continueGame() {
  // Ваша функция продолжения игры здесь
}

function restartGame() {
  // Ваша функция перезапуска игры здесь
}

function restartGame() {
  // Логика перезапуска игры
  document.getElementById('resultScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  // Другие действия при перезапуске игры
}

function continueGame() {
  // Логика продолжения игры
  document.getElementById('pauseMenu').style.display = 'none';
  // Другие действия при продолжении игры
}

function showGameResults() {
  document.getElementById('resultScreen').style.display = 'block';
  document.getElementById('gameScreen').style.display = 'none';
  // Логика показа результатов
}
// Получение ссылки на холст игры
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Размеры окна игры
const windowWidth = 1400;
const windowHeight = 500;

canvas.width = windowWidth;
canvas.height = windowHeight;

// Цвета
const playerColor = "#FF0000";
const monsterColor = "#00FF00";

// Позиция игрока
let playerX = 0;
let playerY = 0;
const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 5;
let playervisY = windowHeight / 2;

function showGameResults() {
  document.getElementById('resultScreen').style.display = 'block';
  document.getElementById('gameScreen').style.display = 'none';
  document.getElementById('gameTimeResult').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.getElementById('monsterCollisionsResult').innerText = monsterCollisions;
  document.getElementById('trapHitsResult').innerText = trapCollisions;
  document.getElementById('remainingLivesResult').innerText = playerLives;
}

function startGame() { 
  playerName = document.getElementById('playerName').value; 
  document.getElementById('playerNameDisplay').innerText = playerName; 
  document.getElementById('loginScreen').style.display = 'none'; 
  document.getElementById('gameScreen').style.display = 'block'; 
  gameStarted = true; 
  setInterval(updateTime, 1000); 
  // Другие действия при начале игры 
} 
function handleKeyPress(event) {
  // Проверяем код нажатой клавиши
  switch (event.keyCode) {
      case 37: // Нажата клавиша влево
          if (playerX > 0) {
              playerX -= 10; // Перемещаем игрока влево, только если не достигнут левый край
          }
          break;
      case 38: // Нажата клавиша вверх
          if (playerY > 0) {
              playerY -= 10; // Перемещаем игрока вверх, только если не достигнут верхний край
          }
          break;
      case 39: // Нажата клавиша вправо
          if (playerX + playerWidth < windowWidth) {
              playerX += 10; // Перемещаем игрока вправо, только если не достигнут правый край
          }
          break;
      case 40: // Нажата клавиша вниз
          if (playerY + playerHeight < windowHeight) {
              playerY += 10; // Перемещаем игрока вниз, только если не достигнут нижний край
          }
          break;
      default:
          // Если нажата другая клавиша, не делаем ничего
          return;
  }

  // Обновляем позицию игрока на холсте
  drawObjects(); // Перерисовываем объекты на холсте
}

// Добавляем обработчик событий нажатия клавиш
document.addEventListener('keydown', handleKeyPress);
// Размеры и скорость игрока

// Монстры
let monsters = [];
const monsterWidth = 50;
const monsterHeight = 50;
const monsterSpeed = 2;

// Генерация монстров
function generateMonsters() {
  for (let i = 0; i < 5; i++) {
    const monsterX = windowWidth + Math.random() * 200;
    const monsterY = Math.random() * (windowHeight - monsterHeight);
    monsters.push({ x: monsterX, y: monsterY });
  }
}

// Отрисовка объектов на холсте
function drawObjects() {
  ctx.clearRect(0, 0, windowWidth, windowHeight);
  
  // Игрок
  ctx.fillStyle = playerColor;
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

  // Монстры
  ctx.fillStyle = monsterColor;
  for (let i = 0; i < monsters.length; i++) {
    ctx.fillRect(monsters[i].x, monsters[i].y, monsterWidth, monsterHeight);
  }

}


// Обработка столкновений
function handleCollisions() {
  // Проверка столкновений игрока с монстрами
  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];
    if (
      playerX + playerWidth > monster.x &&
      playerX < monster.x + monsterWidth &&
      playerY + playerHeight > monster.y &&
      playerY < monster.y + monsterHeight
    ) {
      playerLives--;
      monsters.splice(i, 1);
      i--;
    }
  }

  // Проверка на окончание игры
  if (playerLives <= 0) {
    gameEnded = true;
    alert("Игра окончена. Вы потеряли все жизни.");
    // Здесь можно добавить код для обработки конца игры
  }
}

function moveMonstersInChaos() {
  for (let i = 0; i < monsters.length; i++) {
    // Добавим случайное изменение координат монстров
    monsters[i].x += Math.random() * 4 - 2;
    monsters[i].y += Math.random() * 4 - 2;
  }
}

function showContinueButton() {
  const continueButton = document.createElement('button');
  continueButton.textContent = 'Продолжить игру';
  continueButton.onclick = function() {
    gamePaused = false;
    gameLoop(); // Возобновляем игровой цикл
    continueButton.remove(); // Удаляем кнопку после продолжения игры
  };
  document.body.appendChild(continueButton);
}

function showGameResults() {
  document.getElementById('resultScreen').style.display = 'block';
  document.getElementById('gameScreen').style.display = 'none';
  document.getElementById('gameTimeResult').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.getElementById('monsterCollisionsResult').innerText = monsterCollisions;
  document.getElementById('trapHitsResult').innerText = trapCollisions;
  document.getElementById('remainingLivesResult').innerText = playerLives;
}


// Массив для хранения пуль
let bullets = [];
const bulletWidth = 8;
const bulletHeight = 4;
const bulletSpeed = 10;

function handlePlayerShoot() {
  // Создаем новую пулю в позиции игрока
  bullets.push({ x: playerX + playerWidth, y: playerY + playerHeight / 2 });
}

// Обработчик событий для стрельбы пулями
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) { // Предполагая, что клавиша "Пробел" запускает стрельбу
    handlePlayerShoot();
  }
});

// Двигаем и рисуем пули в игровом цикле
function moveBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += bulletSpeed;
    if (bullets[i].x > windowWidth) {
      bullets.splice(i, 1);
      i--;
    }
  }
}

function drawBullets() {
  ctx.fillStyle = "#000000"; // Задаем цвет пули
  for (let i = 0; i < bullets.length; i++) {
    ctx.fillRect(bullets[i].x, bullets[i].y, bulletWidth, bulletHeight);
  }
}

// Обработка столкновений пуль с монстрами
function handleBulletCollisions() {
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < monsters.length; j++) {
      if (
        bullets[i].x < monsters[j].x + monsterWidth &&
        bullets[i].x + bulletWidth > monsters[j].x &&
        bullets[i].y < monsters[j].y + monsterHeight &&
        bullets[i].y + bulletHeight > monsters[j].y
      ) {
        // Удаление пули и монстра при столкновении
        bullets.splice(i, 1);
        monsters.splice(j, 1);
        monsterCollisions++;
        i--;
        break;
      }
    }
  }
}

// Босс
const bossColor = "#0000FF"; // Цвет босса
const bossWidth = 80;
const bossHeight = 80;
const bossSpeed = 0.5;
let bossX = windowWidth - bossWidth;
let bossY = windowHeight / 2;
let bossHealth = 100; // Здоровье босса
let bossIsDead = false;
let bossRespawnTime = 60000; // Время возрождения босса (в миллисекундах)
let bossRespawnTimer = null;

function drawBoss() {
// Рисуем босса
ctx.fillStyle = bossColor;
ctx.fillRect(bossX, bossY, bossWidth, bossHeight);

// Рисуем полоску здоровья босса
ctx.fillStyle = "#00FF00"; // Зеленый цвет для здоровья
const healthBarWidth = (bossHealth / 100) * bossWidth;
ctx.fillRect(bossX, bossY - 10, healthBarWidth, 5);
}

function handleBossCollisions() {
// Проверка столкновения игрока с боссом
if (
playerX + playerWidth > bossX &&
playerX < bossX + bossWidth &&
playerY + playerHeight > bossY &&
playerY < bossY + bossHeight
) {
playerLives = 0; // Игра заканчивается, если игрок касается босса
}

// Проверка столкновения пуль с боссом
for (let i = 0; i < bullets.length; i++) {
if (
bullets[i].x < bossX + bossWidth &&
bullets[i].x + bulletWidth > bossX &&
bullets[i].y < bossY + bossHeight &&
bullets[i].y + bulletHeight > bossY
) {
// Уменьшаем здоровье босса и удаляем пулю при попадании
bossHealth--;
bullets.splice(i, 1);
i--;
}
}

// Проверка смерти босса
if (bossHealth <= 0) {
bossIsDead = true;
bossX = windowWidth - bossWidth; // Возвращаем босса на начальную позицию
bossY = Math.random() * (windowHeight - bossHeight); // Случайная высота
bossHealth = 100; // Восстанавливаем здоровье
bossRespawnTimer = setTimeout(() => {
bossIsDead = false;
clearTimeout(bossRespawnTimer);
}, bossRespawnTime);
}
}

function moveBoss() {
if (bossIsDead) {
return; // Если босс мертв, то не двигаем его
}

// Преследуем игрока
if (playerX < bossX) {
bossX -= bossSpeed;
} else {
bossX += bossSpeed;
}

if (playerY < bossY) {
bossY -= bossSpeed;
} else {
bossY += bossSpeed;
}
}

// Игровой цикл
function gameLoop() {
drawObjects();
handleCollisions();
moveBullets(); // Двигаем пули
drawBullets(); // Рисуем пули
handleBulletCollisions(); // Обработка столкновений пуль с монстрами

moveBoss(); // Двигаем босса
drawBoss(); // Рисуем босса
handleBossCollisions(); // Обработка столкновений с боссом

// Перемещение монстров
for (let i = 0; i < monsters.length; i++) {
monsters[i].x -= monsterSpeed;
}

// Генерация монстров
if (Date.now() % 5000 < 16) {
generateMonsters();
}

requestAnimationFrame(gameLoop);
}


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
gameLoop();

