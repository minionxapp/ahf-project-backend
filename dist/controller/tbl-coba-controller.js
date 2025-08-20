"use strict";
//Create Controller TblCoba-controller.ts
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
exports.TblCobaController = void 0;
const TblCoba_service_1 = require("../service/TblCoba-service");
class TblCobaController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield TblCoba_service_1.TblCobaService.create(req.user, request);
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
                const tblCobaId = Number(req.params.tblCobaId);
                const response = yield TblCoba_service_1.TblCobaService.get(req.user, tblCobaId);
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
                request.id = Number(req.params.tblCobaId);
                const response = yield TblCoba_service_1.TblCobaService.update(req.user, request);
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
                const tblCobaId = Number(req.params.tblCobaId);
                const response = yield TblCoba_service_1.TblCobaService.remove(req.user, tblCobaId);
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
                    kolom_satu: req.query.kolom_satu,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield TblCoba_service_1.TblCobaService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TblCobaController = TblCobaController;
