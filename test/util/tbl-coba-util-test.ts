
//CREATE util-test TblCoba-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { TblCoba} from "@prisma/client";
export class TblCobaTest{
  static async deleteAll(){
await prismaClient.tblCoba.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.tblCoba.create({
    data :{
kolom_satu:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<TblCoba> {
 const tblCoba = await prismaClient.tblCoba.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!tblCoba) {
     throw new Error("TblCoba is not found")
  }
 return tblCoba
 }
}
//tambahkan TblCoba pada import { User, Contact, Tablecoba } from "@prisma/client";