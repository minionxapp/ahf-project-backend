"use strict";
//Create Model SubKompetensi-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSubKompetensiResponse = toSubKompetensiResponse;
//toSubKompetensiResponse
function toSubKompetensiResponse(sub_kompetensi) {
    return {
        id: sub_kompetensi.id,
        kode: sub_kompetensi.kode,
        kode_job_family: sub_kompetensi.kode_job_family,
        kode_sub_job_family: sub_kompetensi.kode_sub_job_family,
        nama: sub_kompetensi.nama,
        desc: sub_kompetensi.desc,
        status: sub_kompetensi.status,
        kode_kompetensi: sub_kompetensi.kode_kompetensi,
    };
}
