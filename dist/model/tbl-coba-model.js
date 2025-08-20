"use strict";
//Create Model TblCoba-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTblCobaResponse = toTblCobaResponse;
//toTblCobaResponse
function toTblCobaResponse(tbl_coba) {
    return {
        id: tbl_coba.id,
        kolom_satu: tbl_coba.kolom_satu,
    };
}
