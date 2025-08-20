//Create Model JobFamily-model.ts

import { JobFamily } from '@prisma/client'
export type JobFamilyResponse = {
    id: number,
    kode: string,
    nama: string,
    desc?: string | null,
}

//CreateJobFamilyRequest
export type CreateJobFamilyRequest = {
    id: number,
    kode: string,
    nama: string,
    desc?: string | null,
}

//UpdateJobFamilyRequest
export type UpdateJobFamilyRequest = {
    id: number,
    kode: string,
    nama: string,
    desc?: string | null,
}

//SearchJobFamilyRequest
export type SearchJobFamilyRequest = {
    //id: number,
    kode: string,
    nama: string,
    desc?: string | null,
    page: number,
    size: number,
}

//toJobFamilyResponse
export function toJobFamilyResponse(job_family: JobFamily): JobFamilyResponse {
    return {
        id: job_family.id,
        kode: job_family.kode,
        nama: job_family.nama,
        desc: job_family.desc,
    }
}
