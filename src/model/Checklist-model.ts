
//Create Model Checklist-model.ts

import { Checklist } from '@prisma/client'
export type ChecklistResponse = {
id: number,
nama: string,
urut: number,
desc: string,
kode: string,
group: string,
}

//CreateChecklistRequest
export type CreateChecklistRequest = {
id: number,
nama: string,
urut: number,
desc: string,
kode: string,
group: string,
}

//UpdateChecklistRequest
export type UpdateChecklistRequest = {
id: number,
nama: string,
urut: number,
desc: string,
kode: string,
group: string,
}

//SearchChecklistRequest
export type SearchChecklistRequest = {
//id: number,
nama: string,
desc: string,
kode: string,
group: string,
page : number,
size : number,
}

//toChecklistResponse
export function toChecklistResponse(checklist: Checklist): ChecklistResponse {
return { 
id: checklist.id,
nama:checklist.nama,
urut:checklist.urut,
desc:checklist.desc,
kode:checklist.kode,
group:checklist.group,
}
}

