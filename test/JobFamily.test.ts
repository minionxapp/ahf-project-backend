//Create Test JobFamily-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { JobFamilyTest } from "../test/util/JobFamily-util-test"//Create test
describe("POST /api/jobfamilys", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await JobFamilyTest.create()
    })
    afterEach(async () => {
        await JobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new jobfamily", async () => {
        const response = await supertest(web)
            .post("/api/jobfamilys")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                desc: "Test_desc",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.desc).toBe("Test_desc")
    })
    it("should reject create new jobfamily", async () => {
        const response = await supertest(web)
            .post("/api/jobfamilys")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                desc: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/jobfamilys", () => {

    beforeEach(async () => {
        await UserTest.create()
        await JobFamilyTest.create()
    })
    afterEach(async () => {
        await JobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get jobfamily", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .get(`/api/jobfamilys/${jobfamily.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(jobfamily.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(jobfamily.kode)
        expect(response.body.data.nama).toBe(jobfamily.nama)
        expect(response.body.data.desc).toBe(jobfamily.desc)
    })
    it("should reject  get jobfamily if jobfamily is not found", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .get(`/api/jobfamilys/${jobfamily.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(jobfamily.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/jobfamilys/:jobfamilyId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await JobFamilyTest.create()
    })
    afterEach(async () => {
        await JobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update jobfamily", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .put(`/api/jobfamilys/${jobfamily.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                desc: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(jobfamily.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
    })
    it("should be reject  to update   jobfamily", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .put(`/api/jobfamilys/${jobfamily.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                desc: "test",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/jobfamilys/:jobfamilyId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await JobFamilyTest.create()
    })
    afterEach(async () => {
        await JobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove jobfamily", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .delete(`/api/jobfamilys/${jobfamily.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove jobfamily if jobfamily is not found", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .delete(`/api/jobfamilys/${jobfamily.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/jobfamilys", () => {
    beforeEach(async () => {
        await UserTest.create()
        await JobFamilyTest.create()
    })
    afterEach(async () => {
        await JobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search jobfamily", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})