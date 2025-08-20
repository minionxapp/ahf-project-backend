//Create Controller Pmakai-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreatePmakaiRequest, SearchPmakaiRequest, UpdatePmakaiRequest } from "../model/Pmakai-model";
import { PmakaiService } from "../service/Pmakai-service";
import { number } from "zod";
export class PmakaiController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreatePmakaiRequest = req.body as CreatePmakaiRequest;
            const response = await PmakaiService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const pmakaiId = Number(req.params.pmakaiId)
            const response = await PmakaiService.get(req.user!, pmakaiId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdatePmakaiRequest = req.body as UpdatePmakaiRequest;
            request.id = Number(req.params.pmakaiId)
            const response = await PmakaiService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const pmakaiId = Number(req.params.pmakaiId)
            const response = await PmakaiService.remove(req.user!, pmakaiId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchPmakaiRequest = {
                username: req.query.username as string,
                password: req.query.password as string,
                name: req.query.name as string,
                token: req.query.token as string,
                status: req.query.status as string,
                email: req.query.email as string,
                group: req.query.group as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await PmakaiService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}