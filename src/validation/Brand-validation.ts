
//CREATE validation Brand-validation.ts

import { z, ZodType } from "zod"; 

export class BrandValidation {
static readonly CREATE: ZodType = z.object({
kode: z.string().min(1).max(100),
nama: z.string().min(1).max(100),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
kode: z.string().min(1).max(100),
nama: z.string().min(1).max(100),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
kode: z.string().min(1).optional().nullable(),
nama: z.string().min(1).optional().nullable(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
