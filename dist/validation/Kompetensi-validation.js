"use strict";
//CREATE validation Kompetensi-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.KompetensiValidation = void 0;
const zod_1 = require("zod");
class KompetensiValidation {
}
exports.KompetensiValidation = KompetensiValidation;
KompetensiValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    kode_job_family: zod_1.z.string().min(1).max(30),
    kode_sub_job_family: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional(),
    status: zod_1.z.string().min(1).max(20),
});
//UPDATE validation
KompetensiValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    kode_job_family: zod_1.z.string().min(1).max(30),
    kode_sub_job_family: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional(),
    status: zod_1.z.string().min(1).max(20),
});
//SEARCH validation
KompetensiValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional(),
    kode_job_family: zod_1.z.string().min(1).optional(),
    kode_sub_job_family: zod_1.z.string().min(1).optional(),
    nama: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().optional(),
    status: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
