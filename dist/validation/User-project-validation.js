"use strict";
//CREATE validation UserProject-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProjectValidation = void 0;
const zod_1 = require("zod");
class UserProjectValidation {
}
exports.UserProjectValidation = UserProjectValidation;
UserProjectValidation.CREATE = zod_1.z.object({
    project_id: zod_1.z.number().min(1).positive(),
    username: zod_1.z.string().max(100).optional().nullable(),
    status: zod_1.z.string().max(20).optional().nullable(),
});
//UPDATE validation
UserProjectValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    project_id: zod_1.z.number().min(1).positive(),
    username: zod_1.z.string().max(100).optional().nullable(),
    status: zod_1.z.string().max(20).optional().nullable(),
});
//SEARCH validation
UserProjectValidation.SEARCH = zod_1.z.object({
    username: zod_1.z.string().optional().nullable(),
    status: zod_1.z.string().optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
