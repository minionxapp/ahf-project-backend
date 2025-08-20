
//Create Controller Brand-controller.ts

import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateBrandRequest,SearchBrandRequest,UpdateBrandRequest } from "../model/Brand-model";
import { BrandService } from "../service/Brand-service";
import { number } from "zod";
export class BrandController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateBrandRequest = req.body as CreateBrandRequest;
            const response = await BrandService.create(req.user!, request)
           res.status(200).json({
               data: response
           })
       } catch (error) {
           next(error)
       }
   }
 static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const brandId = Number(req.params.brandId)
    const response = await BrandService.get(req.user!, brandId)
   res.status(200).json({
       data: response
   })
} catch (error) {
    next(error)
}
}
static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
 try {
    const request : UpdateBrandRequest = req.body as UpdateBrandRequest;
    request.id = Number(req.params.brandId)
    const response = await BrandService.update(req.user!, request)
    res.status(200).json({
        data: response
    })
} catch (error) {
    next(error)
}
}
 static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const brandId = Number(req.params.brandId)
    const response = await BrandService.remove(req.user!, brandId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchBrandRequest = {
kode: req.query.kode as string,
nama: req.query.nama as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await BrandService.search(req.user!, request);
  res.status(200).json(response);
} catch (e) {
    next(e);
}
} 
}