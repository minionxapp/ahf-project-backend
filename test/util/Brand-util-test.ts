
//CREATE util-test Brand-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Brand} from "@prisma/client";
export class BrandTest{
  static async deleteAll(){
await prismaClient.brand.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.brand.create({
    data :{
kode:"test",
nama:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<Brand> {
 const brand = await prismaClient.brand.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!brand) {
     throw new Error("Brand is not found")
  }
 return brand
 }
}
//tambahkan Brand pada import { User, Contact, Tablecoba } from "@prisma/client";