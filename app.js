const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Servidor para manter o Render ativo
app.get('/', (req, res) => res.send('Bot da Deriv Online e Seguro!'));
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

const app_id = '1089'; 
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

ws.on('open', () => {
    console.log('Conectado à Deriv! Tentando autenticar...');
    // Puxa o token da variável que você criou no Render
    const token = process.env.DERIV_TOKEN; 
    ws.send(JSON.stringify({ "authorize": token }));
});

ws.on('message', (data) => {
    const response = JSON.parse(data);
    
    // Verifica se a autorização deu certo
    if (response.msg_type === 'authorize') {
        if (response.error) {
            console.log('Erro na autorização:', response.error.message);
        } else {
            console.log('Autenticado com sucesso para o usuário:', response.authorize.email);
            // Agora que está logado, pede o saldo
            ws.send(JSON.stringify({ "balance": 1, "subscribe": 1 }));
        }
    }

    // Mostra o saldo quando ele chegar
    if (response.msg_type === 'balance') {
        console.log('SALDO ATUAL:', response.balance.currency, response.balance.balance);
    }
});
