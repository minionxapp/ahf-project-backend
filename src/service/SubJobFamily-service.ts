//Create Service SubJobFamily-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { SubJobFamilyResponse, CreateSubJobFamilyRequest, SearchSubJobFamilyRequest, toSubJobFamilyResponse, UpdateSubJobFamilyRequest } from "../model/SubJobFamily-model";
import { Pageable } from "../model/page";
import { SubJobFamilyValidation } from "../validation/SubJobFamily-validation";
import { Validation } from "../validation/validation";
import { User, SubJobFamily } from "@prisma/client";
export class SubJobFamilyService {

    //CREATE 
    static async create(user: User, request: CreateSubJobFamilyRequest): Promise<SubJobFamilyResponse> {
        const createRequest = Validation.validate(SubJobFamilyValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.subJobFamily.count({
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
        const subJobFamily = await prismaClient.subJobFamily.create({
            data: record
        })
        return toSubJobFamilyResponse(subJobFamily)
    }

    // CEK EXIST
    //function untuk getSubJobFamily biar bisa dipakai berulang
    static async checkSubJobFamilyMustexist(subJobFamilyId: string): Promise<SubJobFamily> {
        const subJobFamily = await prismaClient.subJobFamily.findFirst({
            where: {
                id: subJobFamilyId,
                //create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "SubJobFamily not found")
        }
        return subJobFamily
    }

    // GET by Id
    static async get(user: User, id: string): Promise<SubJobFamilyResponse> {
        const subJobFamily = await this.checkSubJobFamilyMustexist(id)
        return toSubJobFamilyResponse(subJobFamily)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateSubJobFamilyRequest): Promise<SubJobFamilyResponse> {
        const updateRequest = Validation.validate(SubJobFamilyValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.username },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek SubJobFamily ada atau tidak
        await this.checkSubJobFamilyMustexist(request.id)
        const subJobFamily = await prismaClient.subJobFamily.update({
            where: {
                id: updateRequest.id,
                create_by: user.username
            },
            data: record
        })
        return toSubJobFamilyResponse(subJobFamily)
    }
    //REMOVE by Id
    static async remove(user: User, id: string): Promise<SubJobFamilyResponse> {
        await this.checkSubJobFamilyMustexist(id)
        const subJobFamily = await prismaClient.subJobFamily.delete({
            where: {
                id: id,
                create_by: user.username
            }
        })
        return subJobFamily
    }
    //SEARCH 
    static async search(user: User, request: SearchSubJobFamilyRequest): Promise<Pageable<SubJobFamilyResponse>> {
        const searchRequest = Validation.validate(SubJobFamilyValidation.SEARCH, request);
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
        // check if kode_jf exists
        if (searchRequest.kode_jf) {
            filters.push({
                kode_jf: {
                    contains: searchRequest.kode_jf
                }
            })
        }
        // check if nama_jf exists
        if (searchRequest.nama_jf) {
            filters.push({
                nama_jf: {
                    contains: searchRequest.nama_jf
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
        const subJobFamilys = await prismaClient.subJobFamily.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.subJobFamily.count({
            where: {
                create_by: user.username,
                AND: filters
            },
        })
        return {
            data: subJobFamilys.map(subJobFamily => toSubJobFamilyResponse(subJobFamily)),
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
    static async getId(user: User, id: string): Promise<SubJobFamilyResponse> {
        const subJobFamily = await prismaClient.subJobFamily.findFirst({
            where: {
                id: id,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }// console.log(servicex)

    //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getKode(user: User, kode: string): Promise<Array<SubJobFamilyResponse>> {
        const subJobFamily = await prismaClient.subJobFamily.findMany({
            where: {
                kode: kode,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }
    //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getNama(user: User, nama: string): Promise<Array<SubJobFamilyResponse>> {
        const subJobFamily = await prismaClient.subJobFamily.findMany({
            where: {
                nama: nama,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }
    //By kolom kode_jf (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getKode_jf(user: User, kode_jf: string): Promise<Array<SubJobFamilyResponse>> {
        const subJobFamily = await prismaClient.subJobFamily.findMany({
            where: {
                kode_jf: kode_jf,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }
    //By kolom nama_jf (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getNama_jf(user: User, nama_jf: string): Promise<Array<SubJobFamilyResponse>> {
        const subJobFamily = await prismaClient.subJobFamily.findMany({
            where: {
                nama_jf: nama_jf,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }
    //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getAktive(user: User, aktive: string): Promise<Array<SubJobFamilyResponse>> {
        const subJobFamily = await prismaClient.subJobFamily.findMany({
            where: {
                aktive: aktive,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }
    //By kolom urutan (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
    static async getUrutan(user: User, urutan: number): Promise<Array<SubJobFamilyResponse>> {
        const subJobFamily = await prismaClient.subJobFamily.findMany({
            where: {
                urutan: urutan,
                create_by: user.username
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "Data not found")
        }
        return subJobFamily
    }
}
