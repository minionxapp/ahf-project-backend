//Create Service UserAkademi-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UserAkademiResponse, CreateUserAkademiRequest, SearchUserAkademiRequest, toUserAkademiResponse, UpdateUserAkademiRequest } from "../model/UserAkademi-model";
import { Pageable } from "../model/page";
import { UserAkademiValidation } from "../validation/UserAkademi-validation";
import { Validation } from "../validation/validation";
import { User, UserAkademi } from "@prisma/client";
export class UserAkademiService {

    //CREATE 
    static async create(user: User, request: CreateUserAkademiRequest): Promise<UserAkademiResponse> {
        const createRequest = Validation.validate(UserAkademiValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const userAkademi = await prismaClient.userAkademi.create({
            data: record
        })
        return toUserAkademiResponse(userAkademi)
    }

    // CEK EXIST
    //function untuk getUserAkademi biar bisa dipakai berulang
    static async checkUserAkademiMustexist(userAkademiId: number): Promise<UserAkademi> {
        const userAkademi = await prismaClient.userAkademi.findFirst({
            where: {
                id: userAkademiId,
            }
        })
        if (!userAkademi) {
            throw new ResponseError(404, "UserAkademi not found")
        }
        return userAkademi
    }

    // GET by Id
    static async get(user: User, id: number): Promise<UserAkademiResponse> {
        const userAkademi = await this.checkUserAkademiMustexist(id)
        return toUserAkademiResponse(userAkademi)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateUserAkademiRequest): Promise<UserAkademiResponse> {
        const updateRequest = Validation.validate(UserAkademiValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek UserAkademi ada atau tidak
        await this.checkUserAkademiMustexist(request.id)
        const userAkademi = await prismaClient.userAkademi.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toUserAkademiResponse(userAkademi)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<UserAkademiResponse> {
        await this.checkUserAkademiMustexist(id)
        const userAkademi = await prismaClient.userAkademi.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return userAkademi
    }
    //SEARCH 
    static async search(user: User, request: SearchUserAkademiRequest): Promise<Pageable<UserAkademiResponse>> {
        const searchRequest = Validation.validate(UserAkademiValidation.SEARCH, request);
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
        // check if kode_akademi exists
        if (searchRequest.kode_akademi) {
            filters.push({
                kode_akademi: {
                    contains: searchRequest.kode_akademi
                }
            })
        }
        const userAkademis = await prismaClient.userAkademi.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.userAkademi.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: userAkademis.map(userAkademi => toUserAkademiResponse(userAkademi)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}