//Create Service Kompetensi-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { KompetensiResponse, CreateKompetensiRequest, SearchKompetensiRequest, toKompetensiResponse, UpdateKompetensiRequest } from "../model/Kompetensi-model";
import { Pageable } from "../model/page";
import { KompetensiValidation } from "../validation/Kompetensi-validation";
import { Validation } from "../validation/validation";
import { User, Kompetensi } from "@prisma/client";
export class KompetensiService {

    //CREATE 
    static async create(user: User, request: CreateKompetensiRequest): Promise<KompetensiResponse> {
        const createRequest = Validation.validate(KompetensiValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.kompetensi.count({
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
        const kompetensi = await prismaClient.kompetensi.create({
            data: record
        })
        return toKompetensiResponse(kompetensi)
    }

    // CEK EXIST
    //function untuk getKompetensi biar bisa dipakai berulang
    static async checkKompetensiMustexist(kompetensiId: number): Promise<Kompetensi> {
        const kompetensi = await prismaClient.kompetensi.findFirst({
            where: {
                id: kompetensiId,
            }
        })
        if (!kompetensi) {
            throw new ResponseError(404, "Kompetensi not found")
        }
        return kompetensi
    }

    // GET by Id
    static async get(user: User, id: number): Promise<KompetensiResponse> {
        const kompetensi = await this.checkKompetensiMustexist(id)
        return toKompetensiResponse(kompetensi)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateKompetensiRequest): Promise<KompetensiResponse> {
        const updateRequest = Validation.validate(KompetensiValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Kompetensi ada atau tidak
        await this.checkKompetensiMustexist(request.id)
        const kompetensi = await prismaClient.kompetensi.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toKompetensiResponse(kompetensi)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<KompetensiResponse> {
        await this.checkKompetensiMustexist(id)
        const kompetensi = await prismaClient.kompetensi.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return kompetensi
    }
    //SEARCH 
    static async search(user: User, request: SearchKompetensiRequest): Promise<Pageable<KompetensiResponse>> {
        const searchRequest = Validation.validate(KompetensiValidation.SEARCH, request);
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
        // check if kode_sub_job_family exists
        if (searchRequest.kode_sub_job_family) {
            filters.push({
                kode_sub_job_family: {
                    contains: searchRequest.kode_sub_job_family
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
        // check if status exists
        if (searchRequest.status) {
            filters.push({
                status: {
                    contains: searchRequest.status
                }
            })
        }
        const kompetensis = await prismaClient.kompetensi.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.kompetensi.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: kompetensis.map(kompetensi => toKompetensiResponse(kompetensi)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}