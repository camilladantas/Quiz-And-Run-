// Perguntas temporárias (serão substituídas pelo Firebase em breve)
const allQuestions = [
    { text: "Considerando a geografia política do país, qual é a capital federal do Brasil?", options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], correctIndex: 1 },
    { text: "Quanto é 8 x 7?", options: ["54", "56", "64", "48"], correctIndex: 1 },
    { text: "Qual é o maior planeta do nosso sistema solar?", options: ["Terra", "Saturno", "Júpiter", "Netuno"], correctIndex: 2 },
    { text: "Quem pintou a Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], correctIndex: 1 },
    { text: "Qual elemento químico tem o símbolo 'O'?", options: ["Ouro", "Oxigênio", "Ósmio", "Ozônio"], correctIndex: 1 },
    { text: "Em que continente fica o Egito?", options: ["Ásia", "Europa", "América", "África"], correctIndex: 3 }
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

// Obstáculos clássicos do Super Mario (um por pergunta)
const OBSTACLE_TYPES = ['goomba', 'pipe', 'piranha', 'question', 'brick', 'spiny'];

const PALETTE = {
    '.': null,
    k: '#1a1208',
    w: '#ffffff',
    s: '#f8d0a0',
    r: '#e52521',
    R: '#b53120',
    u: '#049cd8',
    U: '#0064b0',
    n: '#6b3c18',
    o: '#c84c0c',
    O: '#ac7c00',
    f: '#5a2e10',
    g: '#00b800',
    G: '#80d010',
    d: '#007000',
    y: '#fcbc58',
    Y: '#e89d20',
    t: '#fcfc54',
    p: '#e52521',
    P: '#ff8c8c',
    m: '#00d000',
    M: '#008800',
    x: '#c0c0c0',
    z: '#707070'
};

const SPRITES = {
    mario: [
        '....rrrrr.....',
        '...rrrrrrrr...',
        '...nnnsskn....',
        '..nsnssskkk...',
        '..nsnnssskks..',
        '..nnnssssss...',
        '....sssssss...',
        '...ruuuur.r...',
        '..rruuuurrr...',
        '.rrr.uu.rrrs..',
        '.ss.uuuu.ss...',
        '..suuuuuus....',
        '...unn.nnu....',
        '...nn...nn....',
        '..nnn...nnn...'
    ],
    koopa: [
        '........kk......',
        '.......kssk.....',
        '......kssssk....',
        '......kwsswsk...',
        '.......ksssk....',
        '......kmmmmk....',
        '.....kmmmmmmk...',
        '....kmmwmmwmk...',
        '....kmmmmmmmk...',
        '....kMMmmMMmk...',
        '.....kmmmmmk....',
        '......kssk......',
        '......nn.nn.....',
        '.....nn...nn....'
    ],
    goomba: [
        '.....kkkkkk.....',
        '....kOOOOOOk....',
        '...kOOOOOOOOk...',
        '..kOwOkOOwOOk...',
        '..kwwkkkkkwwk...',
        '..kOOOOOOOOOk...',
        '.kkOOOOOOOOOkk..',
        'kkOOOOOOOOOOOkk.',
        '.kkkkkkkkkkkkk..',
        '..kffffffffk....',
        '.kkffffffffkk...',
        'kk..........kk..'
    ],
    pipe: [
        'kGGGGGGGGGGGGk',
        'kGggggggggggGk',
        'kGggggggggggGk',
        'kGGGGGGGGGGGGk',
        '.kggggggggggk.',
        '.kgddddddddgk.',
        '.kggggggggggk.',
        '.kgddddddddgk.',
        '.kggggggggggk.',
        '.kgddddddddgk.',
        '.kggggggggggk.',
        '.kgddddddddgk.',
        '.kggggggggggk.',
        '.kkkkkkkkkkkk.'
    ],
    piranha: [
        'ww..........ww',
        'wpw.kkkkkk.wpw',
        'kppkppppppkppk',
        'kppppwppwppppk',
        'kppppppppppppk',
        'kppwppppppwppk',
        '.kppppppppppk.',
        '..kkkkggkkkk..',
        '....kggggk....',
        '....kgGGgk....',
        '....kggggk....',
        '....kkkkkk....'
    ],
    question: [
        'kyyyyyyyyyyyyk',
        'yYYYYYYYYYYYYk',
        'yYk........kYk',
        'yYk..yyyy..kYk',
        'yYk.yykkky.kYk',
        'yYk.kk.yyk.kYk',
        'yYk....yy..kYk',
        'yYk...yy...kYk',
        'yYk...kk...kYk',
        'yYk...yy...kYk',
        'yYk........kYk',
        'yYk...yy...kYk',
        'yYk...yy...kYk',
        'yYk........kYk',
        'yYYYYYYYYYYYYk',
        'kkkkkkkkkkkkkk'
    ],
    brick: [
        'oooooooooooooo',
        'oYYYoYYYoYYYok',
        'oooooooooooook',
        'oYoYYYoYYYoYok',
        'oooooooooooook',
        'oYYYoYYYoYYYok',
        'oooooooooooook',
        'oYoYYYoYYYoYok',
        'oooooooooooook',
        'oYYYoYYYoYYYok',
        'oooooooooooook',
        'kkkkkkkkkkkkkk'
    ],
    spiny: [
        '..k....k....k.',
        '.krk..krk..krk',
        '..krkkkrkkkrk.',
        '...krrrrrrk...',
        '..krrwrrwrrk..',
        '.krrkkkkkkrrk.',
        '.krrrrrrrrrrk.',
        '..krrrrrrrrk..',
        '...kffffffk...',
        '..kk......kk..'
    ],
    castle: [
        '.x.x.x..........x.x.',
        'kxxxk...........kxxk',
        'kxxxk..x.x.x....kxxk',
        'kxkxk.kxxxxxk...kxkk',
        'kxxxk.kxxxxxk...kxxk',
        'kkkkk.kxkxkxk...kkkk',
        '......kxxxxxk.......',
        '....kkkxxxxxkkk.....',
        '....kxxxxxxxxxk.....',
        '....kxxkkkkkxxk.....',
        '....kxxk...kxxk.....',
        '....kxxk.n.kxxk.....',
        '....kxxk.n.kxxk.....',
        '....kxxk.n.kxxk.....',
        '....kkkkkkkkkkk.....'
    ],
    flag: [
        'k.rrrrrrr.....',
        'k.rrrwrrrr....',
        'k.rrrrrrr.....',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'k.............',
        'kkk...........'
    ],
    cloud: [
        '......wwww......',
        '....wwwwwwww....',
        '..wwwwwwwwwwww..',
        '.wwwwwwwwwwwwww.',
        'wwwwwwwwwwwwwwww'
    ]
};

function pixelsToSvg(rows, extraClass = '') {
    const width = Math.max(...rows.map((row) => row.length));
    const height = rows.length;
    let rects = '';
    rows.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
            const color = PALETTE[row[x]];
            if (!color) continue;
            rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
        }
    });
    return `<svg class="pixel-sprite ${extraClass}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

function obstacleMarkup(type) {
    if (type === 'piranha') {
        return `${pixelsToSvg(SPRITES.piranha, 'piranha-svg')}${pixelsToSvg(SPRITES.pipe, 'pipe-svg')}`;
    }
    const className = type === 'pipe' ? 'pipe-svg' : '';
    return pixelsToSvg(SPRITES[type], className);
}

// ===== Configurações =====
const FINISH_LINE = 72;
const START_LIVES = 3;
const QUESTION_TIME = 120;
const COINS_PER_HIT = 10;

// ===== Estado =====
let currentQuestionIndex = 0;
let playerProgress = 0;
let enemyProgress = 0;
let lives = START_LIVES;
let score = 0;
let timeLeft = QUESTION_TIME;
let inputLocked = false;
let gameOver = false;

const STEP = FINISH_LINE / allQuestions.length;
const obstaclePositions = allQuestions.map((_, i) => (i + 1) * STEP);

// ===== Elementos =====
const playerEl = document.getElementById('player');
const enemyEl = document.getElementById('enemy');
const trackArea = document.getElementById('trackArea');
const questionTextEl = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const obstaclesContainer = document.getElementById('obstaclesContainer');
const obstacleIconEl = document.getElementById('obstacleIcon');
const livesContainer = document.getElementById('livesContainer');
const scoreText = document.getElementById('scoreText');
const timerBar = document.getElementById('timerBar');
const timerNum = document.getElementById('timerNum');
const hudTime = document.getElementById('hudTime');
const questionProgressEl = document.getElementById('questionProgress');
const gameOverScreen = document.getElementById('gameOverScreen');

let enemyTimer;
let timerInterval;

// ===== Som (efeitos simples via WebAudio, sem arquivos externos) =====
let audioCtx;
function playTone(freq, duration, type = 'square') {
    try {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = 0.08;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { /* áudio indisponível, ignora */ }
}
const sfx = {
    correct: () => playTone(880, 0.15),
    wrong: () => playTone(140, 0.25, 'sawtooth'),
    win: () => { playTone(660, 0.12); setTimeout(() => playTone(880, 0.2), 120); },
    lose: () => { playTone(220, 0.3, 'sawtooth'); setTimeout(() => playTone(110, 0.4, 'sawtooth'), 150); }
};

function currentObstacleType() {
    return OBSTACLE_TYPES[currentQuestionIndex % OBSTACLE_TYPES.length];
}

// ===== Inicialização =====
function startGame() {
    playerEl.innerHTML = pixelsToSvg(SPRITES.mario);
    enemyEl.innerHTML = pixelsToSvg(SPRITES.koopa);
    document.getElementById('castle').innerHTML = pixelsToSvg(SPRITES.castle);
    document.getElementById('flagpole').innerHTML = pixelsToSvg(SPRITES.flag);
    document.querySelectorAll('.smb-cloud').forEach((el) => {
        el.innerHTML = pixelsToSvg(SPRITES.cloud);
    });
    renderObstacles();
    renderLives();
    updateScore(0);
    loadQuestion();
    enemyTimer = setTimeout(() => {
        enemyTimer = setInterval(moveEnemy, 8000);
    }, 15000);
}

function renderObstacles() {
    obstaclesContainer.innerHTML = '';
    obstaclePositions.forEach((pos, i) => {
        const type = OBSTACLE_TYPES[i % OBSTACLE_TYPES.length];
        const el = document.createElement('div');
        el.id = `obstacle-${i}`;
        el.className = `obstacle obstacle-${type}` + (i === 0 ? ' obstacle-current' : '');
        el.style.left = `calc(${pos}% - 10px)`;
        el.innerHTML = obstacleMarkup(type);
        obstaclesContainer.appendChild(el);
    });
}

function renderLives() {
    livesContainer.innerHTML = '';
    for (let i = 0; i < START_LIVES; i++) {
        const span = document.createElement('span');
        span.textContent = i < lives ? '♥' : '♡';
        span.style.color = i < lives ? '#e52521' : '#555';
        livesContainer.appendChild(span);
    }
}

function updateScore(delta) {
    score += delta;
    scoreText.textContent = String(score).padStart(3, '0');
}

// ===== Perguntas =====
function loadQuestion() {
    if (currentQuestionIndex >= allQuestions.length) return;
    const q = allQuestions[currentQuestionIndex];
    const type = currentObstacleType();

    document.querySelectorAll('.obstacle').forEach((o) => o.classList.remove('obstacle-current'));
    const currentObstacle = document.getElementById(`obstacle-${currentQuestionIndex}`);
    if (currentObstacle) currentObstacle.classList.add('obstacle-current');
    obstacleIconEl.innerHTML = obstacleMarkup(type);

    questionTextEl.textContent = q.text;
    if (questionProgressEl) {
        questionProgressEl.textContent = `${currentQuestionIndex + 1}/${allQuestions.length}`;
    }
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'retro-btn option-btn';
        btn.innerHTML = `<span class="option-letter">${OPTION_LETTERS[index]}</span><span>${opt}</span>`;
        btn.onclick = () => checkAnswer(index, q.correctIndex);
        optionsContainer.appendChild(btn);
    });

    startQuestionTimer();
}

function formatTime(seconds) {
    const total = Math.ceil(Math.max(0, seconds));
    const minutes = Math.floor(total / 60);
    const rest = total % 60;
    return `${minutes}:${String(rest).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    const label = formatTime(timeLeft);
    if (timerNum) timerNum.textContent = label;
    if (hudTime) hudTime.textContent = label;
    const pct = Math.max(0, (timeLeft / QUESTION_TIME) * 100);
    timerBar.style.width = `${pct}%`;
    timerBar.classList.toggle('timer-warning', timeLeft <= 20);
}

