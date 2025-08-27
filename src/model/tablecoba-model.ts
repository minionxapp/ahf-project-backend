//Create Model TableCoba-model.ts

import { TableCoba } from '@prisma/client'
export type TableCobaResponse = {
    id: string,
    name?: string | null,
    kode: string,
}

//CreateTableCobaRequest
export type CreateTableCobaRequest = {
    id: string,
    name?: string | null,
    kode: string,
}

//UpdateTableCobaRequest
export type UpdateTableCobaRequest = {
    id: string,
    name?: string | null,
    kode: string,
}

//SearchTableCobaRequest
export type SearchTableCobaRequest = {
    //id: string,
    name?: string | null,
    kode: string,
    page: number,
    size: number,
}

//toTableCobaResponse
export function toTableCobaResponse(table_coba: TableCoba): TableCobaResponse {
    return {
        id: table_coba.id,
        name: table_coba.name,
        kode: table_coba.kode,
    }
}