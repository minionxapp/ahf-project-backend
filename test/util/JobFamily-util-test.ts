//CREATE util-test JobFamily-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { JobFamily } from "@prisma/client";
export class JobFamilyTest {
    static async deleteAll() {
        await prismaClient.jobFamily.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.jobFamily.create({
            data: {
                kode: "test",
                nama: "test",
                aktive: "test",
                deskripsi: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<JobFamily> {
        const jobFamily = await prismaClient.jobFamily.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!jobFamily) {
            throw new Error("JobFamily is not found")
        }
        return jobFamily
    }
}