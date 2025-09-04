//Create Model SubJobFamily-model.ts

import { SubJobFamily } from '@prisma/client'
export type SubJobFamilyResponse = {
    id: string,
    kode: string,
    nama: string,
    kode_jf: string,
    nama_jf: string,
    aktive: string,
    urutan: number,
}

//CreateSubJobFamilyRequest
export type CreateSubJobFamilyRequest = {
    id: string,
    kode: string,
    nama: string,
    kode_jf: string,
    nama_jf: string,
    aktive: string,
    urutan: number,
}

//UpdateSubJobFamilyRequest
export type UpdateSubJobFamilyRequest = {
    id: string,
    kode: string,
    nama: string,
    kode_jf: string,
    nama_jf: string,
    aktive: string,
    urutan: number,
}

//SearchSubJobFamilyRequest
export type SearchSubJobFamilyRequest = {
    //id: string,
    kode: string,
    nama: string,
    kode_jf: string,
    nama_jf: string,
    aktive: string,
    page: number,
    size: number,
}

//toSubJobFamilyResponse
export function toSubJobFamilyResponse(sub_job_family: SubJobFamily): SubJobFamilyResponse {
    return {
        id: sub_job_family.id,
        kode: sub_job_family.kode,
        nama: sub_job_family.nama,
        kode_jf: sub_job_family.kode_jf,
        nama_jf: sub_job_family.nama_jf,
        aktive: sub_job_family.aktive,
        urutan: sub_job_family.urutan,
    }
}
