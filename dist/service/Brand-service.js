"use strict";
//Create Service Brand-service.ts
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
exports.BrandService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Brand_model_1 = require("../model/Brand-model");
const Brand_validation_1 = require("../validation/Brand-validation");
const validation_1 = require("../validation/validation");
class BrandService {
    //CREATE 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Brand_validation_1.BrandValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
            const totalkodeUniq = yield database_1.prismaClient.brand.count({
                where: {
                    kode: createRequest.kode
                }
            });
            if (totalkodeUniq != 0) {
                throw new response_error_1.ResponseError(400, "kode already axist");
            }
            const totalnamaUniq = yield database_1.prismaClient.brand.count({
                where: {
                    nama: createRequest.nama
                }
            });
            if (totalnamaUniq != 0) {
                throw new response_error_1.ResponseError(400, "nama already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const brand = yield database_1.prismaClient.brand.create({
                data: record
            });
            return (0, Brand_model_1.toBrandResponse)(brand);
        });
    }
    // CEK EXIST
    //function untuk getBrand biar bisa dipakai berulang
    static checkBrandMustexist(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield database_1.prismaClient.brand.findFirst({
                where: {
                    id: brandId,
                }
            });
            if (!brand) {
                throw new response_error_1.ResponseError(404, "Brand not found");
            }
            return brand;
        });
    }
    // GET by Id
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.checkBrandMustexist(id);
            return (0, Brand_model_1.toBrandResponse)(brand);
        });
    }
    // UPDATE by Id
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Brand_validation_1.BrandValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Brand ada atau tidak
            yield this.checkBrandMustexist(request.id);
            const brand = yield database_1.prismaClient.brand.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: record
            });
            return (0, Brand_model_1.toBrandResponse)(brand);
        });
    }
    //REMOVE by Id
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkBrandMustexist(id);
            const brand = yield database_1.prismaClient.brand.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return brand;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Brand_validation_1.BrandValidation.SEARCH, request);
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
            const brands = yield database_1.prismaClient.brand.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.brand.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: brands.map(brand => (0, Brand_model_1.toBrandResponse)(brand)),
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
exports.BrandService = BrandService;
