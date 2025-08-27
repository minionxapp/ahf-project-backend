//CREATE validation TableCoba-validation.ts

import { z, ZodType } from "zod"; 

export class TableCobaValidation {
static readonly CREATE: ZodType = z.object({
name: z.string().max(30).optional().nullable(),
kode: z.string().min(1).max(20),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.string(),
name: z.string().max(30).optional().nullable(),
kode: z.string().min(1).max(20),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
name: z.string().optional().nullable(),
kode: z.string().min(1).optional().nullable(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
