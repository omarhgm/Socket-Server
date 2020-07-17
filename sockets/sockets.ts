import { Socket } from "socket.io";

export const desconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

export const message = (client: Socket, io: SocketIO.Server) => {
    client.on('message', (payload: { by: string, body: string }) => {
        console.log('Mensaje recibido', payload);
        io.emit('new-message', payload);
    });
}