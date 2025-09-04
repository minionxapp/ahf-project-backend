//Create Model Akademi-model.ts

import { Akademi } from '@prisma/client'
export type AkademiResponse = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
}

//CreateAkademiRequest
export type CreateAkademiRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
}

//UpdateAkademiRequest
export type UpdateAkademiRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
}

//SearchAkademiRequest
export type SearchAkademiRequest = {
    //id: string,
    kode: string,
    nama: string,
    aktive: string,
    page: number,
    size: number,
}

//toAkademiResponse
export function toAkademiResponse(akademi: Akademi): AkademiResponse {
    return {
        id: akademi.id,
        kode: akademi.kode,
        nama: akademi.nama,
        aktive: akademi.aktive,
    }
}
