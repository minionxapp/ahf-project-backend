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
                aktive: "Test_aktive",
                deskripsi: "Test_deskripsi",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.aktive).toBe("Test_aktive")
        expect(response.body.data.deskripsi).toBe("Test_deskripsi")
    })
    it("should reject create new jobfamily", async () => {
        const response = await supertest(web)
            .post("/api/jobfamilys")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                deskripsi: "",
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
        expect(response.body.data.aktive).toBe(jobfamily.aktive)
        expect(response.body.data.deskripsi).toBe(jobfamily.deskripsi)
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
                aktive: "test_edited",
                deskripsi: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(jobfamily.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
        expect(response.body.data.deskripsi).toBe("test_edited")
    })
    it("should be reject  to update   jobfamily", async () => {
        const jobfamily = await JobFamilyTest.get()
        const response = await supertest(web)
            .put(`/api/jobfamilys/${jobfamily.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                aktive: null,
                deskripsi: "test",
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

//GET by kolom criteria
describe("GetBy Column /api/jobfamilys/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await JobFamilyTest.create()
    })

    afterEach(async () => {
        await JobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name ID
    it("should be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            //sesuaikan nama kolomnya 
            .get("/api/JobFamilys/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/JobFamilys/id/" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(200)
        expect(responseID.body.data.nama).toBe("test")
    })

    it("should not be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            .get("/api/JobFamilys/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/JobFamilys/id/xx" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")

            console.log(responseID.body.data)
        expect(responseID.status).toBe(404)
        expect(responseID.body.errors).toBeDefined()
    })

    //test cari kolom kode
    it("should be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/kode/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode).toBe("test")
    })

    it("should not be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/kode/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom nama
    it("should be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/nama/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/nama/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom aktive
    it("should be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/aktive/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].aktive).toBe("test")
    })

    it("should not be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/aktive/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom deskripsi
    it("should be able to get by kolom : deskripsi", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/deskripsi/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].deskripsi).toBe("test")
    })

    it("should not be able to get by kolom : deskripsi", async () => {
        const response = await supertest(web)
            .get("/api/jobfamilys/deskripsi/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})