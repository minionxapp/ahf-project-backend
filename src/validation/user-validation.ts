import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
        token: z.string().max(100).optional(),
        status: z.string().max(20).optional(),
        email: z.string().max(250).optional(),
        group: z.string().max(100).optional(),
        expired: z.coerce.date().optional()
    })

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    })

    static readonly UPDATE: ZodType = z.object({
        password: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional(),
        username: z.string().min(1).max(100),
        token: z.string().max(100).optional().nullable(),
        status: z.string().max(20).optional(),
        email: z.string().max(250).optional(),
        group: z.string().max(100).optional(),
        expired: z.coerce.date().optional(),
    })
    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        username: z.string().min(1).optional(),
        password: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        token: z.string().optional(),
        status: z.string().optional(),
        email: z.string().optional(),
        group: z.string().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })

}