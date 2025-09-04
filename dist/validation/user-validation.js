"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
    name: zod_1.z.string().min(1).max(100),
    token: zod_1.z.string().max(100).optional(),
    status: zod_1.z.string().max(20).optional(),
    email: zod_1.z.string().max(250).optional(),
    group: zod_1.z.string().max(100).optional(),
    expired: zod_1.z.coerce.date().optional(),
    kode_divisi: zod_1.z.string().max(100).optional(),
    nama_divisi: zod_1.z.string().max(100).optional(),
    kode_dept: zod_1.z.string().max(100).optional(),
    nama_dept: zod_1.z.string().max(100).optional(),
});
UserValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
});
UserValidation.UPDATE = zod_1.z.object({
    password: zod_1.z.string().min(1).max(100).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    username: zod_1.z.string().min(1).max(100),
    token: zod_1.z.string().max(100).optional().nullable(),
    status: zod_1.z.string().max(20).optional(),
    email: zod_1.z.string().max(250).optional(),
    group: zod_1.z.string().max(100).optional(),
    expired: zod_1.z.coerce.date().optional(),
    kode_divisi: zod_1.z.string().max(100).optional().nullable(),
    nama_divisi: zod_1.z.string().max(100).optional().nullable(),
    kode_dept: zod_1.z.string().max(100).optional().nullable(),
    nama_dept: zod_1.z.string().max(100).optional().nullable(),
});
//SEARCH validation
UserValidation.SEARCH = zod_1.z.object({
    username: zod_1.z.string().min(1).optional(),
    password: zod_1.z.string().min(1).optional(),
    name: zod_1.z.string().min(1).optional(),
    token: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    group: zod_1.z.string().optional(),
    kode_divisi: zod_1.z.string().max(100).optional(),
    nama_divisi: zod_1.z.string().max(100).optional(),
    kode_dept: zod_1.z.string().max(100).optional(),
    nama_dept: zod_1.z.string().max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
