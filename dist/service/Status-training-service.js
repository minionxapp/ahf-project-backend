"use strict";
//Create Service StatusTraining-service.ts
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
exports.StatusTrainingService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const StatusTraining_model_1 = require("../model/StatusTraining-model");
const StatusTraining_validation_1 = require("../validation/StatusTraining-validation");
const validation_1 = require("../validation/validation");
class StatusTrainingService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(StatusTraining_validation_1.StatusTrainingValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.statusTraining.count({
                where: {
                    kode: createRequest.kode
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const statusTraining = yield database_1.prismaClient.statusTraining.create({
                data: record
            });
            return (0, StatusTraining_model_1.toStatusTrainingResponse)(statusTraining);
        });
    }
    // CEK EXIST
    //function untuk getStatusTraining biar bisa dipakai berulang
    static checkStatusTrainingMustexist(statusTrainingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusTraining = yield database_1.prismaClient.statusTraining.findFirst({
                where: {
                    id: statusTrainingId,
                }
            });
            if (!statusTraining) {
                throw new response_error_1.ResponseError(404, "StatusTraining not found");
            }
            return statusTraining;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusTraining = yield this.checkStatusTrainingMustexist(id);
            return (0, StatusTraining_model_1.toStatusTrainingResponse)(statusTraining);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(StatusTraining_validation_1.StatusTrainingValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek StatusTraining ada atau tidak
            yield this.checkStatusTrainingMustexist(request.id);
            const statusTraining = yield database_1.prismaClient.statusTraining.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, StatusTraining_model_1.toStatusTrainingResponse)(statusTraining);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkStatusTrainingMustexist(id);
            const statusTraining = yield database_1.prismaClient.statusTraining.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return statusTraining;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(StatusTraining_validation_1.StatusTrainingValidation.SEARCH, request);
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
            // check if desc exists
            if (searchRequest.desc) {
                filters.push({
                    desc: {
                        contains: searchRequest.desc
                    }
                });
            }
            const statusTrainings = yield database_1.prismaClient.statusTraining.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.statusTraining.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: statusTrainings.map(statusTraining => (0, StatusTraining_model_1.toStatusTrainingResponse)(statusTraining)),
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
exports.StatusTrainingService = StatusTrainingService;
