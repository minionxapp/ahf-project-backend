//Create Service TipeTraining-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { TipeTrainingResponse, CreateTipeTrainingRequest, SearchTipeTrainingRequest, toTipeTrainingResponse, UpdateTipeTrainingRequest } from "../model/TipeTraining-model";
import { Pageable } from "../model/page";
import { TipeTrainingValidation } from "../validation/TipeTraining-validation";
import { Validation } from "../validation/validation";
import { User, TipeTraining } from "@prisma/client";
export class TipeTrainingService {

    //CREATE 
    static async create(user: User, request: CreateTipeTrainingRequest): Promise<TipeTrainingResponse> {
        const createRequest = Validation.validate(TipeTrainingValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.tipeTraining.count({
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
        const tipeTraining = await prismaClient.tipeTraining.create({
            data: record
        })
        return toTipeTrainingResponse(tipeTraining)
    }

    // CEK EXIST
    //function untuk getTipeTraining biar bisa dipakai berulang
    static async checkTipeTrainingMustexist(tipeTrainingId: string): Promise<TipeTraining> {
        const tipeTraining = await prismaClient.tipeTraining.findFirst({
            where: {
                id: tipeTrainingId,
                //create_by: user.username
            }
        })
        if (!tipeTraining) {
            throw new ResponseError(404, "TipeTraining not found")
        }
        return tipeTraining
    }

    // GET by Id
    static async get(user: User, id: string): Promise<TipeTrainingResponse> {
        const tipeTraining = await this.checkTipeTrainingMustexist(id)
        return toTipeTrainingResponse(tipeTraining)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateTipeTrainingRequest): Promise<TipeTrainingResponse> {
        const updateRequest = Validation.validate(TipeTrainingValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.username },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek TipeTraining ada atau tidak
        await this.checkTipeTrainingMustexist(request.id)
        const tipeTraining = await prismaClient.tipeTraining.update({
            where: {
                id: updateRequest.id,
                create_by: user.username
            },
            data: record
        })
        return toTipeTrainingResponse(tipeTraining)
    }
    //REMOVE by Id
    static async remove(user: User, id: string): Promise<TipeTrainingResponse> {
        await this.checkTipeTrainingMustexist(id)
        const tipeTraining = await prismaClient.tipeTraining.delete({
            where: {
                id: id,
                create_by: user.username
            }
        })
        return tipeTraining
    }
    //SEARCH 
    static async search(user: User, request: SearchTipeTrainingRequest): Promise<Pageable<TipeTrainingResponse>> {
        const searchRequest = Validation.validate(TipeTrainingValidation.SEARCH, request);
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
        const tipeTrainings = await prismaClient.tipeTraining.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.tipeTraining.count({
            where: {
                create_by: user.username,
                AND: filters
            },
        })
        return {
            data: tipeTrainings.map(tipeTraining => toTipeTrainingResponse(tipeTraining)),
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
    static async getId(user: User, id: string): Promise<TipeTrainingResponse> {
        const tipeTraining = await prismaClient.tipeTraining.findFirst({
            where: {
                id: id,
                create_by: user.username
            }
        })
        if (!tipeTraining) {
            throw new ResponseError(404, "Data not found")
        }
        return tipeTraining
    }// console.log(servicex)

    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getKode(user: User, kode: string): Promise<Array<TipeTrainingResponse>> {
        const tipeTraining = await prismaClient.tipeTraining.findMany({
            where: {
                kode: kode,
                create_by: user.username
            }
        })
        if (!tipeTraining) {
            throw new ResponseError(404, "Data not found")
        }
        return tipeTraining
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getNama(user: User, nama: string): Promise<Array<TipeTrainingResponse>> {
        const tipeTraining = await prismaClient.tipeTraining.findMany({
            where: {
                nama: nama,
                create_by: user.username
            }
        })
        if (!tipeTraining) {
            throw new ResponseError(404, "Data not found")
        }
        return tipeTraining
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getAktive(user: User, aktive: string): Promise<Array<TipeTrainingResponse>> {
        const tipeTraining = await prismaClient.tipeTraining.findMany({
            where: {
                aktive: aktive,
                create_by: user.username
            },
            orderBy: {
                urutan: 'asc', // Sort by name in ascending order
            },
        })
        if (!tipeTraining) {
            throw new ResponseError(404, "Data not found")
        }
        return tipeTraining
    }
    //By kolom urutan (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getUrutan(user: User, urutan: number): Promise<Array<TipeTrainingResponse>> {
        const tipeTraining = await prismaClient.tipeTraining.findMany({
            where: {
                urutan: urutan,
                create_by: user.username
            }
        })
        if (!tipeTraining) {
            throw new ResponseError(404, "Data not found")
        }
        return tipeTraining
    }
}