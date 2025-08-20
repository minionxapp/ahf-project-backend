"use strict";
//Create Service Seq-service.ts
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
exports.SeqService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Seq_model_1 = require("../model/Seq-model");
const Seq_validation_1 = require("../validation/Seq-validation");
const validation_1 = require("../validation/validation");
class SeqService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Seq_validation_1.SeqValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const seq = yield database_1.prismaClient.seq.create({
                data: record
            });
            return (0, Seq_model_1.toSeqResponse)(seq);
        });
    }
    // CEK EXIST
    //function untuk getSeq biar bisa dipakai berulang
    static checkSeqMustexist(seqId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seq = yield database_1.prismaClient.seq.findFirst({
                where: {
                    id: seqId,
                }
            });
            if (!seq) {
                throw new response_error_1.ResponseError(404, "Seq not found");
            }
            return seq;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const seq = yield this.checkSeqMustexist(id);
            return (0, Seq_model_1.toSeqResponse)(seq);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Seq_validation_1.SeqValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Seq ada atau tidak
            yield this.checkSeqMustexist(request.id);
            const seq = yield database_1.prismaClient.seq.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, Seq_model_1.toSeqResponse)(seq);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkSeqMustexist(id);
            const seq = yield database_1.prismaClient.seq.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return seq;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Seq_validation_1.SeqValidation.SEARCH, request);
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
            // check if desc exists
            if (searchRequest.desc) {
                filters.push({
                    desc: {
                        contains: searchRequest.desc
                    }
                });
            }
            const seqs = yield database_1.prismaClient.seq.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.seq.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: seqs.map(seq => (0, Seq_model_1.toSeqResponse)(seq)),
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
exports.SeqService = SeqService;
