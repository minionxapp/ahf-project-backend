//Create Service TestAja-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { TestAjaResponse, CreateTestAjaRequest, SearchTestAjaRequest, toTestAjaResponse, UpdateTestAjaRequest } from "../model/TestAja-model";
import { Pageable } from "../model/page";
import { TestAjaValidation } from "../validation/TestAja-validation";
import { Validation } from "../validation/validation";
import { User, TestAja } from "@prisma/client";
export class TestAjaService {

    //CREATE 
    static async create(user: User, request: CreateTestAjaRequest): Promise<TestAjaResponse> {
        const createRequest = Validation.validate(TestAjaValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        let tglaja = request.tglaja! //"2025-12-31"
        request.tglaja = new Date(tglaja)
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const testAja = await prismaClient.testAja.create({
            data: record
        })
        return toTestAjaResponse(testAja)
    }

    // CEK EXIST
    //function untuk getTestAja biar bisa dipakai berulang
    static async checkTestAjaMustexist(testAjaId: number): Promise<TestAja> {
        const testAja = await prismaClient.testAja.findFirst({
            where: {
                id: testAjaId,
            }
        })
        if (!testAja) {
            throw new ResponseError(404, "TestAja not found")
        }
        return testAja
    }

    // GET by Id
    static async get(user: User, id: number): Promise<TestAjaResponse> {
        const testAja = await this.checkTestAjaMustexist(id)
        return toTestAjaResponse(testAja)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateTestAjaRequest): Promise<TestAjaResponse> {
        const updateRequest = Validation.validate(TestAjaValidation.UPDATE, request)
        let tglaja = request.tglaja! //"2025-12-31"
        request.tglaja = new Date(tglaja)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek TestAja ada atau tidak
        await this.checkTestAjaMustexist(request.id)
        const testAja = await prismaClient.testAja.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toTestAjaResponse(testAja)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<TestAjaResponse> {
        await this.checkTestAjaMustexist(id)
        const testAja = await prismaClient.testAja.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return testAja
    }
    //SEARCH 
    static async search(user: User, request: SearchTestAjaRequest): Promise<Pageable<TestAjaResponse>> {
        const searchRequest = Validation.validate(TestAjaValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if textaja exists
        if (searchRequest.textaja) {
            filters.push({
                textaja: {
                    contains: searchRequest.textaja
                }
            })
        }
        const testAjas = await prismaClient.testAja.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.testAja.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: testAjas.map(testAja => toTestAjaResponse(testAja)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}