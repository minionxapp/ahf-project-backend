
//Create Test Divisi-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { DivisiTest } from "../test/util/Divisi-util-test"//Create test
describe("POST /api/divisis", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await DivisiTest.create()
    })
    afterEach(async () => {
        await DivisiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new divisi", async () => {
        const response = await supertest(web)
            .post("/api/divisis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                aktive: "Test_aktive",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.aktive).toBe("Test_aktive")
        expect(response.body.data.urutan).toBe(1)
    })
    it("should reject create new divisi", async () => {
        const response = await supertest(web)
            .post("/api/divisis")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/divisis", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DivisiTest.create()
    })
    afterEach(async () => {
        await DivisiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get divisi", async () => {
        const divisi = await DivisiTest.get()
        const response = await supertest(web)
            .get(`/api/divisis/${divisi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(divisi.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(divisi.kode)
        expect(response.body.data.nama).toBe(divisi.nama)
        expect(response.body.data.aktive).toBe(divisi.aktive)
        expect(response.body.data.urutan).toBe(divisi.urutan)
    })
    it("should reject  get divisi if divisi is not found", async () => {
        const divisi = await DivisiTest.get()
        const response = await supertest(web)
            .get(`/api/divisis/${divisi.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(divisi.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/divisis/:divisiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DivisiTest.create()
    })
    afterEach(async () => {
        await DivisiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update divisi", async () => {
        const divisi = await DivisiTest.get()
        const response = await supertest(web)
            .put(`/api/divisis/${divisi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                aktive: "test_edited",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(divisi.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
        expect(response.body.data.urutan).toBe(divisi.urutan)
    })
    it("should be reject  to update   divisi", async () => {
        const divisi = await DivisiTest.get()
        const response = await supertest(web)
            .put(`/api/divisis/${divisi.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/divisis/:divisiId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DivisiTest.create()
    })
    afterEach(async () => {
        await DivisiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove divisi", async () => {
        const divisi = await DivisiTest.get()
        const response = await supertest(web)
            .delete(`/api/divisis/${divisi.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove divisi if divisi is not found", async () => {
        const divisi = await DivisiTest.get()
        const response = await supertest(web)
            .delete(`/api/divisis/${divisi.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/divisis", () => {
    beforeEach(async () => {
        await UserTest.create()
        await DivisiTest.create()
    })
    afterEach(async () => {
        await DivisiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search divisi", async () => {
        const response = await supertest(web)
            .get("/api/divisis")
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
describe("GetBy Column /api/divisis/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await DivisiTest.create()
    })

    afterEach(async () => {
        await DivisiTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name ID
    it("should be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            //sesuaikan NAMA KOLOMNYA 
            .get("/api/divisis/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/divisis/id/" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(200)
        expect(responseID.body.data.nama).toBe("test")
    })

    it("should not be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            .get("/api/Divisis/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/Divisis/id/xx" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(404)
        expect(responseID.body.errors).toBeDefined()
    })

    //test cari kolom kode
    it("should be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/divisis/kode/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode).toBe("test")
    })

    it("should not be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/divisis/kode/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom nama
    it("should be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/divisis/nama/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/divisis/nama/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom aktive
    it("should be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/divisis/aktive/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].aktive).toBe("test")
    })

    it("should not be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/divisis/aktive/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom urutan
    it("should be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/divisis/urutan/1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].urutan).toBe(1)
    })

    it("should not be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/divisis/urutan/11")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})
