//Create Test Level-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { LevelTest } from "../test/util/Level-util-test"//Create test
describe("POST /api/levels", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await LevelTest.create()
    })
    afterEach(async () => {
        await LevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new level", async () => {
        const response = await supertest(web)
            .post("/api/levels")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                aktive: "Test_aktive",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.aktive).toBe("Test_aktive")
        expect(response.body.data.urutan).toBe(1)
    })
    it("should reject create new level", async () => {
        const response = await supertest(web)
            .post("/api/levels")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/levels", () => {

    beforeEach(async () => {
        await UserTest.create()
        await LevelTest.create()
    })
    afterEach(async () => {
        await LevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get level", async () => {
        const level = await LevelTest.get()
        const response = await supertest(web)
            .get(`/api/levels/${level.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(level.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(level.kode)
        expect(response.body.data.nama).toBe(level.nama)
        expect(response.body.data.aktive).toBe(level.aktive)
        expect(response.body.data.urutan).toBe(level.urutan)
    })
    it("should reject  get level if level is not found", async () => {
        const level = await LevelTest.get()
        const response = await supertest(web)
            .get(`/api/levels/${level.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(level.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/levels/:levelId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await LevelTest.create()
    })
    afterEach(async () => {
        await LevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update level", async () => {
        const level = await LevelTest.get()
        const response = await supertest(web)
            .put(`/api/levels/${level.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                aktive: "test_edited",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(level.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
        expect(response.body.data.urutan).toBe(level.urutan)
    })
    it("should be reject  to update   level", async () => {
        const level = await LevelTest.get()
        const response = await supertest(web)
            .put(`/api/levels/${level.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/levels/:levelId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await LevelTest.create()
    })
    afterEach(async () => {
        await LevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove level", async () => {
        const level = await LevelTest.get()
        const response = await supertest(web)
            .delete(`/api/levels/${level.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove level if level is not found", async () => {
        const level = await LevelTest.get()
        const response = await supertest(web)
            .delete(`/api/levels/${level.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/levels", () => {
    beforeEach(async () => {
        await UserTest.create()
        await LevelTest.create()
    })
    afterEach(async () => {
        await LevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search level", async () => {
        const response = await supertest(web)
            .get("/api/levels")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})

//GET by kolom criteria
describe("GetBy Column /api/levels/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await LevelTest.create()
    })

    afterEach(async () => {
        await LevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name ID
    it("should be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            //sesuaikan NAMA KOLOMNYA 
            .get("/api/levels/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/levels/id/" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(200)
        expect(responseID.body.data.nama).toBe("test")
    })

    it("should not be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            .get("/api/Levels/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/Levels/id/xx" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(404)
        expect(responseID.body.errors).toBeDefined()
    })

    //test cari kolom kode
    it("should be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/levels/kode/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode).toBe("test")
    })

    it("should not be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/levels/kode/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom nama
    it("should be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/levels/nama/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/levels/nama/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom aktive
    it("should be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/levels/aktive/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].aktive).toBe("test")
    })

    it("should not be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/levels/aktive/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom urutan
    it("should be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/levels/urutan/1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/levels/urutan/2")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})
