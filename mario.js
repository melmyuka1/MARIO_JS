//constantes
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const musicaprincipal = document.getElementById('musicaprincipal');
const arvore = document.querySelector('.arvore1');
const montanha = document.querySelector('.montanha');
let score = 0;
let gameEnded = false;
let passedPipe = false;
const morteMarioAudio = document.getElementById('mortemario');
const scoreElement = document.querySelector('.score');
const btnprosseguir = document.getElementById ("btnProsseguir");
let nome;


document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    nome = params.get("nome");
});
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const nome = params.get("nome");

  
    const playerNameElement = document.getElementById("playerName");
    playerNameElement.textContent = `Nome: ${nome}`;

   


   //toca musica      
const stopMusic = () => {
    musicaprincipal.pause(); 
    musicaprincipal.currentTime = 0; 
};
//faz o jogo funcionar
    
const jump = () => {
    if (gameEnded) {
        return; 
    }

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

    const marioposition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (!passedPipe && marioposition < 80) {
        passedPipe = true;
    }
};

const loop = setInterval(() => {
    if (gameEnded) {
        return; 
    }
//faz o cenario interativo
    const pipeposition = pipe.offsetLeft;
    const marioposition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsposition = +window.getComputedStyle(clouds).right.replace('px', '');
    const arvoreposition = +window.getComputedStyle(arvore).right.replace('px', '');
    const montanhaposition = +window.getComputedStyle(montanha).right.replace('px', '');

    if (pipeposition <= 120 && marioposition < 80 && pipeposition > 0) {
        passedPipe = true;
    }

    if (passedPipe && pipeposition <= 120 && marioposition >= 80 && pipeposition > 0) {
        score++;
        console.log('Score:', score);
        scoreElement.textContent = `Score: ${score}`;
        passedPipe = false;
    }
    localStorage.setItem("score", score);

    if (pipeposition <= 120 && marioposition < 80 && pipeposition > 0) {
        stopMusic(); 
        morteMarioAudio.play();
        pipe.style.animation = 'none';
        pipe.style.left = `${pipeposition}px`;

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsposition}px`;

        montanha.style.animation = 'none';
        montanha.style.right = `${montanhaposition}px`;

        arvore.style.animation = 'none';
        arvore.style.right = `${arvoreposition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioposition}px`;
        mario.src = "img/game-over.png";
        mario.style.width = '71px';
        mario.style.left = '50px';
        clearInterval(loop); 
        gameEnded = true; 
        const perdeuPlayboy = document.getElementById('perdeuplayboy'); 
        perdeuPlayboy.style.display = 'block'; 
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
    }
}, 10);

document.addEventListener('keydown', jump);
//acaba a musica
musicaprincipal.play();
musicaprincipal.addEventListener('ended', () => {
    musicaprincipal.currentTime = 0; 
});

//regarrega a pagina
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        
        window.location.reload();
    }
});

});
function redirectToEditPage1() {
    
    window.location.href = `crud.html?nome=${encodeURIComponent(nome)}&score=${score}`;
}
