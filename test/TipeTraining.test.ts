//Create Test TipeTraining-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { TipeTrainingTest } from "../test/util/TipeTraining-util-test"//Create test
describe("POST /api/tipetrainings", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await TipeTrainingTest.create()
    })
    afterEach(async () => {
        await TipeTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new tipetraining", async () => {
        const response = await supertest(web)
            .post("/api/tipetrainings")
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
    it("should reject create new tipetraining", async () => {
        const response = await supertest(web)
            .post("/api/tipetrainings")
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
describe("POST /api/tipetrainings", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TipeTrainingTest.create()
    })
    afterEach(async () => {
        await TipeTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get tipetraining", async () => {
        const tipetraining = await TipeTrainingTest.get()
        const response = await supertest(web)
            .get(`/api/tipetrainings/${tipetraining.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(tipetraining.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(tipetraining.kode)
        expect(response.body.data.nama).toBe(tipetraining.nama)
        expect(response.body.data.aktive).toBe(tipetraining.aktive)
        expect(response.body.data.urutan).toBe(tipetraining.urutan)
    })
    it("should reject  get tipetraining if tipetraining is not found", async () => {
        const tipetraining = await TipeTrainingTest.get()
        const response = await supertest(web)
            .get(`/api/tipetrainings/${tipetraining.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(tipetraining.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/tipetrainings/:tipetrainingId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TipeTrainingTest.create()
    })
    afterEach(async () => {
        await TipeTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update tipetraining", async () => {
        const tipetraining = await TipeTrainingTest.get()
        const response = await supertest(web)
            .put(`/api/tipetrainings/${tipetraining.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                aktive: "test_edited",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(tipetraining.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
        expect(response.body.data.urutan).toBe(tipetraining.urutan)
    })
    it("should be reject  to update   tipetraining", async () => {
        const tipetraining = await TipeTrainingTest.get()
        const response = await supertest(web)
            .put(`/api/tipetrainings/${tipetraining.id}`)
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
describe("DELETE /api/tipetrainings/:tipetrainingId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await TipeTrainingTest.create()
    })
    afterEach(async () => {
        await TipeTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove tipetraining", async () => {
        const tipetraining = await TipeTrainingTest.get()
        const response = await supertest(web)
            .delete(`/api/tipetrainings/${tipetraining.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove tipetraining if tipetraining is not found", async () => {
        const tipetraining = await TipeTrainingTest.get()
        const response = await supertest(web)
            .delete(`/api/tipetrainings/${tipetraining.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/tipetrainings", () => {
    beforeEach(async () => {
        await UserTest.create()
        await TipeTrainingTest.create()
    })
    afterEach(async () => {
        await TipeTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search tipetraining", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings")
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
describe("GetBy Column /api/tipetrainings/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await TipeTrainingTest.create()
    })

    afterEach(async () => {
        await TipeTrainingTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name ID
    it("should be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            //sesuaikan NAMA KOLOMNYA 
            .get("/api/tipetrainings/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/tipetrainings/id/" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(200)
        expect(responseID.body.data.nama).toBe("test")
    })

    it("should not be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            .get("/api/TipeTrainings/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/TipeTrainings/id/xx" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(404)
        expect(responseID.body.errors).toBeDefined()
    })

    //test cari kolom kode
    it("should be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/kode/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode).toBe("test")
    })

    it("should not be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/kode/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom nama
    it("should be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/nama/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/nama/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom aktive
    it("should be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/aktive/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].aktive).toBe("test")
    })

    it("should not be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/aktive/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom urutan
    it("should be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/urutan/1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/tipetrainings/urutan/12")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})
