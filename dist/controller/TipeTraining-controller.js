"use strict";
//Create Controller TipeTraining-controller.ts
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
exports.TipeTrainingController = void 0;
const TipeTraining_service_1 = require("../service/TipeTraining-service");
class TipeTrainingController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield TipeTraining_service_1.TipeTrainingService.create(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //GET
    static get(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipeTrainingId = (req.params.Id);
                const response = yield TipeTraining_service_1.TipeTrainingService.get(req.user, tipeTrainingId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //UPDATE
    static update(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = (req.params.Id);
                const response = yield TipeTraining_service_1.TipeTrainingService.update(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //REMOVE
    static remove(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipeTrainingId = (req.params.Id);
                const response = yield TipeTraining_service_1.TipeTrainingService.remove(req.user, tipeTrainingId);
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
                    nama: req.query.nama,
                    aktive: req.query.aktive,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield TipeTraining_service_1.TipeTrainingService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //GET By KOLOM NAME 
    //ID
    static getId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = (req.params.Id);
                const response = yield TipeTraining_service_1.TipeTrainingService.getId(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //KODE
    static getKode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = (req.params.Kode);
                const response = yield TipeTraining_service_1.TipeTrainingService.getKode(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //NAMA
    static getNama(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = (req.params.Nama);
                const response = yield TipeTraining_service_1.TipeTrainingService.getNama(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //AKTIVE
    static getAktive(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = (req.params.Aktive);
                const response = yield TipeTraining_service_1.TipeTrainingService.getAktive(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //URUTAN
    static getUrutan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = Number(req.params.Urutan);
                const response = yield TipeTraining_service_1.TipeTrainingService.getUrutan(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TipeTrainingController = TipeTrainingController;
