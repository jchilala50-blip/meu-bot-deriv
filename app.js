const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Mantém o Render feliz criando um servidor web simples
app.get('/', (req, res) => res.send('Bot da Deriv Ativo!'));
app.listen(port, () => console.log(`Servidor na porta ${port}`));

const app_id = '1089';
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

ws.on('open', () => {
    console.log('Conectado à Deriv!');
    ​ws.send(JSON.stringify({ "authorize": process.env.DERIV_TOKEN }));
ws.on('message', (data) => {
    console.log('Resposta da Deriv:', JSON.parse(data));
});
