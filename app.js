const WebSocket = require('ws');
const app_id = '1089'; // Este é o ID de teste da Deriv. Depois você pode trocar pelo seu.
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

ws.on('open', function open() {
    console.log('Conexão estabelecida com a Deriv!');
    // Autenticação básica ou pedido de saldo
    ws.send(JSON.stringify({ "balance": 1, "subscribe": 1 }));
});

ws.on('message', function incoming(data) {
    console.log('Dados recebidos da Deriv:', JSON.parse(data));
});
