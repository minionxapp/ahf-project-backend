//CREATE util-test StatusTraining-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { StatusTraining} from "@prisma/client";
export class StatusTrainingTest{
  static async deleteAll(){
await prismaClient.statusTraining.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.statusTraining.create({
    data :{
kode:"test",
nama:"test",
aktive:"test",
desc:"test",
urutan:1,
        create_by :"test"
    }
})
}
 static async get(): Promise<StatusTraining> {
 const statusTraining = await prismaClient.statusTraining.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!statusTraining) {
     throw new Error("StatusTraining is not found")
  }
 return statusTraining
 }
}