
//Create Controller TipeTraining-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTipeTrainingRequest,SearchTipeTrainingRequest,UpdateTipeTrainingRequest } from "../model/TipeTraining-model";
import { TipeTrainingService } from "../service/TipeTraining-service";
import { number } from "zod";
export class TipeTrainingController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateTipeTrainingRequest = req.body as CreateTipeTrainingRequest;
            const response = await TipeTrainingService.create(req.user!, request)
           res.status(200).json({
               data: response
           })
       } catch (error) {
           next(error)
       }
   }
 static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const tipeTrainingId = Number(req.params.tipeTrainingId)
    const response = await TipeTrainingService.get(req.user!, tipeTrainingId)
   res.status(200).json({
       data: response
   })
} catch (error) {
    next(error)
}
}
static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
 try {
    const request : UpdateTipeTrainingRequest = req.body as UpdateTipeTrainingRequest;
    request.id = Number(req.params.tipeTrainingId)
    const response = await TipeTrainingService.update(req.user!, request)
    res.status(200).json({
        data: response
    })
} catch (error) {
    next(error)
}
}
 static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const tipeTrainingId = Number(req.params.tipeTrainingId)
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
desc: req.query.desc as string,
status: req.query.status as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await TipeTrainingService.search(req.user!, request);
  res.status(200).json(response);
} catch (e) {
    next(e);
}
} 
}