"use strict";
//Create Service Pmakai-service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmakaiService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Pmakai_model_1 = require("../model/Pmakai-model");
const Pmakai_validation_1 = require("../validation/Pmakai-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
class PmakaiService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Pmakai_validation_1.PmakaiValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            let expired = request.expired; //"2025-12-31"
            request.expired = new Date(expired);
            createRequest.password = yield bcrypt_1.default.hash(request.password, 10);
            const totalusernameUniq = yield database_1.prismaClient.pmakai.count({
                where: {
                    username: createRequest.username
                }
            });
            if (totalusernameUniq != 0) {
                throw new response_error_1.ResponseError(400, "username already axist");
            }
            const totalemailUniq = yield database_1.prismaClient.pmakai.count({
                where: {
                    email: createRequest.email
                }
            });
            if (totalemailUniq != 0) {
                throw new response_error_1.ResponseError(400, "email already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const pmakai = yield database_1.prismaClient.pmakai.create({
                data: record
            });
            return (0, Pmakai_model_1.toPmakaiResponse)(pmakai);
        });
    }
    // CEK EXIST
    //function untuk getPmakai biar bisa dipakai berulang
    static checkPmakaiMustexist(pmakaiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pmakai = yield database_1.prismaClient.pmakai.findFirst({
                where: {
                    id: pmakaiId,
                }
            });
            if (!pmakai) {
                throw new response_error_1.ResponseError(404, "Pmakai not found");
            }
            return pmakai;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pmakai = yield this.checkPmakaiMustexist(id);
            return (0, Pmakai_model_1.toPmakaiResponse)(pmakai);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Pmakai_validation_1.PmakaiValidation.UPDATE, request);
            let expired = request.expired; //"2025-12-31"
            request.expired = new Date(expired);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Pmakai ada atau tidak
            yield this.checkPmakaiMustexist(request.id);
            const pmakai = yield database_1.prismaClient.pmakai.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, Pmakai_model_1.toPmakaiResponse)(pmakai);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkPmakaiMustexist(id);
            const pmakai = yield database_1.prismaClient.pmakai.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return pmakai;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Pmakai_validation_1.PmakaiValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if username exists
            if (searchRequest.username) {
                filters.push({
                    username: {
                        contains: searchRequest.username
                    }
                });
            }
            // check if password exists
            if (searchRequest.password) {
                filters.push({
                    password: {
                        contains: searchRequest.password
                    }
                });
            }
            // check if name exists
            if (searchRequest.name) {
                filters.push({
                    name: {
                        contains: searchRequest.name
                    }
                });
            }
            // check if token exists
            if (searchRequest.token) {
                filters.push({
                    token: {
                        contains: searchRequest.token
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
            // check if email exists
            if (searchRequest.email) {
                filters.push({
                    email: {
                        contains: searchRequest.email
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
            const pmakais = yield database_1.prismaClient.pmakai.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.pmakai.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: pmakais.map(pmakai => (0, Pmakai_model_1.toPmakaiResponse)(pmakai)),
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
exports.PmakaiService = PmakaiService;
