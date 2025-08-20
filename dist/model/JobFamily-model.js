"use strict";
//Create Model JobFamily-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJobFamilyResponse = toJobFamilyResponse;
//toJobFamilyResponse
function toJobFamilyResponse(job_family) {
    return {
        id: job_family.id,
        kode: job_family.kode,
        nama: job_family.nama,
        desc: job_family.desc,
    };
}
