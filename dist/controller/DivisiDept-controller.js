"use strict";
//Create Controller DivisiDept-controller.ts
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
exports.DivisiDeptController = void 0;
const DivisiDept_service_1 = require("../service/DivisiDept-service");
class DivisiDeptController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield DivisiDept_service_1.DivisiDeptService.create(req.user, request);
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
                const divisiDeptId = (req.params.Id);
                const response = yield DivisiDept_service_1.DivisiDeptService.get(req.user, divisiDeptId);
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
                const response = yield DivisiDept_service_1.DivisiDeptService.update(req.user, request);
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
                const divisiDeptId = (req.params.Id);
                const response = yield DivisiDept_service_1.DivisiDeptService.remove(req.user, divisiDeptId);
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
                    divisi_kode: req.query.divisi_kode,
                    divisi_name: req.query.divisi_name,
                    aktive: req.query.aktive,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield DivisiDept_service_1.DivisiDeptService.search(req.user, request);
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
                const response = yield DivisiDept_service_1.DivisiDeptService.getId(req.user, param);
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
                const param = String(req.params.Kode);
                const response = yield DivisiDept_service_1.DivisiDeptService.getKode(req.user, param);
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
                const param = String(req.params.Nama);
                const response = yield DivisiDept_service_1.DivisiDeptService.getNama(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //DIVISI_KODE
    static getDivisi_kode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = String(req.params.Divisi_kode);
                const response = yield DivisiDept_service_1.DivisiDeptService.getDivisi_kode(req.user, param);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //DIVISI_NAME
    static getDivisi_name(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = String(req.params.Divisi_name);
                const response = yield DivisiDept_service_1.DivisiDeptService.getDivisi_name(req.user, param);
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
                const param = String(req.params.Aktive);
                const response = yield DivisiDept_service_1.DivisiDeptService.getAktive(req.user, param);
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
exports.DivisiDeptController = DivisiDeptController;
