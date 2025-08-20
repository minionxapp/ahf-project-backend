//Create Model Pmakai-model.ts

import { Pmakai } from '@prisma/client'
export type PmakaiResponse = {
    id: number,
    username: string,
    // password: string,
    name: string,
    token?: string | null,
    status?: string | null,
    email?: string | null,
    group?: string | null,
    expired?: Date | null,
}

//CreatePmakaiRequest
export type CreatePmakaiRequest = {
    id: number,
    username: string,
    password: string,
    name: string,
    token?: string | null,
    status?: string | null,
    email?: string | null,
    group?: string | null,
    expired?: Date | null,
}

//UpdatePmakaiRequest
export type UpdatePmakaiRequest = {
    id: number,
    username: string,
    // password: string,
    name: string,
    token?: string | null,
    status?: string | null,
    email?: string | null,
    group?: string | null,
    expired?: Date | null,
}

//SearchPmakaiRequest
export type SearchPmakaiRequest = {
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

//toPmakaiResponse
export function toPmakaiResponse(pmakai: Pmakai): PmakaiResponse {
    return {
        id: pmakai.id,
        username: pmakai.username,
        // password: pmakai.password,
        name: pmakai.name,
        token: pmakai.token,
        status: pmakai.status,
        email: pmakai.email,
        group: pmakai.group,
        expired: pmakai.expired,
    }
}
