//Create Model StatusTraining-model.ts

import { StatusTraining } from '@prisma/client'
export type StatusTrainingResponse = {
    id: number,
    kode: string,
    nama: string,
    aktive: string,
    desc?: string | null,
    urutan: number,
}

//CreateStatusTrainingRequest
export type CreateStatusTrainingRequest = {
    id: number,
    kode: string,
    nama: string,
    aktive: string,
    desc?: string | null,
    urutan: number,
}

//UpdateStatusTrainingRequest
export type UpdateStatusTrainingRequest = {
    id: number,
    kode: string,
    nama: string,
    aktive: string,
    desc?: string | null,
    urutan: number,
}

//SearchStatusTrainingRequest
export type SearchStatusTrainingRequest = {
    //id: number,
    kode: string,
    nama: string,
    aktive: string,
    desc?: string | null,
    page: number,
    size: number,
}

//toStatusTrainingResponse
export function toStatusTrainingResponse(status_training: StatusTraining): StatusTrainingResponse {
    return {
        id: status_training.id,
        kode: status_training.kode,
        nama: status_training.nama,
        aktive: status_training.aktive,
        desc: status_training.desc,
        urutan: status_training.urutan,
    }
}