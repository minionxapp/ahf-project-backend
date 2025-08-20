
//CREATE validation TblCoba-validation.ts

import { z, ZodType } from "zod"; 

export class TblCobaValidation {
static readonly CREATE: ZodType = z.object({
kolom_satu: z.string().max(20).optional(),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
kolom_satu: z.string().max(20).optional(),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
kolom_satu: z.string().optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
