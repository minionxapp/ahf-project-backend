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
            const jobFamilyId = (req.params.jobFamilyId)
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
            request.id = (req.params.jobFamilyId)
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
            const jobFamilyId = (req.params.jobFamilyId)
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
                aktive: req.query.aktive as string,
                deskripsi: req.query.deskripsi as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await JobFamilyService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    //for GET 
    //ID
    static async getId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.jobFamilyId)
            const response = await JobFamilyService.getId(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //kode
    static async getKode(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.jobFamilyKode)
            const response = await JobFamilyService.getKode(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //nama
    static async getNama(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.jobFamilyNama)
            const response = await JobFamilyService.getNama(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //aktive
    static async getAktive(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.jobFamilyAktive)
            const response = await JobFamilyService.getAktive(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //deskripsi
    static async getDeskripsi(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.jobFamilyDeskripsi)
            const response = await JobFamilyService.getDeskripsi(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}

