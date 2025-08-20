"use strict";
//Create Service Kompetensi-service.ts
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
exports.KompetensiService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Kompetensi_model_1 = require("../model/Kompetensi-model");
const Kompetensi_validation_1 = require("../validation/Kompetensi-validation");
const validation_1 = require("../validation/validation");
class KompetensiService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Kompetensi_validation_1.KompetensiValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.kompetensi.count({
                where: {
                    kode: createRequest.kode
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const kompetensi = yield database_1.prismaClient.kompetensi.create({
                data: record
            });
            return (0, Kompetensi_model_1.toKompetensiResponse)(kompetensi);
        });
    }
    // CEK EXIST
    //function untuk getKompetensi biar bisa dipakai berulang
    static checkKompetensiMustexist(kompetensiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const kompetensi = yield database_1.prismaClient.kompetensi.findFirst({
                where: {
                    id: kompetensiId,
                }
            });
            if (!kompetensi) {
                throw new response_error_1.ResponseError(404, "Kompetensi not found");
            }
            return kompetensi;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const kompetensi = yield this.checkKompetensiMustexist(id);
            return (0, Kompetensi_model_1.toKompetensiResponse)(kompetensi);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Kompetensi_validation_1.KompetensiValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Kompetensi ada atau tidak
            yield this.checkKompetensiMustexist(request.id);
            const kompetensi = yield database_1.prismaClient.kompetensi.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, Kompetensi_model_1.toKompetensiResponse)(kompetensi);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkKompetensiMustexist(id);
            const kompetensi = yield database_1.prismaClient.kompetensi.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return kompetensi;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Kompetensi_validation_1.KompetensiValidation.SEARCH, request);
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
            // check if kode_job_family exists
            if (searchRequest.kode_job_family) {
                filters.push({
                    kode_job_family: {
                        contains: searchRequest.kode_job_family
                    }
                });
            }
            // check if kode_sub_job_family exists
            if (searchRequest.kode_sub_job_family) {
                filters.push({
                    kode_sub_job_family: {
                        contains: searchRequest.kode_sub_job_family
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
            // check if desc exists
            if (searchRequest.desc) {
                filters.push({
                    desc: {
                        contains: searchRequest.desc
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
            const kompetensis = yield database_1.prismaClient.kompetensi.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.kompetensi.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: kompetensis.map(kompetensi => (0, Kompetensi_model_1.toKompetensiResponse)(kompetensi)),
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
exports.KompetensiService = KompetensiService;
