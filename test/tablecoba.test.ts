//Create Test TableCoba-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { TableCobaTest } from "../test/util/TableCoba-util-test"//Create test
describe("POST /api/tablecobas", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await TableCobaTest.create()
    })
    afterEach(async () => {
        await TableCobaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new tablecoba", async () => {
        const response = await supertest(web)
            .post("/api/tablecobas")
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test_name",
                kode: "Test_kode",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe("Test_name")
        expect(response.body.data.kode).toBe("Test_kode")
    })
    it("should reject create new tablecoba", async () => {
        const response = await supertest(web)
            .post("/api/tablecobas")
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                kode: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/tablecobas", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TableCobaTest.create()
    })
    afterEach(async () => {
        await TableCobaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get tablecoba", async () => {
        const tablecoba = await TableCobaTest.get()
        const response = await supertest(web)
            .get(`/api/tablecobas/${tablecoba.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(tablecoba.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe(tablecoba.name)
        expect(response.body.data.kode).toBe(tablecoba.kode)
    })
    it("should reject  get tablecoba if tablecoba is not found", async () => {
        const tablecoba = await TableCobaTest.get()
        const response = await supertest(web)
            .get(`/api/tablecobas/${tablecoba.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(tablecoba.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/tablecobas/:tablecobaId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TableCobaTest.create()
    })
    afterEach(async () => {
        await TableCobaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update tablecoba", async () => {
        const tablecoba = await TableCobaTest.get()
        const response = await supertest(web)
            .put(`/api/tablecobas/${tablecoba.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "test_edited",
                kode: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(tablecoba.id)
        expect(response.body.data.name).toBe("test_edited")
        expect(response.body.data.kode).toBe("test_edited")
    })
    it("should be reject  to update   tablecoba", async () => {
        const tablecoba = await TableCobaTest.get()
        const response = await supertest(web)
            .put(`/api/tablecobas/${tablecoba.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "test",
                kode: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/tablecobas/:tablecobaId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TableCobaTest.create()
    })
    afterEach(async () => {
        await TableCobaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove tablecoba", async () => {
        const tablecoba = await TableCobaTest.get()
        const response = await supertest(web)
            .delete(`/api/tablecobas/${tablecoba.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove tablecoba if tablecoba is not found", async () => {
        const tablecoba = await TableCobaTest.get()
        const response = await supertest(web)
            .delete(`/api/tablecobas/${tablecoba.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/tablecobas", () => {
    beforeEach(async () => {
        await UserTest.create()
        await TableCobaTest.create()
    })
    afterEach(async () => {
        await TableCobaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search tablecoba", async () => {
        const response = await supertest(web)
            .get("/api/tablecobas")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})

describe("GetBy Column /api/tablecobas/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await TableCobaTest.create()
    })

    afterEach(async () => {
        await TableCobaTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name
    it("should be able to get by kolom : name", async () => {
        const response = await supertest(web)
            .get("/api/tablecobas/name/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].name).toBe("test")
    })

    it("should not be able to get by kolom : name", async () => {
        const response = await supertest(web)
            .get("/api/tablecobas/name/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom kode
    it("should be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/tablecobas/kode/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode).toBe("test")
    })

    it("should not be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/tablecobas/kode/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})






// describe("GetBy Column /api/tablecobas/kolom/:kolom", () => {
//     beforeEach(async () => {
//         await UserTest.create()
//         await TableCobaTest.create()
//     })
//     afterEach(async () => {
//         await TableCobaTest.deleteAll() //buatkan di util-test dulu
//         await UserTest.delete()
//     })


//     //test cari kolom name
//     it("should be able to get by kolom : name", async () => {
//         const response = await supertest(web)
//             .get("/api/tablecobas/name/test")
//             .set("X-API-TOKEN", "test")
//         expect(response.status).toBe(200)
//         expect(response.body.data[0].name).toBe("test")

//     })
//     it("should not be able to get by kolom : name", async () => {
//         const response = await supertest(web)
//             .get("/api/tablecobas/name/test1")
//             .set("X-API-TOKEN", "test")
//         expect(response.status).toBe(200)
//         expect(response.body.data.length).toBeLessThan(1)
//     })

//     //test cari kolom kode
//     it("should be able to get by kolom : kode", async () => {
//         const response = await supertest(web)
//             .get("/api/tablecobas/kode/test")
//             .set("X-API-TOKEN", "test")
//         expect(response.status).toBe(200)
//         expect(response.body.data[0].kode).toBe("test")
//     })

//     it("should not be able to get by kolom : kode", async () => {
//         const response = await supertest(web)
//             .get("/api/tablecobas/kode/test1")
//             .set("X-API-TOKEN", "test")
//         expect(response.status).toBe(200)
//         expect(response.body.data.length).toBeLessThan(1)
//     })

// })