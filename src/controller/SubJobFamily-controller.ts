//Create Controller SubJobFamily-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateSubJobFamilyRequest, SearchSubJobFamilyRequest, UpdateSubJobFamilyRequest } from "../model/SubJobFamily-model";
import { SubJobFamilyService } from "../service/SubJobFamily-service";
import { number } from "zod";
export class SubJobFamilyController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateSubJobFamilyRequest = req.body as CreateSubJobFamilyRequest;
            const response = await SubJobFamilyService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const subJobFamilyId = Number(req.params.subJobFamilyId)
            const response = await SubJobFamilyService.get(req.user!, subJobFamilyId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateSubJobFamilyRequest = req.body as UpdateSubJobFamilyRequest;
            request.id = Number(req.params.subJobFamilyId)
            const response = await SubJobFamilyService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const subJobFamilyId = Number(req.params.subJobFamilyId)
            const response = await SubJobFamilyService.remove(req.user!, subJobFamilyId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchSubJobFamilyRequest = {
                kode: req.query.kode as string,
                kode_job_family: req.query.kode_job_family as string,
                nama: req.query.nama as string,
                desc: req.query.desc as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await SubJobFamilyService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}