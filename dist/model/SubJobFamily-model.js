"use strict";
//Create Model SubJobFamily-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSubJobFamilyResponse = toSubJobFamilyResponse;
//toSubJobFamilyResponse
function toSubJobFamilyResponse(sub_job_family) {
    return {
        id: sub_job_family.id,
        kode: sub_job_family.kode,
        nama: sub_job_family.nama,
        kode_jf: sub_job_family.kode_jf,
        nama_jf: sub_job_family.nama_jf,
        aktive: sub_job_family.aktive,
        urutan: sub_job_family.urutan,
    };
}
