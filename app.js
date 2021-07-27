let lista = (sessionStorage.getItem('lista')===null) ? [] : JSON.parse(sessionStorage.getItem('lista'));

function salvar () {
    const obj = {};
    obj.id = document.querySelector('input[name=id]').value;
    obj.nome = document.querySelector('input[name=nome]').value;
    obj.preco = document.querySelector('input[name=preco]').value;

    if (obj.nome === '' || obj.preco === '') {
        return alert('Prencha os campos corretamente!');
    }

    if (obj.id==='') {
        obj.id = parseInt(lista[lista.length-1].id)  + 1;
    }

    lista.push(obj);

    sessionStorage.setItem('lista', JSON.stringify(lista));
    mountList ();

    document.querySelector('input[name=id]').value = '';
    document.querySelector('input[name=nome]').value = '';
    document.querySelector('input[name=preco]').value = '';
}

function mountList () {
    const ul = document.querySelector('ul');
    let string = '';
    
    lista.forEach(e => {
        string += `
            <li>
                ${e.id} - ${e.nome} - ${e.preco}
                <button onclick="remove(${e.id})">Remover</button>
            </li>
        `;
    });
    ul.innerHTML = string;
}
mountList ();

function remove(id) {
    let temp = [];
    lista.forEach(e => {
        if (e.id !== id) {
            temp.push(e);
        }
    });

    lista = temp;

    sessionStorage.setItem('lista', JSON.stringify(lista));
    mountList ();
}