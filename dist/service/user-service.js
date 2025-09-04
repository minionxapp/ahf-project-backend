"use strict";
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
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const inspector_1 = require("inspector");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            //validasi
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            //cek user name
            const totalUserWithSameUsername = yield database_1.prismaClient.user.count({
                where: {
                    username: registerRequest.username
                }
            });
            if (totalUserWithSameUsername != 0) {
                throw new response_error_1.ResponseError(400, "Username already axist");
            }
            //ubah password pake bcrypt
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            //simpan
            const user = yield database_1.prismaClient.user.create({
                data: registerRequest
            });
            //balikannya
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            //validasi
            const lognRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            //cek database
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: lognRequest.username
                }
            });
            //user tidak ditemukan
            if (!user) {
                throw new response_error_1.ResponseError(401, "Username or password is wrong");
            }
            //cek compare password request vs database
            const isPasswordValid = yield bcrypt_1.default.compare(lognRequest.password, user.password);
            //password not match
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "Username or password is wrong");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    username: lognRequest.username
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static getbyusername(user, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userfind = yield this.checkUserMustexist(username);
            inspector_1.console.log("getuserbyname ............." + username);
            inspector_1.console.log(userfind);
            return (0, user_model_1.toUserResponse)(userfind);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            //validasi
            inspector_1.console.log("==============================");
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            inspector_1.console.log(JSON.stringify(updateRequest));
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            const result = yield database_1.prismaClient.user.update({
                where: {
                    username: updateRequest.username
                },
                data: record
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username
                },
                data: {
                    token: null
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(user_validation_1.UserValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
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
            const users = yield database_1.prismaClient.user.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.user.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: users.map(user => (0, user_model_1.toUserResponse)(user)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size,
                    total_rows: total
                }
            };
        });
    }
    //REMOVE by Id
    static remove(user, username) {
        return __awaiter(this, void 0, void 0, function* () {
            inspector_1.console;
            yield this.checkUserMustexist(username);
            const userdel = yield database_1.prismaClient.user.delete({
                where: {
                    // id: id,
                    username: username
                }
            });
            return userdel;
        });
    }
    // CEK EXIST
    //function untuk getUser biar bisa dipakai berulang
    static checkUserMustexist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findFirst({
                where: {
                    // id: userId,
                    username: username
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(404, "User not found");
            }
            return user;
        });
    }
}
exports.UserService = UserService;
