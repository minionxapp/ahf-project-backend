
//CREATE validation TrainingChecklist-validation.ts

import { z, ZodType } from "zod"; 

export class TrainingChecklistValidation {
static readonly CREATE: ZodType = z.object({
training_kode: z.string().min(1).max(100),
checklist_kode: z.string().min(1).max(100),
file_1: z.string().max(100).optional().nullable(),
file_2: z.string().max(100).optional().nullable(),
file_3: z.string().max(100).optional().nullable(),
file_4: z.string().max(100).optional().nullable(),
status: z.string().max(30).optional().nullable(),
checklist_name: z.string().max(100).optional().nullable(),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
training_kode: z.string().min(1).max(100),
checklist_kode: z.string().min(1).max(100),
file_1: z.string().max(100).optional().nullable(),
file_2: z.string().max(100).optional().nullable(),
file_3: z.string().max(100).optional().nullable(),
file_4: z.string().max(100).optional().nullable(),
status: z.string().max(30).optional().nullable(),
checklist_name: z.string().max(100).optional().nullable(),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
training_kode: z.string().min(1).optional().nullable(),
checklist_kode: z.string().min(1).optional().nullable(),
file_1: z.string().optional().nullable(),
file_2: z.string().optional().nullable(),
file_3: z.string().optional().nullable(),
file_4: z.string().optional().nullable(),
status: z.string().optional().nullable(),
checklist_name: z.string().optional().nullable(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
