//CREATE validation TestAja-validation.ts

import { z, ZodType } from "zod";
// const datetime = z.iso.datetime({ offset: true });
export class TestAjaValidation {
    static readonly CREATE: ZodType = z.object({
        textaja: z.string().max(30).optional(),
        numberaja: z.number().min(1).positive(),
        tglaja: z.coerce.date().optional(),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        textaja: z.string().max(30).optional(),
        numberaja: z.number().min(1).positive(),
        tglaja: z.coerce.date().optional(),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        textaja: z.string().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}