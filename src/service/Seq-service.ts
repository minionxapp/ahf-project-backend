//Create Service Seq-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { SeqResponse, CreateSeqRequest, SearchSeqRequest, toSeqResponse, UpdateSeqRequest } from "../model/Seq-model";
import { Pageable } from "../model/page";
import { SeqValidation } from "../validation/Seq-validation";
import { Validation } from "../validation/validation";
import { User, Seq } from "@prisma/client";
export class SeqService {

    //CREATE 
    static async create(user: User, request: CreateSeqRequest): Promise<SeqResponse> {
        const createRequest = Validation.validate(SeqValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const seq = await prismaClient.seq.create({
            data: record
        })
        return toSeqResponse(seq)
    }

    // CEK EXIST
    //function untuk getSeq biar bisa dipakai berulang
    static async checkSeqMustexist(seqId: number): Promise<Seq> {
        const seq = await prismaClient.seq.findFirst({
            where: {
                id: seqId,
            }
        })
        if (!seq) {
            throw new ResponseError(404, "Seq not found")
        }
        return seq
    }

    // GET by Id
    static async get(user: User, id: number): Promise<SeqResponse> {
        const seq = await this.checkSeqMustexist(id)
        return toSeqResponse(seq)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateSeqRequest): Promise<SeqResponse> {
        const updateRequest = Validation.validate(SeqValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Seq ada atau tidak
        await this.checkSeqMustexist(request.id)
        const seq = await prismaClient.seq.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toSeqResponse(seq)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<SeqResponse> {
        await this.checkSeqMustexist(id)
        const seq = await prismaClient.seq.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return seq
    }
    //SEARCH 
    static async search(user: User, request: SearchSeqRequest): Promise<Pageable<SeqResponse>> {
        const searchRequest = Validation.validate(SeqValidation.SEARCH, request);
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
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }
        const seqs = await prismaClient.seq.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.seq.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: seqs.map(seq => toSeqResponse(seq)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}