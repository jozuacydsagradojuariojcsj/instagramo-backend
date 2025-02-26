export interface User {
    userid: number;
    identifier:string;
    email:string;
    username:string;
    password:string;
    roles:string;
}

export interface CreateUser {
    email: string;
    username: string;
    password: string;
}