
//CREATE util-test SubKompetensi-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { SubKompetensi} from "@prisma/client";
export class SubKompetensiTest{
  static async deleteAll(){
await prismaClient.subKompetensi.deleteMany({
    where :{
        create_by :"test"
    }
})
} 
  static async create(){
await prismaClient.subKompetensi.create({
    data :{
kode:"test",
kode_job_family:"test",
kode_sub_job_family:"test",
nama:"test",
desc:"test",
status:"test",
kode_kompetensi:"test",
        create_by :"test"
    }
})
}
 static async get(): Promise<SubKompetensi> {
 const subKompetensi = await prismaClient.subKompetensi.findFirst({
    where: {
       create_by: "test"
    }
  })
 if (!subKompetensi) {
     throw new Error("SubKompetensi is not found")
  }
 return subKompetensi
 }
}
//tambahkan SubKompetensi pada import { User, Contact, Tablecoba } from "@prisma/client";