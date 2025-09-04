
//CREATE util-test DivisiDept-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { DivisiDept} from "@prisma/client";
export class DivisiDeptTest{
  static async deleteAll(){
await prismaClient.divisiDept.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.divisiDept.create({
    data :{
kode:"test",
nama:"test",
divisi_kode:"test",
divisi_name:"test",
aktive:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<DivisiDept> {
 const divisiDept = await prismaClient.divisiDept.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!divisiDept) {
     throw new Error("DivisiDept is not found")
  }
 return divisiDept
 }
}
//tambahkan DivisiDept pada import { User, Contact, Tablecoba } from "@prisma/client";