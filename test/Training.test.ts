//Create Test Training-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { TrainingTest } from "../test/util/Training-util-test"//Create test
describe("POST /api/trainings", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await TrainingTest.create()
    })
    afterEach(async () => {
        await TrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new training", async () => {
        const response = await supertest(web)
            .post("/api/trainings")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                akademi: "Test_akademi",
                tipe: "Test_tipe",
                pic: "Test_pic",
                desc: "Test_desc",
                kompetensi: "Test_kompetensi",
                tgl_mulai: new Date('1998-12-24'),
                tgl_akhir: new Date('1998-12-24'),
                sub_kompetensi: "Test_sub_kompetensi",
                status_training: "Test_status_training",
                kode_job_family: "Test_kode_job_family",
                kode_sub_job_family: "Test_kode_sub_job_family",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.akademi).toBe("Test_akademi")
        expect(response.body.data.tipe).toBe("Test_tipe")
        expect(response.body.data.pic).toBe("Test_pic")
        expect(response.body.data.desc).toBe("Test_desc")
        expect(response.body.data.kompetensi).toBe("Test_kompetensi")
        expect(response.body.data.tgl_mulai).toBe("1998-12-24T00:00:00.000Z")
        expect(response.body.data.tgl_akhir).toBe("1998-12-24T00:00:00.000Z")
        expect(response.body.data.sub_kompetensi).toBe("Test_sub_kompetensi")
        expect(response.body.data.status_training).toBe("Test_status_training")
        expect(response.body.data.kode_job_family).toBe("Test_kode_job_family")
        expect(response.body.data.kode_sub_job_family).toBe("Test_kode_sub_job_family")
    })
    it("should reject create new training", async () => {
        const response = await supertest(web)
            .post("/api/trainings")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: "",
                akademi: "",
                tipe: "",
                pic: "",
                desc: "",
                kompetensi: "",
                tgl_mulai: new Date('1998-12-24'),
                tgl_akhir: new Date('1998-12-24'),
                sub_kompetensi: "",
                status_training: "",
                kode_job_family: null,
                kode_sub_job_family: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/trainings", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TrainingTest.create()
    })
    afterEach(async () => {
        await TrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get training", async () => {
        const training = await TrainingTest.get()
        const response = await supertest(web)
            .get(`/api/trainings/${training.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(training.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(training.kode)
        expect(response.body.data.nama).toBe(training.nama)
        expect(response.body.data.akademi).toBe(training.akademi)
        expect(response.body.data.tipe).toBe(training.tipe)
        expect(response.body.data.pic).toBe(training.pic)
        expect(response.body.data.desc).toBe(training.desc)
        expect(response.body.data.kompetensi).toBe(training.kompetensi)
        expect(response.body.data.sub_kompetensi).toBe(training.sub_kompetensi)
        expect(response.body.data.status_training).toBe(training.status_training)
        expect(response.body.data.kode_job_family).toBe(training.kode_job_family)
        expect(response.body.data.kode_sub_job_family).toBe(training.kode_sub_job_family)
    })
    it("should reject  get training if training is not found", async () => {
        const training = await TrainingTest.get()
        const response = await supertest(web)
            .get(`/api/trainings/${training.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(training.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/trainings/:trainingId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TrainingTest.create()
    })
    afterEach(async () => {
        await TrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update training", async () => {
        const training = await TrainingTest.get()
        const response = await supertest(web)
            .put(`/api/trainings/${training.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                akademi: "test_edited",
                tipe: "test_edited",
                pic: "test_edited",
                desc: "test_edited",
                kompetensi: "test_edited",
                tgl_mulai: new Date('1998-12-24'),
                tgl_akhir: new Date('1998-12-24'),
                sub_kompetensi: "test_edited",
                status_training: "test_edited",
                kode_job_family: "test_edited",
                kode_sub_job_family: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(training.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.akademi).toBe("test_edited")
        expect(response.body.data.tipe).toBe("test_edited")
        expect(response.body.data.pic).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
        expect(response.body.data.kompetensi).toBe("test_edited")
        expect(response.body.data.tgl_mulai).toBe("1998-12-24T00:00:00.000Z")
        expect(response.body.data.tgl_akhir).toBe("1998-12-24T00:00:00.000Z")
        expect(response.body.data.sub_kompetensi).toBe("test_edited")
        expect(response.body.data.status_training).toBe("test_edited")
        expect(response.body.data.kode_job_family).toBe("test_edited")
        expect(response.body.data.kode_sub_job_family).toBe("test_edited")
    })
    it("should be reject  to update   training", async () => {
        const training = await TrainingTest.get()
        const response = await supertest(web)
            .put(`/api/trainings/${training.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: "test",
                akademi: "test",
                tipe: "test",
                pic: "test",
                desc: "test",
                kompetensi: "test",
                tgl_mulai: new Date('1998-12-24'),
                tgl_akhir: new Date('1998-12-24'),
                sub_kompetensi: "test",
                status_training: "test",
                kode_job_family: null,
                kode_sub_job_family: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/trainings/:trainingId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TrainingTest.create()
    })
    afterEach(async () => {
        await TrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove training", async () => {
        const training = await TrainingTest.get()
        const response = await supertest(web)
            .delete(`/api/trainings/${training.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove training if training is not found", async () => {
        const training = await TrainingTest.get()
        const response = await supertest(web)
            .delete(`/api/trainings/${training.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/trainings", () => {
    beforeEach(async () => {
        await UserTest.create()
        await TrainingTest.create()
    })
    afterEach(async () => {
        await TrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search training", async () => {
        const response = await supertest(web)
            .get("/api/trainings")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
