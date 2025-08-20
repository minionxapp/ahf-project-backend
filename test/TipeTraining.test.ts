
//Create Test TipeTraining-test.ts

import supertest from "supertest"
 import { web } from "../src/application/web"
 import {  UserTest } from "../test/test-util"
 import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import {TipeTrainingTest} from "../test/util/TipeTraining-util-test"//Create test
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
kode:"Test_kode",
nama:"Test_nama",
desc:"Test_desc",
status:"Test_status",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kode).toBe("Test_kode")
expect(response.body.data.nama).toBe("Test_nama")
expect(response.body.data.desc).toBe("Test_desc")
expect(response.body.data.status).toBe("Test_status")
     })
 it("should reject create new tipetraining", async () => {
 const response = await supertest(web)
     .post("/api/tipetrainings")
     .set("X-API-TOKEN", "test")
     .send({
kode:null,
nama:null,
desc:"",
status:null,
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
expect(response.body.data.desc).toBe(tipetraining.desc)
expect(response.body.data.status).toBe(tipetraining.status)
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
kode:"test_edited",
nama:"test_edited",
desc:"test_edited",
status:"test_edited",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(tipetraining.id)
expect(response.body.data.kode).toBe("test_edited")
expect(response.body.data.nama).toBe("test_edited")
expect(response.body.data.desc).toBe("test_edited")
expect(response.body.data.status).toBe("test_edited")
})
 it("should be reject  to update   tipetraining", async () => {
 const tipetraining = await TipeTrainingTest.get()
 const response = await supertest(web)
     .put(`/api/tipetrainings/${tipetraining.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kode:null,
nama:null,
desc:"test",
status:null,
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
