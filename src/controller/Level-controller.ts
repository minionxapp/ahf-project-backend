//Create Controller Level-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateLevelRequest, SearchLevelRequest, UpdateLevelRequest } from "../model/Level-model";
import { LevelService } from "../service/Level-service";
import { number } from "zod";
export class LevelController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateLevelRequest = req.body as CreateLevelRequest;
            const response = await LevelService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    //GET
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const levelId = (req.params.Id)
            const response = await LevelService.get(req.user!, levelId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    //UPDATE
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateLevelRequest = req.body as UpdateLevelRequest;
            request.id = (req.params.Id)
            const response = await LevelService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    //REMOVE
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const levelId = (req.params.Id)
            const response = await LevelService.remove(req.user!, levelId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchLevelRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                aktive: req.query.aktive as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await LevelService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    //GET By KOLOM NAME 
    //ID
    static async getId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.Id)
            const response = await LevelService.getId(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //KODE
    static async getKode(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.Kode)
            const response = await LevelService.getKode(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //NAMA
    static async getNama(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.Nama)
            const response = await LevelService.getNama(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //AKTIVE
    static async getAktive(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.Aktive)
            const response = await LevelService.getAktive(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //URUTAN
    static async getUrutan(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = Number(req.params.Urutan)
            const response = await LevelService.getUrutan(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
