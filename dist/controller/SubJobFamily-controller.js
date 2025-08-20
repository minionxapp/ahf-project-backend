"use strict";
//Create Controller SubJobFamily-controller.ts
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
exports.SubJobFamilyController = void 0;
const SubJobFamily_service_1 = require("../service/SubJobFamily-service");
class SubJobFamilyController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield SubJobFamily_service_1.SubJobFamilyService.create(req.user, request);
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
                const subJobFamilyId = Number(req.params.subJobFamilyId);
                const response = yield SubJobFamily_service_1.SubJobFamilyService.get(req.user, subJobFamilyId);
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
                request.id = Number(req.params.subJobFamilyId);
                const response = yield SubJobFamily_service_1.SubJobFamilyService.update(req.user, request);
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
                const subJobFamilyId = Number(req.params.subJobFamilyId);
                const response = yield SubJobFamily_service_1.SubJobFamilyService.remove(req.user, subJobFamilyId);
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
                    kode: req.query.kode,
                    kode_job_family: req.query.kode_job_family,
                    nama: req.query.nama,
                    desc: req.query.desc,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield SubJobFamily_service_1.SubJobFamilyService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.SubJobFamilyController = SubJobFamilyController;
