//CREATE util-test UserAkademi-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { UserAkademi } from "@prisma/client";
export class UserAkademiTest {
    static async deleteAll() {
        await prismaClient.userAkademi.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.userAkademi.create({
            data: {
                username: "test",
                kode_akademi: "test",
                aktive: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<UserAkademi> {
        const userAkademi = await prismaClient.userAkademi.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!userAkademi) {
            throw new Error("UserAkademi is not found")
        }
        return userAkademi
    }
}