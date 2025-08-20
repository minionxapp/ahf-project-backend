
//CREATE validation KompetensiLevel-validation.ts

import { z, ZodType } from "zod";

export class KompetensiLevelValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
        status: z.string().min(1).max(30),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
        status: z.string().min(1).max(30),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional().nullable(),
        nama: z.string().min(1).optional().nullable(),
        status: z.string().min(1).optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
