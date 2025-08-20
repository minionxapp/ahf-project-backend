
//Create Test SubKompetensi-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { SubKompetensiTest } from "../test/util/SubKompetensi-util-test"//Create test
describe("POST /api/subkompetensis", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await SubKompetensiTest.create()
    })
    afterEach(async () => {
        await SubKompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new subkompetensi", async () => {
        const response = await supertest(web)
            .post("/api/subkompetensis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                kode_job_family: "Test_kode_job_family",
                kode_sub_job_family: "Test_kode_sub_job_family",
                nama: "Test_nama",
                desc: "Test_desc",
                status: "Test_status",
                kode_kompetensi: "Test_kode_kompetensi",
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
        expect(response.body.data.kode_kompetensi).toBe("Test_kode_kompetensi")
    })
    it("should reject create new subkompetensi", async () => {
        const response = await supertest(web)
            .post("/api/subkompetensis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                kode_job_family: null,
                kode_sub_job_family: null,
                nama: null,
                desc: "",
                status: null,
                kode_kompetensi: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/subkompetensis", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SubKompetensiTest.create()
    })
    afterEach(async () => {
        await SubKompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get subkompetensi", async () => {
        const subkompetensi = await SubKompetensiTest.get()
        const response = await supertest(web)
            .get(`/api/subkompetensis/${subkompetensi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(subkompetensi.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(subkompetensi.kode)
        expect(response.body.data.kode_job_family).toBe(subkompetensi.kode_job_family)
        expect(response.body.data.kode_sub_job_family).toBe(subkompetensi.kode_sub_job_family)
        expect(response.body.data.nama).toBe(subkompetensi.nama)
        expect(response.body.data.desc).toBe(subkompetensi.desc)
        expect(response.body.data.status).toBe(subkompetensi.status)
        expect(response.body.data.kode_kompetensi).toBe(subkompetensi.kode_kompetensi)
    })
    it("should reject  get subkompetensi if subkompetensi is not found", async () => {
        const subkompetensi = await SubKompetensiTest.get()
        const response = await supertest(web)
            .get(`/api/subkompetensis/${subkompetensi.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(subkompetensi.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/subkompetensis/:subkompetensiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SubKompetensiTest.create()
    })
    afterEach(async () => {
        await SubKompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update subkompetensi", async () => {
        const subkompetensi = await SubKompetensiTest.get()
        const response = await supertest(web)
            .put(`/api/subkompetensis/${subkompetensi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                kode_job_family: "test_edited",
                kode_sub_job_family: "test_edited",
                nama: "test_edited",
                desc: "test_edited",
                status: "test_edited",
                kode_kompetensi: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(subkompetensi.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.kode_job_family).toBe("test_edited")
        expect(response.body.data.kode_sub_job_family).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
        expect(response.body.data.status).toBe("test_edited")
        expect(response.body.data.kode_kompetensi).toBe("test_edited")
    })
    it("should be reject  to update   subkompetensi", async () => {
        const subkompetensi = await SubKompetensiTest.get()
        const response = await supertest(web)
            .put(`/api/subkompetensis/${subkompetensi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                kode_job_family: null,
                kode_sub_job_family: null,
                nama: null,
                desc: "test",
                status: null,
                kode_kompetensi: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/subkompetensis/:subkompetensiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SubKompetensiTest.create()
    })
    afterEach(async () => {
        await SubKompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove subkompetensi", async () => {
        const subkompetensi = await SubKompetensiTest.get()
        const response = await supertest(web)
            .delete(`/api/subkompetensis/${subkompetensi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove subkompetensi if subkompetensi is not found", async () => {
        const subkompetensi = await SubKompetensiTest.get()
        const response = await supertest(web)
            .delete(`/api/subkompetensis/${subkompetensi.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/subkompetensis", () => {
    beforeEach(async () => {
        await UserTest.create()
        await SubKompetensiTest.create()
    })
    afterEach(async () => {
        await SubKompetensiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search subkompetensi", async () => {
        const response = await supertest(web)
            .get("/api/subkompetensis")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
