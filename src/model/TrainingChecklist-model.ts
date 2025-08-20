
//Create Model TrainingChecklist-model.ts

import { TrainingChecklist } from '@prisma/client'
export type TrainingChecklistResponse = {
id: number,
training_kode: string,
checklist_kode: string,
file_1?: string | null,
file_2?: string | null,
file_3?: string | null,
file_4?: string | null,
status?: string | null,
checklist_name?: string | null,
}

//CreateTrainingChecklistRequest
export type CreateTrainingChecklistRequest = {
id: number,
training_kode: string,
checklist_kode: string,
file_1?: string | null,
file_2?: string | null,
file_3?: string | null,
file_4?: string | null,
status?: string | null,
checklist_name?: string | null,
}

//UpdateTrainingChecklistRequest
export type UpdateTrainingChecklistRequest = {
id: number,
training_kode: string,
checklist_kode: string,
file_1?: string | null,
file_2?: string | null,
file_3?: string | null,
file_4?: string | null,
status?: string | null,
checklist_name?: string | null,
}

//SearchTrainingChecklistRequest
export type SearchTrainingChecklistRequest = {
//id: number,
training_kode: string,
checklist_kode: string,
file_1?: string | null,
file_2?: string | null,
file_3?: string | null,
file_4?: string | null,
status?: string | null,
checklist_name?: string | null,
page : number,
size : number,
}

//toTrainingChecklistResponse
export function toTrainingChecklistResponse(training_checklist: TrainingChecklist): TrainingChecklistResponse {
return { 
id: training_checklist.id,
training_kode:training_checklist.training_kode,
checklist_kode:training_checklist.checklist_kode,
file_1:training_checklist.file_1,
file_2:training_checklist.file_2,
file_3:training_checklist.file_3,
file_4:training_checklist.file_4,
status:training_checklist.status,
checklist_name:training_checklist.checklist_name,
}
}

