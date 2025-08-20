"use strict";
//Create Service UserAkademi-service.ts
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
exports.UserAkademiService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const UserAkademi_model_1 = require("../model/UserAkademi-model");
const UserAkademi_validation_1 = require("../validation/UserAkademi-validation");
const validation_1 = require("../validation/validation");
class UserAkademiService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(UserAkademi_validation_1.UserAkademiValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const userAkademi = yield database_1.prismaClient.userAkademi.create({
                data: record
            });
            return (0, UserAkademi_model_1.toUserAkademiResponse)(userAkademi);
        });
    }
    // CEK EXIST
    //function untuk getUserAkademi biar bisa dipakai berulang
    static checkUserAkademiMustexist(userAkademiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAkademi = yield database_1.prismaClient.userAkademi.findFirst({
                where: {
                    id: userAkademiId,
                }
            });
            if (!userAkademi) {
                throw new response_error_1.ResponseError(404, "UserAkademi not found");
            }
            return userAkademi;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAkademi = yield this.checkUserAkademiMustexist(id);
            return (0, UserAkademi_model_1.toUserAkademiResponse)(userAkademi);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(UserAkademi_validation_1.UserAkademiValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek UserAkademi ada atau tidak
            yield this.checkUserAkademiMustexist(request.id);
            const userAkademi = yield database_1.prismaClient.userAkademi.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, UserAkademi_model_1.toUserAkademiResponse)(userAkademi);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkUserAkademiMustexist(id);
            const userAkademi = yield database_1.prismaClient.userAkademi.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return userAkademi;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(UserAkademi_validation_1.UserAkademiValidation.SEARCH, request);
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
            // check if kode_akademi exists
            if (searchRequest.kode_akademi) {
                filters.push({
                    kode_akademi: {
                        contains: searchRequest.kode_akademi
                    }
                });
            }
            const userAkademis = yield database_1.prismaClient.userAkademi.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.userAkademi.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: userAkademis.map(userAkademi => (0, UserAkademi_model_1.toUserAkademiResponse)(userAkademi)),
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
exports.UserAkademiService = UserAkademiService;
