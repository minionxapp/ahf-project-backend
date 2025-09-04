import { User } from "@prisma/client"
export type UserResponse = {
    username: string;
    name: string;
    token?: string | null;
    status?: string | null,
    email?: string | null,
    group?: string | null,
    expired?: Date | null,
    kode_divisi?: string | null,
    nama_divisi?: string | null,
    kode_dept?: string | null,
    nama_dept?: string | null,

}

export type CreateUserRequest = {
    username: string;
    name: string;
    password: string;
    token?: string | null,
    status?: string | null,
    email?: string | null,
    group?: string | null,
    expired?: Date | null,
    kode_divisi?: string | null,
    nama_divisi?: string | null,
    kode_dept?: string | null,
    nama_dept?: string | null,




}

export type LoginUserRequest = {
    username: string;
    password: string;
}

export type UpdateUserRequest = {
    name: string;
    password?: string;
    username: string;
    token?: string | null;
    status?: string | null;
    email?: string | null;
    group?: string | null;
    expired?: Date | null;
    kode_divisi?: string | null,
    nama_divisi?: string | null,
    kode_dept?: string | null,
    nama_dept?: string | null,
}

//unutk data responsenya 
//unutk konversi dari user prisma menjadi user response
export function toUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        username: user.username,
        //         id: user.id,
        // username:user.username,
        // password:user.password,
        // name:user.name,
        token: user.token,
        status: user.status,
        email: user.email,
        group: user.group,
        expired: user.expired,
        kode_divisi: user.kode_divisi,
        nama_divisi: user.nama_divisi,
        kode_dept: user.kode_dept,
        nama_dept: user.nama_dept
    }

}




//SearchUserRequest
export type SearchUserRequest = {
    //id: number,
    username: string,
    password: string,
    name: string,
    token?: string | null,
    status?: string | null,
    email?: string | null,
    group?: string | null,
    kode_divisi?: string | null,
    nama_divisi?: string | null,
    kode_dept?: string | null,
    nama_dept?: string | null,
    page: number,
    size: number,
}