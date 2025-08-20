
//Create Test Akademi-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { AkademiTest } from "../test/util/Akademi-util-test"//Create test
describe("POST /api/akademis", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await AkademiTest.create()
    })
    afterEach(async () => {
        await AkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new akademi", async () => {
        const response = await supertest(web)
            .post("/api/akademis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                status: "Test_status",
                nama_pic: "Test_nama_pic",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.status).toBe("Test_status")
        expect(response.body.data.nama_pic).toBe("Test_nama_pic")
    })
    it("should reject create new akademi", async () => {
        const response = await supertest(web)
            .post("/api/akademis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                status: null,
                nama_pic: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/akademis", () => {

    beforeEach(async () => {
        await UserTest.create()
        await AkademiTest.create()
    })
    afterEach(async () => {
        await AkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get akademi", async () => {
        const akademi = await AkademiTest.get()
        const response = await supertest(web)
            .get(`/api/akademis/${akademi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(akademi.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(akademi.kode)
        expect(response.body.data.nama).toBe(akademi.nama)
        expect(response.body.data.status).toBe(akademi.status)
        expect(response.body.data.nama_pic).toBe(akademi.nama_pic)
    })
    it("should reject  get akademi if akademi is not found", async () => {
        const akademi = await AkademiTest.get()
        const response = await supertest(web)
            .get(`/api/akademis/${akademi.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(akademi.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/akademis/:akademiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await AkademiTest.create()
    })
    afterEach(async () => {
        await AkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update akademi", async () => {
        const akademi = await AkademiTest.get()
        const response = await supertest(web)
            .put(`/api/akademis/${akademi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                status: "test_edited",
                nama_pic: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(akademi.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.status).toBe("test_edited")
        expect(response.body.data.nama_pic).toBe("test_edited")
    })
    it("should be reject  to update   akademi", async () => {
        const akademi = await AkademiTest.get()
        const response = await supertest(web)
            .put(`/api/akademis/${akademi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                status: null,
                nama_pic: "test",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/akademis/:akademiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await AkademiTest.create()
    })
    afterEach(async () => {
        await AkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove akademi", async () => {
        const akademi = await AkademiTest.get()
        const response = await supertest(web)
            .delete(`/api/akademis/${akademi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove akademi if akademi is not found", async () => {
        const akademi = await AkademiTest.get()
        const response = await supertest(web)
            .delete(`/api/akademis/${akademi.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/akademis", () => {
    beforeEach(async () => {
        await UserTest.create()
        await AkademiTest.create()
    })
    afterEach(async () => {
        await AkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search akademi", async () => {
        const response = await supertest(web)
            .get("/api/akademis")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
