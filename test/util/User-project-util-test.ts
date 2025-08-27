//CREATE util-test UserProject-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { UserProject } from "@prisma/client";
export class UserProjectTest {
    static async deleteAll() {
        await prismaClient.userProject.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.userProject.create({
            data: {
                project_id: 1,
                username: "test",
                status: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<UserProject> {
        const userProject = await prismaClient.userProject.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!userProject) {
            throw new Error("UserProject is not found")
        }
        return userProject
    }
}
//tambahkan UserProject pada import { User, Contact, Tablecoba } from "@prisma/client";

