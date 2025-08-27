//Create Service TableCoba-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { TableCobaResponse, CreateTableCobaRequest, SearchTableCobaRequest, toTableCobaResponse, UpdateTableCobaRequest } from "../model/TableCoba-model";
import { Pageable } from "../model/page";
import { TableCobaValidation } from "../validation/TableCoba-validation";
import { Validation } from "../validation/validation";
import { User, TableCoba } from "@prisma/client";
export class TableCobaService {

    //CREATE 
    static async create(user: User, request: CreateTableCobaRequest): Promise<TableCobaResponse> {
        const createRequest = Validation.validate(TableCobaValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.tableCoba.count({
            where: {
                kode: createRequest.kode
            }
        })
        if (totalkodeUniq != 0) {
            throw new ResponseError(400, "kode already axist");
        }

        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.username }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const tableCoba = await prismaClient.tableCoba.create({
            data: record
        })
        return toTableCobaResponse(tableCoba)
    }

    // CEK EXIST
    //function untuk getTableCoba biar bisa dipakai berulang
    static async checkTableCobaMustexist(tableCobaId: string): Promise<TableCoba> {
        const tableCoba = await prismaClient.tableCoba.findFirst({
            where: {
                id: tableCobaId,
            }
        })
        if (!tableCoba) {
            throw new ResponseError(404, "TableCoba not found")
        }
        return tableCoba
    }

    // GET by Id
    static async get(user: User, id: string): Promise<TableCobaResponse> {
        const tableCoba = await this.checkTableCobaMustexist(id)
        return toTableCobaResponse(tableCoba)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateTableCobaRequest): Promise<TableCobaResponse> {
        const updateRequest = Validation.validate(TableCobaValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.username },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek TableCoba ada atau tidak
        await this.checkTableCobaMustexist(request.id)
        const tableCoba = await prismaClient.tableCoba.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toTableCobaResponse(tableCoba)
    }
    //REMOVE by Id
    static async remove(user: User, id: string): Promise<TableCobaResponse> {
        await this.checkTableCobaMustexist(id)
        const tableCoba = await prismaClient.tableCoba.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return tableCoba
    }
    //SEARCH 
    static async search(user: User, request: SearchTableCobaRequest): Promise<Pageable<TableCobaResponse>> {
        const searchRequest = Validation.validate(TableCobaValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if name exists
        if (searchRequest.name) {
            filters.push({
                name: {
                    contains: searchRequest.name
                }
            })
        }
        // check if kode exists
        if (searchRequest.kode) {
            filters.push({
                kode: {
                    contains: searchRequest.kode
                }
            })
        }
        const tableCobas = await prismaClient.tableCoba.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.tableCoba.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: tableCobas.map(tableCoba => toTableCobaResponse(tableCoba)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}