
//Create Test DivisiDept-test.ts

import supertest from "supertest"
 import { web } from "../src/application/web"
 import {  UserTest } from "../test/test-util"
 import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import {DivisiDeptTest} from "../test/util/DivisiDept-util-test"//Create test
 describe("POST /api/divisidepts", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 //await DivisiDeptTest.create()
 }) 
 afterEach(async () => {
 await DivisiDeptTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should create new divisidept", async () => {
 const response = await supertest(web)
     .post("/api/divisidepts")
     .set("X-API-TOKEN", "test")
     .send({
kode:"Test_kode",
nama:"Test_nama",
divisi_kode:"Test_divisi_kode",
divisi_name:"Test_divisi_name",
aktive:"Test_aktive",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kode).toBe("Test_kode")
expect(response.body.data.nama).toBe("Test_nama")
expect(response.body.data.divisi_kode).toBe("Test_divisi_kode")
expect(response.body.data.divisi_name).toBe("Test_divisi_name")
expect(response.body.data.aktive).toBe("Test_aktive")
     })
 it("should reject create new divisidept", async () => {
 const response = await supertest(web)
     .post("/api/divisidepts")
     .set("X-API-TOKEN", "test")
     .send({
kode:null,
nama:null,
divisi_kode:null,
divisi_name:"",
aktive:null,
     })
 logger.debug(response.body)
 expect(response.status).toBe(400);
 expect(response.body.errors).toBeDefined()
})
})
//GET test
 describe("POST /api/divisidepts", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await DivisiDeptTest.create()
 }) 
 afterEach(async () => {
 await DivisiDeptTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able get divisidept", async () => {
 const divisidept = await DivisiDeptTest.get()
 const response = await supertest(web) 
     .get(`/api/divisidepts/${divisidept.id}`)
     .set("X-API-TOKEN", "test")
 logger.debug(divisidept.id)
 logger.debug(response.body)
expect(response.status).toBe(200)
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kode).toBe(divisidept.kode)
expect(response.body.data.nama).toBe(divisidept.nama)
expect(response.body.data.divisi_kode).toBe(divisidept.divisi_kode)
expect(response.body.data.divisi_name).toBe(divisidept.divisi_name)
expect(response.body.data.aktive).toBe(divisidept.aktive)
 })
 it("should reject  get divisidept if divisidept is not found", async () => {
  const divisidept = await DivisiDeptTest.get()
 const response = await supertest(web)
     .get(`/api/divisidepts/${divisidept.id}` + 1)
     .set("X-API-TOKEN", "test")
 logger.debug(divisidept.id)
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 })
})
//PUT/UDATE TEST 
 describe("PUT /api/divisidepts/:divisideptId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await DivisiDeptTest.create()
 }) 
 afterEach(async () => {
 await DivisiDeptTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to update divisidept", async () => {
 const divisidept = await DivisiDeptTest.get()
 const response = await supertest(web)
     .put(`/api/divisidepts/${divisidept.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kode:"test_edited",
nama:"test_edited",
divisi_kode:"test_edited",
divisi_name:"test_edited",
aktive:"test_edited",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(divisidept.id)
expect(response.body.data.kode).toBe("test_edited")
expect(response.body.data.nama).toBe("test_edited")
expect(response.body.data.divisi_kode).toBe("test_edited")
expect(response.body.data.divisi_name).toBe("test_edited")
expect(response.body.data.aktive).toBe("test_edited")
})
 it("should be reject  to update   divisidept", async () => {
 const divisidept = await DivisiDeptTest.get()
 const response = await supertest(web)
     .put(`/api/divisidepts/${divisidept.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kode:null,
nama:null,
divisi_kode:null,
divisi_name:"test",
aktive:null,
     })
 logger.debug(response.body)
expect(response.status).toBe(400)
expect(response.body.errors).toBeDefined
})
})
//REMOVETEST 
 describe("DELETE /api/divisidepts/:divisideptId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await DivisiDeptTest.create()
 }) 
 afterEach(async () => {
 await DivisiDeptTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to remove divisidept", async () => {
 const divisidept = await DivisiDeptTest.get()
 const response = await supertest(web)
     .delete(`/api/divisidepts/${divisidept.id}`)
    .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(200)
 expect(response.body.data).toBe("OK")
 })
 it("should reject  to remove divisidept if divisidept is not found", async () => {
 const divisidept = await DivisiDeptTest.get()
  const response = await supertest(web)
   .delete(`/api/divisidepts/${divisidept.id + 1}`)
   .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 }) 
 }) //SEARCH Test 
