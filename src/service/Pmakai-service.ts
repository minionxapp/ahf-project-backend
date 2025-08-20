//Create Service Pmakai-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { PmakaiResponse, CreatePmakaiRequest, SearchPmakaiRequest, toPmakaiResponse, UpdatePmakaiRequest } from "../model/Pmakai-model";
import { Pageable } from "../model/page";
import { PmakaiValidation } from "../validation/Pmakai-validation";
import { Validation } from "../validation/validation";
import { User, Pmakai } from "@prisma/client";
import bcrypt from "bcrypt" 
export class PmakaiService {

    //CREATE 
    static async create(user: User, request: CreatePmakaiRequest): Promise<PmakaiResponse> {
        const createRequest = Validation.validate(PmakaiValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        let expired = request.expired! //"2025-12-31"
        request.expired = new Date(expired)
        createRequest.password = await bcrypt.hash(request.password,10)
        const totalusernameUniq = await prismaClient.pmakai.count({
            where: {
                username: createRequest.username
            }
        })
        if (totalusernameUniq != 0) {
            throw new ResponseError(400, "username already axist");
        }

        const totalemailUniq = await prismaClient.pmakai.count({
            where: {
                email: createRequest.email
            }
        })
        if (totalemailUniq != 0) {
            throw new ResponseError(400, "email already axist");
        }

        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const pmakai = await prismaClient.pmakai.create({
            data: record
        })
        return toPmakaiResponse(pmakai)
    }

    // CEK EXIST
    //function untuk getPmakai biar bisa dipakai berulang
    static async checkPmakaiMustexist(pmakaiId: number): Promise<Pmakai> {
        const pmakai = await prismaClient.pmakai.findFirst({
            where: {
                id: pmakaiId,
            }
        })
        if (!pmakai) {
            throw new ResponseError(404, "Pmakai not found")
        }
        return pmakai
    }

    // GET by Id
    static async get(user: User, id: number): Promise<PmakaiResponse> {
        const pmakai = await this.checkPmakaiMustexist(id)
        return toPmakaiResponse(pmakai)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdatePmakaiRequest): Promise<PmakaiResponse> {
        const updateRequest = Validation.validate(PmakaiValidation.UPDATE, request)
        let expired = request.expired! //"2025-12-31"
        request.expired = new Date(expired)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Pmakai ada atau tidak
        await this.checkPmakaiMustexist(request.id)
        const pmakai = await prismaClient.pmakai.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toPmakaiResponse(pmakai)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<PmakaiResponse> {
        await this.checkPmakaiMustexist(id)
        const pmakai = await prismaClient.pmakai.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return pmakai
    }
    //SEARCH 
    static async search(user: User, request: SearchPmakaiRequest): Promise<Pageable<PmakaiResponse>> {
        const searchRequest = Validation.validate(PmakaiValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if username exists
        if (searchRequest.username) { 
            filters.push({
                username: {
                    contains: searchRequest.username
                }
            })
        }
        // check if password exists
        if (searchRequest.password) {
            filters.push({
                password: {
                    contains: searchRequest.password
                }
            })
        }
        // check if name exists
        if (searchRequest.name) {
            filters.push({
                name: {
                    contains: searchRequest.name
                }
            })
        }
        // check if token exists
        if (searchRequest.token) {
            filters.push({
                token: {
                    contains: searchRequest.token
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
        // check if email exists
        if (searchRequest.email) {
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // check if group exists
        if (searchRequest.group) {
            filters.push({
                group: {
                    contains: searchRequest.group
                }
            })
        }
        const pmakais = await prismaClient.pmakai.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.pmakai.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: pmakais.map(pmakai => toPmakaiResponse(pmakai)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}