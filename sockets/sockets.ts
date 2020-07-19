import { Socket } from "socket.io";
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const usersOnline = new UserList();

export const desconnect = (client: Socket, io: SocketIO.Server) => {
    client.on('disconnect', () => {
        usersOnline.deleteUser(client.id);
        console.log('Cliente desconectado');
        console.log(usersOnline.getList());
        io.emit("online-users", usersOnline.getList());
    });
}

export const connectClient = (client: Socket, io: SocketIO.Server) => {
    const user = new User(client.id);
    usersOnline.addUser(user);
}

export const message = (client: Socket, io: SocketIO.Server) => {
    client.on('message', (payload: { by: string, body: string }) => {
        console.log('Mensaje recibido', payload);
        io.emit('new-message', payload);
    });
}

export const userConfig = (client: Socket, io: SocketIO.Server) => {
    client.on('user-config', (payload: { name: string }, callback: Function) => {
        console.log('Se conecto el usurio:', payload.name);
        usersOnline.updateName(client.id, payload.name);
        io.emit("online-users", usersOnline.getList());
        callback({
            ok: true,
            message: `Usuario ${payload.name}, configurado`
        });
    })
}

export const getUsers = (client: Socket, io: SocketIO.Server) => {
    client.on("get-users", () => {
		// console.log("Mensaje recibido", payload);
		io.to(client.id).emit("online-users", usersOnline.getList());
	});
}