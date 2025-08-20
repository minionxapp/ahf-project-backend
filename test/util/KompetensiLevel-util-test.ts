
//CREATE util-test KompetensiLevel-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { KompetensiLevel } from "@prisma/client";
export class KompetensiLevelTest {
  static async deleteAll() {
    await prismaClient.kompetensiLevel.deleteMany({
      where: {
        create_by: "test"
      }
    })
  }
  static async create() {
    await prismaClient.kompetensiLevel.create({
      data: {
        kode: "test",
        nama: "test",
        status: "test",
        create_by: "test"
      }
    })
  }
  static async get(): Promise<KompetensiLevel> {
    const kompetensiLevel = await prismaClient.kompetensiLevel.findFirst({
      where: {
        create_by: "test"
      }
    })
    if (!kompetensiLevel) {
      throw new Error("KompetensiLevel is not found")
    }
    return kompetensiLevel
  }
}
//tambahkan KompetensiLevel pada import { User, Contact, Tablecoba } from "@prisma/client";