"use strict";
//CREATE validation UserAkademi-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAkademiValidation = void 0;
const zod_1 = require("zod");
class UserAkademiValidation {
}
exports.UserAkademiValidation = UserAkademiValidation;
UserAkademiValidation.CREATE = zod_1.z.object({
    username: zod_1.z.string().min(1).max(30),
    kode_akademi: zod_1.z.string().min(1).max(30),
    aktive: zod_1.z.string().min(1).max(30),
});
//UPDATE validation
UserAkademiValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    username: zod_1.z.string().min(1).max(30),
    kode_akademi: zod_1.z.string().min(1).max(30),
    aktive: zod_1.z.string().min(1).max(30),
});
//SEARCH validation
UserAkademiValidation.SEARCH = zod_1.z.object({
    username: zod_1.z.string().min(1).optional().nullable(),
    kode_akademi: zod_1.z.string().min(1).optional().nullable(),
    aktive: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
