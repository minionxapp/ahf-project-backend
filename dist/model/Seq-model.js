"use strict";
//Create Model Seq-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSeqResponse = toSeqResponse;
//toSeqResponse
function toSeqResponse(seq) {
    return {
        id: seq.id,
        kode: seq.kode,
        tahun: seq.tahun,
        last_squence: seq.last_squence,
        desc: seq.desc,
    };
}
