
//Create Controller Checklist-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateChecklistRequest,SearchChecklistRequest,UpdateChecklistRequest } from "../model/Checklist-model";
import { ChecklistService } from "../service/Checklist-service";
import { number } from "zod";
export class ChecklistController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateChecklistRequest = req.body as CreateChecklistRequest;
            const response = await ChecklistService.create(req.user!, request)
           res.status(200).json({
               data: response
           })
       } catch (error) {
           next(error)
       }
   }
 static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const checklistId = Number(req.params.checklistId)
    const response = await ChecklistService.get(req.user!, checklistId)
   res.status(200).json({
       data: response
   })
} catch (error) {
    next(error)
}
}
static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
 try {
    const request : UpdateChecklistRequest = req.body as UpdateChecklistRequest;
    request.id = Number(req.params.checklistId)
    const response = await ChecklistService.update(req.user!, request)
    res.status(200).json({
        data: response
    })
} catch (error) {
    next(error)
}
}
 static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const checklistId = Number(req.params.checklistId)
    const response = await ChecklistService.remove(req.user!, checklistId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchChecklistRequest = {
nama: req.query.nama as string,
desc: req.query.desc as string,
kode: req.query.kode as string,
group: req.query.group as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await ChecklistService.search(req.user!, request);
  res.status(200).json(response);
} catch (e) {
    next(e);
}
} 
}