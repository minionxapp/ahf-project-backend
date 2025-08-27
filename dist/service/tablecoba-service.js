"use strict";
//Create Service TableCoba-service.ts
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
exports.TableCobaService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const TableCoba_model_1 = require("../model/TableCoba-model");
const TableCoba_validation_1 = require("../validation/TableCoba-validation");
const validation_1 = require("../validation/validation");
class TableCobaService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(TableCoba_validation_1.TableCobaValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.tableCoba.count({
                where: {
                    kode: createRequest.kode
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.username }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const tableCoba = yield database_1.prismaClient.tableCoba.create({
                data: record
            });
            return (0, TableCoba_model_1.toTableCobaResponse)(tableCoba);
        });
    }
    // CEK EXIST
    //function untuk getTableCoba biar bisa dipakai berulang
    static checkTableCobaMustexist(tableCobaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableCoba = yield database_1.prismaClient.tableCoba.findFirst({
                where: {
                    id: tableCobaId,
                }
            });
            if (!tableCoba) {
                throw new response_error_1.ResponseError(404, "TableCoba not found");
            }
            return tableCoba;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableCoba = yield this.checkTableCobaMustexist(id);
            return (0, TableCoba_model_1.toTableCobaResponse)(tableCoba);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(TableCoba_validation_1.TableCobaValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.username }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek TableCoba ada atau tidak
            yield this.checkTableCobaMustexist(request.id);
            const tableCoba = yield database_1.prismaClient.tableCoba.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, TableCoba_model_1.toTableCobaResponse)(tableCoba);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTableCobaMustexist(id);
            const tableCoba = yield database_1.prismaClient.tableCoba.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return tableCoba;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(TableCoba_validation_1.TableCobaValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if name exists
            if (searchRequest.name) {
                filters.push({
                    name: {
                        contains: searchRequest.name
                    }
                });
            }
            // check if kode exists
            if (searchRequest.kode) {
                filters.push({
                    kode: {
                        contains: searchRequest.kode
                    }
                });
            }
            const tableCobas = yield database_1.prismaClient.tableCoba.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.tableCoba.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: tableCobas.map(tableCoba => (0, TableCoba_model_1.toTableCobaResponse)(tableCoba)),
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
exports.TableCobaService = TableCobaService;
