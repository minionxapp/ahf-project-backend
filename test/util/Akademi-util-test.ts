//CREATE util-test Akademi-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Akademi } from "@prisma/client";
export class AkademiTest {
    static async deleteAll() {
        await prismaClient.akademi.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.akademi.create({
            data: {
                kode: "test",
                nama: "test",
                aktive: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Akademi> {
        const akademi = await prismaClient.akademi.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!akademi) {
            throw new Error("Akademi is not found")
        }
        return akademi
    }
}