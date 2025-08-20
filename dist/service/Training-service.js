"use strict";
//Create Service Training-service.ts
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
exports.TrainingService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Training_model_1 = require("../model/Training-model");
const Training_validation_1 = require("../validation/Training-validation");
const validation_1 = require("../validation/validation");
const util_1 = require("../util/util");
class TrainingService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Training_validation_1.TrainingValidation.CREATE, request);
            let tgl_mulai = request.tgl_mulai; //"2025-12-31"
            request.tgl_mulai = new Date(tgl_mulai);
            let tgl_akhir = request.tgl_akhir; //"2025-12-31"
            request.tgl_akhir = new Date(tgl_akhir);
            const totalkodeUniq = yield database_1.prismaClient.training.count({
                where: {
                    kode: createRequest.kode
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            //set kodeTraining
            const nomorTraning = yield util_1.Util.setKodeTraining(createRequest.akademi);
            // console.log(nomorTraning)
            createRequest.kode = nomorTraning;
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const training = yield database_1.prismaClient.training.create({
                data: record
            });
            //set ceklist training
            const ceklists = yield database_1.prismaClient.checklist.findMany({
                where: {
                    group: "TRAINING"
                }
            });
            for (let index = 0; index < ceklists.length; index++) {
                const element = ceklists[index];
                const trainingCeklist = yield database_1.prismaClient.trainingChecklist.create({
                    data: {
                        training_kode: nomorTraning,
                        checklist_kode: element.kode,
                        create_by: user.name,
                        file_1: '',
                        file_2: '',
                        file_3: '',
                        file_4: '',
                        status: 'N',
                        checklist_name: element.nama
                    }
                });
            }
            return (0, Training_model_1.toTrainingResponse)(training);
        });
    }
    // CEK EXIST
    //function untuk getTraining biar bisa dipakai berulang
    static checkTrainingMustexist(trainingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const training = yield database_1.prismaClient.training.findFirst({
                where: {
                    id: trainingId,
                }
            });
            if (!training) {
                throw new response_error_1.ResponseError(404, "Training not found");
            }
            return training;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const training = yield this.checkTrainingMustexist(id);
            return (0, Training_model_1.toTrainingResponse)(training);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Training_validation_1.TrainingValidation.UPDATE, request);
            let tgl_mulai = request.tgl_mulai; //"2025-12-31"
            request.tgl_mulai = new Date(tgl_mulai);
            let tgl_akhir = request.tgl_akhir; //"2025-12-31"
            request.tgl_akhir = new Date(tgl_akhir);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Training ada atau tidak
            yield this.checkTrainingMustexist(request.id);
            const training = yield database_1.prismaClient.training.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, Training_model_1.toTrainingResponse)(training);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTrainingMustexist(id);
            const training = yield database_1.prismaClient.training.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return training;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Training_validation_1.TrainingValidation.SEARCH, request);
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
            // check if akademi exists
            if (searchRequest.akademi) {
                filters.push({
                    akademi: {
                        contains: searchRequest.akademi
                    }
                });
            }
            // check if tipe exists
            if (searchRequest.tipe) {
                filters.push({
                    tipe: {
                        contains: searchRequest.tipe
                    }
                });
            }
            // check if pic exists
            if (searchRequest.pic) {
                filters.push({
                    pic: {
                        contains: searchRequest.pic
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
            // check if kompetensi exists
            if (searchRequest.kompetensi) {
                filters.push({
                    kompetensi: {
                        contains: searchRequest.kompetensi
                    }
                });
            }
            // check if sub_kompetensi exists
            if (searchRequest.sub_kompetensi) {
                filters.push({
                    sub_kompetensi: {
                        contains: searchRequest.sub_kompetensi
                    }
                });
            }
            // check if status_training exists
            if (searchRequest.status_training) {
                filters.push({
                    status_training: {
                        contains: searchRequest.status_training
                    }
                });
            }
            // check if kode_job_family exists
            if (searchRequest.kode_job_family) {
                filters.push({
                    kode_job_family: {
                        contains: searchRequest.kode_job_family
                    }
                });
            }
            // check if kode_sub_job_family exists
            if (searchRequest.kode_sub_job_family) {
                filters.push({
                    kode_sub_job_family: {
                        contains: searchRequest.kode_sub_job_family
                    }
                });
            }
            const trainings = yield database_1.prismaClient.training.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.training.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: trainings.map(training => (0, Training_model_1.toTrainingResponse)(training)),
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
exports.TrainingService = TrainingService;
