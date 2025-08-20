"use strict";
//Create Controller SubKompetensi-controller.ts
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
exports.SubKompetensiController = void 0;
const SubKompetensi_service_1 = require("../service/SubKompetensi-service");
class SubKompetensiController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield SubKompetensi_service_1.SubKompetensiService.create(req.user, request);
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
                const subKompetensiId = Number(req.params.subKompetensiId);
                const response = yield SubKompetensi_service_1.SubKompetensiService.get(req.user, subKompetensiId);
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
                request.id = Number(req.params.subKompetensiId);
                const response = yield SubKompetensi_service_1.SubKompetensiService.update(req.user, request);
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
                const subKompetensiId = Number(req.params.subKompetensiId);
                const response = yield SubKompetensi_service_1.SubKompetensiService.remove(req.user, subKompetensiId);
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
                    kode_sub_job_family: req.query.kode_sub_job_family,
                    nama: req.query.nama,
                    desc: req.query.desc,
                    status: req.query.status,
                    kode_kompetensi: req.query.kode_kompetensi,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield SubKompetensi_service_1.SubKompetensiService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.SubKompetensiController = SubKompetensiController;
