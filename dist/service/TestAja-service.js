"use strict";
//Create Service TestAja-service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAjaService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const TestAja_model_1 = require("../model/TestAja-model");
const TestAja_validation_1 = require("../validation/TestAja-validation");
const validation_1 = require("../validation/validation");
class TestAjaService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(TestAja_validation_1.TestAjaValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            let tglaja = request.tglaja; //"2025-12-31"
            request.tglaja = new Date(tglaja);
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const testAja = yield database_1.prismaClient.testAja.create({
                data: record
            });
            return (0, TestAja_model_1.toTestAjaResponse)(testAja);
        });
    }
    // CEK EXIST
    //function untuk getTestAja biar bisa dipakai berulang
    static checkTestAjaMustexist(testAjaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const testAja = yield database_1.prismaClient.testAja.findFirst({
                where: {
                    id: testAjaId,
                }
            });
            if (!testAja) {
                throw new response_error_1.ResponseError(404, "TestAja not found");
            }
            return testAja;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const testAja = yield this.checkTestAjaMustexist(id);
            return (0, TestAja_model_1.toTestAjaResponse)(testAja);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(TestAja_validation_1.TestAjaValidation.UPDATE, request);
            let tglaja = request.tglaja; //"2025-12-31"
            request.tglaja = new Date(tglaja);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek TestAja ada atau tidak
            yield this.checkTestAjaMustexist(request.id);
            const testAja = yield database_1.prismaClient.testAja.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, TestAja_model_1.toTestAjaResponse)(testAja);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTestAjaMustexist(id);
            const testAja = yield database_1.prismaClient.testAja.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return testAja;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(TestAja_validation_1.TestAjaValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if textaja exists
            if (searchRequest.textaja) {
                filters.push({
                    textaja: {
                        contains: searchRequest.textaja
                    }
                });
            }
            const testAjas = yield database_1.prismaClient.testAja.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.testAja.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: testAjas.map(testAja => (0, TestAja_model_1.toTestAjaResponse)(testAja)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size,
                    total_rows: total
                }
            };
        });
    }
}
exports.TestAjaService = TestAjaService;
