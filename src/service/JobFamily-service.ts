//Create Service JobFamily-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { JobFamilyResponse, CreateJobFamilyRequest, SearchJobFamilyRequest, toJobFamilyResponse, UpdateJobFamilyRequest } from "../model/JobFamily-model";
import { Pageable } from "../model/page";
import { JobFamilyValidation } from "../validation/JobFamily-validation";
import { Validation } from "../validation/validation";
import { User, JobFamily } from "@prisma/client";
export class JobFamilyService {

    //CREATE 
    static async create(user: User, request: CreateJobFamilyRequest): Promise<JobFamilyResponse> {
        const createRequest = Validation.validate(JobFamilyValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const totalkodeUniq = await prismaClient.jobFamily.count({
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
        const jobFamily = await prismaClient.jobFamily.create({
            data: record
        })
        return toJobFamilyResponse(jobFamily)
    }

    // CEK EXIST
    //function untuk getJobFamily biar bisa dipakai berulang
    static async checkJobFamilyMustexist(jobFamilyId: number): Promise<JobFamily> {
        const jobFamily = await prismaClient.jobFamily.findFirst({
            where: {
                id: jobFamilyId,
            }
        })
        if (!jobFamily) {
            throw new ResponseError(404, "JobFamily not found")
        }
        return jobFamily
    }

    // GET by Id
    static async get(user: User, id: number): Promise<JobFamilyResponse> {
        const jobFamily = await this.checkJobFamilyMustexist(id)
        return toJobFamilyResponse(jobFamily)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateJobFamilyRequest): Promise<JobFamilyResponse> {
        const updateRequest = Validation.validate(JobFamilyValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek JobFamily ada atau tidak
        await this.checkJobFamilyMustexist(request.id)
        const jobFamily = await prismaClient.jobFamily.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toJobFamilyResponse(jobFamily)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<JobFamilyResponse> {
        await this.checkJobFamilyMustexist(id)
        const jobFamily = await prismaClient.jobFamily.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return jobFamily
    }
    //SEARCH 
    static async search(user: User, request: SearchJobFamilyRequest): Promise<Pageable<JobFamilyResponse>> {
        const searchRequest = Validation.validate(JobFamilyValidation.SEARCH, request);
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
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }
        const jobFamilys = await prismaClient.jobFamily.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.jobFamily.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: jobFamilys.map(jobFamily => toJobFamilyResponse(jobFamily)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}