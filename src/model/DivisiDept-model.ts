
//Create Model DivisiDept-model.ts

import { DivisiDept } from '@prisma/client'
export type DivisiDeptResponse = {
id: string,
kode: string,
nama: string,
divisi_kode: string,
divisi_name?: string | null,
aktive: string,
}

//CreateDivisiDeptRequest
export type CreateDivisiDeptRequest = {
id: string,
kode: string,
nama: string,
divisi_kode: string,
divisi_name?: string | null,
aktive: string,
}

//UpdateDivisiDeptRequest
export type UpdateDivisiDeptRequest = {
id: string,
kode: string,
nama: string,
divisi_kode: string,
divisi_name?: string | null,
aktive: string,
}

//SearchDivisiDeptRequest
export type SearchDivisiDeptRequest = {
//id: string,
kode: string,
nama: string,
divisi_kode: string,
divisi_name?: string | null,
aktive: string,
page : number,
size : number,
}

//toDivisiDeptResponse
export function toDivisiDeptResponse(divisi_dept: DivisiDept): DivisiDeptResponse {
return { 
id: divisi_dept.id,
kode:divisi_dept.kode,
nama:divisi_dept.nama,
divisi_kode:divisi_dept.divisi_kode,
divisi_name:divisi_dept.divisi_name,
aktive:divisi_dept.aktive,
}
}

