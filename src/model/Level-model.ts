//Create Model Level-model.ts

import { Level } from '@prisma/client'
export type LevelResponse = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    urutan: number,
}

//CreateLevelRequest
export type CreateLevelRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    urutan: number,
}

//UpdateLevelRequest
export type UpdateLevelRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    urutan: number,
}

//SearchLevelRequest
export type SearchLevelRequest = {
    //id: string,
    kode: string,
    nama: string,
    aktive: string,
    page: number,
    size: number,
}

//toLevelResponse
export function toLevelResponse(level: Level): LevelResponse {
    return {
        id: level.id,
        kode: level.kode,
        nama: level.nama,
        aktive: level.aktive,
        urutan: level.urutan,
    }
}