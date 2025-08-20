//CREATE validation Training-validation.ts

import { z, ZodType } from "zod";

export class TrainingValidation {
    static readonly CREATE: ZodType = z.object({
        kode: z.string().min(1).max(30),
        nama: z.string().max(250).optional().nullable(),
        akademi: z.string().max(100).optional().nullable(),
        tipe: z.string().max(100).optional().nullable(),
        pic: z.string().max(30).optional().nullable(),
        desc: z.string().max(256).optional().nullable(),
        kompetensi: z.string().max(250).optional().nullable(),
        tgl_mulai: z.coerce.date().optional(), tgl_akhir: z.coerce.date().optional(), sub_kompetensi: z.string().max(100).optional().nullable(),
        status_training: z.string().max(30).optional().nullable(),
        kode_job_family: z.string().min(1).max(30),
        kode_sub_job_family: z.string().min(1).max(30),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        kode: z.string().min(1).max(30),
        nama: z.string().max(250).optional().nullable(),
        akademi: z.string().max(100).optional().nullable(),
        tipe: z.string().max(100).optional().nullable(),
        pic: z.string().max(30).optional().nullable(),
        desc: z.string().max(256).optional().nullable(),
        kompetensi: z.string().max(250).optional().nullable(),
        tgl_mulai: z.coerce.date().optional(), tgl_akhir: z.coerce.date().optional(), sub_kompetensi: z.string().max(100).optional().nullable(),
        status_training: z.string().max(30).optional().nullable(),
        kode_job_family: z.string().min(1).max(30),
        kode_sub_job_family: z.string().min(1).max(30),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        kode: z.string().min(1).optional().nullable(),
        nama: z.string().optional().nullable(),
        akademi: z.string().optional().nullable(),
        tipe: z.string().optional().nullable(),
        pic: z.string().optional().nullable(),
        desc: z.string().optional().nullable(),
        kompetensi: z.string().optional().nullable(),
        sub_kompetensi: z.string().optional().nullable(),
        status_training: z.string().optional().nullable(),
        kode_job_family: z.string().min(1).optional().nullable(),
        kode_sub_job_family: z.string().min(1).optional().nullable(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
