"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
wss.on('connection', function connection(ws) {
    console.log('client connect');
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        let dataString = data.toString();
        // Primero parseamos la cadena de texto a un objeto
        let receivedData;
        try {
            receivedData = JSON.parse(dataString);
        }
        catch (error) {
            console.error('Error al parsear el mensaje recibido:', error);
            return;
        }
        const payload = JSON.stringify({
            type: 'coordenadas',
            payload: receivedData
        });
        console.log(payload, typeof (payload), "?");
        // A todos excluyente
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(payload, { binary: false });
            }
        });
    });
    // ws.send('Hola desde el servidor');
    ws.on('close', () => {
        console.log('cliente disconect');
    });
});
console.log('http://localhost:3000');
