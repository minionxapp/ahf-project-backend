"use strict";
//Create Model Akademi-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAkademiResponse = toAkademiResponse;
//toAkademiResponse
function toAkademiResponse(akademi) {
    return {
        id: akademi.id,
        kode: akademi.kode,
        nama: akademi.nama,
        status: akademi.status,
        nama_pic: akademi.nama_pic,
    };
}
