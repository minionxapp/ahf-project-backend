"use strict";
//Create Service Akademi-service.ts
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
exports.AkademiService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Akademi_model_1 = require("../model/Akademi-model");
const Akademi_validation_1 = require("../validation/Akademi-validation");
const validation_1 = require("../validation/validation");
class AkademiService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Akademi_validation_1.AkademiValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.username }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const akademi = yield database_1.prismaClient.akademi.create({
                data: record
            });
            return (0, Akademi_model_1.toAkademiResponse)(akademi);
        });
    }
    // CEK EXIST
    //function untuk getAkademi biar bisa dipakai berulang
    static checkAkademiMustexist(akademiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const akademi = yield database_1.prismaClient.akademi.findFirst({
                where: {
                    id: akademiId,
                    //create_by: user.username
                }
            });
            if (!akademi) {
                throw new response_error_1.ResponseError(404, "Akademi not found");
            }
            return akademi;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const akademi = yield this.checkAkademiMustexist(id);
            return (0, Akademi_model_1.toAkademiResponse)(akademi);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Akademi_validation_1.AkademiValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.username }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Akademi ada atau tidak
            yield this.checkAkademiMustexist(request.id);
            const akademi = yield database_1.prismaClient.akademi.update({
                where: {
                    id: updateRequest.id,
                    create_by: user.username
                },
                data: record
            });
            return (0, Akademi_model_1.toAkademiResponse)(akademi);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAkademiMustexist(id);
            const akademi = yield database_1.prismaClient.akademi.delete({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            return akademi;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Akademi_validation_1.AkademiValidation.SEARCH, request);
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
            const akademis = yield database_1.prismaClient.akademi.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.akademi.count({
                where: {
                    create_by: user.username,
                    AND: filters
                },
            });
            return {
                data: akademis.map(akademi => (0, Akademi_model_1.toAkademiResponse)(akademi)),
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
            const akademi = yield database_1.prismaClient.akademi.findFirst({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            if (!akademi) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return akademi;
        });
    } // console.log(servicex)
    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getKode(user, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const akademi = yield database_1.prismaClient.akademi.findMany({
                where: {
                    kode: kode,
                    create_by: user.username
                }
            });
            if (!akademi) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return akademi;
        });
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getNama(user, nama) {
        return __awaiter(this, void 0, void 0, function* () {
            const akademi = yield database_1.prismaClient.akademi.findMany({
                where: {
                    nama: nama,
                    create_by: user.username
                }
            });
            if (!akademi) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return akademi;
        });
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getAktive(user, aktive) {
        return __awaiter(this, void 0, void 0, function* () {
            const akademi = yield database_1.prismaClient.akademi.findMany({
                where: {
                    aktive: aktive,
                    // create_by: user.username
                }
            });
            if (!akademi) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return akademi;
        });
    }
}
exports.AkademiService = AkademiService;