describe("SEARCH /api/divisidepts", () => { 
 beforeEach(async () => {
 await UserTest.create()
 await DivisiDeptTest.create()
 }) 
 afterEach(async () => {
 await DivisiDeptTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
  it("should be able to search divisidept", async () => {
  const response = await supertest(web)
      .get("/api/divisidepts")
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
describe("GetBy Column /api/divisidepts/kolomName/:kolomName", () => {
beforeEach(async () => {
  await UserTest.create()
 await DivisiDeptTest.create()
})

afterEach(async () => {
   await DivisiDeptTest.deleteAll() //buatkan di util-test dulu
   await UserTest.delete()
})

 //test cari kolom name ID
 it("should be able to get by kolom : ID", async () => {
 const response = await supertest(web)
//sesuaikan NAMA KOLOMNYA 
 .get("/api/divisidepts/nama/test")
 .set("X-API-TOKEN", "test")
 const responseID = await supertest(web)
 .get("/api/divisidepts/id/"+response.body.data[0].id)
 .set("X-API-TOKEN", "test")
 expect(responseID.status).toBe(200)
 expect(responseID.body.data.nama).toBe("test")
 })

 it("should not be able to get by kolom : ID", async () => {
 const response = await supertest(web)
 .get("/api/DivisiDepts/nama/test")
 .set("X-API-TOKEN", "test")
 const responseID = await supertest(web)
 .get("/api/DivisiDepts/id/xx"+response.body.data[0].id)
 .set("X-API-TOKEN", "test")
 expect(responseID.status).toBe(404)
  expect(responseID.body.errors).toBeDefined()
 })

//test cari kolom kode
it("should be able to get by kolom : kode", async () => {
const response = await supertest(web)
.get("/api/divisidepts/kode/test")
   .set("X-API-TOKEN", "test")
expect(response.status).toBe(200)
expect(response.body.data[0].kode).toBe("test")
})

it("should not be able to get by kolom : kode", async () => {
   const response = await supertest(web)
       .get("/api/divisidepts/kode/test1")
       .set("X-API-TOKEN", "test")
   expect(response.status).toBe(200)
   expect(response.body.data.length).toBeLessThan(1)
})
//test cari kolom nama
it("should be able to get by kolom : nama", async () => {
const response = await supertest(web)
.get("/api/divisidepts/nama/test")
   .set("X-API-TOKEN", "test")
expect(response.status).toBe(200)
expect(response.body.data[0].nama).toBe("test")
})

it("should not be able to get by kolom : nama", async () => {
   const response = await supertest(web)
       .get("/api/divisidepts/nama/test1")
       .set("X-API-TOKEN", "test")
   expect(response.status).toBe(200)
   expect(response.body.data.length).toBeLessThan(1)
})
//test cari kolom divisi_kode
it("should be able to get by kolom : divisi_kode", async () => {
const response = await supertest(web)
.get("/api/divisidepts/divisi_kode/test")
   .set("X-API-TOKEN", "test")
expect(response.status).toBe(200)
expect(response.body.data[0].divisi_kode).toBe("test")
})

it("should not be able to get by kolom : divisi_kode", async () => {
   const response = await supertest(web)
       .get("/api/divisidepts/divisi_kode/test1")
       .set("X-API-TOKEN", "test")
   expect(response.status).toBe(200)
   expect(response.body.data.length).toBeLessThan(1)
})
//test cari kolom divisi_name
it("should be able to get by kolom : divisi_name", async () => {
const response = await supertest(web)
.get("/api/divisidepts/divisi_name/test")
   .set("X-API-TOKEN", "test")
expect(response.status).toBe(200)
expect(response.body.data[0].divisi_name).toBe("test")
})

it("should not be able to get by kolom : divisi_name", async () => {
   const response = await supertest(web)
       .get("/api/divisidepts/divisi_name/test1")
       .set("X-API-TOKEN", "test")
   expect(response.status).toBe(200)
   expect(response.body.data.length).toBeLessThan(1)
})
//test cari kolom aktive
it("should be able to get by kolom : aktive", async () => {
const response = await supertest(web)
.get("/api/divisidepts/aktive/test")
   .set("X-API-TOKEN", "test")
expect(response.status).toBe(200)
expect(response.body.data[0].aktive).toBe("test")
})

it("should not be able to get by kolom : aktive", async () => {
   const response = await supertest(web)
       .get("/api/divisidepts/aktive/test1")
       .set("X-API-TOKEN", "test")
   expect(response.status).toBe(200)
   expect(response.body.data.length).toBeLessThan(1)
})
})
