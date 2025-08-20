
//Create Service Checklist-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { ChecklistResponse, CreateChecklistRequest, SearchChecklistRequest, toChecklistResponse, UpdateChecklistRequest } from "../model/Checklist-model";
import { Pageable } from "../model/page";
import { ChecklistValidation } from "../validation/Checklist-validation";
import { Validation } from "../validation/validation";
import { User, Checklist } from "@prisma/client";
export class ChecklistService {

//CREATE 
static async create(user: User, request: CreateChecklistRequest): Promise<ChecklistResponse> {
const createRequest = Validation.validate(ChecklistValidation.CREATE, request)
//belum ada validasi bila tidak boleh sama (uniq) dalam kolom
 //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
const totalkodeUniq = await prismaClient.checklist.count({
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
const checklist = await prismaClient.checklist.create({
data: record
})
return toChecklistResponse(checklist)
}

// CEK EXIST
 //function untuk getChecklist biar bisa dipakai berulang
static async checkChecklistMustexist( checklistId: number): Promise<Checklist> {
const checklist = await prismaClient.checklist.findFirst({
where: {
id: checklistId,
}
})
if (!checklist) {
throw new ResponseError(404, "Checklist not found")
}
return checklist
}

// GET by Id
 static async get(user: User,id: number): Promise<ChecklistResponse> {
const checklist = await this.checkChecklistMustexist(id)
return toChecklistResponse(checklist)
}

// UPDATE by Id
 static async update(user: User, request: UpdateChecklistRequest): Promise<ChecklistResponse> {
 const updateRequest = Validation.validate(ChecklistValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.name },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek Checklist ada atau tidak
 await this.checkChecklistMustexist(request.id)
 const checklist = await prismaClient.checklist.update({
    where: {
       id: updateRequest.id,
  //     username: user.username
  },
  data: record
 })
 return toChecklistResponse(checklist)
}
//REMOVE by Id
 static async remove(user: User, id: number): Promise<ChecklistResponse> {
 await this.checkChecklistMustexist( id)
 const checklist = await prismaClient.checklist.delete({
 where: {
 id: id,
 //username: user.username
 }
 })
 return checklist
 }
//SEARCH 
 static async search(user: User, request: SearchChecklistRequest) : Promise<Pageable<ChecklistResponse>> {
 const searchRequest = Validation.validate(ChecklistValidation.SEARCH, request);
 const skip = (searchRequest.page - 1) * searchRequest.size;
 const filters = [];
 // check if name exists
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
 // check if kode exists
if(searchRequest.kode){
filters.push({
   kode: {
      contains: searchRequest.kode
 }
})
}
 // check if group exists
if(searchRequest.group){
filters.push({
   group: {
      contains: searchRequest.group
 }
})
}
const checklists = await prismaClient.checklist.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.checklist.count({
    where: {
        //username: user.username,
        AND: filters
    },
})
return {
    data: checklists.map(checklist => toChecklistResponse(checklist)),
    paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
        total_rows:total
    }
}
}

}