
//Create Model SubKompetensi-model.ts

import { SubKompetensi } from '@prisma/client'
export type SubKompetensiResponse = {
id: number,
kode: string,
kode_job_family: string,
kode_sub_job_family: string,
nama: string,
desc?: string | null,
status: string,
kode_kompetensi: string,
}

//CreateSubKompetensiRequest
export type CreateSubKompetensiRequest = {
id: number,
kode: string,
kode_job_family: string,
kode_sub_job_family: string,
nama: string,
desc?: string | null,
status: string,
kode_kompetensi: string,
}

//UpdateSubKompetensiRequest
export type UpdateSubKompetensiRequest = {
id: number,
kode: string,
kode_job_family: string,
kode_sub_job_family: string,
nama: string,
desc?: string | null,
status: string,
kode_kompetensi: string,
}

//SearchSubKompetensiRequest
export type SearchSubKompetensiRequest = {
//id: number,
kode: string,
kode_job_family: string,
kode_sub_job_family: string,
nama: string,
desc?: string | null,
status: string,
kode_kompetensi: string,
page : number,
size : number,
}

//toSubKompetensiResponse
export function toSubKompetensiResponse(sub_kompetensi: SubKompetensi): SubKompetensiResponse {
return { 
id: sub_kompetensi.id,
kode:sub_kompetensi.kode,
kode_job_family:sub_kompetensi.kode_job_family,
kode_sub_job_family:sub_kompetensi.kode_sub_job_family,
nama:sub_kompetensi.nama,
desc:sub_kompetensi.desc,
status:sub_kompetensi.status,
kode_kompetensi:sub_kompetensi.kode_kompetensi,
}
}

