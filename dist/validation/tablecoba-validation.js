"use strict";
//CREATE validation TableCoba-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCobaValidation = void 0;
const zod_1 = require("zod");
class TableCobaValidation {
}
exports.TableCobaValidation = TableCobaValidation;
TableCobaValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().max(30).optional().nullable(),
    kode: zod_1.z.string().min(1).max(20),
});
//UPDATE validation
TableCobaValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().max(30).optional().nullable(),
    kode: zod_1.z.string().min(1).max(20),
});
//SEARCH validation
TableCobaValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().optional().nullable(),
    kode: zod_1.z.string().min(1).optional().nullable(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
