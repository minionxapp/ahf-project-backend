//Create Controller UserProject-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateUserProjectRequest, SearchUserProjectRequest, UpdateUserProjectRequest } from "../model/User-project-model";
import { UserProjectService } from "../service/User-project-service";
import { number } from "zod";
export class UserProjectController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateUserProjectRequest = req.body as CreateUserProjectRequest;
            const response = await UserProjectService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const userProjectId = (req.params.userProjectId)
            const response = await UserProjectService.get(req.user!, userProjectId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        console.log("===============update=========================")
        console.log(JSON.stringify(req.body))
        try {
            const request: UpdateUserProjectRequest = req.body as UpdateUserProjectRequest;
            request.id = (req.params.userProjectId)
             console.log(request.id)
            const response = await UserProjectService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const userProjectId = (req.params.userProjectId)
            const response = await UserProjectService.remove(req.user!, userProjectId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchUserProjectRequest = {
                username: req.query.username as string,
                status: req.query.status as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await UserProjectService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}