const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));
app.use(express.json()); 

app.get('/', (req, res) => {
    fs.readFile('entrar.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao carregar o arquivo entrar.html');
        } else {
            res.send(data);
        }
    });
});


app.post('/add', (req, res) => {
    const jogador = req.body;

    
    console.log('Dados do jogador recebidos:', jogador);

    
    res.redirect('/mario');
});

app.get('/mario', (req, res) => {
    fs.readFile('mario.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao carregar o arquivo mario.html');
        } else {
            res.send(data);
        }
    });
});




app.post('/add', (req, res) => {
    const { nome, score } = req.body;

    fs.readFile('user.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo users.json');
            return;
        }

        const users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.nome === nome);

        if (userIndex !== -1) {
            if (score > users[userIndex].score) {
                users[userIndex].score = score;
            }
        } else {
            users.push({ nome, score });
        }

        fs.writeFile('user.json', JSON.stringify(users), err => {
            if (err) {
                res.status(500).send('Erro ao escrever no arquivo users.json');
            } else {
                console.log(`Score atualizado para o usuário ${nome}. Novo score: ${score}`);
                res.status(200).send('Score atualizado com sucesso');
            }
        });
    });
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});