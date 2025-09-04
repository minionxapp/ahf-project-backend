
//Create Controller Divisi-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDivisiRequest,SearchDivisiRequest,UpdateDivisiRequest } from "../model/Divisi-model";
import { DivisiService } from "../service/Divisi-service";
import { number } from "zod";
export class DivisiController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateDivisiRequest = req.body as CreateDivisiRequest;
            const response = await DivisiService.create(req.user!, request)
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
    const divisiId = (req.params.Id)
    const response = await DivisiService.get(req.user!, divisiId)
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
    const request : UpdateDivisiRequest = req.body as UpdateDivisiRequest;
    request.id = (req.params.Id)
    const response = await DivisiService.update(req.user!, request)
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
    const divisiId = (req.params.Id)
    const response = await DivisiService.remove(req.user!, divisiId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchDivisiRequest = {
kode: req.query.kode as string,
nama: req.query.nama as string,
aktive: req.query.aktive as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await DivisiService.search(req.user!, request);
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
            const response = await DivisiService.getId(req.user!, param)
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
            const response = await DivisiService.getKode(req.user!, param)
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
            const response = await DivisiService.getNama(req.user!, param)
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
            const response = await DivisiService.getAktive(req.user!, param)
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
            const response = await DivisiService.getUrutan(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}

