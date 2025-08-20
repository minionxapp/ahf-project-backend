//Create Controller StatusTraining-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateStatusTrainingRequest, SearchStatusTrainingRequest, UpdateStatusTrainingRequest } from "../model/StatusTraining-model";
import { StatusTrainingService } from "../service/StatusTraining-service";
import { number } from "zod";
export class StatusTrainingController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateStatusTrainingRequest = req.body as CreateStatusTrainingRequest;
            const response = await StatusTrainingService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const statusTrainingId = Number(req.params.statusTrainingId)
            const response = await StatusTrainingService.get(req.user!, statusTrainingId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateStatusTrainingRequest = req.body as UpdateStatusTrainingRequest;
            request.id = Number(req.params.statusTrainingId)
            const response = await StatusTrainingService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const statusTrainingId = Number(req.params.statusTrainingId)
            const response = await StatusTrainingService.remove(req.user!, statusTrainingId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchStatusTrainingRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                aktive: req.query.aktive as string,
                desc: req.query.desc as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await StatusTrainingService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}
