"use strict";
//CREATE validation TestAja-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAjaValidation = void 0;
const zod_1 = require("zod");
// const datetime = z.iso.datetime({ offset: true });
class TestAjaValidation {
}
exports.TestAjaValidation = TestAjaValidation;
TestAjaValidation.CREATE = zod_1.z.object({
    textaja: zod_1.z.string().max(30).optional(),
    numberaja: zod_1.z.number().min(1).positive(),
    tglaja: zod_1.z.coerce.date().optional(),
});
//UPDATE validation
TestAjaValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    textaja: zod_1.z.string().max(30).optional(),
    numberaja: zod_1.z.number().min(1).positive(),
    tglaja: zod_1.z.coerce.date().optional(),
});
//SEARCH validation
TestAjaValidation.SEARCH = zod_1.z.object({
    textaja: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
