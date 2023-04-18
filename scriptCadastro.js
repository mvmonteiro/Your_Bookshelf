var cep = document.getElementById('cep');

async function buscaEndereco(cep) {
    try {
        var mensagemErro = document.getElementById('erro');
        mensagemErro.innerHTML = "";

        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var traduzCEP = await consultaCEP.json();
        if (traduzCEP.erro) {
            throw Error('CEP não existente!');
        }

        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = traduzCEP.localidade;
        logradouro.value = traduzCEP.logradouro;
        estado.value = traduzCEP.uf;
        bairro.value = traduzCEP.bairro;

        console.log(traduzCEP);
        return traduzCEP;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`
        console.log(erro);
    }
}

cep.addEventListener("focusout", () => buscaEndereco(cep.value));