//CREATE validation DevDirektori-validation.ts

import { z, ZodType } from "zod";

export class DevDirektoriValidation {
    static readonly CREATE: ZodType = z.object({
        username: z.string().min(1).max(100),
        frontend: z.string().max(250).optional(),
        backend: z.string().max(250).optional(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        username: z.string().min(1).max(100),
        frontend: z.string().max(250).optional(),
        backend: z.string().max(250).optional(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        username: z.string().min(1).optional(),
        frontend: z.string().optional(),
        backend: z.string().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
