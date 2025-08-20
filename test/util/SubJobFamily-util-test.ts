//CREATE util-test SubJobFamily-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { SubJobFamily } from "@prisma/client";
export class SubJobFamilyTest {
    static async deleteAll() {
        await prismaClient.subJobFamily.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.subJobFamily.create({
            data: {
                kode: "test",
                kode_job_family: "test",
                nama: "test",
                desc: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<SubJobFamily> {
        const subJobFamily = await prismaClient.subJobFamily.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!subJobFamily) {
            throw new Error("SubJobFamily is not found")
        }
        return subJobFamily
    }
}