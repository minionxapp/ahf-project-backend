
//CREATE util-test TipeTraining-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { TipeTraining} from "@prisma/client";
export class TipeTrainingTest{
  static async deleteAll(){
await prismaClient.tipeTraining.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.tipeTraining.create({
    data :{
kode:"test",
nama:"test",
desc:"test",
status:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<TipeTraining> {
 const tipeTraining = await prismaClient.tipeTraining.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!tipeTraining) {
     throw new Error("TipeTraining is not found")
  }
 return tipeTraining
 }
}
//tambahkan TipeTraining pada import { User, Contact, Tablecoba } from "@prisma/client";