//Create Controller UserAkademi-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateUserAkademiRequest,SearchUserAkademiRequest,UpdateUserAkademiRequest } from "../model/UserAkademi-model";
import { UserAkademiService } from "../service/UserAkademi-service";
import { number } from "zod";
export class UserAkademiController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateUserAkademiRequest = req.body as CreateUserAkademiRequest;
            const response = await UserAkademiService.create(req.user!, request)
           res.status(200).json({
               data: response
           })
       } catch (error) {
           next(error)
       }
   }

//GET
 static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const userAkademiId = (req.params.Id)
    const response = await UserAkademiService.get(req.user!, userAkademiId)
   res.status(200).json({
       data: response
   })
} catch (error) {
    next(error)
}
}

//UPDATE
static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
 try {
    const request : UpdateUserAkademiRequest = req.body as UpdateUserAkademiRequest;
    request.id = (req.params.Id)
    const response = await UserAkademiService.update(req.user!, request)
    res.status(200).json({
        data: response
    })
} catch (error) {
    next(error)
}
}

//REMOVE
 static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const userAkademiId = (req.params.Id)
    const response = await UserAkademiService.remove(req.user!, userAkademiId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchUserAkademiRequest = {
username: req.query.username as string,
kode_akademi: req.query.kode_akademi as string,
aktive: req.query.aktive as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await UserAkademiService.search(req.user!, request);
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
            const response = await UserAkademiService.getId(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
//USERNAME
     static async getUsername(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.Username)
            const response = await UserAkademiService.getUsername(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
//KODE_AKADEMI
     static async getKode_akademi(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.Kode_akademi)
            const response = await UserAkademiService.getKode_akademi(req.user!, param)
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
            const response = await UserAkademiService.getAktive(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
