"use strict";
//CREATE validation SubJobFamily-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubJobFamilyValidation = void 0;
const zod_1 = require("zod");
class SubJobFamilyValidation {
}
exports.SubJobFamilyValidation = SubJobFamilyValidation;
SubJobFamilyValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    kode_job_family: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(30),
    desc: zod_1.z.string().max(250).optional(),
});
//UPDATE validation
SubJobFamilyValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    kode_job_family: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(30),
    desc: zod_1.z.string().max(250).optional(),
});
//SEARCH validation
SubJobFamilyValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional(),
    kode_job_family: zod_1.z.string().min(1).optional(),
    nama: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
