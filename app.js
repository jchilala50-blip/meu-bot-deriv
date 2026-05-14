const WebSocket = require('ws');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Operacional'));
app.listen(process.env.PORT || 3000);

const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

ws.on('open', () => {
    console.log('CONECTADO! Validando o seu token...');
    ws.send(JSON.stringify({ authorize: process.env.DERIV_TOKEN }));
});

ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.msg_type === 'authorize') {
        if (msg.error) {
            console.log('ERRO DE TOKEN:', msg.error.message);
        } else {
            console.log('LOGIN ACEITO! Bem-vindo:', msg.authorize.email);
            ws.send(JSON.stringify({ balance: 1, subscribe: 1 }));
        }
    }
    if (msg.msg_type === 'balance') {
        console.log('O SEU SALDO É:', msg.balance.balance);
    }
});
