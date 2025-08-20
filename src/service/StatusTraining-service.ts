//Create Service StatusTraining-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { StatusTrainingResponse, CreateStatusTrainingRequest, SearchStatusTrainingRequest, toStatusTrainingResponse, UpdateStatusTrainingRequest } from "../model/StatusTraining-model";
import { Pageable } from "../model/page";
import { StatusTrainingValidation } from "../validation/StatusTraining-validation";
import { Validation } from "../validation/validation";
import { User, StatusTraining } from "@prisma/client";
export class StatusTrainingService {

    //CREATE 
    static async create(user: User, request: CreateStatusTrainingRequest): Promise<StatusTrainingResponse> {
        const createRequest = Validation.validate(StatusTrainingValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.statusTraining.count({
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
        const statusTraining = await prismaClient.statusTraining.create({
            data: record
        })
        return toStatusTrainingResponse(statusTraining)
    }

    // CEK EXIST
    //function untuk getStatusTraining biar bisa dipakai berulang
    static async checkStatusTrainingMustexist(statusTrainingId: number): Promise<StatusTraining> {
        const statusTraining = await prismaClient.statusTraining.findFirst({
            where: {
                id: statusTrainingId,
            }
        })
        if (!statusTraining) {
            throw new ResponseError(404, "StatusTraining not found")
        }
        return statusTraining
    }

    // GET by Id
    static async get(user: User, id: number): Promise<StatusTrainingResponse> {
        const statusTraining = await this.checkStatusTrainingMustexist(id)
        return toStatusTrainingResponse(statusTraining)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateStatusTrainingRequest): Promise<StatusTrainingResponse> {
        const updateRequest = Validation.validate(StatusTrainingValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek StatusTraining ada atau tidak
        await this.checkStatusTrainingMustexist(request.id)
        const statusTraining = await prismaClient.statusTraining.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toStatusTrainingResponse(statusTraining)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<StatusTrainingResponse> {
        await this.checkStatusTrainingMustexist(id)
        const statusTraining = await prismaClient.statusTraining.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return statusTraining
    }
    //SEARCH 
    static async search(user: User, request: SearchStatusTrainingRequest): Promise<Pageable<StatusTrainingResponse>> {
        const searchRequest = Validation.validate(StatusTrainingValidation.SEARCH, request);
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
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }
        const statusTrainings = await prismaClient.statusTraining.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip,
            orderBy: {
                urutan: 'asc',
            },
        });
        const total = await prismaClient.statusTraining.count({
            where: {
                //username: user.username,
                AND: filters
            },
            
        })
        return {
            data: statusTrainings.map(statusTraining => toStatusTrainingResponse(statusTraining)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}