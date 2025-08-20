//Create Test UserAkademi-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { UserAkademiTest } from "../test/util/UserAkademi-util-test"//Create test
describe("POST /api/userakademis", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await UserAkademiTest.create()
    })
    afterEach(async () => {
        await UserAkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new userakademi", async () => {
        const response = await supertest(web)
            .post("/api/userakademis")
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                kode_akademi: "Test_kode_akademi",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.kode_akademi).toBe("Test_kode_akademi")
    })
    it("should reject create new userakademi", async () => {
        const response = await supertest(web)
            .post("/api/userakademis")
            .set("X-API-TOKEN", "test")
            .send({
                username: null,
                kode_akademi: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/userakademis", () => {

    beforeEach(async () => {
        await UserTest.create()
        await UserAkademiTest.create()
    })
    afterEach(async () => {
        await UserAkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get userakademi", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .get(`/api/userakademis/${userakademi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(userakademi.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.kode_akademi).toBe(userakademi.kode_akademi)
    })
    it("should reject  get userakademi if userakademi is not found", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .get(`/api/userakademis/${userakademi.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(userakademi.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/userakademis/:userakademiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await UserAkademiTest.create()
    })
    afterEach(async () => {
        await UserAkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update userakademi", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .put(`/api/userakademis/${userakademi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                kode_akademi: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(userakademi.id)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.kode_akademi).toBe("test_edited")
    })
    it("should be reject  to update   userakademi", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .put(`/api/userakademis/${userakademi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: null,
                kode_akademi: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/userakademis/:userakademiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await UserAkademiTest.create()
    })
    afterEach(async () => {
        await UserAkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove userakademi", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .delete(`/api/userakademis/${userakademi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove userakademi if userakademi is not found", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .delete(`/api/userakademis/${userakademi.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/userakademis", () => {
    beforeEach(async () => {
        await UserTest.create()
        await UserAkademiTest.create()
    })
    afterEach(async () => {
        await UserAkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search userakademi", async () => {
        const response = await supertest(web)
            .get("/api/userakademis")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})