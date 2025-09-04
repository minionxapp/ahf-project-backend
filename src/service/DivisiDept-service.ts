
//Create Service DivisiDept-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { DivisiDeptResponse, CreateDivisiDeptRequest, SearchDivisiDeptRequest, toDivisiDeptResponse, UpdateDivisiDeptRequest } from "../model/DivisiDept-model";
import { Pageable } from "../model/page";
import { DivisiDeptValidation } from "../validation/DivisiDept-validation";
import { Validation } from "../validation/validation";
import { User, DivisiDept } from "@prisma/client";
export class DivisiDeptService {

//CREATE 
static async create(user: User, request: CreateDivisiDeptRequest): Promise<DivisiDeptResponse> {
const createRequest = Validation.validate(DivisiDeptValidation.CREATE, request)
//belum ada validasi bila tidak boleh sama (uniq) dalam kolom
 //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
const totalkodeUniq = await prismaClient.divisiDept.count({
where: {
    kode : createRequest.kode,
//       create_by: user.username
}
})
if(totalkodeUniq !=0){
    throw new ResponseError(400,"kode already axist");
}

const record = {
...createRequest,//dari object yang ada
...{ create_by: user.username }, //tambahkan username, dengan value dari object user
 ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user}
const divisiDept = await prismaClient.divisiDept.create({
data: record
})
return toDivisiDeptResponse(divisiDept)
}

// CEK EXIST
 //function untuk getDivisiDept biar bisa dipakai berulang
static async checkDivisiDeptMustexist( divisiDeptId: string): Promise<DivisiDept> {
const divisiDept = await prismaClient.divisiDept.findFirst({
where: {
   id: divisiDeptId,
   //create_by: user.username
}
})
if (!divisiDept) {
throw new ResponseError(404, "DivisiDept not found")
}
return divisiDept
}

// GET by Id
 static async get(user: User,id: string): Promise<DivisiDeptResponse> {
const divisiDept = await this.checkDivisiDeptMustexist(id)
return toDivisiDeptResponse(divisiDept)
}

// UPDATE by Id
 static async update(user: User, request: UpdateDivisiDeptRequest): Promise<DivisiDeptResponse> {
 const updateRequest = Validation.validate(DivisiDeptValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.username },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek DivisiDept ada atau tidak
 await this.checkDivisiDeptMustexist(request.id)
 const divisiDept = await prismaClient.divisiDept.update({
    where: {
       id: updateRequest.id,
       create_by: user.username
  },
  data: record
 })
 return toDivisiDeptResponse(divisiDept)
}
//REMOVE by Id
 static async remove(user: User, id: string): Promise<DivisiDeptResponse> {
 await this.checkDivisiDeptMustexist( id)
 const divisiDept = await prismaClient.divisiDept.delete({
 where: {
 id: id,
 create_by: user.username
 }
 })
 return divisiDept
 }
//SEARCH 
 static async search(user: User, request: SearchDivisiDeptRequest) : Promise<Pageable<DivisiDeptResponse>> {
 const searchRequest = Validation.validate(DivisiDeptValidation.SEARCH, request);
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
 // check if divisi_kode exists
if(searchRequest.divisi_kode){
filters.push({
   divisi_kode: {
      contains: searchRequest.divisi_kode
 }
})
}
 // check if divisi_name exists
if(searchRequest.divisi_name){
filters.push({
   divisi_name: {
      contains: searchRequest.divisi_name
 }
})
}
 // check if aktive exists
if(searchRequest.aktive){
filters.push({
   aktive: {
      contains: searchRequest.aktive
 }
})
}
const divisiDepts = await prismaClient.divisiDept.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.divisiDept.count({
    where: {
        create_by: user.username,
        AND: filters
    },
})
return {
    data: divisiDepts.map(divisiDept => toDivisiDeptResponse(divisiDept)),
    paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
        total_rows:total
    }
}


}
//GET BY KOLOM //bikin berdasarka kolom yang ada
    //By ID (buat static--> hanya menghasilkan 1 row)
    static async getId(user: User, id: string): Promise<DivisiDeptResponse> {
        const divisiDept = await prismaClient.divisiDept.findFirst({
            where: {
                id: id,
                create_by:user.username
            }
        })
        if (!divisiDept) {
            throw new ResponseError(404, "Data not found")
        }
        return divisiDept
    }// console.log(servicex)

  //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getKode(user: User, kode: string): Promise<Array<DivisiDeptResponse>> {
     const divisiDept = await prismaClient.divisiDept.findMany({
         where: {
             kode: kode,
               create_by:user.username
         }
     })
     if (!divisiDept) {
         throw new ResponseError(404, "Data not found")
     }
     return divisiDept
 }
  //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getNama(user: User, nama: string): Promise<Array<DivisiDeptResponse>> {
     const divisiDept = await prismaClient.divisiDept.findMany({
         where: {
             nama: nama,
               create_by:user.username
         }
     })
     if (!divisiDept) {
         throw new ResponseError(404, "Data not found")
     }
     return divisiDept
 }
  //By kolom divisi_kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getDivisi_kode(user: User, divisi_kode: string): Promise<Array<DivisiDeptResponse>> {
     const divisiDept = await prismaClient.divisiDept.findMany({
         where: {
             divisi_kode: divisi_kode,
               create_by:user.username
         }
     })
     if (!divisiDept) {
         throw new ResponseError(404, "Data not found")
     }
     return divisiDept
 }
  //By kolom divisi_name (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getDivisi_name(user: User, divisi_name: string): Promise<Array<DivisiDeptResponse>> {
     const divisiDept = await prismaClient.divisiDept.findMany({
         where: {
             divisi_name: divisi_name,
               create_by:user.username
         }
     })
     if (!divisiDept) {
         throw new ResponseError(404, "Data not found")
     }
     return divisiDept
 }
  //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getAktive(user: User, aktive: string): Promise<Array<DivisiDeptResponse>> {
     const divisiDept = await prismaClient.divisiDept.findMany({
         where: {
             aktive: aktive,
               create_by:user.username
         }
     })
     if (!divisiDept) {
         throw new ResponseError(404, "Data not found")
     }
     return divisiDept
 }
}
