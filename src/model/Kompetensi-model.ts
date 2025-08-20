//Create Model Kompetensi-model.ts

import { Kompetensi } from '@prisma/client'
export type KompetensiResponse = {
    id: number,
    kode: string,
    kode_job_family: string,
    kode_sub_job_family: string,
    nama: string,
    desc?: string | null,
    status: string,
}

//CreateKompetensiRequest
export type CreateKompetensiRequest = {
    id: number,
    kode: string,
    kode_job_family: string,
    kode_sub_job_family: string,
    nama: string,
    desc?: string | null,
    status: string,
}

//UpdateKompetensiRequest
export type UpdateKompetensiRequest = {
    id: number,
    kode: string,
    kode_job_family: string,
    kode_sub_job_family: string,
    nama: string,
    desc?: string | null,
    status: string,
}

//SearchKompetensiRequest
export type SearchKompetensiRequest = {
    //id: number,
    kode: string,
    kode_job_family: string,
    kode_sub_job_family: string,
    nama: string,
    desc?: string | null,
    status: string,
    page: number,
    size: number,
}

//toKompetensiResponse
export function toKompetensiResponse(kompetensi: Kompetensi): KompetensiResponse {
    return {
        id: kompetensi.id,
        kode: kompetensi.kode,
        kode_job_family: kompetensi.kode_job_family,
        kode_sub_job_family: kompetensi.kode_sub_job_family,
        nama: kompetensi.nama,
        desc: kompetensi.desc,
        status: kompetensi.status,
    }
}
