let formulario = document.getElementById('form');
let nome = document.getElementById('nome');
let email = document.getElementById('email');
let assunto = document.getElementById('assunto');
let mensagem = document.getElementById('mensagem');

let nomeErro = document.querySelector('.erro_nome');
let emailErro = document.querySelector('.erro_email');
let assuntoErro = document.querySelector('.erro_assunto');
let mensagemErro = document.querySelector('.erro_mensagem');

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

formulario.addEventListener('submit', function(event){
    if( nome.value === '' || nome.value.length > 50 || email.value === '' || assunto.value === '' || assunto.value.length > 50 || mensagem.value === '' || mensagem.value.length > 300){
        event.preventDefault();
        if(nome.value === '' || nome.value.length >50){
            nomeErro.classList.remove('erro-hidden');
        } else{
            nomeErro.classList.add('erro-hidden');
        } 
        if(email.value === ''){
            emailErro.classList.remove('erro-hidden');
        } else{
            emailErro.classList.add('erro-hidden');
        }
        if(assunto.value === '' || assunto.value.length >50){
            assuntoErro.classList.remove('erro-hidden');
        } else{
            assuntoErro.classList.add('erro-hidden');
        }
        if(mensagem.value === '' || mensagem.value.length > 300){
            mensagemErro.classList.remove('erro-hidden');
        } else{
            mensagemErro.classList.add('erro-hidden');
        }
    }else{
        if(!emailRegex.test(email.value)){
            event.preventDefault();
            emailErro.classList.remove('erro-hidden');
        }else{
             fetch('URL_DO_SERVIDOR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            assunto: assunto.value,
            mensagem: mensagem.value,
        }),
    })
    .then(response => {
        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
        } else{
            alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
        }
    })
    .catch(error =>{
         console.error('Erro ao enviar a mensagem:', error);
    })
    }
}
})
