"use strict";
//CREATE validation Brand-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidation = void 0;
const zod_1 = require("zod");
class BrandValidation {
}
exports.BrandValidation = BrandValidation;
BrandValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(100),
    nama: zod_1.z.string().min(1).max(100),
});
//UPDATE validation
BrandValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(100),
    nama: zod_1.z.string().min(1).max(100),
});
//SEARCH validation
BrandValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
