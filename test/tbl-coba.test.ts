
//Create Test TblCoba-test.ts

import supertest from "supertest"
 import { web } from "../src/application/web"
 import {  UserTest } from "../test/test-util"
 import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import {TblCobaTest} from "../test/util/TblCoba-util-test"//Create test
 describe("POST /api/tblcobas", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 //await TblCobaTest.create()
 }) 
 afterEach(async () => {
 await TblCobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should create new tblcoba", async () => {
 const response = await supertest(web)
     .post("/api/tblcobas")
     .set("X-API-TOKEN", "test")
     .send({
kolom_satu:"Test_kolom_satu",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kolom_satu).toBe("Test_kolom_satu")
     })
 it("should reject create new tblcoba", async () => {
 const response = await supertest(web)
     .post("/api/tblcobas")
     .set("X-API-TOKEN", "test")
     .send({
kolom_satu:"",
     })
 logger.debug(response.body)
 expect(response.status).toBe(400);
 expect(response.body.errors).toBeDefined()
})
})
//GET test
 describe("POST /api/tblcobas", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await TblCobaTest.create()
 }) 
 afterEach(async () => {
 await TblCobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able get tblcoba", async () => {
 const tblcoba = await TblCobaTest.get()
 const response = await supertest(web) 
     .get(`/api/tblcobas/${tblcoba.id}`)
     .set("X-API-TOKEN", "test")
 logger.debug(tblcoba.id)
 logger.debug(response.body)
expect(response.status).toBe(200)
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kolom_satu).toBe(tblcoba.kolom_satu)
 })
 it("should reject  get tblcoba if tblcoba is not found", async () => {
  const tblcoba = await TblCobaTest.get()
 const response = await supertest(web)
     .get(`/api/tblcobas/${tblcoba.id}` + 1)
     .set("X-API-TOKEN", "test")
 logger.debug(tblcoba.id)
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 })
})
//PUT/UDATE TEST 
 describe("PUT /api/tblcobas/:tblcobaId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await TblCobaTest.create()
 }) 
 afterEach(async () => {
 await TblCobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to update tblcoba", async () => {
 const tblcoba = await TblCobaTest.get()
 const response = await supertest(web)
     .put(`/api/tblcobas/${tblcoba.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kolom_satu:"test_edited",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(tblcoba.id)
expect(response.body.data.kolom_satu).toBe("test_edited")
})
 it("should be reject  to update   tblcoba", async () => {
 const tblcoba = await TblCobaTest.get()
 const response = await supertest(web)
     .put(`/api/tblcobas/${tblcoba.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kolom_satu:"test",
     })
 logger.debug(response.body)
expect(response.status).toBe(400)
expect(response.body.errors).toBeDefined
})
})
//REMOVETEST 
 describe("DELETE /api/tblcobas/:tblcobaId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await TblCobaTest.create()
 }) 
 afterEach(async () => {
 await TblCobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to remove tblcoba", async () => {
 const tblcoba = await TblCobaTest.get()
 const response = await supertest(web)
     .delete(`/api/tblcobas/${tblcoba.id}`)
    .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(200)
 expect(response.body.data).toBe("OK")
 })
 it("should reject  to remove tblcoba if tblcoba is not found", async () => {
 const tblcoba = await TblCobaTest.get()
  const response = await supertest(web)
   .delete(`/api/tblcobas/${tblcoba.id + 1}`)
   .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 }) 
 }) //SEARCH Test 
describe("SEARCH /api/tblcobas", () => { 
 beforeEach(async () => {
 await UserTest.create()
 await TblCobaTest.create()
 }) 
 afterEach(async () => {
 await TblCobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
  it("should be able to search tblcoba", async () => {
  const response = await supertest(web)
      .get("/api/tblcobas")
     .set("X-API-TOKEN", "test")
  logger.debug(response.body)
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBeGreaterThanOrEqual(1)
  expect(response.body.paging.current_page).toBe(1)
  expect(response.body.paging.total_page).toBe(1)
  expect(response.body.paging.size).toBe(10)
})
})
