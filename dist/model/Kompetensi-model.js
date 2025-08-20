"use strict";
//Create Model Kompetensi-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKompetensiResponse = toKompetensiResponse;
//toKompetensiResponse
function toKompetensiResponse(kompetensi) {
    return {
        id: kompetensi.id,
        kode: kompetensi.kode,
        kode_job_family: kompetensi.kode_job_family,
        kode_sub_job_family: kompetensi.kode_sub_job_family,
        nama: kompetensi.nama,
        desc: kompetensi.desc,
        status: kompetensi.status,
    };
}
