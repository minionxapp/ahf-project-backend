"use strict";
//Create Service Checklist-service.ts
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
exports.ChecklistService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Checklist_model_1 = require("../model/Checklist-model");
const Checklist_validation_1 = require("../validation/Checklist-validation");
const validation_1 = require("../validation/validation");
class ChecklistService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Checklist_validation_1.ChecklistValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.checklist.count({
                where: {
                    kode: createRequest.kode
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const checklist = yield database_1.prismaClient.checklist.create({
                data: record
            });
            return (0, Checklist_model_1.toChecklistResponse)(checklist);
        });
    }
    // CEK EXIST
    //function untuk getChecklist biar bisa dipakai berulang
    static checkChecklistMustexist(checklistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checklist = yield database_1.prismaClient.checklist.findFirst({
                where: {
                    id: checklistId,
                }
            });
            if (!checklist) {
                throw new response_error_1.ResponseError(404, "Checklist not found");
            }
            return checklist;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checklist = yield this.checkChecklistMustexist(id);
            return (0, Checklist_model_1.toChecklistResponse)(checklist);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Checklist_validation_1.ChecklistValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Checklist ada atau tidak
            yield this.checkChecklistMustexist(request.id);
            const checklist = yield database_1.prismaClient.checklist.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, Checklist_model_1.toChecklistResponse)(checklist);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkChecklistMustexist(id);
            const checklist = yield database_1.prismaClient.checklist.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return checklist;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Checklist_validation_1.ChecklistValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
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
            // check if kode exists
            if (searchRequest.kode) {
                filters.push({
                    kode: {
                        contains: searchRequest.kode
                    }
                });
            }
            // check if group exists
            if (searchRequest.group) {
                filters.push({
                    group: {
                        contains: searchRequest.group
                    }
                });
            }
            const checklists = yield database_1.prismaClient.checklist.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.checklist.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: checklists.map(checklist => (0, Checklist_model_1.toChecklistResponse)(checklist)),
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
exports.ChecklistService = ChecklistService;