function startQuestionTimer() {
    clearInterval(timerInterval);
    timeLeft = QUESTION_TIME;
    timerBar.classList.remove('timer-warning');
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            timeLeft = 0;
            updateTimerDisplay();
            clearInterval(timerInterval);
            if (!inputLocked && !gameOver) handleWrong(true);
        }
    }, 100);
}

function restoreObstacle(index) {
    const el = document.getElementById(`obstacle-${index}`);
    if (!el) return;
    el.classList.remove('obstacle-cleared', 'obstacle-current', 'obstacle-shake');
    void el.offsetWidth;
}

function checkAnswer(selectedIndex, correctIndex) {
    if (inputLocked || gameOver) return;
    inputLocked = true;
    clearInterval(timerInterval);

    const btns = optionsContainer.querySelectorAll('button');
    btns.forEach((b) => { b.disabled = true; });

    if (selectedIndex === correctIndex) {
        if (btns[selectedIndex]) btns[selectedIndex].classList.add('option-correct');
        setTimeout(() => {
            inputLocked = false;
            handleCorrect();
        }, 420);
        return;
    }

    setTimeout(() => {
        inputLocked = false;
        handleWrong(false);
    }, 280);
}

function handleCorrect() {
    sfx.correct();
    const timeBonus = Math.max(0, Math.ceil(timeLeft));
    updateScore(COINS_PER_HIT + timeBonus);

    const clearedObstacle = document.getElementById(`obstacle-${currentQuestionIndex}`);
    if (clearedObstacle) {
        clearedObstacle.classList.remove('obstacle-current');
        clearedObstacle.classList.add('obstacle-cleared');
    }

    playerProgress = obstaclePositions[currentQuestionIndex];
    updatePosition(playerEl, playerProgress);
    playerEl.classList.add('jump-anim');
    setTimeout(() => playerEl.classList.remove('jump-anim'), 400);

    if (playerProgress >= FINISH_LINE) {
        endGame(true);
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < allQuestions.length) {
        loadQuestion();
    } else {
        endGame(true);
    }
}

