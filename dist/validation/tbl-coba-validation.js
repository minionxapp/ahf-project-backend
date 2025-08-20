"use strict";
//CREATE validation TblCoba-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TblCobaValidation = void 0;
const zod_1 = require("zod");
class TblCobaValidation {
}
exports.TblCobaValidation = TblCobaValidation;
TblCobaValidation.CREATE = zod_1.z.object({
    kolom_satu: zod_1.z.string().max(20).optional(),
});
//UPDATE validation
TblCobaValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kolom_satu: zod_1.z.string().max(20).optional(),
});
//SEARCH validation
TblCobaValidation.SEARCH = zod_1.z.object({
    kolom_satu: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
