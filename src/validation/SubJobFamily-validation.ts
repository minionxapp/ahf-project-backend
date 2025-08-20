//CREATE validation SubJobFamily-validation.ts

import { z, ZodType } from "zod";

export class SubJobFamilyValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        kode_job_family: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
        desc: z.string().max(250).optional(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        kode: z.string().min(1).max(30),
        kode_job_family: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
        desc: z.string().max(250).optional(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional(),
        kode_job_family: z.string().min(1).optional(),
        nama: z.string().min(1).optional(),
        desc: z.string().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
