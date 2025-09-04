
//CREATE util-test Divisi-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Divisi} from "@prisma/client";
export class DivisiTest{
  static async deleteAll(){
await prismaClient.divisi.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.divisi.create({
    data :{
kode:"test",
nama:"test",
aktive:"test",
urutan:1,
        create_by :"test"
    }
})
}
 static async get(): Promise<Divisi> {
 const divisi = await prismaClient.divisi.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!divisi) {
     throw new Error("Divisi is not found")
  }
 return divisi
 }
}
//tambahkan Divisi pada import { User, Contact, Tablecoba } from "@prisma/client";