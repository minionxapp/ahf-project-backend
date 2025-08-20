//Create Test TestAja-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { TestAjaTest } from "../test/util/TestAja-util-test"//Create test
describe("POST /api/testajas", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await TestAjaTest.create()
    })
    afterEach(async () => {
        await TestAjaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new testaja", async () => {
        const response = await supertest(web)
            .post("/api/testajas")
            .set("X-API-TOKEN", "test")
            .send({
                textaja: "Test_textaja",
                numberaja: 1,
                tglaja: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.textaja).toBe("Test_textaja")
        expect(response.body.data.numberaja).toBe(1)
        expect(response.body.data.tglaja).toBe("1998-12-24T00:00:00.000Z")
    })
    it("should reject create new testaja", async () => {
        const response = await supertest(web)
            .post("/api/testajas")
            .set("X-API-TOKEN", "test")
            .send({
                textaja: null,
                numberaja: 1,
                tglaja: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/testajas", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TestAjaTest.create()
    })
    afterEach(async () => {
        await TestAjaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get testaja", async () => {
        const testaja = await TestAjaTest.get()
        const response = await supertest(web)
            .get(`/api/testajas/${testaja.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(testaja.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.textaja).toBe(testaja.textaja)
        expect(response.body.data.numberaja).toBe(testaja.numberaja)
    })
    it("should reject  get testaja if testaja is not found", async () => {
        const testaja = await TestAjaTest.get()
        const response = await supertest(web)
            .get(`/api/testajas/${testaja.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(testaja.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/testajas/:testajaId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TestAjaTest.create()
    })
    afterEach(async () => {
        await TestAjaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update testaja", async () => {
        const testaja = await TestAjaTest.get()
        const response = await supertest(web)
            .put(`/api/testajas/${testaja.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                textaja: "test_edited",
                numberaja: 1,
                tglaja: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(testaja.id)
        expect(response.body.data.textaja).toBe("test_edited")
        expect(response.body.data.numberaja).toBe(testaja.numberaja)
        expect(response.body.data.tglaja).toBe("1998-12-24T00:00:00.000Z")
    })
    it("should be reject  to update   testaja", async () => {
        const testaja = await TestAjaTest.get()
        const response = await supertest(web)
            .put(`/api/testajas/${testaja.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                textaja: null,
                numberaja: 1,
                tglaja: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/testajas/:testajaId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TestAjaTest.create()
    })
    afterEach(async () => {
        await TestAjaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove testaja", async () => {
        const testaja = await TestAjaTest.get()
        const response = await supertest(web)
            .delete(`/api/testajas/${testaja.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove testaja if testaja is not found", async () => {
        const testaja = await TestAjaTest.get()
        const response = await supertest(web)
            .delete(`/api/testajas/${testaja.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/testajas", () => {
    beforeEach(async () => {
        await UserTest.create()
        await TestAjaTest.create()
    })
    afterEach(async () => {
        await TestAjaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search testaja", async () => {
        const response = await supertest(web)
            .get("/api/testajas")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})