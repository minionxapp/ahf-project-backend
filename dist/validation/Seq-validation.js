"use strict";
//CREATE validation Seq-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeqValidation = void 0;
const zod_1 = require("zod");
class SeqValidation {
}
exports.SeqValidation = SeqValidation;
SeqValidation.CREATE = zod_1.z.object({
    kode: zod_1.z.string().min(1).max(30),
    tahun: zod_1.z.number().min(1).positive(),
    last_squence: zod_1.z.number().min(1).positive(),
    desc: zod_1.z.string().max(30).optional().nullable(),
});
//UPDATE validation
SeqValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode: zod_1.z.string().min(1).max(30),
    tahun: zod_1.z.number().min(1).positive(),
    last_squence: zod_1.z.number().min(1).positive(),
    desc: zod_1.z.string().max(30).optional().nullable(),
});
//SEARCH validation
SeqValidation.SEARCH = zod_1.z.object({
    kode: zod_1.z.string().min(1).optional().nullable(),
    desc: zod_1.z.string().optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
