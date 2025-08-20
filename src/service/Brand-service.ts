
//Create Service Brand-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { BrandResponse, CreateBrandRequest, SearchBrandRequest, toBrandResponse, UpdateBrandRequest } from "../model/Brand-model";
import { Pageable } from "../model/page";
import { BrandValidation } from "../validation/Brand-validation";
import { Validation } from "../validation/validation";
import { User, Brand } from "@prisma/client";
export class BrandService {

//CREATE 
static async create(user: User, request: CreateBrandRequest): Promise<BrandResponse> {
const createRequest = Validation.validate(BrandValidation.CREATE, request)
//belum ada validasi bila tidak boleh sama (uniq) dalam kolom
 //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
const totalkodeUniq = await prismaClient.brand.count({
where: {
    kode : createRequest.kode
}
})
if(totalkodeUniq !=0){
    throw new ResponseError(400,"kode already axist");
}

const totalnamaUniq = await prismaClient.brand.count({
where: {
    nama : createRequest.nama
}
})
if(totalnamaUniq !=0){
    throw new ResponseError(400,"nama already axist");
}

const record = {
...createRequest,//dari object yang ada
...{ create_by: user.name }, //tambahkan username, dengan value dari object user
 ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user}
const brand = await prismaClient.brand.create({
data: record
})
return toBrandResponse(brand)
}

// CEK EXIST
 //function untuk getBrand biar bisa dipakai berulang
static async checkBrandMustexist( brandId: number): Promise<Brand> {
const brand = await prismaClient.brand.findFirst({
where: {
id: brandId,
}
})
if (!brand) {
throw new ResponseError(404, "Brand not found")
}
return brand
}

// GET by Id
 static async get(user: User,id: number): Promise<BrandResponse> {
const brand = await this.checkBrandMustexist(id)
return toBrandResponse(brand)
}

// UPDATE by Id
 static async update(user: User, request: UpdateBrandRequest): Promise<BrandResponse> {
 const updateRequest = Validation.validate(BrandValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.name },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek Brand ada atau tidak
 await this.checkBrandMustexist(request.id)
 const brand = await prismaClient.brand.update({
    where: {
       id: updateRequest.id,
  //     username: user.username
  },
  data: record
 })
 return toBrandResponse(brand)
}
//REMOVE by Id
 static async remove(user: User, id: number): Promise<BrandResponse> {
 await this.checkBrandMustexist( id)
 const brand = await prismaClient.brand.delete({
 where: {
 id: id,
 //username: user.username
 }
 })
 return brand
 }
//SEARCH 
 static async search(user: User, request: SearchBrandRequest) : Promise<Pageable<BrandResponse>> {
 const searchRequest = Validation.validate(BrandValidation.SEARCH, request);
 const skip = (searchRequest.page - 1) * searchRequest.size;
 const filters = [];
 // check if name exists
 // check if kode exists
if(searchRequest.kode){
filters.push({
   kode: {
      contains: searchRequest.kode
 }
})
}
 // check if nama exists
if(searchRequest.nama){
filters.push({
   nama: {
      contains: searchRequest.nama
 }
})
}
const brands = await prismaClient.brand.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.brand.count({
    where: {
        //username: user.username,
        AND: filters
    },
})
return {
    data: brands.map(brand => toBrandResponse(brand)),
    paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
        total_rows:total
    }
}
}

}