function handleWrong(timedOut) {
    if (gameOver) return;
    sfx.wrong();
    lives = Math.max(0, lives - 1);
    renderLives();

    const failedObstacle = document.getElementById(`obstacle-${currentQuestionIndex}`);
    trackArea.classList.add('shake-anim');
    document.body.style.backgroundColor = '#ff4d4d';
    playerEl.classList.add('stumble-anim');
    if (failedObstacle) failedObstacle.classList.add('obstacle-shake');
    setTimeout(() => {
        trackArea.classList.remove('shake-anim');
        document.body.style.backgroundColor = '#5c94fc';
        playerEl.classList.remove('stumble-anim');
        if (failedObstacle) failedObstacle.classList.remove('obstacle-shake');
    }, 400);

    if (lives <= 0) {
        endGame(false, timedOut ? 'time' : 'lives');
        return;
    }

    if (currentQuestionIndex > 0) {
        currentQuestionIndex -= 1;
        restoreObstacle(currentQuestionIndex);
        playerProgress = currentQuestionIndex > 0 ? obstaclePositions[currentQuestionIndex - 1] : 0;
    } else {
        playerProgress = 0;
    }
    updatePosition(playerEl, playerProgress);

    inputLocked = true;
    setTimeout(() => {
        inputLocked = false;
        loadQuestion();
    }, 450);
}

