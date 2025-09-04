"use strict";
//Create Service Level-service.ts
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
exports.LevelService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Level_model_1 = require("../model/Level-model");
const Level_validation_1 = require("../validation/Level-validation");
const validation_1 = require("../validation/validation");
class LevelService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Level_validation_1.LevelValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.level.count({
                where: {
                    kode: createRequest.kode,
                    //       create_by: user.username
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.username }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const level = yield database_1.prismaClient.level.create({
                data: record
            });
            return (0, Level_model_1.toLevelResponse)(level);
        });
    }
    // CEK EXIST
    //function untuk getLevel biar bisa dipakai berulang
    static checkLevelMustexist(levelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield database_1.prismaClient.level.findFirst({
                where: {
                    id: levelId,
                    //create_by: user.username
                }
            });
            if (!level) {
                throw new response_error_1.ResponseError(404, "Level not found");
            }
            return level;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield this.checkLevelMustexist(id);
            return (0, Level_model_1.toLevelResponse)(level);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Level_validation_1.LevelValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.username }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Level ada atau tidak
            yield this.checkLevelMustexist(request.id);
            const level = yield database_1.prismaClient.level.update({
                where: {
                    id: updateRequest.id,
                    create_by: user.username
                },
                data: record
            });
            return (0, Level_model_1.toLevelResponse)(level);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkLevelMustexist(id);
            const level = yield database_1.prismaClient.level.delete({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            return level;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Level_validation_1.LevelValidation.SEARCH, request);
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
            // check if aktive exists
            if (searchRequest.aktive) {
                filters.push({
                    aktive: {
                        contains: searchRequest.aktive
                    }
                });
            }
            const levels = yield database_1.prismaClient.level.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.level.count({
                where: {
                    create_by: user.username,
                    AND: filters
                },
            });
            return {
                data: levels.map(level => (0, Level_model_1.toLevelResponse)(level)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size,
                    total_rows: total
                }
            };
        });
    }
    //GET BY KOLOM //bikin berdasarka kolom yang ada
    //By ID (buat static--> hanya menghasilkan 1 row)
    static getId(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield database_1.prismaClient.level.findFirst({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            if (!level) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return level;
        });
    } // console.log(servicex)
    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getKode(user, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield database_1.prismaClient.level.findMany({
                where: {
                    kode: kode,
                    create_by: user.username
                }
            });
            if (!level) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return level;
        });
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getNama(user, nama) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield database_1.prismaClient.level.findMany({
                where: {
                    nama: nama,
                    create_by: user.username
                }
            });
            if (!level) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return level;
        });
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getAktive(user, aktive) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield database_1.prismaClient.level.findMany({
                where: {
                    aktive: aktive,
                    create_by: user.username
                }
            });
            if (!level) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return level;
        });
    }
    //By kolom urutan (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getUrutan(user, urutan) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield database_1.prismaClient.level.findMany({
                where: {
                    urutan: urutan,
                    create_by: user.username
                }
            });
            if (!level) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return level;
        });
    }
}
exports.LevelService = LevelService;
