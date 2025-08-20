//CREATE validation StatusTraining-validation.ts

import { z, ZodType } from "zod";

export class StatusTrainingValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
        aktive: z.string().min(1).max(30),
        desc: z.string().max(100).optional().nullable(),
        urutan: z.number().min(1).positive(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
        aktive: z.string().min(1).max(30),
        desc: z.string().max(100).optional().nullable(),
        urutan: z.number().min(1).positive(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional().nullable(),
        nama: z.string().min(1).optional().nullable(),
        aktive: z.string().min(1).optional().nullable(),
        desc: z.string().optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
