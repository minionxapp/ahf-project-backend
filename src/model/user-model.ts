import { User } from "@prisma/client"
export type UserResponse = {
    username: string;
    name: string;
    token?: string | null;
    status?: string | null,
    email?: string | null,
    group?: string | null,
    expired?: Date | null,

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
    page: number,
    size: number,
}