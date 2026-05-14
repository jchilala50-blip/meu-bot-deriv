const WebSocket = require('ws');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Ativo'));
app.listen(process.env.PORT || 3000);

const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

ws.on('open', () => {
    console.log('Conectado! Autenticando...');
    ws.send(JSON.stringify({ authorize: process.env.DERIV_TOKEN }));
});

ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.msg_type === 'authorize') {
        if (msg.error) {
            console.log('Erro de Token:', msg.error.message);
        } else {
            console.log('Sucesso! Logado como:', msg.authorize.email);
            ws.send(JSON.stringify({ balance: 1, subscribe: 1 }));
        }
    }
    if (msg.msg_type === 'balance') {
        console.log('SALDO ATUAL:', msg.balance.balance);
    }
});
