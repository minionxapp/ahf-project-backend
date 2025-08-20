//CREATE validation Seq-validation.ts

import { z, ZodType } from "zod";

export class SeqValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        tahun: z.number().min(1).positive(),
        last_squence: z.number().min(1).positive(),
        desc: z.string().max(30).optional().nullable(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        kode: z.string().min(1).max(30),
        tahun: z.number().min(1).positive(),
        last_squence: z.number().min(1).positive(),
        desc: z.string().max(30).optional().nullable(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional().nullable(),
        desc: z.string().optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}