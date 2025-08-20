//Create Controller Kompetensi-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateKompetensiRequest, SearchKompetensiRequest, UpdateKompetensiRequest } from "../model/Kompetensi-model";
import { KompetensiService } from "../service/Kompetensi-service";
import { number } from "zod";
export class KompetensiController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateKompetensiRequest = req.body as CreateKompetensiRequest;
            const response = await KompetensiService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const kompetensiId = Number(req.params.kompetensiId)
            const response = await KompetensiService.get(req.user!, kompetensiId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateKompetensiRequest = req.body as UpdateKompetensiRequest;
            request.id = Number(req.params.kompetensiId)
            const response = await KompetensiService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const kompetensiId = Number(req.params.kompetensiId)
            const response = await KompetensiService.remove(req.user!, kompetensiId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchKompetensiRequest = {
                kode: req.query.kode as string,
                kode_job_family: req.query.kode_job_family as string,
                kode_sub_job_family: req.query.kode_sub_job_family as string,
                nama: req.query.nama as string,
                desc: req.query.desc as string,
                status: req.query.status as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await KompetensiService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}