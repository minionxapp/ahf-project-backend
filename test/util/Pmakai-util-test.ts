//CREATE util-test Pmakai-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Pmakai } from "@prisma/client";
export class PmakaiTest {
    static async deleteAll() {
        await prismaClient.pmakai.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.pmakai.create({
            data: {
                username: "test",
                password: "test",
                name: "test",
                token: "test",
                status: "test",
                email: "test",
                group: "test",
                expired: new Date("1998-12-24"),
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Pmakai> {
        const pmakai = await prismaClient.pmakai.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!pmakai) {
            throw new Error("Pmakai is not found")
        }
        return pmakai
    }
}
//tambahkan Pmakai pada import { User, Contact, Tablecoba } from "@prisma/client";

