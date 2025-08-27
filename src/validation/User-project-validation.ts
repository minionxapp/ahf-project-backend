//CREATE validation UserProject-validation.ts

import { z, ZodType } from "zod";

export class UserProjectValidation {
    static readonly CREATE: ZodType = z.object({
        project_id: z.number().min(1).positive(),
        username: z.string().max(100).optional().nullable(),
        status: z.string().max(20).optional().nullable(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.string(),
        project_id: z.number().min(1).positive(),
        username: z.string().max(100).optional().nullable(),
        status: z.string().max(20).optional().nullable(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        username: z.string().optional().nullable(),
        status: z.string().optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}


