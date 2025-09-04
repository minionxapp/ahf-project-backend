"use strict";
//Create Model TipeTraining-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTipeTrainingResponse = toTipeTrainingResponse;
//toTipeTrainingResponse
function toTipeTrainingResponse(tipe_training) {
    return {
        id: tipe_training.id,
        kode: tipe_training.kode,
        nama: tipe_training.nama,
        aktive: tipe_training.aktive,
        urutan: tipe_training.urutan,
    };
}
