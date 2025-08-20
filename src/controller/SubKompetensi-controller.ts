
//Create Controller SubKompetensi-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateSubKompetensiRequest,SearchSubKompetensiRequest,UpdateSubKompetensiRequest } from "../model/SubKompetensi-model";
import { SubKompetensiService } from "../service/SubKompetensi-service";
import { number } from "zod";
export class SubKompetensiController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateSubKompetensiRequest = req.body as CreateSubKompetensiRequest;
            const response = await SubKompetensiService.create(req.user!, request)
           res.status(200).json({
               data: response
           })
       } catch (error) {
           next(error)
       }
   }
 static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const subKompetensiId = Number(req.params.subKompetensiId)
    const response = await SubKompetensiService.get(req.user!, subKompetensiId)
   res.status(200).json({
       data: response
   })
} catch (error) {
    next(error)
}
}
static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
 try {
    const request : UpdateSubKompetensiRequest = req.body as UpdateSubKompetensiRequest;
    request.id = Number(req.params.subKompetensiId)
    const response = await SubKompetensiService.update(req.user!, request)
    res.status(200).json({
        data: response
    })
} catch (error) {
    next(error)
}
}
 static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const subKompetensiId = Number(req.params.subKompetensiId)
    const response = await SubKompetensiService.remove(req.user!, subKompetensiId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchSubKompetensiRequest = {
kode: req.query.kode as string,
kode_job_family: req.query.kode_job_family as string,
kode_sub_job_family: req.query.kode_sub_job_family as string,
nama: req.query.nama as string,
desc: req.query.desc as string,
status: req.query.status as string,
kode_kompetensi: req.query.kode_kompetensi as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await SubKompetensiService.search(req.user!, request);
  res.status(200).json(response);
} catch (e) {
    next(e);
}
} 
}