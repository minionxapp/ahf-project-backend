
//Create Test Brand-test.ts

import supertest from "supertest"
 import { web } from "../src/application/web"
 import {  UserTest } from "../test/test-util"
 import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import {BrandTest} from "../test/util/Brand-util-test"//Create test
 describe("POST /api/brands", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 //await BrandTest.create()
 }) 
 afterEach(async () => {
 await BrandTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should create new brand", async () => {
 const response = await supertest(web)
     .post("/api/brands")
     .set("X-API-TOKEN", "test")
     .send({
kode:"Test_kode",
nama:"Test_nama",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kode).toBe("Test_kode")
expect(response.body.data.nama).toBe("Test_nama")
     })
 it("should reject create new brand", async () => {
 const response = await supertest(web)
     .post("/api/brands")
     .set("X-API-TOKEN", "test")
     .send({
kode:null,
nama:null,
     })
 logger.debug(response.body)
 expect(response.status).toBe(400);
 expect(response.body.errors).toBeDefined()
})
})
//GET test
 describe("POST /api/brands", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await BrandTest.create()
 }) 
 afterEach(async () => {
 await BrandTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able get brand", async () => {
 const brand = await BrandTest.get()
 const response = await supertest(web) 
     .get(`/api/brands/${brand.id}`)
     .set("X-API-TOKEN", "test")
 logger.debug(brand.id)
 logger.debug(response.body)
expect(response.status).toBe(200)
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.kode).toBe(brand.kode)
expect(response.body.data.nama).toBe(brand.nama)
 })
 it("should reject  get brand if brand is not found", async () => {
  const brand = await BrandTest.get()
 const response = await supertest(web)
     .get(`/api/brands/${brand.id}` + 1)
     .set("X-API-TOKEN", "test")
 logger.debug(brand.id)
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 })
})
//PUT/UDATE TEST 
 describe("PUT /api/brands/:brandId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await BrandTest.create()
 }) 
 afterEach(async () => {
 await BrandTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to update brand", async () => {
 const brand = await BrandTest.get()
 const response = await supertest(web)
     .put(`/api/brands/${brand.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kode:"test_edited",
nama:"test_edited",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(brand.id)
expect(response.body.data.kode).toBe("test_edited")
expect(response.body.data.nama).toBe("test_edited")
})
 it("should be reject  to update   brand", async () => {
 const brand = await BrandTest.get()
 const response = await supertest(web)
     .put(`/api/brands/${brand.id}`)
    .set("X-API-TOKEN", "test")
    .send({
kode:null,
nama:null,
     })
 logger.debug(response.body)
expect(response.status).toBe(400)
expect(response.body.errors).toBeDefined
})
})
//REMOVETEST 
 describe("DELETE /api/brands/:brandId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await BrandTest.create()
 }) 
 afterEach(async () => {
 await BrandTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to remove brand", async () => {
 const brand = await BrandTest.get()
 const response = await supertest(web)
     .delete(`/api/brands/${brand.id}`)
    .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(200)
 expect(response.body.data).toBe("OK")
 })
 it("should reject  to remove brand if brand is not found", async () => {
 const brand = await BrandTest.get()
  const response = await supertest(web)
   .delete(`/api/brands/${brand.id + 1}`)
   .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 }) 
 }) //SEARCH Test 
describe("SEARCH /api/brands", () => { 
 beforeEach(async () => {
 await UserTest.create()
 await BrandTest.create()
 }) 
 afterEach(async () => {
 await BrandTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
  it("should be able to search brand", async () => {
  const response = await supertest(web)
      .get("/api/brands")
     .set("X-API-TOKEN", "test")
  logger.debug(response.body)
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBeGreaterThanOrEqual(1)
  expect(response.body.paging.current_page).toBe(1)
  expect(response.body.paging.total_page).toBe(1)
  expect(response.body.paging.size).toBe(10)
})
})
