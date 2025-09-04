"use strict";
//Create Service DivisiDept-service.ts
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
exports.DivisiDeptService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const DivisiDept_model_1 = require("../model/DivisiDept-model");
const DivisiDept_validation_1 = require("../validation/DivisiDept-validation");
const validation_1 = require("../validation/validation");
class DivisiDeptService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(DivisiDept_validation_1.DivisiDeptValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.divisiDept.count({
                where: {
                    kode: createRequest.kode,
                    //       create_by: user.username
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.username }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const divisiDept = yield database_1.prismaClient.divisiDept.create({
                data: record
            });
            return (0, DivisiDept_model_1.toDivisiDeptResponse)(divisiDept);
        });
    }
    // CEK EXIST
    //function untuk getDivisiDept biar bisa dipakai berulang
    static checkDivisiDeptMustexist(divisiDeptId) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield database_1.prismaClient.divisiDept.findFirst({
                where: {
                    id: divisiDeptId,
                    //create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "DivisiDept not found");
            }
            return divisiDept;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield this.checkDivisiDeptMustexist(id);
            return (0, DivisiDept_model_1.toDivisiDeptResponse)(divisiDept);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(DivisiDept_validation_1.DivisiDeptValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.username }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek DivisiDept ada atau tidak
            yield this.checkDivisiDeptMustexist(request.id);
            const divisiDept = yield database_1.prismaClient.divisiDept.update({
                where: {
                    id: updateRequest.id,
                    create_by: user.username
                },
                data: record
            });
            return (0, DivisiDept_model_1.toDivisiDeptResponse)(divisiDept);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDivisiDeptMustexist(id);
            const divisiDept = yield database_1.prismaClient.divisiDept.delete({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            return divisiDept;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(DivisiDept_validation_1.DivisiDeptValidation.SEARCH, request);
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
            // check if divisi_kode exists
            if (searchRequest.divisi_kode) {
                filters.push({
                    divisi_kode: {
                        contains: searchRequest.divisi_kode
                    }
                });
            }
            // check if divisi_name exists
            if (searchRequest.divisi_name) {
                filters.push({
                    divisi_name: {
                        contains: searchRequest.divisi_name
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
            const divisiDepts = yield database_1.prismaClient.divisiDept.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.divisiDept.count({
                where: {
                    create_by: user.username,
                    AND: filters
                },
            });
            return {
                data: divisiDepts.map(divisiDept => (0, DivisiDept_model_1.toDivisiDeptResponse)(divisiDept)),
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
            const divisiDept = yield database_1.prismaClient.divisiDept.findFirst({
                where: {
                    id: id,
                    create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return divisiDept;
        });
    } // console.log(servicex)
    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getKode(user, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield database_1.prismaClient.divisiDept.findMany({
                where: {
                    kode: kode,
                    create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return divisiDept;
        });
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getNama(user, nama) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield database_1.prismaClient.divisiDept.findMany({
                where: {
                    nama: nama,
                    create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return divisiDept;
        });
    }
    //By kolom divisi_kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getDivisi_kode(user, divisi_kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield database_1.prismaClient.divisiDept.findMany({
                where: {
                    divisi_kode: divisi_kode,
                    create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return divisiDept;
        });
    }
    //By kolom divisi_name (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getDivisi_name(user, divisi_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield database_1.prismaClient.divisiDept.findMany({
                where: {
                    divisi_name: divisi_name,
                    create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return divisiDept;
        });
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static getAktive(user, aktive) {
        return __awaiter(this, void 0, void 0, function* () {
            const divisiDept = yield database_1.prismaClient.divisiDept.findMany({
                where: {
                    aktive: aktive,
                    create_by: user.username
                }
            });
            if (!divisiDept) {
                throw new response_error_1.ResponseError(404, "Data not found");
            }
            return divisiDept;
        });
    }
}
exports.DivisiDeptService = DivisiDeptService;
