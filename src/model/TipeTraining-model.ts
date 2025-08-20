
//Create Model TipeTraining-model.ts

import { TipeTraining } from '@prisma/client'
export type TipeTrainingResponse = {
id: number,
kode: string,
nama: string,
desc?: string | null,
status: string,
}

//CreateTipeTrainingRequest
export type CreateTipeTrainingRequest = {
id: number,
kode: string,
nama: string,
desc?: string | null,
status: string,
}

//UpdateTipeTrainingRequest
export type UpdateTipeTrainingRequest = {
id: number,
kode: string,
nama: string,
desc?: string | null,
status: string,
}

//SearchTipeTrainingRequest
export type SearchTipeTrainingRequest = {
//id: number,
kode: string,
nama: string,
desc?: string | null,
status: string,
page : number,
size : number,
}

//toTipeTrainingResponse
export function toTipeTrainingResponse(tipe_training: TipeTraining): TipeTrainingResponse {
return { 
id: tipe_training.id,
kode:tipe_training.kode,
nama:tipe_training.nama,
desc:tipe_training.desc,
status:tipe_training.status,
}
}

