//Create Test SubJobFamily-test.ts

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { SubJobFamilyTest } from "../test/util/SubJobFamily-util-test"//Create test
describe("POST /api/subjobfamilys", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await SubJobFamilyTest.create()
    })
    afterEach(async () => {
        await SubJobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new subjobfamily", async () => {
        const response = await supertest(web)
            .post("/api/subjobfamilys")
            .set("X-API-TOKEN", "test")
            .send({
                kode: "Test_kode",
                nama: "Test_nama",
                kode_jf: "Test_kode_jf",
                nama_jf: "Test_nama_jf",
                aktive: "Test_aktive",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe("Test_kode")
        expect(response.body.data.nama).toBe("Test_nama")
        expect(response.body.data.kode_jf).toBe("Test_kode_jf")
        expect(response.body.data.nama_jf).toBe("Test_nama_jf")
        expect(response.body.data.aktive).toBe("Test_aktive")
        expect(response.body.data.urutan).toBe(1)
    })
    it("should reject create new subjobfamily", async () => {
        const response = await supertest(web)
            .post("/api/subjobfamilys")
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                kode_jf: null,
                nama_jf: null,
                aktive: null,
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/subjobfamilys", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SubJobFamilyTest.create()
    })
    afterEach(async () => {
        await SubJobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get subjobfamily", async () => {
        const subjobfamily = await SubJobFamilyTest.get()
        const response = await supertest(web)
            .get(`/api/subjobfamilys/${subjobfamily.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(subjobfamily.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.kode).toBe(subjobfamily.kode)
        expect(response.body.data.nama).toBe(subjobfamily.nama)
        expect(response.body.data.kode_jf).toBe(subjobfamily.kode_jf)
        expect(response.body.data.nama_jf).toBe(subjobfamily.nama_jf)
        expect(response.body.data.aktive).toBe(subjobfamily.aktive)
        expect(response.body.data.urutan).toBe(subjobfamily.urutan)
    })
    it("should reject  get subjobfamily if subjobfamily is not found", async () => {
        const subjobfamily = await SubJobFamilyTest.get()
        const response = await supertest(web)
            .get(`/api/subjobfamilys/${subjobfamily.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(subjobfamily.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/subjobfamilys/:subjobfamilyId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SubJobFamilyTest.create()
    })
    afterEach(async () => {
        await SubJobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update subjobfamily", async () => {
        const subjobfamily = await SubJobFamilyTest.get()
        const response = await supertest(web)
            .put(`/api/subjobfamilys/${subjobfamily.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: "test_edited",
                nama: "test_edited",
                kode_jf: "test_edited",
                nama_jf: "test_edited",
                aktive: "test_edited",
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(subjobfamily.id)
        expect(response.body.data.kode).toBe("test_edited")
        expect(response.body.data.nama).toBe("test_edited")
        expect(response.body.data.kode_jf).toBe("test_edited")
        expect(response.body.data.nama_jf).toBe("test_edited")
        expect(response.body.data.aktive).toBe("test_edited")
        expect(response.body.data.urutan).toBe(subjobfamily.urutan)
    })
    it("should be reject  to update   subjobfamily", async () => {
        const subjobfamily = await SubJobFamilyTest.get()
        const response = await supertest(web)
            .put(`/api/subjobfamilys/${subjobfamily.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                kode: null,
                nama: null,
                kode_jf: null,
                nama_jf: null,
                aktive: null,
                urutan: 1,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/subjobfamilys/:subjobfamilyId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await SubJobFamilyTest.create()
    })
    afterEach(async () => {
        await SubJobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove subjobfamily", async () => {
        const subjobfamily = await SubJobFamilyTest.get()
        const response = await supertest(web)
            .delete(`/api/subjobfamilys/${subjobfamily.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove subjobfamily if subjobfamily is not found", async () => {
        const subjobfamily = await SubJobFamilyTest.get()
        const response = await supertest(web)
            .delete(`/api/subjobfamilys/${subjobfamily.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/subjobfamilys", () => {
    beforeEach(async () => {
        await UserTest.create()
        await SubJobFamilyTest.create()
    })
    afterEach(async () => {
        await SubJobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search subjobfamily", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys")
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
describe("GetBy Column /api/subjobfamilys/kolomName/:kolomName", () => {
    beforeEach(async () => {
        await UserTest.create()
        await SubJobFamilyTest.create()
    })

    afterEach(async () => {
        await SubJobFamilyTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })

    //test cari kolom name ID
    it("should be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            //sesuaikan nama kolomnya 
            .get("/api/SubJobFamilys/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/SubJobFamilys/id/" + response.body.data[0].id)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(200)
        expect(responseID.body.data.nama).toBe("test")
    })

    it("should not be able to get by kolom : ID", async () => {
        const response = await supertest(web)
            .get("/api/SubJobFamilys/nama/test")
            .set("X-API-TOKEN", "test")
        const responseID = await supertest(web)
            .get("/api/SubJobFamilys/id/" + response.body.data[0].idxx)
            .set("X-API-TOKEN", "test")
        expect(responseID.status).toBe(404)
        expect(responseID.body.errors).toBeDefined()
    })

    //test cari kolom kode
    it("should be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/kode/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode).toBe("test")
    })

    it("should not be able to get by kolom : kode", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/kode/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom nama
    it("should be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/nama/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama).toBe("test")
    })

    it("should not be able to get by kolom : nama", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/nama/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom kode_jf
    it("should be able to get by kolom : kode_jf", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/kode_jf/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].kode_jf).toBe("test")
    })

    it("should not be able to get by kolom : kode_jf", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/kode_jf/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom nama_jf
    it("should be able to get by kolom : nama_jf", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/nama_jf/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].nama_jf).toBe("test")
    })

    it("should not be able to get by kolom : nama_jf", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/nama_jf/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom aktive
    it("should be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/aktive/test")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].aktive).toBe("test")
    })

    it("should not be able to get by kolom : aktive", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/aktive/test1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
    //test cari kolom urutan TIDAK USAH COOOYYY>>>>>
    it("should be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/urutan/1")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data[0].urutan).toBe(1)
    })

    it("should not be able to get by kolom : urutan", async () => {
        const response = await supertest(web)
            .get("/api/subjobfamilys/urutan/2")
            .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeLessThan(1)
    })
})
