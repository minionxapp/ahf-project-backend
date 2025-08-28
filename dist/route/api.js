"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
// import { ContactController } from "../controller/contact-controller";
const dev_project_controller_1 = require("../controller/dev-project-controller");
const dev_tablex_controller_1 = require("../controller/dev-tablex-controller");
const DevTableKolom_controller_1 = require("../controller/DevTableKolom-controller");
const DevDirektori_controller_1 = require("../controller/DevDirektori-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
//user api
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.get);
exports.apiRouter.patch("/api/users/current", user_controller_1.UserController.update);
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout);
//bikinin user
exports.apiRouter.post("/api/users", user_controller_1.UserController.register);
exports.apiRouter.get("/api/users", user_controller_1.UserController.search);
exports.apiRouter.delete("/api/users/:username", user_controller_1.UserController.remove);
exports.apiRouter.put("/api/users/:username", user_controller_1.UserController.update);
exports.apiRouter.get("/api/users/:username", user_controller_1.UserController.getbyusername);
//Contact API  \\d --> validasi hanya untuk number
// apiRouter.post("/api/contacts", ContactController.create)
// apiRouter.get("/api/contacts/:contactId", ContactController.get)
// apiRouter.put("/api/contacts/:contactId", ContactController.update)
// apiRouter.delete("/api/contacts/:contactId", ContactController.remove)
// apiRouter.get("/api/contacts", ContactController.search)
//ROUTE Dev_tablex
exports.apiRouter.get("/api/dev_tablexs/projectid/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.getByProjectId);
exports.apiRouter.post("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.create);
exports.apiRouter.get("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.get);
exports.apiRouter.put("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.update);
exports.apiRouter.delete("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.remove);
exports.apiRouter.get("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.search);
//ROUTE Dev_project
exports.apiRouter.post("/api/dev_projects", dev_project_controller_1.Dev_projectController.create);
exports.apiRouter.get("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.get);
exports.apiRouter.put("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.update);
exports.apiRouter.delete("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.remove);
exports.apiRouter.get("/api/dev_projects", dev_project_controller_1.Dev_projectController.search);
exports.apiRouter.post("/api/devTableKoloms", DevTableKolom_controller_1.DevTableKolomController.create);
exports.apiRouter.get("/api/devTableKoloms/tableid/:devTableKolomTableId", DevTableKolom_controller_1.DevTableKolomController.getTableId);
exports.apiRouter.get("/api/devTableKoloms/:devTableKolomId", DevTableKolom_controller_1.DevTableKolomController.get);
exports.apiRouter.put("/api/devTableKoloms/:devTableKolomId", DevTableKolom_controller_1.DevTableKolomController.update);
exports.apiRouter.delete("/api/devTableKoloms/:devTableKolomId", DevTableKolom_controller_1.DevTableKolomController.remove);
exports.apiRouter.get("/api/devTableKoloms", DevTableKolom_controller_1.DevTableKolomController.search);
//ROUTE DevDirektori
exports.apiRouter.post("/api/devdirektoris", DevDirektori_controller_1.DevDirektoriController.create);
exports.apiRouter.get("/api/devdirektoris/:devDirektoriId", DevDirektori_controller_1.DevDirektoriController.get);
exports.apiRouter.put("/api/devdirektoris/:devDirektoriId", DevDirektori_controller_1.DevDirektoriController.update);
exports.apiRouter.delete("/api/devdirektoris/:devDirektoriId", DevDirektori_controller_1.DevDirektoriController.remove);
exports.apiRouter.get("/api/devdirektoris", DevDirektori_controller_1.DevDirektoriController.search);
const Group_controller_1 = require("../controller/Group-controller");
exports.apiRouter.post("/api/groups", Group_controller_1.GroupController.create);
exports.apiRouter.get("/api/groups/:groupId", Group_controller_1.GroupController.get);
exports.apiRouter.put("/api/groups/:groupId", Group_controller_1.GroupController.update);
exports.apiRouter.delete("/api/groups/:groupId", Group_controller_1.GroupController.remove);
exports.apiRouter.get("/api/groups", Group_controller_1.GroupController.search);
//ROUTE UserProject
const User_project_controller_1 = require("../controller/User-project-controller");
exports.apiRouter.post("/api/userprojects", User_project_controller_1.UserProjectController.create);
exports.apiRouter.get("/api/userprojects/:userProjectId", User_project_controller_1.UserProjectController.get);
exports.apiRouter.put("/api/userprojects/:userProjectId", User_project_controller_1.UserProjectController.update);
exports.apiRouter.delete("/api/userprojects/:userProjectId", User_project_controller_1.UserProjectController.remove);
exports.apiRouter.get("/api/userprojects", User_project_controller_1.UserProjectController.search);
//ROUTE Seq
const Seq_controller_1 = require("../controller/Seq-controller");
exports.apiRouter.post("/api/seqs", Seq_controller_1.SeqController.create);
exports.apiRouter.put("/api/seqs/:seqId", Seq_controller_1.SeqController.update);
exports.apiRouter.delete("/api/seqs/:seqId", Seq_controller_1.SeqController.remove);
exports.apiRouter.get("/api/seqs/:seqId", Seq_controller_1.SeqController.get);
exports.apiRouter.get("/api/seqs", Seq_controller_1.SeqController.search);
//ROUTE TableCoba
const TableCoba_controller_1 = require("../controller/TableCoba-controller");
exports.apiRouter.post("/api/tablecobas", TableCoba_controller_1.TableCobaController.create);
exports.apiRouter.get("/api/tablecobas/:tableCobaId", TableCoba_controller_1.TableCobaController.get);
exports.apiRouter.put("/api/tablecobas/:tableCobaId", TableCoba_controller_1.TableCobaController.update);
exports.apiRouter.delete("/api/tablecobas/:tableCobaId", TableCoba_controller_1.TableCobaController.remove);
exports.apiRouter.get("/api/tablecobas", TableCoba_controller_1.TableCobaController.search);
exports.apiRouter.get("/api/tablecobas/id/:tableCobaId", TableCoba_controller_1.TableCobaController.getId);
exports.apiRouter.get("/api/tablecobas/name/:tableCobaName", TableCoba_controller_1.TableCobaController.getName);
exports.apiRouter.get("/api/tablecobas/kode/:tableCobaKode", TableCoba_controller_1.TableCobaController.getKode);
// //ROUTE TestAja
// import {TestAjaController } from "../controller/TestAja-controller";
// apiRouter.post("/api/testajas",TestAjaController.create)
// apiRouter.get("/api/testajas/:testAjaId",TestAjaController.get)
// apiRouter.put("/api/testajas/:testAjaId",TestAjaController.update)
// apiRouter.delete("/api/testajas/:testAjaId", TestAjaController.remove)
// apiRouter.get("/api/testajas", TestAjaController.search)
// //ROUTE Pmakai
// import {PmakaiController } from "../controller/Pmakai-controller";
// apiRouter.post("/api/pmakais",PmakaiController.create)
// apiRouter.get("/api/pmakais/:pmakaiId",PmakaiController.get)
// apiRouter.put("/api/pmakais/:pmakaiId",PmakaiController.update)
// apiRouter.delete("/api/pmakais/:pmakaiId", PmakaiController.remove)
// apiRouter.get("/api/pmakais", PmakaiController.search)
// //ROUTE JobFamily
// import {JobFamilyController } from "../controller/JobFamily-controller";
// apiRouter.post("/api/jobfamilys",JobFamilyController.create)
// apiRouter.get("/api/jobfamilys/:jobFamilyId",JobFamilyController.get)
// apiRouter.put("/api/jobfamilys/:jobFamilyId",JobFamilyController.update)
// apiRouter.delete("/api/jobfamilys/:jobFamilyId", JobFamilyController.remove)
// apiRouter.get("/api/jobfamilys", JobFamilyController.search)
// //ROUTE SubJobFamily
// import {SubJobFamilyController } from "../controller/SubJobFamily-controller";
// apiRouter.post("/api/subjobfamilys",SubJobFamilyController.create)
// apiRouter.get("/api/subjobfamilys/:subJobFamilyId",SubJobFamilyController.get)
// apiRouter.put("/api/subjobfamilys/:subJobFamilyId",SubJobFamilyController.update)
// apiRouter.delete("/api/subjobfamilys/:subJobFamilyId", SubJobFamilyController.remove)
// apiRouter.get("/api/subjobfamilys", SubJobFamilyController.search)
// //ROUTE Kompetensi
// import {KompetensiController } from "../controller/Kompetensi-controller";
// apiRouter.post("/api/kompetensis",KompetensiController.create)
// apiRouter.get("/api/kompetensis/:kompetensiId",KompetensiController.get)
// apiRouter.put("/api/kompetensis/:kompetensiId",KompetensiController.update)
// apiRouter.delete("/api/kompetensis/:kompetensiId", KompetensiController.remove)
// apiRouter.get("/api/kompetensis", KompetensiController.search)
// //ROUTE Akademi
// import {AkademiController } from "../controller/Akademi-controller";
// apiRouter.post("/api/akademis",AkademiController.create)
// apiRouter.get("/api/akademis/:akademiId",AkademiController.get)
// apiRouter.put("/api/akademis/:akademiId",AkademiController.update)
// apiRouter.delete("/api/akademis/:akademiId", AkademiController.remove)
// apiRouter.get("/api/akademis", AkademiController.search)
// apiRouter.get("/api/akademibyuser/:username", AkademiController.getAkademiByUsername)
// // akademiByUsername
// //ROUTE UserAkademi
// import {UserAkademiController } from "../controller/UserAkademi-controller";
// apiRouter.post("/api/userakademis",UserAkademiController.create)
// apiRouter.get("/api/userakademis/:userAkademiId",UserAkademiController.get)
// apiRouter.put("/api/userakademis/:userAkademiId",UserAkademiController.update)
// apiRouter.delete("/api/userakademis/:userAkademiId", UserAkademiController.remove)
// apiRouter.get("/api/userakademis", UserAkademiController.search)
// //ROUTE StatusTraining
// import {StatusTrainingController } from "../controller/StatusTraining-controller";
// apiRouter.post("/api/statustrainings",StatusTrainingController.create)
// apiRouter.get("/api/statustrainings/:statusTrainingId",StatusTrainingController.get)
// apiRouter.put("/api/statustrainings/:statusTrainingId",StatusTrainingController.update)
// apiRouter.delete("/api/statustrainings/:statusTrainingId", StatusTrainingController.remove)
// apiRouter.get("/api/statustrainings", StatusTrainingController.search)
// //ROUTE Training
// import {TrainingController } from "../controller/Training-controller";
// apiRouter.post("/api/trainings",TrainingController.create)
// apiRouter.get("/api/trainings/:trainingId",TrainingController.get)
// apiRouter.put("/api/trainings/:trainingId",TrainingController.update)
// apiRouter.delete("/api/trainings/:trainingId", TrainingController.remove)
// apiRouter.get("/api/trainings", TrainingController.search)
// //ROUTE TipeTraining
// import {TipeTrainingController } from "../controller/TipeTraining-controller";
// apiRouter.post("/api/tipetrainings",TipeTrainingController.create)
// apiRouter.get("/api/tipetrainings/:tipeTrainingId",TipeTrainingController.get)
// apiRouter.put("/api/tipetrainings/:tipeTrainingId",TipeTrainingController.update)
// apiRouter.delete("/api/tipetrainings/:tipeTrainingId", TipeTrainingController.remove)
// apiRouter.get("/api/tipetrainings", TipeTrainingController.search)
// //ROUTE SubKompetensi
// import {SubKompetensiController } from "../controller/SubKompetensi-controller";
// apiRouter.post("/api/subkompetensis",SubKompetensiController.create)
// apiRouter.get("/api/subkompetensis/:subKompetensiId",SubKompetensiController.get)
// apiRouter.put("/api/subkompetensis/:subKompetensiId",SubKompetensiController.update)
// apiRouter.delete("/api/subkompetensis/:subKompetensiId", SubKompetensiController.remove)
// apiRouter.get("/api/subkompetensis", SubKompetensiController.search)
// //ROUTE KompetensiLevel
// import {KompetensiLevelController } from "../controller/KompetensiLevel-controller";
// apiRouter.post("/api/kompetensilevels",KompetensiLevelController.create)
// apiRouter.get("/api/kompetensilevels/:kompetensiLevelId",KompetensiLevelController.get)
// apiRouter.put("/api/kompetensilevels/:kompetensiLevelId",KompetensiLevelController.update)
// apiRouter.delete("/api/kompetensilevels/:kompetensiLevelId", KompetensiLevelController.remove)
// apiRouter.get("/api/kompetensilevels", KompetensiLevelController.search)
// //ROUTE Checklist
// import {ChecklistController } from "../controller/Checklist-controller";
// apiRouter.post("/api/checklists",ChecklistController.create)
// apiRouter.get("/api/checklists/:checklistId",ChecklistController.get)
// apiRouter.put("/api/checklists/:checklistId",ChecklistController.update)
// apiRouter.delete("/api/checklists/:checklistId", ChecklistController.remove)
// apiRouter.get("/api/checklists", ChecklistController.search)
// //ROUTE TrainingChecklist
// import {TrainingChecklistController } from "../controller/TrainingChecklist-controller";
// apiRouter.post("/api/trainingchecklists",TrainingChecklistController.create)
// apiRouter.get("/api/trainingchecklists/:trainingChecklistId",TrainingChecklistController.get)
// apiRouter.put("/api/trainingchecklists/:trainingChecklistId",TrainingChecklistController.update)
// apiRouter.delete("/api/trainingchecklists/:trainingChecklistId", TrainingChecklistController.remove)
// apiRouter.get("/api/trainingchecklists", TrainingChecklistController.search)
// //ROUTE Brand
// import {BrandController } from "../controller/Brand-controller";
// apiRouter.post("/api/brands",BrandController.create)
// apiRouter.get("/api/brands/:brandId",BrandController.get)
// apiRouter.put("/api/brands/:brandId",BrandController.update)
// apiRouter.delete("/api/brands/:brandId", BrandController.remove)
// apiRouter.get("/api/brands", BrandController.search)
