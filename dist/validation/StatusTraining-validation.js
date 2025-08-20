"use strict";
//CREATE validation StatusTraining-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTrainingValidation = void 0;
const zod_1 = require("zod");
class StatusTrainingValidation {
}
exports.StatusTrainingValidation = StatusTrainingValidation;
StatusTrainingValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(30),
    aktive: zod_1.z.string().min(1).max(30),
    desc: zod_1.z.string().max(100).optional().nullable(),
    urutan: zod_1.z.number().min(1).positive(),
});
//UPDATE validation
StatusTrainingValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(30),
    aktive: zod_1.z.string().min(1).max(30),
    desc: zod_1.z.string().max(100).optional().nullable(),
    urutan: zod_1.z.number().min(1).positive(),
});
//SEARCH validation
StatusTrainingValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    desc: zod_1.z.string().optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
