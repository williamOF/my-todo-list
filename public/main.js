// Captura de elementos
const btSalvar = document.querySelector('#form button[type=submit]');
const inputTexto = document.getElementById("texto");
const lista = document.getElementById("task-list");

// Definições iniciais
const urlBase = '/api';
const chaveLocal = 'boxtarefas';
let tarefas = [];

const getTarefas = async () => {
    // Disparando uma requisição para carregar para obter uma resposta
    let resposta = await fetch(`${urlBase}/tarefas`);

    // Extraindo o conteúdo JSON da resposta
    tarefas = await resposta.json();

    // Retornando o array de tarefas;
    return tarefas;
}

const addNovaTarefa = async (texto) => {

    // 0 - Disparando uma req post para o endereço de criação de tarefas
    let opcoes = {
        method: "POST",
        body: JSON.stringify({texto}),
        headers: {
            'Content-Type':'application/json'
        }
    }
    let resposta = await fetch(`${urlBase}/tarefas`, opcoes);

    // 1 - Extrair da resposta a tarefa que foi criada no servidor 
    let tarefa = await resposta.json();

    // 2 - Adicionar esse objeto no array de tarefas;
    tarefas.push(tarefa);

    // 3 - salvar o array de tarefas no localStorage!
    localStorage.setItem(chaveLocal, JSON.stringify(tarefas));

    // 4 - Retornar a tarefa criada
    return tarefa;

}

const removerTarefa = async (id) =>{

    // Disparar uma requisição para urlBase/tarefas/{id} do tipo delete
    let opcoes = {
        method: "DELETE"
    }
    let resposta = await fetch(`${urlBase}/tarefas/${id}`, opcoes);

    // Verificando se resposta é de sucesso(tarefa foi removida)
    if(resposta.status == 200) {

        // Localiza no array de tarefas aquela que tem o id a ser removido
        let pos = tarefas.findIndex(t => t.id == id);
    
        // Remove a tarefa da posição encontrada
        tarefas.splice(pos, 1);
    
        // Guardando no localStorage o array de tarefas sem a tarefa de id
        localStorage.setItem(chaveLocal, JSON.stringify(tarefas));
    
        // Remover a tarefa da DOM.
        let liDaTarefa = document.getElementById(`li_${id}`);
        liDaTarefa.remove();
    }

}

const alterarTarefa = async (id) => {
    // Disparar uma requisição para endereço urlBase/tarefas/{id}/[feita|desfeita]

    // Encontra a tarefa que tenha o id procurado
    let tarefa = tarefas.find(t => t.id == id);

    // IF ternário para decidir a url para onde enviar a req
    let url = tarefa.feita ? `${urlBase}/tarefas/${id}/desfeita` : `${urlBase}/tarefas/${id}/feita`;

    // Disparar a requisição e capturar a resposta
    let opcoes = {
        method: "PATCH"
    }
    let resposta = await fetch(url, opcoes);

    if(resposta.status == 200) {
        // Altera o status dessa tarefa
        tarefa.feita = !tarefa.feita;
    
        // Salvo o array de tarefas no localStorage
        localStorage.setItem(chaveLocal, JSON.stringify(tarefas));
    }
}

const showTarefa = (tarefa) => {

    // 4.1 Criar o novo li
    let li = document.createElement('li');
    li.setAttribute('id',`li_${tarefa.id}`);

    let checked = tarefa.feita ? 'checked' : '';

    // 4.2 Adicionar o conteúdo do li
    li.innerHTML = `
        <input type="checkbox" ${checked} id="check_${tarefa.id}" onclick="alterarTarefa(${tarefa.id})">
        <label for="check_${tarefa.id}">${tarefa.texto}</label>
        <i class="material-icons" onclick="removerTarefa(${tarefa.id})">delete</i>
    `

    // 4.3 Adicionar esse novo li na lista
    lista.appendChild(li);
}

const onBtSalvarClick = async (evento) => {

    evento.preventDefault();
    
    let texto = inputTexto.value;

    let tarefa = await addNovaTarefa(texto);

    showTarefa(tarefa);

    inputTexto.value = "";
    
}

const onWindowLoad = async (evento) => {

    // Carregando tarefas do servidor
    let tarefas = await getTarefas();

    // Carregar as tarefas do local storage caso haja...
    // tarefas = JSON.parse(localStorage.getItem(chaveLocal));
    // if(tarefas === null) {
    //     tarefas = [];
    //     localStorage.setItem(chaveLocal, '[]');
    // }

    // Mostrar as tarefas carregadas...
    for (const t of tarefas) {
        showTarefa(t);
    }

    // Dando foco ao campo de texto
    inputTexto.focus();
}

// Conexão do evento à função (event handler)
btSalvar.addEventListener('click', onBtSalvarClick)
window.addEventListener('load', onWindowLoad)

/**
 * Questões de Usabilidade:
 * 1 - O campo já deve iniciar com foco
 * 2 - Limpar o campo sempre que uma tarefa nova seja adicionada
 * 
 * Questões de funcionalidade
 * 
 * 1 - Marcar tarefa como feita
 * 2 - Remover uma tarefa
 * 
 * Cada tarefa deve ter um id (identificador único para a tarefa)
 * 
 *  */ 


