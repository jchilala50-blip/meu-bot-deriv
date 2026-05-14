const WebSocket = require('ws');

const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

ws.on('open', () => {

  console.log("Conectado à Deriv!");

  console.log(process.env.DERIV_TOKEN);

  ws.send(JSON.stringify({
    authorize: process.env.DERIV_TOKEN
  }));

});

ws.on('message', (data) => {
  console.log("Resposta da Deriv:", data.toString());
});
