
//Create Model Akademi-model.ts

import { Akademi } from '@prisma/client'
export type AkademiResponse = {
id: number,
kode: string,
nama: string,
status: string,
nama_pic?: string | null,
}

//CreateAkademiRequest
export type CreateAkademiRequest = {
id: number,
kode: string,
nama: string,
status: string,
nama_pic?: string | null,
}

//UpdateAkademiRequest
export type UpdateAkademiRequest = {
id: number,
kode: string,
nama: string,
status: string,
nama_pic?: string | null,
}

//SearchAkademiRequest
export type SearchAkademiRequest = {
//id: number,
kode: string,
nama: string,
status: string,
nama_pic?: string | null,
page : number,
size : number,
}

//toAkademiResponse
export function toAkademiResponse(akademi: Akademi): AkademiResponse {
return { 
id: akademi.id,
kode:akademi.kode,
nama:akademi.nama,
status:akademi.status,
nama_pic:akademi.nama_pic,
}
}

