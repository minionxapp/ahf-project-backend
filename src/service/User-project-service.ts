//Create Service UserProject-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UserProjectResponse, CreateUserProjectRequest, SearchUserProjectRequest, toUserProjectResponse, UpdateUserProjectRequest } from "../model/User-project-model";
import { Pageable } from "../model/page";
import { UserProjectValidation } from "../validation/User-project-validation";
import { Validation } from "../validation/validation";
import { User, UserProject } from "@prisma/client";
export class UserProjectService {

    //CREATE 
    static async create(user: User, request: CreateUserProjectRequest): Promise<UserProjectResponse> {
        const createRequest = Validation.validate(UserProjectValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}

        //cek apakah sudah ada atau belum (username dan project_id)
        const check = await this.checkProjectUsernameMustexist(request.project_id, request.username!)
        if (check) {
            throw new ResponseError(400, "Username sudah ada di project")
        }
        const userProject = await prismaClient.userProject.create({
            data: record
        })
        return toUserProjectResponse(userProject)
    }



    static async checkProjectUsernameMustexist(project_id: number, username: string): Promise<UserProject | null> {
        const userProject = await prismaClient.userProject.findFirst({
            where: {
                project_id: project_id,
                username: username
            }
        })
        return userProject
    }

    // CEK EXIST
    //function untuk getUserProject biar bisa dipakai berulang
    static async checkUserProjectMustexist(userProjectId: string): Promise<UserProject> {
        const userProject = await prismaClient.userProject.findFirst({
            where: {
                id: userProjectId,
            }
        })
        if (!userProject) {
            throw new ResponseError(404, "UserProject not found")
        }
        return userProject
    }

    // GET by Id
    static async get(user: User, id: string): Promise<UserProjectResponse> {
        const userProject = await this.checkUserProjectMustexist(id)
        return toUserProjectResponse(userProject)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateUserProjectRequest): Promise<UserProjectResponse> {
        const updateRequest = Validation.validate(UserProjectValidation.UPDATE, request)
        // console.log(updateRequest)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek UserProject ada atau tidak
        await this.checkUserProjectMustexist(request.id)
        const userProject = await prismaClient.userProject.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toUserProjectResponse(userProject)
    }
    //REMOVE by Id
    static async remove(user: User, id: string): Promise<UserProjectResponse> {
        await this.checkUserProjectMustexist(id)
        const userProject = await prismaClient.userProject.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return userProject
    }
    //SEARCH 
    static async search(user: User, request: SearchUserProjectRequest): Promise<Pageable<UserProjectResponse>> {
        const searchRequest = Validation.validate(UserProjectValidation.SEARCH, request);
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
        // check if status exists
        if (searchRequest.status) {
            filters.push({
                status: {
                    contains: searchRequest.status
                }
            })
        }
        const userProjects = await prismaClient.userProject.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.userProject.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: userProjects.map(userProject => toUserProjectResponse(userProject)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}