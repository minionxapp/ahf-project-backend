//Create Model TipeTraining-model.ts

import { TipeTraining } from '@prisma/client'
export type TipeTrainingResponse = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    urutan: number,
}

//CreateTipeTrainingRequest
export type CreateTipeTrainingRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    urutan: number,
}

//UpdateTipeTrainingRequest
export type UpdateTipeTrainingRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    urutan: number,
}

//SearchTipeTrainingRequest
export type SearchTipeTrainingRequest = {
    //id: string,
    kode: string,
    nama: string,
    aktive: string,
    page: number,
    size: number,
}

//toTipeTrainingResponse
export function toTipeTrainingResponse(tipe_training: TipeTraining): TipeTrainingResponse {
    return {
        id: tipe_training.id,
        kode: tipe_training.kode,
        nama: tipe_training.nama,
        aktive: tipe_training.aktive,
        urutan: tipe_training.urutan,
    }
}
