//Create Test Kompetensi-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { KompetensiTest } from "../test/util/Kompetensi-util-test"//Create test
describe("POST /api/kompetensis", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await KompetensiTest.create()
    })
    afterEach(async () => {
        await KompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new kompetensi", async () => {
        const response = await supertest(web)
            .post("/api/kompetensis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                kode_job_family: "Test_kode_job_family",
                kode_sub_job_family: "Test_kode_sub_job_family",
                nama: "Test_nama",
                desc: "Test_desc",
                status: "Test_status",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.kode_job_family).toBe("Test_kode_job_family")
        expect(response.body.data.kode_sub_job_family).toBe("Test_kode_sub_job_family")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.desc).toBe("Test_desc")
        expect(response.body.data.status).toBe("Test_status")
    })
    it("should reject create new kompetensi", async () => {
        const response = await supertest(web)
            .post("/api/kompetensis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                kode_job_family: null,
                kode_sub_job_family: null,
                nama: null,
                desc: "",
                status: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/kompetensis", () => {

    beforeEach(async () => {
        await UserTest.create()
        await KompetensiTest.create()
    })
    afterEach(async () => {
        await KompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get kompetensi", async () => {
        const kompetensi = await KompetensiTest.get()
        const response = await supertest(web)
            .get(`/api/kompetensis/${kompetensi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(kompetensi.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(kompetensi.kode)
        expect(response.body.data.kode_job_family).toBe(kompetensi.kode_job_family)
        expect(response.body.data.kode_sub_job_family).toBe(kompetensi.kode_sub_job_family)
        expect(response.body.data.nama).toBe(kompetensi.nama)
        expect(response.body.data.desc).toBe(kompetensi.desc)
        expect(response.body.data.status).toBe(kompetensi.status)
    })
    it("should reject  get kompetensi if kompetensi is not found", async () => {
        const kompetensi = await KompetensiTest.get()
        const response = await supertest(web)
            .get(`/api/kompetensis/${kompetensi.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(kompetensi.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/kompetensis/:kompetensiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await KompetensiTest.create()
    })
    afterEach(async () => {
        await KompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update kompetensi", async () => {
        const kompetensi = await KompetensiTest.get()
        const response = await supertest(web)
            .put(`/api/kompetensis/${kompetensi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                kode_job_family: "test_edited",
                kode_sub_job_family: "test_edited",
                nama: "test_edited",
                desc: "test_edited",
                status: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(kompetensi.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.kode_job_family).toBe("test_edited")
        expect(response.body.data.kode_sub_job_family).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
        expect(response.body.data.status).toBe("test_edited")
    })
    it("should be reject  to update   kompetensi", async () => {
        const kompetensi = await KompetensiTest.get()
        const response = await supertest(web)
            .put(`/api/kompetensis/${kompetensi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                kode_job_family: null,
                kode_sub_job_family: null,
                nama: null,
                desc: "test",
                status: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/kompetensis/:kompetensiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await KompetensiTest.create()
    })
    afterEach(async () => {
        await KompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove kompetensi", async () => {
        const kompetensi = await KompetensiTest.get()
        const response = await supertest(web)
            .delete(`/api/kompetensis/${kompetensi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove kompetensi if kompetensi is not found", async () => {
        const kompetensi = await KompetensiTest.get()
        const response = await supertest(web)
            .delete(`/api/kompetensis/${kompetensi.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/kompetensis", () => {
    beforeEach(async () => {
        await UserTest.create()
        await KompetensiTest.create()
    })
    afterEach(async () => {
        await KompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search kompetensi", async () => {
        const response = await supertest(web)
            .get("/api/kompetensis")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
