//CREATE validation JobFamily-validation.ts

import { z, ZodType } from "zod";

export class JobFamilyValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(100),
        aktive: z.string().min(1).max(30),
        deskripsi: z.string().max(250).optional().nullable(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.string(),
        kode: z.string().min(1).max(30),
        nama: z.string().min(1).max(100),
        aktive: z.string().min(1).max(30),
        deskripsi: z.string().max(250).optional().nullable(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional().nullable(),
        nama: z.string().min(1).optional().nullable(),
        aktive: z.string().min(1).optional().nullable(),
        deskripsi: z.string().optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
