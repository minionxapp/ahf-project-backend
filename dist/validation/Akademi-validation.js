"use strict";
//CREATE validation Akademi-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkademiValidation = void 0;
const zod_1 = require("zod");
class AkademiValidation {
}
exports.AkademiValidation = AkademiValidation;
AkademiValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    status: zod_1.z.string().min(1).max(30),
    nama_pic: zod_1.z.string().max(100).optional(),
});
//UPDATE validation
AkademiValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    status: zod_1.z.string().min(1).max(30),
    nama_pic: zod_1.z.string().max(100).optional(),
});
//SEARCH validation
AkademiValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional(),
    nama: zod_1.z.string().min(1).optional(),
    status: zod_1.z.string().min(1).optional(),
    nama_pic: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
