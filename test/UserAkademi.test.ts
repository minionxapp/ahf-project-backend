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
                aktive: "Test_aktive",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.kode_akademi).toBe("Test_kode_akademi")
        expect(response.body.data.aktive).toBe("Test_aktive")
    })
    it("should reject create new userakademi", async () => {
        const response = await supertest(web)
            .post("/api/userakademis")
            .set("X-API-TOKEN", "test")
            .send({
                username: null,
                kode_akademi: null,
                aktive: null,
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
        expect(response.body.data.aktive).toBe(userakademi.aktive)
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
                aktive: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(userakademi.id)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.kode_akademi).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
    })
    it("should be reject  to update   userakademi", async () => {
        const userakademi = await UserAkademiTest.get()
        const response = await supertest(web)
            .put(`/api/userakademis/${userakademi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: null,
                kode_akademi: null,
                aktive: null,
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

//GET by kolom criteria
describe("GetBy Column /api/userakademis/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await UserAkademiTest.create()
    })

    afterEach(async () => {
        await UserAkademiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name ID
    it("should be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            //sesuaikan nama kolomnya 
            .get("/api/userakademis/username/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/userakademis/id/" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(200)
        expect(responseID.body.data.username).toBe("test")
    })

    it("should not be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            .get("/api/UserAkademis/username/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/UserAkademis/id/x" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(404)
        expect(responseID.body.errors).toBeDefined()
    })

    //test cari kolom username
    it("should be able to get by kolom : username", async () => {
        const response = await supertest(web)
            .get("/api/userakademis/username/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].username).toBe("test")
    })

    it("should not be able to get by kolom : username", async () => {
        const response = await supertest(web)
            .get("/api/userakademis/username/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom kode_akademi
    it("should be able to get by kolom : kode_akademi", async () => {
        const response = await supertest(web)
            .get("/api/userakademis/kode_akademi/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode_akademi).toBe("test")
    })

    it("should not be able to get by kolom : kode_akademi", async () => {
        const response = await supertest(web)
            .get("/api/userakademis/kode_akademi/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom aktive
    it("should be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/userakademis/aktive/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].aktive).toBe("test")
    })

    it("should not be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/userakademis/aktive/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})


