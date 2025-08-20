
//CREATE validation Akademi-validation.ts

import { z, ZodType } from "zod"; 

export class AkademiValidation {
static readonly CREATE: ZodType = z.object({
kode: z.string().min(1).max(30),
nama: z.string().min(1).max(100),
status: z.string().min(1).max(30),
nama_pic: z.string().max(100).optional(),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
kode: z.string().min(1).max(30),
nama: z.string().min(1).max(100),
status: z.string().min(1).max(30),
nama_pic: z.string().max(100).optional(),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
kode: z.string().min(1).optional(),
nama: z.string().min(1).optional(),
status: z.string().min(1).optional(),
nama_pic: z.string().optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
