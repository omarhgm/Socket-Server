export class User {
    public idUser: string;
    public name: string;
    public sala: string;

    constructor(idUser: string) {
        this.idUser = idUser;
        this.name = 'not-Name'
        this.sala = "not assigned";
    }
}