// ===== Inimigo =====
function moveEnemy() {
    if (gameOver) return;
    enemyProgress += Math.floor(Math.random() * 2) + 1;
    updatePosition(enemyEl, enemyProgress);

    if (enemyProgress >= FINISH_LINE) {
        endGame(false, 'enemy');
    }
}

function updatePosition(element, percentage) {
    const pos = Math.min(percentage, FINISH_LINE);
    element.style.left = `calc(${pos}% + 8px)`;
}

// ===== Fim de jogo =====
function endGame(playerWon, reason) {
    if (gameOver) return;
    gameOver = true;
    inputLocked = true;
    clearTimeout(enemyTimer);
    clearInterval(enemyTimer);
    clearInterval(timerInterval);
    gameOverScreen.classList.remove('hidden');

    const titleEl = document.getElementById('gameOverTitle');
    const msgEl = document.getElementById('gameOverMsg');
    const scoreEl = document.getElementById('gameOverScore');

    if (playerWon) {
        sfx.win();
        titleEl.textContent = 'VOCÊ VENCEU!';
        titleEl.style.color = '#a8e6cf';
        msgEl.textContent = 'Você pulou todos os obstáculos e chegou ao castelo antes do Koopa!';
    } else {
        sfx.lose();
        titleEl.textContent = 'GAME OVER';
        titleEl.style.color = '#ff8b94';
        if (reason === 'lives') {
            msgEl.textContent = 'Você perdeu todas as vidas tentando superar os obstáculos.';
        } else if (reason === 'time') {
            msgEl.textContent = 'O tempo acabou e você não superou o obstáculo a tempo!';
        } else {
            msgEl.textContent = 'O Koopa chegou no castelo primeiro. Responda mais rápido da próxima vez!';
        }
    }
    scoreEl.textContent = `Moedas coletadas: ${score}`;
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const index = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 }[key];
    if (index === undefined) return;
    const btn = optionsContainer.querySelectorAll('button')[index];
    if (btn) btn.click();
});

startGame();
