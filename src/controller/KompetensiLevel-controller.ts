
//Create Controller KompetensiLevel-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateKompetensiLevelRequest, SearchKompetensiLevelRequest, UpdateKompetensiLevelRequest } from "../model/KompetensiLevel-model";
import { KompetensiLevelService } from "../service/KompetensiLevel-service";
import { number } from "zod";
export class KompetensiLevelController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateKompetensiLevelRequest = req.body as CreateKompetensiLevelRequest;
            const response = await KompetensiLevelService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const kompetensiLevelId = Number(req.params.kompetensiLevelId)
            const response = await KompetensiLevelService.get(req.user!, kompetensiLevelId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateKompetensiLevelRequest = req.body as UpdateKompetensiLevelRequest;
            request.id = Number(req.params.kompetensiLevelId)
            const response = await KompetensiLevelService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const kompetensiLevelId = Number(req.params.kompetensiLevelId)
            const response = await KompetensiLevelService.remove(req.user!, kompetensiLevelId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchKompetensiLevelRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                status: req.query.status as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await KompetensiLevelService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}