
//Create Test KompetensiLevel-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { KompetensiLevelTest } from "../test/util/KompetensiLevel-util-test"//Create test
describe("POST /api/kompetensilevels", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await KompetensiLevelTest.create()
    })
    afterEach(async () => {
        await KompetensiLevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new kompetensilevel", async () => {
        const response = await supertest(web)
            .post("/api/kompetensilevels")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                status: "Test_status",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.status).toBe("Test_status")
    })
    it("should reject create new kompetensilevel", async () => {
        const response = await supertest(web)
            .post("/api/kompetensilevels")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                status: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/kompetensilevels", () => {

    beforeEach(async () => {
        await UserTest.create()
        await KompetensiLevelTest.create()
    })
    afterEach(async () => {
        await KompetensiLevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get kompetensilevel", async () => {
        const kompetensilevel = await KompetensiLevelTest.get()
        const response = await supertest(web)
            .get(`/api/kompetensilevels/${kompetensilevel.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(kompetensilevel.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(kompetensilevel.kode)
        expect(response.body.data.nama).toBe(kompetensilevel.nama)
        expect(response.body.data.status).toBe(kompetensilevel.status)
    })
    it("should reject  get kompetensilevel if kompetensilevel is not found", async () => {
        const kompetensilevel = await KompetensiLevelTest.get()
        const response = await supertest(web)
            .get(`/api/kompetensilevels/${kompetensilevel.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(kompetensilevel.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/kompetensilevels/:kompetensilevelId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await KompetensiLevelTest.create()
    })
    afterEach(async () => {
        await KompetensiLevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update kompetensilevel", async () => {
        const kompetensilevel = await KompetensiLevelTest.get()
        const response = await supertest(web)
            .put(`/api/kompetensilevels/${kompetensilevel.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                status: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(kompetensilevel.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.status).toBe("test_edited")
    })
    it("should be reject  to update   kompetensilevel", async () => {
        const kompetensilevel = await KompetensiLevelTest.get()
        const response = await supertest(web)
            .put(`/api/kompetensilevels/${kompetensilevel.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                status: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/kompetensilevels/:kompetensilevelId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await KompetensiLevelTest.create()
    })
    afterEach(async () => {
        await KompetensiLevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove kompetensilevel", async () => {
        const kompetensilevel = await KompetensiLevelTest.get()
        const response = await supertest(web)
            .delete(`/api/kompetensilevels/${kompetensilevel.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove kompetensilevel if kompetensilevel is not found", async () => {
        const kompetensilevel = await KompetensiLevelTest.get()
        const response = await supertest(web)
            .delete(`/api/kompetensilevels/${kompetensilevel.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/kompetensilevels", () => {
    beforeEach(async () => {
        await UserTest.create()
        await KompetensiLevelTest.create()
    })
    afterEach(async () => {
        await KompetensiLevelTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search kompetensilevel", async () => {
        const response = await supertest(web)
            .get("/api/kompetensilevels")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
