//CREATE validation TipeTraining-validation.ts

import { z, ZodType } from "zod";

export class TipeTrainingValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(100),
        aktive: z.string().min(1).max(30),
        urutan: z.number().min(1).positive(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.string(),
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(100),
        aktive: z.string().min(1).max(30),
        urutan: z.number().min(1).positive(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional().nullable(),
        nama: z.string().min(1).optional().nullable(),
        aktive: z.string().min(1).optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}