"use strict";
//CREATE validation JobFamily-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFamilyValidation = void 0;
const zod_1 = require("zod");
class JobFamilyValidation {
}
exports.JobFamilyValidation = JobFamilyValidation;
JobFamilyValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    aktive: zod_1.z.string().min(1).max(30),
    deskripsi: zod_1.z.string().max(250).optional().nullable(),
});
//UPDATE validation
JobFamilyValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    aktive: zod_1.z.string().min(1).max(30),
    deskripsi: zod_1.z.string().max(250).optional().nullable(),
});
//SEARCH validation
JobFamilyValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    deskripsi: zod_1.z.string().optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
