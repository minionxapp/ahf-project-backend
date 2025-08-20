
//Create Model KompetensiLevel-model.ts

import { KompetensiLevel } from '@prisma/client'
export type KompetensiLevelResponse = {
    id: number,
    kode: string,
    nama: string,
    status: string,
}

//CreateKompetensiLevelRequest
export type CreateKompetensiLevelRequest = {
    id: number,
    kode: string,
    nama: string,
    status: string,
}

//UpdateKompetensiLevelRequest
export type UpdateKompetensiLevelRequest = {
    id: number,
    kode: string,
    nama: string,
    status: string,
}

//SearchKompetensiLevelRequest
export type SearchKompetensiLevelRequest = {
    //id: number,
    kode: string,
    nama: string,
    status: string,
    page: number,
    size: number,
}

//toKompetensiLevelResponse
export function toKompetensiLevelResponse(kompetensi_level: KompetensiLevel): KompetensiLevelResponse {
    return {
        id: kompetensi_level.id,
        kode: kompetensi_level.kode,
        nama: kompetensi_level.nama,
        status: kompetensi_level.status,
    }
}

