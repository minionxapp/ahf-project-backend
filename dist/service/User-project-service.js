"use strict";
//Create Service UserProject-service.ts
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
exports.UserProjectService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const User_project_model_1 = require("../model/User-project-model");
const User_project_validation_1 = require("../validation/User-project-validation");
const validation_1 = require("../validation/validation");
class UserProjectService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(User_project_validation_1.UserProjectValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            //cek apakah sudah ada atau belum (username dan project_id)
            const check = yield this.checkProjectUsernameMustexist(request.project_id, request.username);
            if (check) {
                throw new response_error_1.ResponseError(400, "Username sudah ada di project");
            }
            const userProject = yield database_1.prismaClient.userProject.create({
                data: record
            });
            return (0, User_project_model_1.toUserProjectResponse)(userProject);
        });
    }
    static checkProjectUsernameMustexist(project_id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userProject = yield database_1.prismaClient.userProject.findFirst({
                where: {
                    project_id: project_id,
                    username: username
                }
            });
            return userProject;
        });
    }
    // CEK EXIST
    //function untuk getUserProject biar bisa dipakai berulang
    static checkUserProjectMustexist(userProjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userProject = yield database_1.prismaClient.userProject.findFirst({
                where: {
                    id: userProjectId,
                }
            });
            if (!userProject) {
                throw new response_error_1.ResponseError(404, "UserProject not found");
            }
            return userProject;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userProject = yield this.checkUserProjectMustexist(id);
            return (0, User_project_model_1.toUserProjectResponse)(userProject);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(User_project_validation_1.UserProjectValidation.UPDATE, request);
            // console.log(updateRequest)
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek UserProject ada atau tidak
            yield this.checkUserProjectMustexist(request.id);
            const userProject = yield database_1.prismaClient.userProject.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, User_project_model_1.toUserProjectResponse)(userProject);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkUserProjectMustexist(id);
            const userProject = yield database_1.prismaClient.userProject.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return userProject;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(User_project_validation_1.UserProjectValidation.SEARCH, request);
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
            // check if status exists
            if (searchRequest.status) {
                filters.push({
                    status: {
                        contains: searchRequest.status
                    }
                });
            }
            const userProjects = yield database_1.prismaClient.userProject.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.userProject.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: userProjects.map(userProject => (0, User_project_model_1.toUserProjectResponse)(userProject)),
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
exports.UserProjectService = UserProjectService;
