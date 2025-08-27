import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest ,SearchUserRequest} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            //bikin body reques 
            const request: CreateUserRequest = req.body as CreateUserRequest
            //kirim ke serice
            const response = await UserService.register(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            //bikin body reques
            const request: LoginUserRequest = req.body as LoginUserRequest
            //kirim ke serice
            const response = await UserService.login(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            //kirim ke serice
            const response = await UserService.get(req.user!)//!-->paksa ada
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getbyusername(req: UserRequest, res: Response, next: NextFunction) {
        try {
            //kirim ke serice
            const username = (req.params.username)
            const response = await UserService.getbyusername(req.user!,username)//!-->paksa ada
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest
            //kirim ke serice
            const response = await UserService.update(req.user!, request)//!-->paksa ada
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            //kirim ke serice
            const response = await UserService.logout(req.user!)//!-->paksa ada
            res.status(200).json({
                data: 'OK'
            })
        } catch (error) {
            next(error)
        }
    }



    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchUserRequest = {
                username: req.query.username as string,
                password: req.query.password as string,
                name: req.query.name as string,
                token: req.query.token as string,
                status: req.query.status as string,
                email: req.query.email as string,
                group: req.query.group as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await UserService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        
            try {
                const pmakaiUsername = String(req.params.username)
                const response = await UserService.remove(req.user!, pmakaiUsername)
                res.status(200).json({
                    data: "OK"
                })
            } catch (error) {
                next(error)
            }

            
        }

}

