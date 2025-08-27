"use strict";
//Create Model TableCoba-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTableCobaResponse = toTableCobaResponse;
//toTableCobaResponse
function toTableCobaResponse(table_coba) {
    return {
        id: table_coba.id,
        name: table_coba.name,
        kode: table_coba.kode,
    };
}
