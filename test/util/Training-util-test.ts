//CREATE util-test Training-util.test.ts. 

import { prismaClient } from "../../src/application/database";
import { Training } from "@prisma/client";
export class TrainingTest {
    static async deleteAll() {
        await prismaClient.training.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.training.create({
            data: {
                kode: "test",
                nama: "test",
                akademi: "test",
                tipe: "test",
                pic: "test",
                desc: "test",
                kompetensi: "test",
                tgl_mulai: new Date("1998-12-24"),
                tgl_akhir: new Date("1998-12-24"),
                sub_kompetensi: "test",
                status_training: "test",
                kode_job_family: "test",
                kode_sub_job_family: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Training> {
        const training = await prismaClient.training.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!training) {
            throw new Error("Training is not found")
        }
        return training
    }
}