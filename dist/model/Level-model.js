"use strict";
//Create Model Level-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLevelResponse = toLevelResponse;
//toLevelResponse
function toLevelResponse(level) {
    return {
        id: level.id,
        kode: level.kode,
        nama: level.nama,
        aktive: level.aktive,
        urutan: level.urutan,
    };
}
