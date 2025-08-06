//--------------------------------------------Botão Menu------------------------------------//


const toggleButton = document.querySelector('.menu');
const navLinks = document.querySelector('.links');

toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    navLinks.classList.toggle('active');
});

//--------------------------------------Aparecer Conteúdo-------------------------------------//


const mainListItems = document.querySelectorAll('main li');
const delay = 0.7;

mainListItems.forEach((item, index) => {
    const animationDelay = (index + 1) * delay;
    item.style.animationDelay = `${animationDelay}s`;
});


//---------------------------Jogo Pagina Principal------------------------------------------//


const tela = document.getElementById('telaJogo');
const contexto = tela.getContext('2d');
const exibicaoPontuacao = document.getElementById('pontuacao');
const mensagemInicio = document.getElementById('mensagem-inicio');

const tamanhoGrid = 20;
let cobra = [{ x: 10, y: 10 }];
let comida = {};
let direcao = { x: 0, y: 0 };
let pontuacao = 0;
let intervaloJogo;
let jogoRodando = false;

function gerarComida() {
    comida = {
        x: Math.floor(Math.random() * (tela.width / tamanhoGrid)),
        y: Math.floor(Math.random() * (tela.height / tamanhoGrid))
    };
}

function desenharComida() {
    const comidaX = comida.x * tamanhoGrid;
    const comidaY = comida.y * tamanhoGrid;

    contexto.fillStyle = 'red';
    contexto.beginPath();
    contexto.arc(comidaX + tamanhoGrid / 2, comidaY + tamanhoGrid / 2, tamanhoGrid / 2 - 2, 0, Math.PI * 2);
    contexto.fill();
    contexto.fillStyle = 'darkgreen';
    contexto.fillRect(comidaX + tamanhoGrid / 4, comidaY - tamanhoGrid / 8, tamanhoGrid / 4, tamanhoGrid / 4);
}

function desenharSegmentoCobra(segmento, indice) {
    const x = segmento.x * tamanhoGrid;
    const y = segmento.y * tamanhoGrid;
    const raioBorda = 5;
    let gradiente = contexto.createLinearGradient(x, y, x + tamanhoGrid, y + tamanhoGrid);
    if (indice === 0) {
        gradiente.addColorStop(0, '#90ee90');
        gradiente.addColorStop(1, '#567d46');
    } else {
        gradiente.addColorStop(0, '#a2d2a2');
        gradiente.addColorStop(1, '#8fbc8f');
    }
    contexto.fillStyle = gradiente;
    contexto.beginPath();
    contexto.moveTo(x + raioBorda, y);
    contexto.lineTo(x + tamanhoGrid - raioBorda, y);
    contexto.quadraticCurveTo(x + tamanhoGrid, y, x + tamanhoGrid, y + raioBorda);
    contexto.lineTo(x + tamanhoGrid, y + tamanhoGrid - raioBorda);
    contexto.quadraticCurveTo(x + tamanhoGrid, y + tamanhoGrid, x + tamanhoGrid - raioBorda, y + tamanhoGrid);
    contexto.lineTo(x + raioBorda, y + tamanhoGrid);
    contexto.quadraticCurveTo(x, y + tamanhoGrid, x, y + tamanhoGrid - raioBorda);
    contexto.lineTo(x, y + raioBorda);
    contexto.quadraticCurveTo(x, y, x + raioBorda, y);
    contexto.closePath();
    contexto.fill();
}

function desenhar() {
    contexto.fillStyle = '#1a332a';
    contexto.fillRect(0, 0, tela.width, tela.height);
    desenharComida();
    cobra.forEach((segmento, indice) => desenharSegmentoCobra(segmento, indice));
    exibicaoPontuacao.textContent = `Pontos: ${pontuacao}`;
}

function atualizar() {
    if (!jogoRodando) return;

    const cabeca = { x: cobra[0].x + direcao.x, y: cobra[0].y + direcao.y };
    cobra.unshift(cabeca);

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        pontuacao++;
        gerarComida();
    } else {
        cobra.pop();
    }

    if (cabeca.x < 0 || cabeca.x >= tela.width / tamanhoGrid || cabeca.y < 0 || cabeca.y >= tela.height / tamanhoGrid) {
        terminarJogo();
    }

    for (let i = 1; i < cobra.length; i++) {
        if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) {
            terminarJogo();
        }
    }
    desenhar();
}

function iniciarJogo() {
    if (jogoRodando) return;
    jogoRodando = true;
    mensagemInicio.style.display = 'none';
    reiniciarJogo();
    intervaloJogo = setInterval(atualizar, 100);
}

function terminarJogo() {
    jogoRodando = false;
    clearInterval(intervaloJogo);
    alert(`Fim de Jogo! Sua pontuação: ${pontuacao}`);
    mensagemInicio.textContent = 'Clique para Reiniciar!';
    mensagemInicio.style.display = 'block';
}

function reiniciarJogo() {
    cobra = [{ x: 10, y: 10 }];
    direcao = { x: 0, y: 0 };
    pontuacao = 0;
    gerarComida();
    desenhar();
}

document.addEventListener('keydown', evento => {
    if (jogoRodando) {
        if (evento.key === 'ArrowUp' && direcao.y === 0) direcao = { x: 0, y: -1 };
        if (evento.key === 'ArrowDown' && direcao.y === 0) direcao = { x: 0, y: 1 };
        if (evento.key === 'ArrowLeft' && direcao.x === 0) direcao = { x: -1, y: 0 };
        if (evento.key === 'ArrowRight' && direcao.x === 0) direcao = { x: 1, y: 0 };
    }
});

document.querySelector('.container-jogo').addEventListener('click', iniciarJogo);

gerarComida();
desenhar();

//---------------------------Parte do Nome------------------------------------------//

function animarNome() {
    const letras = document.querySelectorAll('.letra');
    const atrasoEntreLetras = 100;
    const duracaoAparecimentoLetra = 600;
    let tempoTotalAparecimentoLetras = 0;

    letras.forEach((letra, indice) => {
        const atraso = indice * atrasoEntreLetras;
        letra.style.animationDelay = `${atraso}ms`;
        letra.classList.add('aparecer');
        tempoTotalAparecimentoLetras = atraso + duracaoAparecimentoLetra;
    });

    setTimeout(() => {
        letras.forEach(letra => {
            letra.classList.remove('aparecer');
            letra.classList.add('desaparecer');
        });
    }, tempoTotalAparecimentoLetras + 1000);
}

window.onload = animarNome;
