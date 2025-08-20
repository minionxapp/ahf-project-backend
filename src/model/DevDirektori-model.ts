//Create Model DevDirektori-model.ts

import { DevDirektori } from '@prisma/client'
export type DevDirektoriResponse = {
    id: number,
    username: string,
    frontend?: string | null,
    backend?: string | null,
}

//CreateDevDirektoriRequest
export type CreateDevDirektoriRequest = {
    id: number,
    username: string,
    frontend?: string | null,
    backend?: string | null,
}

//UpdateDevDirektoriRequest
export type UpdateDevDirektoriRequest = {
    id: number,
    username: string,
    frontend?: string | null,
    backend?: string | null,
}

//SearchDevDirektoriRequest
export type SearchDevDirektoriRequest = {
    //id: number,
    username: string,
    frontend?: string | null,
    backend?: string | null,
    page: number,
    size: number,
}

//toDevDirektoriResponse
export function toDevDirektoriResponse(dev_direktori: DevDirektori): DevDirektoriResponse {
    return {
        id: dev_direktori.id,
        username: dev_direktori.username,
        frontend: dev_direktori.frontend,
        backend: dev_direktori.backend,
    }
}


