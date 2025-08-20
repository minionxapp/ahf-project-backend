//Create Test StatusTraining-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { StatusTrainingTest } from "../test/util/StatusTraining-util-test"//Create test
describe("POST /api/statustrainings", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await StatusTrainingTest.create()
    })
    afterEach(async () => {
        await StatusTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new statustraining", async () => {
        const response = await supertest(web)
            .post("/api/statustrainings")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                aktive: "Test_aktive",
                desc: "Test_desc",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.aktive).toBe("Test_aktive")
        expect(response.body.data.desc).toBe("Test_desc")
        expect(response.body.data.urutan).toBe(1)
    })
    it("should reject create new statustraining", async () => {
        const response = await supertest(web)
            .post("/api/statustrainings")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                desc: "",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/statustrainings", () => {

    beforeEach(async () => {
        await UserTest.create()
        await StatusTrainingTest.create()
    })
    afterEach(async () => {
        await StatusTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get statustraining", async () => {
        const statustraining = await StatusTrainingTest.get()
        const response = await supertest(web)
            .get(`/api/statustrainings/${statustraining.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(statustraining.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(statustraining.kode)
        expect(response.body.data.nama).toBe(statustraining.nama)
        expect(response.body.data.aktive).toBe(statustraining.aktive)
        expect(response.body.data.desc).toBe(statustraining.desc)
        expect(response.body.data.urutan).toBe(statustraining.urutan)
    })
    it("should reject  get statustraining if statustraining is not found", async () => {
        const statustraining = await StatusTrainingTest.get()
        const response = await supertest(web)
            .get(`/api/statustrainings/${statustraining.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(statustraining.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/statustrainings/:statustrainingId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await StatusTrainingTest.create()
    })
    afterEach(async () => {
        await StatusTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update statustraining", async () => {
        const statustraining = await StatusTrainingTest.get()
        const response = await supertest(web)
            .put(`/api/statustrainings/${statustraining.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                aktive: "test_edited",
                desc: "test_edited",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(statustraining.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
        expect(response.body.data.urutan).toBe(statustraining.urutan)
    })
    it("should be reject  to update   statustraining", async () => {
        const statustraining = await StatusTrainingTest.get()
        const response = await supertest(web)
            .put(`/api/statustrainings/${statustraining.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                desc: "test",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/statustrainings/:statustrainingId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await StatusTrainingTest.create()
    })
    afterEach(async () => {
        await StatusTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove statustraining", async () => {
        const statustraining = await StatusTrainingTest.get()
        const response = await supertest(web)
            .delete(`/api/statustrainings/${statustraining.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove statustraining if statustraining is not found", async () => {
        const statustraining = await StatusTrainingTest.get()
        const response = await supertest(web)
            .delete(`/api/statustrainings/${statustraining.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/statustrainings", () => {
    beforeEach(async () => {
        await UserTest.create()
        await StatusTrainingTest.create()
    })
    afterEach(async () => {
        await StatusTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search statustraining", async () => {
        const response = await supertest(web)
            .get("/api/statustrainings")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})