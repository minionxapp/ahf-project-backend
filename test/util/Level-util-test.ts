//CREATE util-test Level-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Level} from "@prisma/client";
export class LevelTest{
  static async deleteAll(){
await prismaClient.level.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.level.create({
    data :{
kode:"test",
nama:"test",
aktive:"test",
urutan:1,
        create_by :"test"
    }
})
}
 static async get(): Promise<Level> {
 const level = await prismaClient.level.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!level) {
     throw new Error("Level is not found")
  }
 return level
 }
}