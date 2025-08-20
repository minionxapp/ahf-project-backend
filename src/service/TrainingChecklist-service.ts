
//Create Service TrainingChecklist-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { TrainingChecklistResponse, CreateTrainingChecklistRequest, SearchTrainingChecklistRequest, toTrainingChecklistResponse, UpdateTrainingChecklistRequest } from "../model/TrainingChecklist-model";
import { Pageable } from "../model/page";
import { TrainingChecklistValidation } from "../validation/TrainingChecklist-validation";
import { Validation } from "../validation/validation";
import { User, TrainingChecklist } from "@prisma/client";
export class TrainingChecklistService {

//CREATE 
static async create(user: User, request: CreateTrainingChecklistRequest): Promise<TrainingChecklistResponse> {
const createRequest = Validation.validate(TrainingChecklistValidation.CREATE, request)
//belum ada validasi bila tidak boleh sama (uniq) dalam kolom
 //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
const record = {
...createRequest,//dari object yang ada
...{ create_by: user.name }, //tambahkan username, dengan value dari object user
 ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user}
const trainingChecklist = await prismaClient.trainingChecklist.create({
data: record
})
return toTrainingChecklistResponse(trainingChecklist)
}

// CEK EXIST
 //function untuk getTrainingChecklist biar bisa dipakai berulang
static async checkTrainingChecklistMustexist( trainingChecklistId: number): Promise<TrainingChecklist> {
const trainingChecklist = await prismaClient.trainingChecklist.findFirst({
where: {
id: trainingChecklistId,
}
})
if (!trainingChecklist) {
throw new ResponseError(404, "TrainingChecklist not found")
}
return trainingChecklist
}

// GET by Id
 static async get(user: User,id: number): Promise<TrainingChecklistResponse> {
const trainingChecklist = await this.checkTrainingChecklistMustexist(id)
return toTrainingChecklistResponse(trainingChecklist)
}

// UPDATE by Id
 static async update(user: User, request: UpdateTrainingChecklistRequest): Promise<TrainingChecklistResponse> {
 const updateRequest = Validation.validate(TrainingChecklistValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.name },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek TrainingChecklist ada atau tidak
 await this.checkTrainingChecklistMustexist(request.id)
 const trainingChecklist = await prismaClient.trainingChecklist.update({
    where: {
       id: updateRequest.id,
  //     username: user.username
  },
  data: record
 })
 return toTrainingChecklistResponse(trainingChecklist)
}
//REMOVE by Id
 static async remove(user: User, id: number): Promise<TrainingChecklistResponse> {
 await this.checkTrainingChecklistMustexist( id)
 const trainingChecklist = await prismaClient.trainingChecklist.delete({
 where: {
 id: id,
 //username: user.username
 }
 })
 return trainingChecklist
 }
//SEARCH 
 static async search(user: User, request: SearchTrainingChecklistRequest) : Promise<Pageable<TrainingChecklistResponse>> {
 const searchRequest = Validation.validate(TrainingChecklistValidation.SEARCH, request);
 const skip = (searchRequest.page - 1) * searchRequest.size;
 const filters = [];
 // check if name exists
 // check if training_kode exists
if(searchRequest.training_kode){
filters.push({
   training_kode: {
      contains: searchRequest.training_kode
 }
})
}
 // check if checklist_kode exists
if(searchRequest.checklist_kode){
filters.push({
   checklist_kode: {
      contains: searchRequest.checklist_kode
 }
})
}
 // check if file_1 exists
if(searchRequest.file_1){
filters.push({
   file_1: {
      contains: searchRequest.file_1
 }
})
}
 // check if file_2 exists
if(searchRequest.file_2){
filters.push({
   file_2: {
      contains: searchRequest.file_2
 }
})
}
 // check if file_3 exists
if(searchRequest.file_3){
filters.push({
   file_3: {
      contains: searchRequest.file_3
 }
})
}
 // check if file_4 exists
if(searchRequest.file_4){
filters.push({
   file_4: {
      contains: searchRequest.file_4
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
 // check if checklist_name exists
if(searchRequest.checklist_name){
filters.push({
   checklist_name: {
      contains: searchRequest.checklist_name
 }
})
}
const trainingChecklists = await prismaClient.trainingChecklist.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.trainingChecklist.count({
    where: {
        //username: user.username,
        AND: filters
    },
})
return {
    data: trainingChecklists.map(trainingChecklist => toTrainingChecklistResponse(trainingChecklist)),
    paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
        total_rows:total
    }
}
}

}