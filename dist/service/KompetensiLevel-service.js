"use strict";
//Create Service KompetensiLevel-service.ts
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
exports.KompetensiLevelService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const KompetensiLevel_model_1 = require("../model/KompetensiLevel-model");
const KompetensiLevel_validation_1 = require("../validation/KompetensiLevel-validation");
const validation_1 = require("../validation/validation");
class KompetensiLevelService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(KompetensiLevel_validation_1.KompetensiLevelValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const kompetensiLevel = yield database_1.prismaClient.kompetensiLevel.create({
                data: record
            });
            return (0, KompetensiLevel_model_1.toKompetensiLevelResponse)(kompetensiLevel);
        });
    }
    // CEK EXIST
    //function untuk getKompetensiLevel biar bisa dipakai berulang
    static checkKompetensiLevelMustexist(kompetensiLevelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const kompetensiLevel = yield database_1.prismaClient.kompetensiLevel.findFirst({
                where: {
                    id: kompetensiLevelId,
                }
            });
            if (!kompetensiLevel) {
                throw new response_error_1.ResponseError(404, "KompetensiLevel not found");
            }
            return kompetensiLevel;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const kompetensiLevel = yield this.checkKompetensiLevelMustexist(id);
            return (0, KompetensiLevel_model_1.toKompetensiLevelResponse)(kompetensiLevel);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(KompetensiLevel_validation_1.KompetensiLevelValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek KompetensiLevel ada atau tidak
            yield this.checkKompetensiLevelMustexist(request.id);
            const kompetensiLevel = yield database_1.prismaClient.kompetensiLevel.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, KompetensiLevel_model_1.toKompetensiLevelResponse)(kompetensiLevel);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkKompetensiLevelMustexist(id);
            const kompetensiLevel = yield database_1.prismaClient.kompetensiLevel.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return kompetensiLevel;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(KompetensiLevel_validation_1.KompetensiLevelValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if kode exists
            if (searchRequest.kode) {
                filters.push({
                    kode: {
                        contains: searchRequest.kode
                    }
                });
            }
            // check if nama exists
            if (searchRequest.nama) {
                filters.push({
                    nama: {
                        contains: searchRequest.nama
                    }
                });
            }
            // check if status exists
            if (searchRequest.status) {
                filters.push({
                    status: {
                        contains: searchRequest.status
                    }
                });
            }
            const kompetensiLevels = yield database_1.prismaClient.kompetensiLevel.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.kompetensiLevel.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: kompetensiLevels.map(kompetensiLevel => (0, KompetensiLevel_model_1.toKompetensiLevelResponse)(kompetensiLevel)),
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
exports.KompetensiLevelService = KompetensiLevelService;
