
//Create Controller TrainingChecklist-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTrainingChecklistRequest, SearchTrainingChecklistRequest, UpdateTrainingChecklistRequest } from "../model/TrainingChecklist-model";
import { TrainingChecklistService } from "../service/TrainingChecklist-service";
import { number } from "zod";
export class TrainingChecklistController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTrainingChecklistRequest = req.body as CreateTrainingChecklistRequest;
            const response = await TrainingChecklistService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const trainingChecklistId = Number(req.params.trainingChecklistId)
            const response = await TrainingChecklistService.get(req.user!, trainingChecklistId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateTrainingChecklistRequest = req.body as UpdateTrainingChecklistRequest;
            request.id = Number(req.params.trainingChecklistId)
            const response = await TrainingChecklistService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const trainingChecklistId = Number(req.params.trainingChecklistId)
            const response = await TrainingChecklistService.remove(req.user!, trainingChecklistId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchTrainingChecklistRequest = {
                training_kode: req.query.training_kode as string,
                checklist_kode: req.query.checklist_kode as string,
                file_1: req.query.file_1 as string,
                file_2: req.query.file_2 as string,
                file_3: req.query.file_3 as string,
                file_4: req.query.file_4 as string,
                status: req.query.status as string,
                checklist_name: req.query.checklist_name as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await TrainingChecklistService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}