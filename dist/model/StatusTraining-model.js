"use strict";
//Create Model StatusTraining-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStatusTrainingResponse = toStatusTrainingResponse;
//toStatusTrainingResponse
function toStatusTrainingResponse(status_training) {
    return {
        id: status_training.id,
        kode: status_training.kode,
        nama: status_training.nama,
        aktive: status_training.aktive,
        desc: status_training.desc,
        urutan: status_training.urutan,
    };
}
