
//Create Model Divisi-model.ts

import { Divisi } from '@prisma/client'
export type DivisiResponse = {
id: string,
kode: string,
nama: string,
aktive: string,
urutan: number,
}

//CreateDivisiRequest
export type CreateDivisiRequest = {
id: string,
kode: string,
nama: string,
aktive: string,
urutan: number,
}

//UpdateDivisiRequest
export type UpdateDivisiRequest = {
id: string,
kode: string,
nama: string,
aktive: string,
urutan: number,
}

//SearchDivisiRequest
export type SearchDivisiRequest = {
//id: string,
kode: string,
nama: string,
aktive: string,
page : number,
size : number,
}

//toDivisiResponse
export function toDivisiResponse(divisi: Divisi): DivisiResponse {
return { 
id: divisi.id,
kode:divisi.kode,
nama:divisi.nama,
aktive:divisi.aktive,
urutan:divisi.urutan,
}
}

