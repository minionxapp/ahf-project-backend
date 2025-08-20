
//Create Service KompetensiLevel-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { KompetensiLevelResponse, CreateKompetensiLevelRequest, SearchKompetensiLevelRequest, toKompetensiLevelResponse, UpdateKompetensiLevelRequest } from "../model/KompetensiLevel-model";
import { Pageable } from "../model/page";
import { KompetensiLevelValidation } from "../validation/KompetensiLevel-validation";
import { Validation } from "../validation/validation";
import { User, KompetensiLevel } from "@prisma/client";
export class KompetensiLevelService {

    //CREATE 
    static async create(user: User, request: CreateKompetensiLevelRequest): Promise<KompetensiLevelResponse> {
        const createRequest = Validation.validate(KompetensiLevelValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const kompetensiLevel = await prismaClient.kompetensiLevel.create({
            data: record
        })
        return toKompetensiLevelResponse(kompetensiLevel)
    }

    // CEK EXIST
    //function untuk getKompetensiLevel biar bisa dipakai berulang
    static async checkKompetensiLevelMustexist(kompetensiLevelId: number): Promise<KompetensiLevel> {
        const kompetensiLevel = await prismaClient.kompetensiLevel.findFirst({
            where: {
                id: kompetensiLevelId,
            }
        })
        if (!kompetensiLevel) {
            throw new ResponseError(404, "KompetensiLevel not found")
        }
        return kompetensiLevel
    }

    // GET by Id
    static async get(user: User, id: number): Promise<KompetensiLevelResponse> {
        const kompetensiLevel = await this.checkKompetensiLevelMustexist(id)
        return toKompetensiLevelResponse(kompetensiLevel)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateKompetensiLevelRequest): Promise<KompetensiLevelResponse> {
        const updateRequest = Validation.validate(KompetensiLevelValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek KompetensiLevel ada atau tidak
        await this.checkKompetensiLevelMustexist(request.id)
        const kompetensiLevel = await prismaClient.kompetensiLevel.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toKompetensiLevelResponse(kompetensiLevel)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<KompetensiLevelResponse> {
        await this.checkKompetensiLevelMustexist(id)
        const kompetensiLevel = await prismaClient.kompetensiLevel.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return kompetensiLevel
    }
    //SEARCH 
    static async search(user: User, request: SearchKompetensiLevelRequest): Promise<Pageable<KompetensiLevelResponse>> {
        const searchRequest = Validation.validate(KompetensiLevelValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if kode exists
        if (searchRequest.kode) {
            filters.push({
                kode: {
                    contains: searchRequest.kode
                }
            })
        }
        // check if nama exists
        if (searchRequest.nama) {
            filters.push({
                nama: {
                    contains: searchRequest.nama
                }
            })
        }
        // check if status exists
        if (searchRequest.status) {
            filters.push({
                status: {
                    contains: searchRequest.status
                }
            })
        }
        const kompetensiLevels = await prismaClient.kompetensiLevel.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.kompetensiLevel.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: kompetensiLevels.map(kompetensiLevel => toKompetensiLevelResponse(kompetensiLevel)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}