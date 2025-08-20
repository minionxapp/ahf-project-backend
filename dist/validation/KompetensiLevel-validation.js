"use strict";
//CREATE validation KompetensiLevel-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.KompetensiLevelValidation = void 0;
const zod_1 = require("zod");
class KompetensiLevelValidation {
}
exports.KompetensiLevelValidation = KompetensiLevelValidation;
KompetensiLevelValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(30),
    status: zod_1.z.string().min(1).max(30),
});
//UPDATE validation
KompetensiLevelValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(30),
    status: zod_1.z.string().min(1).max(30),
});
//SEARCH validation
KompetensiLevelValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    status: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
