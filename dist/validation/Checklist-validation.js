"use strict";
//CREATE validation Checklist-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistValidation = void 0;
const zod_1 = require("zod");
class ChecklistValidation {
}
exports.ChecklistValidation = ChecklistValidation;
ChecklistValidation.CREATE = zod_1.z.object({
    nama: zod_1.z.string().min(1).max(30),
    urut: zod_1.z.number().min(1).positive(),
    desc: zod_1.z.string().min(1).max(100),
    kode: zod_1.z.string().min(1).max(30),
    group: zod_1.z.string().min(1).max(30),
});
//UPDATE validation
ChecklistValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    nama: zod_1.z.string().min(1).max(30),
    urut: zod_1.z.number().min(1).positive(),
    desc: zod_1.z.string().min(1).max(100),
    kode: zod_1.z.string().min(1).max(30),
    group: zod_1.z.string().min(1).max(30),
});
//SEARCH validation
ChecklistValidation.SEARCH = zod_1.z.object({
    nama: zod_1.z.string().min(1).optional().nullable(),
    desc: zod_1.z.string().min(1).optional().nullable(),
    kode: zod_1.z.string().min(1).optional().nullable(),
    group: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
