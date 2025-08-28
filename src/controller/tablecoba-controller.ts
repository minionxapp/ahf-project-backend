//Create Controller TableCoba-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTableCobaRequest, SearchTableCobaRequest, UpdateTableCobaRequest } from "../model/TableCoba-model";
import { TableCobaService } from "../service/TableCoba-service";
import { number } from "zod";
export class TableCobaController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTableCobaRequest = req.body as CreateTableCobaRequest;
            const response = await TableCobaService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const tableCobaId = (req.params.tableCobaId)
            const response = await TableCobaService.get(req.user!, tableCobaId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateTableCobaRequest = req.body as UpdateTableCobaRequest;
            request.id = (req.params.tableCobaId)
            const response = await TableCobaService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const tableCobaId = (req.params.tableCobaId)
            const response = await TableCobaService.remove(req.user!, tableCobaId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchTableCobaRequest = {
                name: req.query.name as string,
                kode: req.query.kode as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await TableCobaService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }


    //for GET
    //ID
    static async getId(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const param = (req.params.tableCobaId)
            const response = await TableCobaService.getId(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    
    //Name
     static async getName(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const param = (req.params.tableCobaName)
            const response = await TableCobaService.getName(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    //Kode
     static async getKode(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        // console.log("\nGetkode controller============================\n")
        try {
            const param = (req.params.tableCobaKode)
            const response = await TableCobaService.getKode(req.user!, param)
            // console.log(response)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}