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
    nama: zod_1.z.string().min(1).max(100),
    kode_jf: zod_1.z.string().min(1).max(100),
    nama_jf: zod_1.z.string().min(1).max(100),
    aktive: zod_1.z.string().min(1).max(30),
    urutan: zod_1.z.number().min(1).positive(),
});
//UPDATE validation
SubJobFamilyValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    kode_jf: zod_1.z.string().min(1).max(100),
    nama_jf: zod_1.z.string().min(1).max(100),
    aktive: zod_1.z.string().min(1).max(30),
    urutan: zod_1.z.number().min(1).positive(),
});
//SEARCH validation
SubJobFamilyValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    kode_jf: zod_1.z.string().min(1).optional().nullable(),
    nama_jf: zod_1.z.string().min(1).optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
