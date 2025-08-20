"use strict";
//Create Model Training-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTrainingResponse = toTrainingResponse;
//toTrainingResponse
function toTrainingResponse(training) {
    return {
        id: training.id,
        kode: training.kode,
        nama: training.nama,
        akademi: training.akademi,
        tipe: training.tipe,
        pic: training.pic,
        desc: training.desc,
        kompetensi: training.kompetensi,
        tgl_mulai: training.tgl_mulai,
        tgl_akhir: training.tgl_akhir,
        sub_kompetensi: training.sub_kompetensi,
        status_training: training.status_training,
        kode_job_family: training.kode_job_family,
        kode_sub_job_family: training.kode_sub_job_family,
    };
}
