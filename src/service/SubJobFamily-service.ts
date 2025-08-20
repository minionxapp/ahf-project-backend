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
                kode: createRequest.kode
            }
        })
        if (totalkodeUniq != 0) {
            throw new ResponseError(400, "kode already axist");
        }

        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const subJobFamily = await prismaClient.subJobFamily.create({
            data: record
        })
        return toSubJobFamilyResponse(subJobFamily)
    }

    // CEK EXIST
    //function untuk getSubJobFamily biar bisa dipakai berulang
    static async checkSubJobFamilyMustexist(subJobFamilyId: number): Promise<SubJobFamily> {
        const subJobFamily = await prismaClient.subJobFamily.findFirst({
            where: {
                id: subJobFamilyId,
            }
        })
        if (!subJobFamily) {
            throw new ResponseError(404, "SubJobFamily not found")
        }
        return subJobFamily
    }

    // GET by Id
    static async get(user: User, id: number): Promise<SubJobFamilyResponse> {
        const subJobFamily = await this.checkSubJobFamilyMustexist(id)
        return toSubJobFamilyResponse(subJobFamily)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateSubJobFamilyRequest): Promise<SubJobFamilyResponse> {
        const updateRequest = Validation.validate(SubJobFamilyValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek SubJobFamily ada atau tidak
        await this.checkSubJobFamilyMustexist(request.id)
        const subJobFamily = await prismaClient.subJobFamily.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toSubJobFamilyResponse(subJobFamily)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<SubJobFamilyResponse> {
        await this.checkSubJobFamilyMustexist(id)
        const subJobFamily = await prismaClient.subJobFamily.delete({
            where: {
                id: id,
                //username: user.username
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
        // check if kode_job_family exists
        if (searchRequest.kode_job_family) {
            filters.push({
                kode_job_family: {
                    contains: searchRequest.kode_job_family
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
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
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
                //username: user.username,
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

}