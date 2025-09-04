"use strict";
//Create Model Divisi-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDivisiResponse = toDivisiResponse;
//toDivisiResponse
function toDivisiResponse(divisi) {
    return {
        id: divisi.id,
        kode: divisi.kode,
        nama: divisi.nama,
        aktive: divisi.aktive,
        urutan: divisi.urutan,
    };
}
