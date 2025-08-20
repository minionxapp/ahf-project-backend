
//CREATE util-test TrainingChecklist-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { TrainingChecklist} from "@prisma/client";
export class TrainingChecklistTest{
  static async deleteAll(){
await prismaClient.trainingChecklist.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.trainingChecklist.create({
    data :{
training_kode:"test",
checklist_kode:"test",
file_1:"test",
file_2:"test",
file_3:"test",
file_4:"test",
status:"test",
checklist_name:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<TrainingChecklist> {
 const trainingChecklist = await prismaClient.trainingChecklist.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!trainingChecklist) {
     throw new Error("TrainingChecklist is not found")
  }
 return trainingChecklist
 }
}
//tambahkan TrainingChecklist pada import { User, Contact, Tablecoba } from "@prisma/client";