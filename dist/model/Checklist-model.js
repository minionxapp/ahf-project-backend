"use strict";
//Create Model Checklist-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toChecklistResponse = toChecklistResponse;
//toChecklistResponse
function toChecklistResponse(checklist) {
    return {
        id: checklist.id,
        nama: checklist.nama,
        urut: checklist.urut,
        desc: checklist.desc,
        kode: checklist.kode,
        group: checklist.group,
    };
}
