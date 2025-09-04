"use strict";
//Create Model DivisiDept-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDivisiDeptResponse = toDivisiDeptResponse;
//toDivisiDeptResponse
function toDivisiDeptResponse(divisi_dept) {
    return {
        id: divisi_dept.id,
        kode: divisi_dept.kode,
        nama: divisi_dept.nama,
        divisi_kode: divisi_dept.divisi_kode,
        divisi_name: divisi_dept.divisi_name,
        aktive: divisi_dept.aktive,
    };
}
