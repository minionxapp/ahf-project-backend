"use strict";
//CREATE validation TipeTraining-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipeTrainingValidation = void 0;
const zod_1 = require("zod");
class TipeTrainingValidation {
}
exports.TipeTrainingValidation = TipeTrainingValidation;
TipeTrainingValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    aktive: zod_1.z.string().min(1).max(30),
    urutan: zod_1.z.number().min(1).positive(),
});
//UPDATE validation
TipeTrainingValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    kode: zod_1.z.string().min(1).max(30),
    nama: zod_1.z.string().min(1).max(100),
    aktive: zod_1.z.string().min(1).max(30),
    urutan: zod_1.z.number().min(1).positive(),
});
//SEARCH validation
TipeTrainingValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    nama: zod_1.z.string().min(1).optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
