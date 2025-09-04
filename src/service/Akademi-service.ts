//Create Service Akademi-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { AkademiResponse, CreateAkademiRequest, SearchAkademiRequest, toAkademiResponse, UpdateAkademiRequest } from "../model/Akademi-model";
import { Pageable } from "../model/page";
import { AkademiValidation } from "../validation/Akademi-validation";
import { Validation } from "../validation/validation";
import { User, Akademi } from "@prisma/client";
export class AkademiService {

    //CREATE 
    static async create(user: User, request: CreateAkademiRequest): Promise<AkademiResponse> {
        const createRequest = Validation.validate(AkademiValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.username }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const akademi = await prismaClient.akademi.create({
            data: record
        })
        return toAkademiResponse(akademi)
    }

    // CEK EXIST
    //function untuk getAkademi biar bisa dipakai berulang
    static async checkAkademiMustexist(akademiId: string): Promise<Akademi> {
        const akademi = await prismaClient.akademi.findFirst({
            where: {
                id: akademiId,
                //create_by: user.username
            }
        })
        if (!akademi) {
            throw new ResponseError(404, "Akademi not found")
        }
        return akademi
    }

    // GET by Id
    static async get(user: User, id: string): Promise<AkademiResponse> {
        const akademi = await this.checkAkademiMustexist(id)
        return toAkademiResponse(akademi)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateAkademiRequest): Promise<AkademiResponse> {
        const updateRequest = Validation.validate(AkademiValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.username },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Akademi ada atau tidak
        await this.checkAkademiMustexist(request.id)
        const akademi = await prismaClient.akademi.update({
            where: {
                id: updateRequest.id,
                create_by: user.username
            },
            data: record
        })
        return toAkademiResponse(akademi)
    }
    //REMOVE by Id
    static async remove(user: User, id: string): Promise<AkademiResponse> {
        await this.checkAkademiMustexist(id)
        const akademi = await prismaClient.akademi.delete({
            where: {
                id: id,
                create_by: user.username
            }
        })
        return akademi
    }
    //SEARCH 
    static async search(user: User, request: SearchAkademiRequest): Promise<Pageable<AkademiResponse>> {
        const searchRequest = Validation.validate(AkademiValidation.SEARCH, request);
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
        // check if aktive exists
        if (searchRequest.aktive) {
            filters.push({
                aktive: {
                    contains: searchRequest.aktive
                }
            })
        }
        const akademis = await prismaClient.akademi.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.akademi.count({
            where: {
                create_by: user.username,
                AND: filters
            },
        })
        return {
            data: akademis.map(akademi => toAkademiResponse(akademi)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }


    }
    //GET BY KOLOM //bikin berdasarka kolom yang ada
    //By ID (buat static--> hanya menghasilkan 1 row)
    static async getId(user: User, id: string): Promise<AkademiResponse> {
        const akademi = await prismaClient.akademi.findFirst({
            where: {
                id: id,
                create_by: user.username
            }
        })
        if (!akademi) {
            throw new ResponseError(404, "Data not found")
        }
        return akademi
    }// console.log(servicex)

    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getKode(user: User, kode: string): Promise<Array<AkademiResponse>> {
        const akademi = await prismaClient.akademi.findMany({
            where: {
                kode: kode,
                create_by: user.username
            }
        })
        if (!akademi) {
            throw new ResponseError(404, "Data not found")
        }
        return akademi
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getNama(user: User, nama: string): Promise<Array<AkademiResponse>> {
        const akademi = await prismaClient.akademi.findMany({
            where: {
                nama: nama,
                create_by: user.username
            }
        })
        if (!akademi) {
            throw new ResponseError(404, "Data not found")
        }
        return akademi
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getAktive(user: User, aktive: string): Promise<Array<AkademiResponse>> {
        const akademi = await prismaClient.akademi.findMany({
            where: {
                aktive: aktive,
                // create_by: user.username
            }
        })
        if (!akademi) {
            throw new ResponseError(404, "Data not found")
        }
        return akademi
    }
}