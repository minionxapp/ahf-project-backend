"use strict";
//CREATE validation TrainingChecklist-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingChecklistValidation = void 0;
const zod_1 = require("zod");
class TrainingChecklistValidation {
}
exports.TrainingChecklistValidation = TrainingChecklistValidation;
TrainingChecklistValidation.CREATE = zod_1.z.object({
    training_kode: zod_1.z.string().min(1).max(100),
    checklist_kode: zod_1.z.string().min(1).max(100),
    file_1: zod_1.z.string().max(100).optional().nullable(),
    file_2: zod_1.z.string().max(100).optional().nullable(),
    file_3: zod_1.z.string().max(100).optional().nullable(),
    file_4: zod_1.z.string().max(100).optional().nullable(),
    status: zod_1.z.string().max(30).optional().nullable(),
    checklist_name: zod_1.z.string().max(100).optional().nullable(),
});
//UPDATE validation
TrainingChecklistValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    training_kode: zod_1.z.string().min(1).max(100),
    checklist_kode: zod_1.z.string().min(1).max(100),
    file_1: zod_1.z.string().max(100).optional().nullable(),
    file_2: zod_1.z.string().max(100).optional().nullable(),
    file_3: zod_1.z.string().max(100).optional().nullable(),
    file_4: zod_1.z.string().max(100).optional().nullable(),
    status: zod_1.z.string().max(30).optional().nullable(),
    checklist_name: zod_1.z.string().max(100).optional().nullable(),
});
//SEARCH validation
TrainingChecklistValidation.SEARCH = zod_1.z.object({
    training_kode: zod_1.z.string().min(1).optional().nullable(),
    checklist_kode: zod_1.z.string().min(1).optional().nullable(),
    file_1: zod_1.z.string().optional().nullable(),
    file_2: zod_1.z.string().optional().nullable(),
    file_3: zod_1.z.string().optional().nullable(),
    file_4: zod_1.z.string().optional().nullable(),
    status: zod_1.z.string().optional().nullable(),
    checklist_name: zod_1.z.string().optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
