//CREATE util-test Kompetensi-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Kompetensi } from "@prisma/client";
export class KompetensiTest {
    static async deleteAll() {
        await prismaClient.kompetensi.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.kompetensi.create({
            data: {
                kode: "test",
                kode_job_family: "test",
                kode_sub_job_family: "test",
                nama: "test",
                desc: "test",
                status: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Kompetensi> {
        const kompetensi = await prismaClient.kompetensi.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!kompetensi) {
            throw new Error("Kompetensi is not found")
        }
        return kompetensi
    }
}