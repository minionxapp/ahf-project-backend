//Create Model SubJobFamily-model.ts

import { SubJobFamily } from '@prisma/client'
export type SubJobFamilyResponse = {
    id: number,
    kode: string,
    kode_job_family: string,
    nama: string,
    desc?: string | null,
}

//CreateSubJobFamilyRequest
export type CreateSubJobFamilyRequest = {
    id: number,
    kode: string,
    kode_job_family: string,
    nama: string,
    desc?: string | null,
}

//UpdateSubJobFamilyRequest
export type UpdateSubJobFamilyRequest = {
    id: number,
    kode: string,
    kode_job_family: string,
    nama: string,
    desc?: string | null,
}

//SearchSubJobFamilyRequest
export type SearchSubJobFamilyRequest = {
    //id: number,
    kode: string,
    kode_job_family: string,
    nama: string,
    desc?: string | null,
    page: number,
    size: number,
}

//toSubJobFamilyResponse
export function toSubJobFamilyResponse(sub_job_family: SubJobFamily): SubJobFamilyResponse {
    return {
        id: sub_job_family.id,
        kode: sub_job_family.kode,
        kode_job_family: sub_job_family.kode_job_family,
        nama: sub_job_family.nama,
        desc: sub_job_family.desc,
    }
}
