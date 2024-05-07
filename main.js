const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector('#form');
const botaoEnviar = document.querySelector('#enviar');

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("input", () => {
        verificarCampo(campo);
        verificarFormulario();
    });
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

const tipoDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'tooLong'
]

const mensagens = {
    nome:{
        valueMissing: "Campo de preenchimento obrigatório",
        tooShort: "O campo deve ter no mínimo 2 caracteres",
        tooLong: "O campo deve ter no máximo 50 caracteres"
    },
    email:{
        valueMissing: "Campo de preenchimento obrigatório",
        typeMismatch: "Preencha um e-mail válido, por favor",
    },
    assunto:{
        valueMissing: "Campo de preenchimento obrigatório",
        tooShort: "Campo deve ter no mínimo 5 caracteres",
        tooLong: "Campo deve ter no máximo 50 caracteres"
    },
    mensagem:{
        valueMissing: "Campo de preenchimento obrigatório",
        tooShort: "Campo deve ter no mínimo 15 caracteres",
        tooLong: "Campo deve ter no máximo 300 caracteres"
    }
}

function verificarCampo(campo){
    let avisos = "";
    tipoDeErro.forEach(erro => {
        if(campo.validity[erro]){
            avisos += mensagens[campo.name][erro]+ " ";
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.erro_mensagem');
    const validadorDeInput = campo.checkValidity();
    if(!validadorDeInput){
        mensagemErro.textContent = avisos;
    } else{
        mensagemErro.textContent = "";
    }
}

function verificarFormulario(){
    if(formulario.checkValidity()){
        botaoEnviar.removeAttribute("disabled");
    } else{
        botaoEnviar.setAttribute("disabled", "disabled");
    }
}

async function coletarDados(nome, email, assunto, mensagem){
    try{
    const dados = await fetch("http://localhost:3000/contatos", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem
        })
    });
    if(!dados.ok){
        throw new Error('Não foi possível enviar os dados')
    }
    const dadosConvertido = await dados.json();
    return {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem
    };
    }catch (erro){
        throw erro;
    }
}

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const assunto = document.querySelector('#assunto').value;
    const mensagem = document.querySelector('#mensagem').value;

    try{
        const resposta = await coletarDados(nome, email, assunto, mensagem);
        alert('Dados enviados com sucesso!', resposta);
        formulario.reset();
    }catch(erro){
        console.error('Erro ao enviar os dados:', erro);
        alert('Erro ao enviar os dados, por favor tente mais tarde!');
    }
})