//CREATE util-test TestAja-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { TestAja } from "@prisma/client";
export class TestAjaTest {
    static async deleteAll() {
        await prismaClient.testAja.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.testAja.create({
            data: {
                textaja: "test",
                numberaja: 1,
                tglaja: new Date("1998-12-24"),
                create_by: "test"
            }
        })
    }
    static async get(): Promise<TestAja> {
        const testAja = await prismaClient.testAja.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!testAja) {
            throw new Error("TestAja is not found")
        }
        return testAja
    }
}