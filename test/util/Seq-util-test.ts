//CREATE util-test Seq-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Seq } from "@prisma/client";
export class SeqTest {
    static async deleteAll() {
        await prismaClient.seq.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.seq.create({
            data: {
                kode: "test",
                tahun: 1,
                last_squence: 1,
                desc: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Seq> {
        const seq = await prismaClient.seq.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!seq) {
            throw new Error("Seq is not found")
        }
        return seq
    }
}