function inserir() {
    event.preventDefault();

    let dados = {
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),
    }
    fetch('http://localhost:8000/compras', {
        method:'POST',
        body: JSON.stringify(dados),
        headers: {
            'content-Type': 'application/json'
        }
    })
    .then(resposta => resposta.json())
    .then(resposta => atualizarLista())

    form_add.reset();
}

async function excluir(id) {
    let resposta = confirm('Gostaria de retirar o item?');

    if ( resposta !== true) {
        return;
    }

   await fetch('http://localhost:8000/compras/' +id, {
        method: 'DELETE'
    })
    atualizarLista();
}

function atualizarLista() {
    tabela_compras.innerHTML= ''
    fetch('http://localhost:8000/compras', {method: 'GET'})
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(lista) {
        lista.forEach(function(cadaItem){
            tabela_compras.innerHTML += ` 
            <tr>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.item}</td>
                <td>${cadaItem.quantidade}</td>
                <td>
                    <button class ="btn btn-warning">Editar</button>
                    <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">Excluir</button>
                </td>
            </tr>
            `
        })
    })
}

atualizarLista()