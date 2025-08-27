
import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { UserProjectTest } from "../test/util/User-project-util-test"//Create test
describe("POST /api/userprojects", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await UserProjectTest.create()
    })
    afterEach(async () => {
        await UserProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new userproject", async () => {
        const response = await supertest(web)
            .post("/api/userprojects")
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
                username: "test",
                status: "Test_status",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.project_id).toBe(1)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.status).toBe("Test_status")
    })
    it("should reject create new userproject", async () => {
        const response = await supertest(web)
            .post("/api/userprojects")
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
                username: "",
                status: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/userprojects", () => {

    beforeEach(async () => {
        await UserTest.create()
        await UserProjectTest.create()
    })
    afterEach(async () => {
        await UserProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get userproject", async () => {
        const userproject = await UserProjectTest.get()
        const response = await supertest(web)
            .get(`/api/userprojects/${userproject.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(userproject.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.project_id).toBe(userproject.project_id)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.status).toBe(userproject.status)
    })
    it("should reject  get userproject if userproject is not found", async () => {
        const userproject = await UserProjectTest.get()
        const response = await supertest(web)
            .get(`/api/userprojects/${userproject.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(userproject.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/userprojects/:userprojectId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await UserProjectTest.create()
    })
    afterEach(async () => {
        await UserProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update userproject", async () => {
        const userproject = await UserProjectTest.get()
        const response = await supertest(web)
            .put(`/api/userprojects/${userproject.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
                username: "test",
                status: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(userproject.id)
        expect(response.body.data.project_id).toBe(userproject.project_id)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.status).toBe("test_edited")
    })
    it("should be reject  to update   userproject", async () => {
        const userproject = await UserProjectTest.get()
        const response = await supertest(web)
            .put(`/api/userprojects/${userproject.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
                username: "test",
                status: "test",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/userprojects/:userprojectId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await UserProjectTest.create()
    })
    afterEach(async () => {
        await UserProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove userproject", async () => {
        const userproject = await UserProjectTest.get()
        const response = await supertest(web)
            .delete(`/api/userprojects/${userproject.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove userproject if userproject is not found", async () => {
        const userproject = await UserProjectTest.get()
        const response = await supertest(web)
            .delete(`/api/userprojects/${userproject.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/userprojects", () => {
    beforeEach(async () => {
        await UserTest.create()
        await UserProjectTest.create()
    })
    afterEach(async () => {
        await UserProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search userproject", async () => {
        const response = await supertest(web)
            .get("/api/userprojects")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})

                            
                        
