import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from "socket.io";
import http from 'http'
import * as socket from '../sockets/sockets'
export default class Server {
    private static _intance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.SocketListener();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private SocketListener() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', client => {
            console.log('Cliente conectado');
            
            // Mensajes
            socket.message(client, this.io);

            // Desconectar
            socket.desconnect(client);
        });
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }
}