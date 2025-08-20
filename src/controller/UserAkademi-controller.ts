//Create Controller UserAkademi-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateUserAkademiRequest, SearchUserAkademiRequest, UpdateUserAkademiRequest } from "../model/UserAkademi-model";
import { UserAkademiService } from "../service/UserAkademi-service";
import { number } from "zod";
export class UserAkademiController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateUserAkademiRequest = req.body as CreateUserAkademiRequest;
            const response = await UserAkademiService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const userAkademiId = Number(req.params.userAkademiId)
            const response = await UserAkademiService.get(req.user!, userAkademiId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserAkademiRequest = req.body as UpdateUserAkademiRequest;
            request.id = Number(req.params.userAkademiId)
            const response = await UserAkademiService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const userAkademiId = Number(req.params.userAkademiId)
            const response = await UserAkademiService.remove(req.user!, userAkademiId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchUserAkademiRequest = {
                username: req.query.username as string,
                kode_akademi: req.query.kode_akademi as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await UserAkademiService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}