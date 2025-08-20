//Create Model Seq-model.ts

import { Seq } from '@prisma/client'
export type SeqResponse = {
    id: number,
    kode: string,
    tahun: number,
    last_squence: number,
    desc?: string | null,
}

//CreateSeqRequest
export type CreateSeqRequest = {
    id: number,
    kode: string,
    tahun: number,
    last_squence: number,
    desc?: string | null,
}

//UpdateSeqRequest
export type UpdateSeqRequest = {
    id: number,
    kode: string,
    tahun: number,
    last_squence: number,
    desc?: string | null,
}

//SearchSeqRequest
export type SearchSeqRequest = {
    //id: number,
    kode: string,
    desc?: string | null,
    page: number,
    size: number,
}

//toSeqResponse
export function toSeqResponse(seq: Seq): SeqResponse {
    return {
        id: seq.id,
        kode: seq.kode,
        tahun: seq.tahun,
        last_squence: seq.last_squence,
        desc: seq.desc,
    }
}
