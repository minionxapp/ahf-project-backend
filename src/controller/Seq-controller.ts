//Create Controller Seq-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateSeqRequest, SearchSeqRequest, UpdateSeqRequest } from "../model/Seq-model";
import { SeqService } from "../service/Seq-service";
import { number } from "zod";
export class SeqController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateSeqRequest = req.body as CreateSeqRequest;
            const response = await SeqService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        // console.log("==============================================================")
        // console.log(req.user)
        try {
            const seqId = Number(req.params.seqId)
            const response = await SeqService.get(req.user!, seqId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateSeqRequest = req.body as UpdateSeqRequest;
            request.id = Number(req.params.seqId)
            const response = await SeqService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const seqId = Number(req.params.seqId)
            const response = await SeqService.remove(req.user!, seqId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchSeqRequest = {
                kode: req.query.kode as string,
                desc: req.query.desc as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await SeqService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}