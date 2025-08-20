"use strict";
//Create Model Brand-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBrandResponse = toBrandResponse;
//toBrandResponse
function toBrandResponse(brand) {
    return {
        id: brand.id,
        kode: brand.kode,
        nama: brand.nama,
    };
}
