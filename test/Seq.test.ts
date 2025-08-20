//Create Test Seq-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { SeqTest } from "../test/util/Seq-util-test"//Create test
describe("POST /api/seqs", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await SeqTest.create()
    })
    afterEach(async () => {
        await SeqTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new seq", async () => {
        const response = await supertest(web)
            .post("/api/seqs")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                tahun: 1,
                last_squence: 1,
                desc: "Test_desc",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.tahun).toBe(1)
        expect(response.body.data.last_squence).toBe(1)
        expect(response.body.data.desc).toBe("Test_desc")
    })
    it("should reject create new seq", async () => {
        const response = await supertest(web)
            .post("/api/seqs")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                tahun: 1,
                last_squence: 1,
                desc: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/seqs", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SeqTest.create()
    })
    afterEach(async () => {
        await SeqTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get seq", async () => {
        const seq = await SeqTest.get()
        const response = await supertest(web)
            .get(`/api/seqs/${seq.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(seq.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(seq.kode)
        expect(response.body.data.tahun).toBe(seq.tahun)
        expect(response.body.data.last_squence).toBe(seq.last_squence)
        expect(response.body.data.desc).toBe(seq.desc)
    })
    it("should reject  get seq if seq is not found", async () => {
        const seq = await SeqTest.get()
        const response = await supertest(web)
            .get(`/api/seqs/${seq.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(seq.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/seqs/:seqId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SeqTest.create()
    })
    afterEach(async () => {
        await SeqTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update seq", async () => {
        const seq = await SeqTest.get()
        const response = await supertest(web)
            .put(`/api/seqs/${seq.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                tahun: 1,
                last_squence: 1,
                desc: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(seq.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.tahun).toBe(seq.tahun)
        expect(response.body.data.last_squence).toBe(seq.last_squence)
        expect(response.body.data.desc).toBe("test_edited")
    })
    it("should be reject  to update   seq", async () => {
        const seq = await SeqTest.get()
        const response = await supertest(web)
            .put(`/api/seqs/${seq.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                tahun: 1,
                last_squence: 1,
                desc: "test",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/seqs/:seqId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SeqTest.create()
    })
    afterEach(async () => {
        await SeqTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove seq", async () => {
        const seq = await SeqTest.get()
        const response = await supertest(web)
            .delete(`/api/seqs/${seq.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove seq if seq is not found", async () => {
        const seq = await SeqTest.get()
        const response = await supertest(web)
            .delete(`/api/seqs/${seq.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/seqs", () => {
    beforeEach(async () => {
        await UserTest.create()
        await SeqTest.create()
    })
    afterEach(async () => {
        await SeqTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search seq", async () => {
        const response = await supertest(web)
            .get("/api/seqs")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
