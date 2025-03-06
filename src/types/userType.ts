export interface User {
    userid: number;
    identifier:string;
    email:string;
    first_name: string;
    last_name: string;
    username:string;
    password:string;
    roles:string;
}

export interface CreateUser {
    email: string;
    first_name:string,
    last_name:string,
    username: string;
    password: string;
}