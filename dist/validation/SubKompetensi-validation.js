"use strict";
//CREATE validation SubKompetensi-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubKompetensiValidation = void 0;
const zod_1 = require("zod");
class SubKompetensiValidation {
}
exports.SubKompetensiValidation = SubKompetensiValidation;
SubKompetensiValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    kode_job_family: zod_1.z.string().min(1).max(30),
    kode_sub_job_family: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional().nullable(),
    status: zod_1.z.string().min(1).max(20),
    kode_kompetensi: zod_1.z.string().min(1).max(30),
});
//UPDATE validation
SubKompetensiValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    kode_job_family: zod_1.z.string().min(1).max(30),
    kode_sub_job_family: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional().nullable(),
    status: zod_1.z.string().min(1).max(20),
    kode_kompetensi: zod_1.z.string().min(1).max(30),
});
//SEARCH validation
SubKompetensiValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    kode_job_family: zod_1.z.string().min(1).optional().nullable(),
    kode_sub_job_family: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    desc: zod_1.z.string().optional().nullable(),
    status: zod_1.z.string().min(1).optional().nullable(),
    kode_kompetensi: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
