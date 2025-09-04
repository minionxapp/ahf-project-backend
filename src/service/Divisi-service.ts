
//Create Service Divisi-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { DivisiResponse, CreateDivisiRequest, SearchDivisiRequest, toDivisiResponse, UpdateDivisiRequest } from "../model/Divisi-model";
import { Pageable } from "../model/page";
import { DivisiValidation } from "../validation/Divisi-validation";
import { Validation } from "../validation/validation";
import { User, Divisi } from "@prisma/client";
export class DivisiService {

//CREATE 
static async create(user: User, request: CreateDivisiRequest): Promise<DivisiResponse> {
const createRequest = Validation.validate(DivisiValidation.CREATE, request)
//belum ada validasi bila tidak boleh sama (uniq) dalam kolom
 //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z
const totalkodeUniq = await prismaClient.divisi.count({
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
const divisi = await prismaClient.divisi.create({
data: record
})
return toDivisiResponse(divisi)
}

// CEK EXIST
 //function untuk getDivisi biar bisa dipakai berulang
static async checkDivisiMustexist( divisiId: string): Promise<Divisi> {
const divisi = await prismaClient.divisi.findFirst({
where: {
   id: divisiId,
   //create_by: user.username
}
})
if (!divisi) {
throw new ResponseError(404, "Divisi not found")
}
return divisi
}

// GET by Id
 static async get(user: User,id: string): Promise<DivisiResponse> {
const divisi = await this.checkDivisiMustexist(id)
return toDivisiResponse(divisi)
}

// UPDATE by Id
 static async update(user: User, request: UpdateDivisiRequest): Promise<DivisiResponse> {
 const updateRequest = Validation.validate(DivisiValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.username },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek Divisi ada atau tidak
 await this.checkDivisiMustexist(request.id)
 const divisi = await prismaClient.divisi.update({
    where: {
       id: updateRequest.id,
       create_by: user.username
  },
  data: record
 })
 return toDivisiResponse(divisi)
}
//REMOVE by Id
 static async remove(user: User, id: string): Promise<DivisiResponse> {
 await this.checkDivisiMustexist( id)
 const divisi = await prismaClient.divisi.delete({
 where: {
 id: id,
 create_by: user.username
 }
 })
 return divisi
 }
//SEARCH 
 static async search(user: User, request: SearchDivisiRequest) : Promise<Pageable<DivisiResponse>> {
 const searchRequest = Validation.validate(DivisiValidation.SEARCH, request);
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
 // check if aktive exists
if(searchRequest.aktive){
filters.push({
   aktive: {
      contains: searchRequest.aktive
 }
})
}
const divisis = await prismaClient.divisi.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.divisi.count({
    where: {
        create_by: user.username,
        AND: filters
    },
})
return {
    data: divisis.map(divisi => toDivisiResponse(divisi)),
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
    static async getId(user: User, id: string): Promise<DivisiResponse> {
        const divisi = await prismaClient.divisi.findFirst({
            where: {
                id: id,
                create_by:user.username
            }
        })
        if (!divisi) {
            throw new ResponseError(404, "Data not found")
        }
        return divisi
    }// console.log(servicex)

  //By kolom kode (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getKode(user: User, kode: string): Promise<Array<DivisiResponse>> {
     const divisi = await prismaClient.divisi.findMany({
         where: {
             kode: kode,
               create_by:user.username
         }
     })
     if (!divisi) {
         throw new ResponseError(404, "Data not found")
     }
     return divisi
 }
  //By kolom nama (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getNama(user: User, nama: string): Promise<Array<DivisiResponse>> {
     const divisi = await prismaClient.divisi.findMany({
         where: {
             nama: nama,
               create_by:user.username
         }
     })
     if (!divisi) {
         throw new ResponseError(404, "Data not found")
     }
     return divisi
 }
  //By kolom aktive (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getAktive(user: User, aktive: string): Promise<Array<DivisiResponse>> {
     const divisi = await prismaClient.divisi.findMany({
         where: {
             aktive: aktive,
               create_by:user.username
         }
     })
     if (!divisi) {
         throw new ResponseError(404, "Data not found")
     }
     return divisi
 }
  //By kolom urutan (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)
 static async getUrutan(user: User, urutan: number): Promise<Array<DivisiResponse>> {
     const divisi = await prismaClient.divisi.findMany({
         where: {
             urutan: urutan,
               create_by:user.username
         }
     })
     if (!divisi) {
         throw new ResponseError(404, "Data not found")
     }
     return divisi
 }
}
