"use strict";
//CREATE validation Pmakai-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmakaiValidation = void 0;
const zod_1 = require("zod");
class PmakaiValidation {
}
exports.PmakaiValidation = PmakaiValidation;
PmakaiValidation.CREATE = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
    name: zod_1.z.string().min(1).max(100),
    token: zod_1.z.string().max(100).optional(),
    status: zod_1.z.string().max(20).optional(),
    email: zod_1.z.string().max(250).optional(),
    group: zod_1.z.string().max(100).optional(),
    expired: zod_1.z.coerce.date().optional(),
});
//UPDATE validation
PmakaiValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    username: zod_1.z.string().min(1).max(100),
    // password: z.string().min(1).max(100),
    name: zod_1.z.string().min(1).max(100),
    token: zod_1.z.string().max(100).optional(),
    status: zod_1.z.string().max(20).optional(),
    email: zod_1.z.string().max(250).optional(),
    group: zod_1.z.string().max(100).optional(),
    expired: zod_1.z.coerce.date().optional(),
});
//SEARCH validation
PmakaiValidation.SEARCH = zod_1.z.object({
    username: zod_1.z.string().min(1).optional(),
    password: zod_1.z.string().min(1).optional(),
    name: zod_1.z.string().min(1).optional(),
    token: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    group: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(0).max(200).positive()
});
