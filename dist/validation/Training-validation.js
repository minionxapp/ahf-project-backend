"use strict";
//CREATE validation Training-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingValidation = void 0;
const zod_1 = require("zod");
class TrainingValidation {
}
exports.TrainingValidation = TrainingValidation;
TrainingValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().max(250).optional().nullable(),
    akademi: zod_1.z.string().max(100).optional().nullable(),
    tipe: zod_1.z.string().max(100).optional().nullable(),
    pic: zod_1.z.string().max(30).optional().nullable(),
    desc: zod_1.z.string().max(256).optional().nullable(),
    kompetensi: zod_1.z.string().max(250).optional().nullable(),
    tgl_mulai: zod_1.z.coerce.date().optional(), tgl_akhir: zod_1.z.coerce.date().optional(), sub_kompetensi: zod_1.z.string().max(100).optional().nullable(),
    status_training: zod_1.z.string().max(30).optional().nullable(),
    kode_job_family: zod_1.z.string().min(1).max(30),
    kode_sub_job_family: zod_1.z.string().min(1).max(30),
});
//UPDATE validation
TrainingValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().max(250).optional().nullable(),
    akademi: zod_1.z.string().max(100).optional().nullable(),
    tipe: zod_1.z.string().max(100).optional().nullable(),
    pic: zod_1.z.string().max(30).optional().nullable(),
    desc: zod_1.z.string().max(256).optional().nullable(),
    kompetensi: zod_1.z.string().max(250).optional().nullable(),
    tgl_mulai: zod_1.z.coerce.date().optional(), tgl_akhir: zod_1.z.coerce.date().optional(), sub_kompetensi: zod_1.z.string().max(100).optional().nullable(),
    status_training: zod_1.z.string().max(30).optional().nullable(),
    kode_job_family: zod_1.z.string().min(1).max(30),
    kode_sub_job_family: zod_1.z.string().min(1).max(30),
});
//SEARCH validation
TrainingValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().optional().nullable(),
    akademi: zod_1.z.string().optional().nullable(),
    tipe: zod_1.z.string().optional().nullable(),
    pic: zod_1.z.string().optional().nullable(),
    desc: zod_1.z.string().optional().nullable(),
    kompetensi: zod_1.z.string().optional().nullable(),
    sub_kompetensi: zod_1.z.string().optional().nullable(),
    status_training: zod_1.z.string().optional().nullable(),
    kode_job_family: zod_1.z.string().min(1).optional().nullable(),
    kode_sub_job_family: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
