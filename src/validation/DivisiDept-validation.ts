
//CREATE validation DivisiDept-validation.ts

import { z, ZodType } from "zod"; 

export class DivisiDeptValidation {
static readonly CREATE: ZodType = z.object({
kode: z.string().min(1).max(20),
nama: z.string().min(1).max(100),
divisi_kode: z.string().min(1).max(20),
divisi_name: z.string().max(100).optional().nullable(),
aktive: z.string().min(1).max(20),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.string(),
kode: z.string().min(1).max(20),
nama: z.string().min(1).max(100),
divisi_kode: z.string().min(1).max(20),
divisi_name: z.string().max(100).optional().nullable(),
aktive: z.string().min(1).max(20),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
kode: z.string().min(1).optional().nullable(),
nama: z.string().min(1).optional().nullable(),
divisi_kode: z.string().min(1).optional().nullable(),
divisi_name: z.string().optional().nullable(),
aktive: z.string().min(1).optional().nullable(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
