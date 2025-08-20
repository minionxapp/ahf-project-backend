"use strict";
//Create Model KompetensiLevel-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKompetensiLevelResponse = toKompetensiLevelResponse;
//toKompetensiLevelResponse
function toKompetensiLevelResponse(kompetensi_level) {
    return {
        id: kompetensi_level.id,
        kode: kompetensi_level.kode,
        nama: kompetensi_level.nama,
        status: kompetensi_level.status,
    };
}
