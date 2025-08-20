//Create Controller JobFamily-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateJobFamilyRequest, SearchJobFamilyRequest, UpdateJobFamilyRequest } from "../model/JobFamily-model";
import { JobFamilyService } from "../service/JobFamily-service";
import { number } from "zod";
export class JobFamilyController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateJobFamilyRequest = req.body as CreateJobFamilyRequest;
            const response = await JobFamilyService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const jobFamilyId = Number(req.params.jobFamilyId)
            const response = await JobFamilyService.get(req.user!, jobFamilyId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateJobFamilyRequest = req.body as UpdateJobFamilyRequest;
            request.id = Number(req.params.jobFamilyId)
            const response = await JobFamilyService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const jobFamilyId = Number(req.params.jobFamilyId)
            const response = await JobFamilyService.remove(req.user!, jobFamilyId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchJobFamilyRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                desc: req.query.desc as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await JobFamilyService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}