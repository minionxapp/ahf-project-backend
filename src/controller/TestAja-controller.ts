//Create Controller TestAja-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTestAjaRequest, SearchTestAjaRequest, UpdateTestAjaRequest } from "../model/TestAja-model";
import { TestAjaService } from "../service/TestAja-service";
import { number } from "zod";
export class TestAjaController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTestAjaRequest = req.body as CreateTestAjaRequest;
            const response = await TestAjaService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const testAjaId = Number(req.params.testAjaId)
            const response = await TestAjaService.get(req.user!, testAjaId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateTestAjaRequest = req.body as UpdateTestAjaRequest;
            request.id = Number(req.params.testAjaId)
            const response = await TestAjaService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const testAjaId = Number(req.params.testAjaId)
            const response = await TestAjaService.remove(req.user!, testAjaId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchTestAjaRequest = {
                textaja: req.query.textaja as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await TestAjaService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}