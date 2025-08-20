
//CREATE validation SubKompetensi-validation.ts

import { z, ZodType } from "zod"; 

export class SubKompetensiValidation {
static readonly CREATE: ZodType = z.object({
kode: z.string().min(1).max(30),
kode_job_family: z.string().min(1).max(30),
kode_sub_job_family: z.string().min(1).max(30),
nama: z.string().min(1).max(100),
desc: z.string().max(250).optional().nullable(),
status: z.string().min(1).max(20),
kode_kompetensi: z.string().min(1).max(30),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
kode: z.string().min(1).max(30),
kode_job_family: z.string().min(1).max(30),
kode_sub_job_family: z.string().min(1).max(30),
nama: z.string().min(1).max(100),
desc: z.string().max(250).optional().nullable(),
status: z.string().min(1).max(20),
kode_kompetensi: z.string().min(1).max(30),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
kode: z.string().min(1).optional().nullable(),
kode_job_family: z.string().min(1).optional().nullable(),
kode_sub_job_family: z.string().min(1).optional().nullable(),
nama: z.string().min(1).optional().nullable(),
desc: z.string().optional().nullable(),
status: z.string().min(1).optional().nullable(),
kode_kompetensi: z.string().min(1).optional().nullable(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
