//Create Model UserAkademi-model.ts

import { UserAkademi } from '@prisma/client'
export type UserAkademiResponse = {
    id: string,
    username: string,
    kode_akademi: string,
    aktive: string,
}

//CreateUserAkademiRequest
export type CreateUserAkademiRequest = {
    id: string,
    username: string,
    kode_akademi: string,
    aktive: string,
}

//UpdateUserAkademiRequest
export type UpdateUserAkademiRequest = {
    id: string,
    username: string,
    kode_akademi: string,
    aktive: string,
}

//SearchUserAkademiRequest
export type SearchUserAkademiRequest = {
    //id: string,
    username: string,
    kode_akademi: string,
    aktive: string,
    page: number,
    size: number,
}

//toUserAkademiResponse
export function toUserAkademiResponse(user_akademi: UserAkademi): UserAkademiResponse {
    return {
        id: user_akademi.id,
        username: user_akademi.username,
        kode_akademi: user_akademi.kode_akademi,
        aktive: user_akademi.aktive,
    }
}
