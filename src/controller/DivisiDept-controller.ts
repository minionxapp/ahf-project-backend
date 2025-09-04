
//Create Controller DivisiDept-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDivisiDeptRequest,SearchDivisiDeptRequest,UpdateDivisiDeptRequest } from "../model/DivisiDept-model";
import { DivisiDeptService } from "../service/DivisiDept-service";
import { number } from "zod";
export class DivisiDeptController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateDivisiDeptRequest = req.body as CreateDivisiDeptRequest;
            const response = await DivisiDeptService.create(req.user!, request)
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
    const divisiDeptId = (req.params.Id)
    const response = await DivisiDeptService.get(req.user!, divisiDeptId)
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
    const request : UpdateDivisiDeptRequest = req.body as UpdateDivisiDeptRequest;
    request.id = (req.params.Id)
    const response = await DivisiDeptService.update(req.user!, request)
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
    const divisiDeptId = (req.params.Id)
    const response = await DivisiDeptService.remove(req.user!, divisiDeptId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchDivisiDeptRequest = {
kode: req.query.kode as string,
nama: req.query.nama as string,
divisi_kode: req.query.divisi_kode as string,
divisi_name: req.query.divisi_name as string,
aktive: req.query.aktive as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await DivisiDeptService.search(req.user!, request);
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
            const response = await DivisiDeptService.getId(req.user!, param)
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
            const param = String(req.params.Kode)
            const response = await DivisiDeptService.getKode(req.user!, param)
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
            const param = String(req.params.Nama)
            const response = await DivisiDeptService.getNama(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
//DIVISI_KODE
     static async getDivisi_kode(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = String(req.params.Divisi_kode)
            const response = await DivisiDeptService.getDivisi_kode(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
//DIVISI_NAME
     static async getDivisi_name(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = String(req.params.Divisi_name)
            const response = await DivisiDeptService.getDivisi_name(req.user!, param)
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
            const param = String(req.params.Aktive)
            const response = await DivisiDeptService.getAktive(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}

