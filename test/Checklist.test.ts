
//Create Test Checklist-test.ts

import supertest from "supertest"
 import { web } from "../src/application/web"
 import {  UserTest } from "../test/test-util"
 import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import {ChecklistTest} from "../test/util/Checklist-util-test"//Create test
 describe("POST /api/checklists", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 //await ChecklistTest.create()
 }) 
 afterEach(async () => {
 await ChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should create new checklist", async () => {
 const response = await supertest(web)
     .post("/api/checklists")
     .set("X-API-TOKEN", "test")
     .send({
nama:"Test_nama",
urut:1,
desc:"Test_desc",
kode:"Test_kode",
group:"Test_group",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.nama).toBe("Test_nama")
expect(response.body.data.urut).toBe(1)
expect(response.body.data.desc).toBe("Test_desc")
expect(response.body.data.kode).toBe("Test_kode")
expect(response.body.data.group).toBe("Test_group")
     })
 it("should reject create new checklist", async () => {
 const response = await supertest(web)
     .post("/api/checklists")
     .set("X-API-TOKEN", "test")
     .send({
nama:null,
urut:1,
desc:null,
kode:null,
group:null,
     })
 logger.debug(response.body)
 expect(response.status).toBe(400);
 expect(response.body.errors).toBeDefined()
})
})
//GET test
 describe("POST /api/checklists", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await ChecklistTest.create()
 }) 
 afterEach(async () => {
 await ChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able get checklist", async () => {
 const checklist = await ChecklistTest.get()
 const response = await supertest(web) 
     .get(`/api/checklists/${checklist.id}`)
     .set("X-API-TOKEN", "test")
 logger.debug(checklist.id)
 logger.debug(response.body)
expect(response.status).toBe(200)
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.nama).toBe(checklist.nama)
expect(response.body.data.urut).toBe(checklist.urut)
expect(response.body.data.desc).toBe(checklist.desc)
expect(response.body.data.kode).toBe(checklist.kode)
expect(response.body.data.group).toBe(checklist.group)
 })
 it("should reject  get checklist if checklist is not found", async () => {
  const checklist = await ChecklistTest.get()
 const response = await supertest(web)
     .get(`/api/checklists/${checklist.id}` + 1)
     .set("X-API-TOKEN", "test")
 logger.debug(checklist.id)
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 })
})
//PUT/UDATE TEST 
 describe("PUT /api/checklists/:checklistId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await ChecklistTest.create()
 }) 
 afterEach(async () => {
 await ChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to update checklist", async () => {
 const checklist = await ChecklistTest.get()
 const response = await supertest(web)
     .put(`/api/checklists/${checklist.id}`)
    .set("X-API-TOKEN", "test")
    .send({
nama:"test_edited",
urut:1,
desc:"test_edited",
kode:"test_edited",
group:"test_edited",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(checklist.id)
expect(response.body.data.nama).toBe("test_edited")
expect(response.body.data.urut).toBe(checklist.urut)
expect(response.body.data.desc).toBe("test_edited")
expect(response.body.data.kode).toBe("test_edited")
expect(response.body.data.group).toBe("test_edited")
})
 it("should be reject  to update   checklist", async () => {
 const checklist = await ChecklistTest.get()
 const response = await supertest(web)
     .put(`/api/checklists/${checklist.id}`)
    .set("X-API-TOKEN", "test")
    .send({
nama:null,
urut:1,
desc:null,
kode:null,
group:null,
     })
 logger.debug(response.body)
expect(response.status).toBe(400)
expect(response.body.errors).toBeDefined
})
})
//REMOVETEST 
 describe("DELETE /api/checklists/:checklistId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await ChecklistTest.create()
 }) 
 afterEach(async () => {
 await ChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to remove checklist", async () => {
 const checklist = await ChecklistTest.get()
 const response = await supertest(web)
     .delete(`/api/checklists/${checklist.id}`)
    .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(200)
 expect(response.body.data).toBe("OK")
 })
 it("should reject  to remove checklist if checklist is not found", async () => {
 const checklist = await ChecklistTest.get()
  const response = await supertest(web)
   .delete(`/api/checklists/${checklist.id + 1}`)
   .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 }) 
 }) //SEARCH Test 
describe("SEARCH /api/checklists", () => { 
 beforeEach(async () => {
 await UserTest.create()
 await ChecklistTest.create()
 }) 
 afterEach(async () => {
 await ChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
  it("should be able to search checklist", async () => {
  const response = await supertest(web)
      .get("/api/checklists")
     .set("X-API-TOKEN", "test")
  logger.debug(response.body)
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBeGreaterThanOrEqual(1)
  expect(response.body.paging.current_page).toBe(1)
  expect(response.body.paging.total_page).toBe(1)
  expect(response.body.paging.size).toBe(10)
})
})
