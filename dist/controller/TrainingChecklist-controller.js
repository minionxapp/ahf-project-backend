"use strict";
//Create Controller TrainingChecklist-controller.ts
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
exports.TrainingChecklistController = void 0;
const TrainingChecklist_service_1 = require("../service/TrainingChecklist-service");
class TrainingChecklistController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield TrainingChecklist_service_1.TrainingChecklistService.create(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static get(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trainingChecklistId = Number(req.params.trainingChecklistId);
                const response = yield TrainingChecklist_service_1.TrainingChecklistService.get(req.user, trainingChecklistId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.trainingChecklistId);
                const response = yield TrainingChecklist_service_1.TrainingChecklistService.update(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static remove(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trainingChecklistId = Number(req.params.trainingChecklistId);
                const response = yield TrainingChecklist_service_1.TrainingChecklistService.remove(req.user, trainingChecklistId);
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    training_kode: req.query.training_kode,
                    checklist_kode: req.query.checklist_kode,
                    file_1: req.query.file_1,
                    file_2: req.query.file_2,
                    file_3: req.query.file_3,
                    file_4: req.query.file_4,
                    status: req.query.status,
                    checklist_name: req.query.checklist_name,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield TrainingChecklist_service_1.TrainingChecklistService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TrainingChecklistController = TrainingChecklistController;
