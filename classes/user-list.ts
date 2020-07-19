import { User } from './user';
export class UserList {
    private list: User[] = [];

    constructor() {

    }

    addUser(user: User): User {
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    updateName(idUser: string, newName: string): void {
        for (let user of this.list) {
            if (user.idUser === idUser) {
                user.name = newName;
                break;
            }
        }

        console.log('Actualizando usuario', this.list);

    }

    getList(): User[] {
        return this.list.filter( (user: User) => user.name !== 'not-Name');
    }

    getUser(idUser: string): User | undefined {
        return this.list.find( (user: User) => user.idUser === idUser);
    }

    getUserbySala(sala: string): User[] {
        return this.list.filter( (user: User) => user.sala === sala);
    }

    deleteUser(idUser: string): void {
        const tempUser = this.getUser(idUser);
        console.log(`Se esta borrando el usuario: ${tempUser?.name} de la lista`);

        this.list.forEach((user, index) => {
            if (user.idUser === idUser) this.list.splice(index, 1);
        } )
    }
}