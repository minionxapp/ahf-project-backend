//Create Service Level-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { LevelResponse, CreateLevelRequest, SearchLevelRequest, toLevelResponse, UpdateLevelRequest } from "../model/Level-model";
import { Pageable } from "../model/page";
import { LevelValidation } from "../validation/Level-validation";
import { Validation } from "../validation/validation";
import { User, Level } from "@prisma/client";
export class LevelService {

    //CREATE 
    static async create(user: User, request: CreateLevelRequest): Promise<LevelResponse> {
        const createRequest = Validation.validate(LevelValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.level.count({
            where: {
                kode: createRequest.kode,
                //       create_by: user.username
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
        const level = await prismaClient.level.create({
            data: record
        })
        return toLevelResponse(level)
    }

    // CEK EXIST
    //function untuk getLevel biar bisa dipakai berulang
    static async checkLevelMustexist(levelId: string): Promise<Level> {
        const level = await prismaClient.level.findFirst({
            where: {
                id: levelId,
                //create_by: user.username
            }
        })
        if (!level) {
            throw new ResponseError(404, "Level not found")
        }
        return level
    }

    // GET by Id
    static async get(user: User, id: string): Promise<LevelResponse> {
        const level = await this.checkLevelMustexist(id)
        return toLevelResponse(level)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateLevelRequest): Promise<LevelResponse> {
        const updateRequest = Validation.validate(LevelValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.username },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Level ada atau tidak
        await this.checkLevelMustexist(request.id)
        const level = await prismaClient.level.update({
            where: {
                id: updateRequest.id,
                create_by: user.username
            },
            data: record
        })
        return toLevelResponse(level)
    }
    //REMOVE by Id
    static async remove(user: User, id: string): Promise<LevelResponse> {
        await this.checkLevelMustexist(id)
        const level = await prismaClient.level.delete({
            where: {
                id: id,
                create_by: user.username
            }
        })
        return level
    }
    //SEARCH 
    static async search(user: User, request: SearchLevelRequest): Promise<Pageable<LevelResponse>> {
        const searchRequest = Validation.validate(LevelValidation.SEARCH, request);
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
        const levels = await prismaClient.level.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.level.count({
            where: {
                create_by: user.username,
                AND: filters
            },
        })
        return {
            data: levels.map(level => toLevelResponse(level)),
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
    static async getId(user: User, id: string): Promise<LevelResponse> {
        const level = await prismaClient.level.findFirst({
            where: {
                id: id,
                create_by: user.username
            }
        })
        if (!level) {
            throw new ResponseError(404, "Data not found")
        }
        return level
    }// console.log(servicex)

    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getKode(user: User, kode: string): Promise<Array<LevelResponse>> {
        const level = await prismaClient.level.findMany({
            where: {
                kode: kode,
                create_by: user.username
            }
        })
        if (!level) {
            throw new ResponseError(404, "Data not found")
        }
        return level
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getNama(user: User, nama: string): Promise<Array<LevelResponse>> {
        const level = await prismaClient.level.findMany({
            where: {
                nama: nama,
                create_by: user.username
            }
        })
        if (!level) {
            throw new ResponseError(404, "Data not found")
        }
        return level
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getAktive(user: User, aktive: string): Promise<Array<LevelResponse>> {
        const level = await prismaClient.level.findMany({
            where: {
                aktive: aktive,
                create_by: user.username
            }
        })
        if (!level) {
            throw new ResponseError(404, "Data not found")
        }
        return level
    }
    //By kolom urutan (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getUrutan(user: User, urutan: number): Promise<Array<LevelResponse>> {
        const level = await prismaClient.level.findMany({
            where: {
                urutan: urutan,
                create_by: user.username
            }
        })
        if (!level) {
            throw new ResponseError(404, "Data not found")
        }
        return level
    }
}