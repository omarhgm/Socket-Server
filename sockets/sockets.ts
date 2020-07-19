import { Socket } from "socket.io";
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const usersOnline = new UserList();

export const desconnect = (client: Socket) => {
    client.on('disconnect', () => {
        usersOnline.deleteUser(client.id);
        console.log('Cliente desconectado');
    });
}

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    usersOnline.addUser(user);
}

export const message = (client: Socket, io: SocketIO.Server) => {
    client.on('message', (payload: { by: string, body: string }) => {
        console.log('Mensaje recibido', payload);
        io.emit('new-message', payload);
    });
}

export const userConfig = (client: Socket) => {
    client.on('user-config', (payload: { name: string }, callback: Function) => {
        console.log('Se conecto el usurio:', payload.name);
        usersOnline.updateName(client.id, payload.name);
        callback({
            ok: true,
            message: `Usuario ${payload.name}, configurado`
        });
    })
}

export const privateMessage = (client: Socket, io: SocketIO.Server) => {
    client.on("message", (payload: { by: string; body: string }) => {
		console.log("Mensaje recibido", payload);
		io.emit("private-message", payload);
	});
}