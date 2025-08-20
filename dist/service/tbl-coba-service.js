"use strict";
//Create Service TblCoba-service.ts
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
exports.TblCobaService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const TblCoba_model_1 = require("../model/TblCoba-model");
const TblCoba_validation_1 = require("../validation/TblCoba-validation");
const validation_1 = require("../validation/validation");
class TblCobaService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(TblCoba_validation_1.TblCobaValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const tblCoba = yield database_1.prismaClient.tblCoba.create({
                data: record
            });
            return (0, TblCoba_model_1.toTblCobaResponse)(tblCoba);
        });
    }
    // CEK EXIST
    //function untuk getTblCoba biar bisa dipakai berulang
    static checkTblCobaMustexist(tblCobaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tblCoba = yield database_1.prismaClient.tblCoba.findFirst({
                where: {
                    id: tblCobaId,
                }
            });
            if (!tblCoba) {
                throw new response_error_1.ResponseError(404, "TblCoba not found");
            }
            return tblCoba;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tblCoba = yield this.checkTblCobaMustexist(id);
            return (0, TblCoba_model_1.toTblCobaResponse)(tblCoba);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(TblCoba_validation_1.TblCobaValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek TblCoba ada atau tidak
            yield this.checkTblCobaMustexist(request.id);
            const tblCoba = yield database_1.prismaClient.tblCoba.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, TblCoba_model_1.toTblCobaResponse)(tblCoba);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTblCobaMustexist(id);
            const tblCoba = yield database_1.prismaClient.tblCoba.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return tblCoba;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(TblCoba_validation_1.TblCobaValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if kolom_satu exists
            if (searchRequest.kolom_satu) {
                filters.push({
                    kolom_satu: {
                        contains: searchRequest.kolom_satu
                    }
                });
            }
            const tblCobas = yield database_1.prismaClient.tblCoba.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.tblCoba.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: tblCobas.map(tblCoba => (0, TblCoba_model_1.toTblCobaResponse)(tblCoba)),
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
exports.TblCobaService = TblCobaService;
