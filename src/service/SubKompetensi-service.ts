
//Create Service SubKompetensi-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { SubKompetensiResponse, CreateSubKompetensiRequest, SearchSubKompetensiRequest, toSubKompetensiResponse, UpdateSubKompetensiRequest } from "../model/SubKompetensi-model";
import { Pageable } from "../model/page";
import { SubKompetensiValidation } from "../validation/SubKompetensi-validation";
import { Validation } from "../validation/validation";
import { User, SubKompetensi } from "@prisma/client";
export class SubKompetensiService {

//CREATE 
static async create(user: User, request: CreateSubKompetensiRequest): Promise<SubKompetensiResponse> {
const createRequest = Validation.validate(SubKompetensiValidation.CREATE, request)
//belum ada validasi bila tidak boleh sama (uniq) dalam kolom
 //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
const totalkodeUniq = await prismaClient.subKompetensi.count({
where: {
    kode : createRequest.kode
}
})
if(totalkodeUniq !=0){
    throw new ResponseError(400,"kode already axist");
}

const record = {
...createRequest,//dari object yang ada
...{ create_by: user.name }, //tambahkan username, dengan value dari object user
 ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user}
const subKompetensi = await prismaClient.subKompetensi.create({
data: record
})
return toSubKompetensiResponse(subKompetensi)
}

// CEK EXIST
 //function untuk getSubKompetensi biar bisa dipakai berulang
static async checkSubKompetensiMustexist( subKompetensiId: number): Promise<SubKompetensi> {
const subKompetensi = await prismaClient.subKompetensi.findFirst({
where: {
id: subKompetensiId,
}
})
if (!subKompetensi) {
throw new ResponseError(404, "SubKompetensi not found")
}
return subKompetensi
}

// GET by Id
 static async get(user: User,id: number): Promise<SubKompetensiResponse> {
const subKompetensi = await this.checkSubKompetensiMustexist(id)
return toSubKompetensiResponse(subKompetensi)
}

// UPDATE by Id
 static async update(user: User, request: UpdateSubKompetensiRequest): Promise<SubKompetensiResponse> {
 const updateRequest = Validation.validate(SubKompetensiValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.name },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek SubKompetensi ada atau tidak
 await this.checkSubKompetensiMustexist(request.id)
 const subKompetensi = await prismaClient.subKompetensi.update({
    where: {
       id: updateRequest.id,
  //     username: user.username
  },
  data: record
 })
 return toSubKompetensiResponse(subKompetensi)
}
//REMOVE by Id
 static async remove(user: User, id: number): Promise<SubKompetensiResponse> {
 await this.checkSubKompetensiMustexist( id)
 const subKompetensi = await prismaClient.subKompetensi.delete({
 where: {
 id: id,
 //username: user.username
 }
 })
 return subKompetensi
 }
//SEARCH 
 static async search(user: User, request: SearchSubKompetensiRequest) : Promise<Pageable<SubKompetensiResponse>> {
 const searchRequest = Validation.validate(SubKompetensiValidation.SEARCH, request);
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
 // check if kode_job_family exists
if(searchRequest.kode_job_family){
filters.push({
   kode_job_family: {
      contains: searchRequest.kode_job_family
 }
})
}
 // check if kode_sub_job_family exists
if(searchRequest.kode_sub_job_family){
filters.push({
   kode_sub_job_family: {
      contains: searchRequest.kode_sub_job_family
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
 // check if desc exists
if(searchRequest.desc){
filters.push({
   desc: {
      contains: searchRequest.desc
 }
})
}
 // check if status exists
if(searchRequest.status){
filters.push({
   status: {
      contains: searchRequest.status
 }
})
}
 // check if kode_kompetensi exists
if(searchRequest.kode_kompetensi){
filters.push({
   kode_kompetensi: {
      contains: searchRequest.kode_kompetensi
 }
})
}
const subKompetensis = await prismaClient.subKompetensi.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.subKompetensi.count({
    where: {
        //username: user.username,
        AND: filters
    },
})
return {
    data: subKompetensis.map(subKompetensi => toSubKompetensiResponse(subKompetensi)),
    paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
        total_rows:total
    }
}
}

}