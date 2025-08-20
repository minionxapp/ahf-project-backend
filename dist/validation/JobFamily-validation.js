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
    desc: zod_1.z.string().max(250).optional(),
});
//UPDATE validation
JobFamilyValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional(),
});
//SEARCH validation
JobFamilyValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional(),
    nama: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
