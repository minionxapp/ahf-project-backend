//Create Model UserAkademi-model.ts

import { UserAkademi } from '@prisma/client'
export type UserAkademiResponse = {
    id: number,
    username: string,
    kode_akademi: string,
}

//CreateUserAkademiRequest
export type CreateUserAkademiRequest = {
    id: number,
    username: string,
    kode_akademi: string,
}

//UpdateUserAkademiRequest
export type UpdateUserAkademiRequest = {
    id: number,
    username: string,
    kode_akademi: string,
}

//SearchUserAkademiRequest
export type SearchUserAkademiRequest = {
    //id: number,
    username: string,
    kode_akademi: string,
    page: number,
    size: number,
}

//toUserAkademiResponse
export function toUserAkademiResponse(user_akademi: UserAkademi): UserAkademiResponse {
    return {
        id: user_akademi.id,
        username: user_akademi.username,
        kode_akademi: user_akademi.kode_akademi,
    }
}

