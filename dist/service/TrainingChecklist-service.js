"use strict";
//Create Service TrainingChecklist-service.ts
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
exports.TrainingChecklistService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const TrainingChecklist_model_1 = require("../model/TrainingChecklist-model");
const TrainingChecklist_validation_1 = require("../validation/TrainingChecklist-validation");
const validation_1 = require("../validation/validation");
class TrainingChecklistService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(TrainingChecklist_validation_1.TrainingChecklistValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const trainingChecklist = yield database_1.prismaClient.trainingChecklist.create({
                data: record
            });
            return (0, TrainingChecklist_model_1.toTrainingChecklistResponse)(trainingChecklist);
        });
    }
    // CEK EXIST
    //function untuk getTrainingChecklist biar bisa dipakai berulang
    static checkTrainingChecklistMustexist(trainingChecklistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingChecklist = yield database_1.prismaClient.trainingChecklist.findFirst({
                where: {
                    id: trainingChecklistId,
                }
            });
            if (!trainingChecklist) {
                throw new response_error_1.ResponseError(404, "TrainingChecklist not found");
            }
            return trainingChecklist;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingChecklist = yield this.checkTrainingChecklistMustexist(id);
            return (0, TrainingChecklist_model_1.toTrainingChecklistResponse)(trainingChecklist);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(TrainingChecklist_validation_1.TrainingChecklistValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek TrainingChecklist ada atau tidak
            yield this.checkTrainingChecklistMustexist(request.id);
            const trainingChecklist = yield database_1.prismaClient.trainingChecklist.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, TrainingChecklist_model_1.toTrainingChecklistResponse)(trainingChecklist);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTrainingChecklistMustexist(id);
            const trainingChecklist = yield database_1.prismaClient.trainingChecklist.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return trainingChecklist;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(TrainingChecklist_validation_1.TrainingChecklistValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if training_kode exists
            if (searchRequest.training_kode) {
                filters.push({
                    training_kode: {
                        contains: searchRequest.training_kode
                    }
                });
            }
            // check if checklist_kode exists
            if (searchRequest.checklist_kode) {
                filters.push({
                    checklist_kode: {
                        contains: searchRequest.checklist_kode
                    }
                });
            }
            // check if file_1 exists
            if (searchRequest.file_1) {
                filters.push({
                    file_1: {
                        contains: searchRequest.file_1
                    }
                });
            }
            // check if file_2 exists
            if (searchRequest.file_2) {
                filters.push({
                    file_2: {
                        contains: searchRequest.file_2
                    }
                });
            }
            // check if file_3 exists
            if (searchRequest.file_3) {
                filters.push({
                    file_3: {
                        contains: searchRequest.file_3
                    }
                });
            }
            // check if file_4 exists
            if (searchRequest.file_4) {
                filters.push({
                    file_4: {
                        contains: searchRequest.file_4
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
            // check if checklist_name exists
            if (searchRequest.checklist_name) {
                filters.push({
                    checklist_name: {
                        contains: searchRequest.checklist_name
                    }
                });
            }
            const trainingChecklists = yield database_1.prismaClient.trainingChecklist.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.trainingChecklist.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: trainingChecklists.map(trainingChecklist => (0, TrainingChecklist_model_1.toTrainingChecklistResponse)(trainingChecklist)),
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
exports.TrainingChecklistService = TrainingChecklistService;
