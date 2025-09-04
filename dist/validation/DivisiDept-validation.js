"use strict";
//CREATE validation DivisiDept-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisiDeptValidation = void 0;
const zod_1 = require("zod");
class DivisiDeptValidation {
}
exports.DivisiDeptValidation = DivisiDeptValidation;
DivisiDeptValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(20),
    nama: zod_1.z.string().min(1).max(100),
    divisi_kode: zod_1.z.string().min(1).max(20),
    divisi_name: zod_1.z.string().max(100).optional().nullable(),
    aktive: zod_1.z.string().min(1).max(20),
});
//UPDATE validation
DivisiDeptValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    kode: zod_1.z.string().min(1).max(20),
    nama: zod_1.z.string().min(1).max(100),
    divisi_kode: zod_1.z.string().min(1).max(20),
    divisi_name: zod_1.z.string().max(100).optional().nullable(),
    aktive: zod_1.z.string().min(1).max(20),
});
//SEARCH validation
DivisiDeptValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    divisi_kode: zod_1.z.string().min(1).optional().nullable(),
    divisi_name: zod_1.z.string().optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
