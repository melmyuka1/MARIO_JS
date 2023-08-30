
    document.querySelector('.deleteButton').addEventListener('click', function () {
        console.log('Botão de apagar clicado');

 
        const confirmation = confirm('Tem certeza de que deseja deletar sua conta?');
        
        if (confirmation) {
            
            console.log('Dados do usuário deletados com sucesso.');
            
           
            window.location.href = 'entrar.html';
        } else {
            console.log('Ação de deletar cancelada.');
        }
    });

