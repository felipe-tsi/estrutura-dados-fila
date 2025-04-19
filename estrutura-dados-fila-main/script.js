let fila = []; // Array que armazena os personagens na fila.

const botaoAdicionar = document.getElementById('adicionar-personagem'); // Botão para adicionar um personagem à fila.
const botaoAtender = document.getElementById('atender-personagem'); // Botão para atender um personagem da fila.
const containerFila = document.getElementById('fila'); // Elemento HTML que exibe a fila de personagens.
const personagemAtual = document.getElementById('personagem-atual'); // Elemento HTML que exibe o personagem atualmente atendido.
const som = document.getElementById('som'); // Elemento para tocar um som quando um personagem for atendido.

async function buscarPersonagemAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 826) + 1; // Gera um ID aleatório para buscar um personagem na API.
    const resposta = await fetch(`https://rickandmortyapi.com/api/character/${idAleatorio}`); // Faz a requisição à API do Rick and Morty.
    return await resposta.json(); // Retorna os dados do personagem como objeto JSON.
}

function renderizarFila() {
    containerFila.innerHTML = ''; // Limpa a visualização atual da fila.
    fila.forEach(personagem => { // Itera sobre os personagens na fila.
        const imagem = document.createElement('img'); // Cria um elemento de imagem para cada personagem.
        imagem.src = personagem.image; // Define a fonte da imagem.
        imagem.title = personagem.name; // Define o título da imagem como o nome do personagem.
        containerFila.appendChild(imagem); // Adiciona a imagem ao container da fila.
    });
}

function renderizarAtual(personagem) {
    personagemAtual.innerHTML = `
    <img src="${personagem.image}" alt="${personagem.name}" />
    <p><strong>${personagem.name}</strong></p>
    <p>Espécie: ${personagem.species}</p>
    <p>Status: ${personagem.status}</p>
  `; // Atualiza o HTML para exibir os dados do personagem atendido.
}

botaoAdicionar.addEventListener('click', async () => {
    const personagem = await buscarPersonagemAleatorio(); // Busca um personagem aleatório.
    fila.push(personagem); // Adiciona o personagem à fila.
    renderizarFila(); // Atualiza a exibição da fila.
});

botaoAtender.addEventListener('click', () => {
    if (fila.length === 0) { // Verifica se a fila está vazia.
        alert("Nenhum personagem na fila!"); // Mostra um alerta caso não haja personagens na fila.
        return;
    }
    const atendido = fila.shift(); // Remove o primeiro personagem da fila e o retorna.
    renderizarAtual(atendido); // Atualiza o personagem em atendimento.
    renderizarFila(); // Atualiza a exibição da fila.
    som.play(); // Toca o som indicando que um personagem foi atendido.
});
