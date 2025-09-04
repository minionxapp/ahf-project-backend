"use strict";
//CREATE validation Level-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelValidation = void 0;
const zod_1 = require("zod");
class LevelValidation {
}
exports.LevelValidation = LevelValidation;
LevelValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(20),
    nama: zod_1.z.string().min(1).max(30),
    aktive: zod_1.z.string().min(1).max(30),
    urutan: zod_1.z.number().min(1).positive(),
});
//UPDATE validation
LevelValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    kode: zod_1.z.string().min(1).max(20),
    nama: zod_1.z.string().min(1).max(30),
    aktive: zod_1.z.string().min(1).max(30),
    urutan: zod_1.z.number().min(1).positive(),
});
//SEARCH validation
LevelValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
