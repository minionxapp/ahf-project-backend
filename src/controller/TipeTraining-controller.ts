//Create Controller TipeTraining-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTipeTrainingRequest, SearchTipeTrainingRequest, UpdateTipeTrainingRequest } from "../model/TipeTraining-model";
import { TipeTrainingService } from "../service/TipeTraining-service";
import { number } from "zod";
export class TipeTrainingController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTipeTrainingRequest = req.body as CreateTipeTrainingRequest;
            const response = await TipeTrainingService.create(req.user!, request)
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
            const tipeTrainingId = (req.params.Id)
            const response = await TipeTrainingService.get(req.user!, tipeTrainingId)
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
            const request: UpdateTipeTrainingRequest = req.body as UpdateTipeTrainingRequest;
            request.id = (req.params.Id)
            const response = await TipeTrainingService.update(req.user!, request)
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
            const tipeTrainingId = (req.params.Id)
            const response = await TipeTrainingService.remove(req.user!, tipeTrainingId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchTipeTrainingRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                aktive: req.query.aktive as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await TipeTrainingService.search(req.user!, request);
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
            const response = await TipeTrainingService.getId(req.user!, param)
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
            const response = await TipeTrainingService.getKode(req.user!, param)
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
            const response = await TipeTrainingService.getNama(req.user!, param)
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
            const response = await TipeTrainingService.getAktive(req.user!, param)
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
            const response = await TipeTrainingService.getUrutan(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
