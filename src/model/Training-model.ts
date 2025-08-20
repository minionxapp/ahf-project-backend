//Create Model Training-model.ts

import { Training } from '@prisma/client'
export type TrainingResponse = {
    id: number,
    kode: string,
    nama?: string | null,
    akademi?: string | null,
    tipe?: string | null,
    pic?: string | null,
    desc?: string | null,
    kompetensi?: string | null,
    tgl_mulai?: Date | null,
    tgl_akhir?: Date | null,
    sub_kompetensi?: string | null,
    status_training?: string | null,
    kode_job_family: string,
    kode_sub_job_family: string,
}

//CreateTrainingRequest
export type CreateTrainingRequest = {
    id: number,
    kode: string,
    nama?: string | null,
    akademi?: string | null,
    tipe?: string | null,
    pic?: string | null,
    desc?: string | null,
    kompetensi?: string | null,
    tgl_mulai?: Date | null,
    tgl_akhir?: Date | null,
    sub_kompetensi?: string | null,
    status_training?: string | null,
    kode_job_family: string,
    kode_sub_job_family: string,
}

//UpdateTrainingRequest
export type UpdateTrainingRequest = {
    id: number,
    kode: string,
    nama?: string | null,
    akademi?: string | null,
    tipe?: string | null,
    pic?: string | null,
    desc?: string | null,
    kompetensi?: string | null,
    tgl_mulai?: Date | null,
    tgl_akhir?: Date | null,
    sub_kompetensi?: string | null,
    status_training?: string | null,
    kode_job_family: string,
    kode_sub_job_family: string,
}

//SearchTrainingRequest
export type SearchTrainingRequest = {
    //id: number,
    kode: string,
    nama?: string | null,
    akademi?: string | null,
    tipe?: string | null,
    pic?: string | null,
    desc?: string | null,
    kompetensi?: string | null,
    sub_kompetensi?: string | null,
    status_training?: string | null,
    kode_job_family: string,
    kode_sub_job_family: string,
    page: number,
    size: number,
}

//toTrainingResponse
export function toTrainingResponse(training: Training): TrainingResponse {
    return {
        id: training.id,
        kode: training.kode,
        nama: training.nama,
        akademi: training.akademi,
        tipe: training.tipe,
        pic: training.pic,
        desc: training.desc,
        kompetensi: training.kompetensi,
        tgl_mulai: training.tgl_mulai,
        tgl_akhir: training.tgl_akhir,
        sub_kompetensi: training.sub_kompetensi,
        status_training: training.status_training,
        kode_job_family: training.kode_job_family,
        kode_sub_job_family: training.kode_sub_job_family,
    }
}
