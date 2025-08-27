//CREATE util-test TableCoba-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { TableCoba } from "@prisma/client";
export class TableCobaTest {
    static async deleteAll() {
        await prismaClient.tableCoba.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.tableCoba.create({
            data: {
                name: "test",
                kode: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<TableCoba> {
        const tableCoba = await prismaClient.tableCoba.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!tableCoba) {
            throw new Error("TableCoba is not found")
        }
        return tableCoba
    }
}
//tambahkan TableCoba pada import { User, Contact, Tablecoba } from "@prisma/client";
