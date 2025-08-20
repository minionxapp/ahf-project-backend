"use strict";
//Create Service TipeTraining-service.ts
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
exports.TipeTrainingService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const TipeTraining_model_1 = require("../model/TipeTraining-model");
const TipeTraining_validation_1 = require("../validation/TipeTraining-validation");
const validation_1 = require("../validation/validation");
class TipeTrainingService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(TipeTraining_validation_1.TipeTrainingValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const tipeTraining = yield database_1.prismaClient.tipeTraining.create({
                data: record
            });
            return (0, TipeTraining_model_1.toTipeTrainingResponse)(tipeTraining);
        });
    }
    // CEK EXIST
    //function untuk getTipeTraining biar bisa dipakai berulang
    static checkTipeTrainingMustexist(tipeTrainingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipeTraining = yield database_1.prismaClient.tipeTraining.findFirst({
                where: {
                    id: tipeTrainingId,
                }
            });
            if (!tipeTraining) {
                throw new response_error_1.ResponseError(404, "TipeTraining not found");
            }
            return tipeTraining;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipeTraining = yield this.checkTipeTrainingMustexist(id);
            return (0, TipeTraining_model_1.toTipeTrainingResponse)(tipeTraining);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(TipeTraining_validation_1.TipeTrainingValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek TipeTraining ada atau tidak
            yield this.checkTipeTrainingMustexist(request.id);
            const tipeTraining = yield database_1.prismaClient.tipeTraining.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, TipeTraining_model_1.toTipeTrainingResponse)(tipeTraining);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTipeTrainingMustexist(id);
            const tipeTraining = yield database_1.prismaClient.tipeTraining.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return tipeTraining;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(TipeTraining_validation_1.TipeTrainingValidation.SEARCH, request);
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
            const tipeTrainings = yield database_1.prismaClient.tipeTraining.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.tipeTraining.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: tipeTrainings.map(tipeTraining => (0, TipeTraining_model_1.toTipeTrainingResponse)(tipeTraining)),
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
exports.TipeTrainingService = TipeTrainingService;
