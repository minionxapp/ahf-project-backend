"use strict";
//Create Service SubJobFamily-service.ts
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
exports.SubJobFamilyService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const SubJobFamily_model_1 = require("../model/SubJobFamily-model");
const SubJobFamily_validation_1 = require("../validation/SubJobFamily-validation");
const validation_1 = require("../validation/validation");
class SubJobFamilyService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(SubJobFamily_validation_1.SubJobFamilyValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.subJobFamily.count({
                where: {
                    kode: createRequest.kode,
                    //       create_by: user.username
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.username }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const subJobFamily = yield database_1.prismaClient.subJobFamily.create({
                data: record
            });
            return (0, SubJobFamily_model_1.toSubJobFamilyResponse)(subJobFamily);
        });
    }
    // CEK EXIST
    //function untuk getSubJobFamily biar bisa dipakai berulang
    static checkSubJobFamilyMustexist(subJobFamilyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findFirst({
                where: {
                    id: subJobFamilyId,
                    //create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "SubJobFamily not found");
            }
            return subJobFamily;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield this.checkSubJobFamilyMustexist(id);
            return (0, SubJobFamily_model_1.toSubJobFamilyResponse)(subJobFamily);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(SubJobFamily_validation_1.SubJobFamilyValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.username }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek SubJobFamily ada atau tidak
            yield this.checkSubJobFamilyMustexist(request.id);
            const subJobFamily = yield database_1.prismaClient.subJobFamily.update({
                where: {
                    id: updateRequest.id,
                    create_by: user.username
                },
                data: record
            });
            return (0, SubJobFamily_model_1.toSubJobFamilyResponse)(subJobFamily);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkSubJobFamilyMustexist(id);
            const subJobFamily = yield database_1.prismaClient.subJobFamily.delete({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            return subJobFamily;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(SubJobFamily_validation_1.SubJobFamilyValidation.SEARCH, request);
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
            // check if kode_jf exists
            if (searchRequest.kode_jf) {
                filters.push({
                    kode_jf: {
                        contains: searchRequest.kode_jf
                    }
                });
            }
            // check if nama_jf exists
            if (searchRequest.nama_jf) {
                filters.push({
                    nama_jf: {
                        contains: searchRequest.nama_jf
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
            const subJobFamilys = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.subJobFamily.count({
                where: {
                    create_by: user.username,
                    AND: filters
                },
            });
            return {
                data: subJobFamilys.map(subJobFamily => (0, SubJobFamily_model_1.toSubJobFamilyResponse)(subJobFamily)),
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
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findFirst({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    } // console.log(servicex)
    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getKode(user, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    kode: kode,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getNama(user, nama) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    nama: nama,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    }
    //By kolom kode_jf (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getKode_jf(user, kode_jf) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    kode_jf: kode_jf,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    }
    //By kolom nama_jf (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getNama_jf(user, nama_jf) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    nama_jf: nama_jf,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getAktive(user, aktive) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    aktive: aktive,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    }
    //By kolom urutan (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getUrutan(user, urutan) {
        return __awaiter(this, void 0, void 0, function* () {
            const subJobFamily = yield database_1.prismaClient.subJobFamily.findMany({
                where: {
                    urutan: urutan,
                    create_by: user.username
                }
            });
            if (!subJobFamily) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return subJobFamily;
        });
    }
}
exports.SubJobFamilyService = SubJobFamilyService;
