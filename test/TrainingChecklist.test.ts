
//Create Test TrainingChecklist-test.ts

import supertest from "supertest"
 import { web } from "../src/application/web"
 import {  UserTest } from "../test/test-util"
 import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import {TrainingChecklistTest} from "../test/util/TrainingChecklist-util-test"//Create test
 describe("POST /api/trainingchecklists", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 //await TrainingChecklistTest.create()
 }) 
 afterEach(async () => {
 await TrainingChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should create new trainingchecklist", async () => {
 const response = await supertest(web)
     .post("/api/trainingchecklists")
     .set("X-API-TOKEN", "test")
     .send({
training_kode:"Test_training_kode",
checklist_kode:"Test_checklist_kode",
file_1:"Test_file_1",
file_2:"Test_file_2",
file_3:"Test_file_3",
file_4:"Test_file_4",
status:"Test_status",
checklist_name:"Test_checklist_name",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.training_kode).toBe("Test_training_kode")
expect(response.body.data.checklist_kode).toBe("Test_checklist_kode")
expect(response.body.data.file_1).toBe("Test_file_1")
expect(response.body.data.file_2).toBe("Test_file_2")
expect(response.body.data.file_3).toBe("Test_file_3")
expect(response.body.data.file_4).toBe("Test_file_4")
expect(response.body.data.status).toBe("Test_status")
expect(response.body.data.checklist_name).toBe("Test_checklist_name")
     })
 it("should reject create new trainingchecklist", async () => {
 const response = await supertest(web)
     .post("/api/trainingchecklists")
     .set("X-API-TOKEN", "test")
     .send({
training_kode:null,
checklist_kode:null,
file_1:"",
file_2:"",
file_3:"",
file_4:"",
status:"",
checklist_name:"",
     })
 logger.debug(response.body)
 expect(response.status).toBe(400);
 expect(response.body.errors).toBeDefined()
})
})
//GET test
 describe("POST /api/trainingchecklists", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await TrainingChecklistTest.create()
 }) 
 afterEach(async () => {
 await TrainingChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able get trainingchecklist", async () => {
 const trainingchecklist = await TrainingChecklistTest.get()
 const response = await supertest(web) 
     .get(`/api/trainingchecklists/${trainingchecklist.id}`)
     .set("X-API-TOKEN", "test")
 logger.debug(trainingchecklist.id)
 logger.debug(response.body)
expect(response.status).toBe(200)
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.training_kode).toBe(trainingchecklist.training_kode)
expect(response.body.data.checklist_kode).toBe(trainingchecklist.checklist_kode)
expect(response.body.data.file_1).toBe(trainingchecklist.file_1)
expect(response.body.data.file_2).toBe(trainingchecklist.file_2)
expect(response.body.data.file_3).toBe(trainingchecklist.file_3)
expect(response.body.data.file_4).toBe(trainingchecklist.file_4)
expect(response.body.data.status).toBe(trainingchecklist.status)
expect(response.body.data.checklist_name).toBe(trainingchecklist.checklist_name)
 })
 it("should reject  get trainingchecklist if trainingchecklist is not found", async () => {
  const trainingchecklist = await TrainingChecklistTest.get()
 const response = await supertest(web)
     .get(`/api/trainingchecklists/${trainingchecklist.id}` + 1)
     .set("X-API-TOKEN", "test")
 logger.debug(trainingchecklist.id)
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 })
})
//PUT/UDATE TEST 
 describe("PUT /api/trainingchecklists/:trainingchecklistId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await TrainingChecklistTest.create()
 }) 
 afterEach(async () => {
 await TrainingChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to update trainingchecklist", async () => {
 const trainingchecklist = await TrainingChecklistTest.get()
 const response = await supertest(web)
     .put(`/api/trainingchecklists/${trainingchecklist.id}`)
    .set("X-API-TOKEN", "test")
    .send({
training_kode:"test_edited",
checklist_kode:"test_edited",
file_1:"test_edited",
file_2:"test_edited",
file_3:"test_edited",
file_4:"test_edited",
status:"test_edited",
checklist_name:"test_edited",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(trainingchecklist.id)
expect(response.body.data.training_kode).toBe("test_edited")
expect(response.body.data.checklist_kode).toBe("test_edited")
expect(response.body.data.file_1).toBe("test_edited")
expect(response.body.data.file_2).toBe("test_edited")
expect(response.body.data.file_3).toBe("test_edited")
expect(response.body.data.file_4).toBe("test_edited")
expect(response.body.data.status).toBe("test_edited")
expect(response.body.data.checklist_name).toBe("test_edited")
})
 it("should be reject  to update   trainingchecklist", async () => {
 const trainingchecklist = await TrainingChecklistTest.get()
 const response = await supertest(web)
     .put(`/api/trainingchecklists/${trainingchecklist.id}`)
    .set("X-API-TOKEN", "test")
    .send({
training_kode:null,
checklist_kode:null,
file_1:"test",
file_2:"test",
file_3:"test",
file_4:"test",
status:"test",
checklist_name:"test",
     })
 logger.debug(response.body)
expect(response.status).toBe(400)
expect(response.body.errors).toBeDefined
})
})
//REMOVETEST 
 describe("DELETE /api/trainingchecklists/:trainingchecklistId", () => {
 
 beforeEach(async () => {
 await UserTest.create()
 await TrainingChecklistTest.create()
 }) 
 afterEach(async () => {
 await TrainingChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to remove trainingchecklist", async () => {
 const trainingchecklist = await TrainingChecklistTest.get()
 const response = await supertest(web)
     .delete(`/api/trainingchecklists/${trainingchecklist.id}`)
    .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(200)
 expect(response.body.data).toBe("OK")
 })
 it("should reject  to remove trainingchecklist if trainingchecklist is not found", async () => {
 const trainingchecklist = await TrainingChecklistTest.get()
  const response = await supertest(web)
   .delete(`/api/trainingchecklists/${trainingchecklist.id + 1}`)
   .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 }) 
 }) //SEARCH Test 
describe("SEARCH /api/trainingchecklists", () => { 
 beforeEach(async () => {
 await UserTest.create()
 await TrainingChecklistTest.create()
 }) 
 afterEach(async () => {
 await TrainingChecklistTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
  it("should be able to search trainingchecklist", async () => {
  const response = await supertest(web)
      .get("/api/trainingchecklists")
     .set("X-API-TOKEN", "test")
  logger.debug(response.body)
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBeGreaterThanOrEqual(1)
  expect(response.body.paging.current_page).toBe(1)
  expect(response.body.paging.total_page).toBe(1)
  expect(response.body.paging.size).toBe(10)
})
})
