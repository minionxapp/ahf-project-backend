//CREATE validation UserAkademi-validation.ts

import { z, ZodType } from "zod";

export class UserAkademiValidation {
    static readonly CREATE: ZodType = z.object({
        username: z.string().min(1).max(30),
        kode_akademi: z.string().min(1).max(30),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        username: z.string().min(1).max(30),
        kode_akademi: z.string().min(1).max(30),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        username: z.string().min(1).optional().nullable(),
        kode_akademi: z.string().min(1).optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
