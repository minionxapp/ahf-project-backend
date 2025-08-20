//Create Controller Training-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTrainingRequest, SearchTrainingRequest, UpdateTrainingRequest } from "../model/Training-model";
import { TrainingService } from "../service/Training-service";
import { number } from "zod";
export class TrainingController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTrainingRequest = req.body as CreateTrainingRequest;
            const response = await TrainingService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const trainingId = Number(req.params.trainingId)
            const response = await TrainingService.get(req.user!, trainingId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateTrainingRequest = req.body as UpdateTrainingRequest;
            request.id = Number(req.params.trainingId)
            const response = await TrainingService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const trainingId = Number(req.params.trainingId)
            const response = await TrainingService.remove(req.user!, trainingId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchTrainingRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                akademi: req.query.akademi as string,
                tipe: req.query.tipe as string,
                pic: req.query.pic as string,
                desc: req.query.desc as string,
                kompetensi: req.query.kompetensi as string,
                sub_kompetensi: req.query.sub_kompetensi as string,
                status_training: req.query.status_training as string,
                kode_job_family: req.query.kode_job_family as string,
                kode_sub_job_family: req.query.kode_sub_job_family as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await TrainingService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}