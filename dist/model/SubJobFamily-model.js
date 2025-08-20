"use strict";
//Create Model SubJobFamily-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSubJobFamilyResponse = toSubJobFamilyResponse;
//toSubJobFamilyResponse
function toSubJobFamilyResponse(sub_job_family) {
    return {
        id: sub_job_family.id,
        kode: sub_job_family.kode,
        kode_job_family: sub_job_family.kode_job_family,
        nama: sub_job_family.nama,
        desc: sub_job_family.desc,
    };
}
