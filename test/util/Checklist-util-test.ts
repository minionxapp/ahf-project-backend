
//CREATE util-test Checklist-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Checklist} from "@prisma/client";
export class ChecklistTest{
  static async deleteAll(){
await prismaClient.checklist.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.checklist.create({
    data :{
nama:"test",
urut:1,
desc:"test",
kode:"test",
group:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<Checklist> {
 const checklist = await prismaClient.checklist.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!checklist) {
     throw new Error("Checklist is not found")
  }
 return checklist
 }
}
//tambahkan Checklist pada import { User, Contact, Tablecoba } from "@prisma/client";