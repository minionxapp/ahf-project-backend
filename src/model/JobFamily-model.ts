//Create Model JobFamily-model.ts

import { JobFamily } from '@prisma/client'
export type JobFamilyResponse = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    deskripsi?: string | null,
}

//CreateJobFamilyRequest
export type CreateJobFamilyRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    deskripsi?: string | null,
}

//UpdateJobFamilyRequest
export type UpdateJobFamilyRequest = {
    id: string,
    kode: string,
    nama: string,
    aktive: string,
    deskripsi?: string | null,
}

//SearchJobFamilyRequest
export type SearchJobFamilyRequest = {
    //id: string,
    kode: string,
    nama: string,
    aktive: string,
    deskripsi?: string | null,
    page: number,
    size: number,
}

//toJobFamilyResponse
export function toJobFamilyResponse(job_family: JobFamily): JobFamilyResponse {
    return {
        id: job_family.id,
        kode: job_family.kode,
        nama: job_family.nama,
        aktive: job_family.aktive,
        deskripsi: job_family.deskripsi,
    }
}