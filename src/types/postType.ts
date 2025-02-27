export interface CreatePosts {
    userid:number;
    file_path:string[];
    caption:string;
}

export interface GetPosts {
    postid:number;
    userid:number;
    file_path:string;
    caption:string;
}