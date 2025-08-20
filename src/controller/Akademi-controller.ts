
//Create Controller Akademi-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateAkademiRequest, SearchAkademiRequest, UpdateAkademiRequest } from "../model/Akademi-model";
import { AkademiService } from "../service/Akademi-service";
import { number } from "zod";
export class AkademiController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAkademiRequest = req.body as CreateAkademiRequest;
            const response = await AkademiService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const akademiId = Number(req.params.akademiId)
            const response = await AkademiService.get(req.user!, akademiId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateAkademiRequest = req.body as UpdateAkademiRequest;
            request.id = Number(req.params.akademiId)
            const response = await AkademiService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const akademiId = Number(req.params.akademiId)
            const response = await AkademiService.remove(req.user!, akademiId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchAkademiRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                status: req.query.status as string,
                nama_pic: req.query.nama_pic as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await AkademiService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }


    static async getAkademiByUsername(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const username = String(req.params.username)
            const response = await AkademiService.akademiByUsername(req.user!, username)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

}