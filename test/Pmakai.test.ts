//Create Test Pmakai-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { PmakaiTest } from "../test/util/Pmakai-util-test"//Create test
describe("POST /api/pmakais", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await PmakaiTest.create()
    })
    afterEach(async () => {
        await PmakaiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new pmakai", async () => {
        const response = await supertest(web)
            .post("/api/pmakais")
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                password: "Test_password",
                name: "Test_name",
                token: "Test_token",
                status: "Test_status",
                email: "Test_email",
                group: "Test_group",
                expired: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        // expect(response.body.data.password).toBe("Test_password")
        expect(response.body.data.name).toBe("Test_name")
        expect(response.body.data.token).toBe("Test_token")
        expect(response.body.data.status).toBe("Test_status")
        expect(response.body.data.email).toBe("Test_email")
        expect(response.body.data.group).toBe("Test_group")
        expect(response.body.data.expired).toBe("1998-12-24T00:00:00.000Z")
    })
    it("should reject create new pmakai", async () => {
        const response = await supertest(web)
            .post("/api/pmakais")
            .set("X-API-TOKEN", "test")
            .send({
                username: null,
                password: null,
                name: null,
                token: "",
                status: "",
                email: "",
                group: "",
                expired: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/pmakais", () => {

    beforeEach(async () => {
        await UserTest.create()
        await PmakaiTest.create()
    })
    afterEach(async () => {
        await PmakaiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get pmakai", async () => {
        const pmakai = await PmakaiTest.get()
        const response = await supertest(web)
            .get(`/api/pmakais/${pmakai.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(pmakai.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        // expect(response.body.data.password).toBe(pmakai.password)
        expect(response.body.data.name).toBe(pmakai.name)
        expect(response.body.data.token).toBe(pmakai.token)
        expect(response.body.data.status).toBe(pmakai.status)
        expect(response.body.data.email).toBe(pmakai.email)
        expect(response.body.data.group).toBe(pmakai.group)
    })
    it("should reject  get pmakai if pmakai is not found", async () => {
        const pmakai = await PmakaiTest.get()
        const response = await supertest(web)
            .get(`/api/pmakais/${pmakai.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(pmakai.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/pmakais/:pmakaiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await PmakaiTest.create()
    })
    afterEach(async () => {
        await PmakaiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update pmakai", async () => {
        const pmakai = await PmakaiTest.get()
        const response = await supertest(web)
            .put(`/api/pmakais/${pmakai.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                password: "test_edited",
                name: "test_edited",
                token: "test_edited",
                status: "test_edited",
                email: "test_edited",
                group: "test_edited",
                expired: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(pmakai.id)
        expect(response.body.data.username).toBe("test")
        // expect(response.body.data.password).toBe("test_edited")
        expect(response.body.data.name).toBe("test_edited")
        expect(response.body.data.token).toBe("test_edited")
        expect(response.body.data.status).toBe("test_edited")
        expect(response.body.data.email).toBe("test_edited")
        expect(response.body.data.group).toBe("test_edited")
        expect(response.body.data.expired).toBe("1998-12-24T00:00:00.000Z")
    })
    it("should be reject  to update   pmakai", async () => {
        const pmakai = await PmakaiTest.get()
        const response = await supertest(web)
            .put(`/api/pmakais/${pmakai.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: null,
                password: null,
                name: null,
                token: "test",
                status: "test",
                email: "test",
                group: "test",
                expired: new Date('1998-12-24'),
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/pmakais/:pmakaiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await PmakaiTest.create()
    })
    afterEach(async () => {
        await PmakaiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove pmakai", async () => {
        const pmakai = await PmakaiTest.get()
        const response = await supertest(web)
            .delete(`/api/pmakais/${pmakai.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove pmakai if pmakai is not found", async () => {
        const pmakai = await PmakaiTest.get()
        const response = await supertest(web)
            .delete(`/api/pmakais/${pmakai.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/pmakais", () => {
    beforeEach(async () => {
        await UserTest.create()
        await PmakaiTest.create()
    })
    afterEach(async () => {
        await PmakaiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search pmakai", async () => {
        const response = await supertest(web)
            .get("/api/pmakais")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})