"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
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
//Contact API  \\d --> validasi hanya untuk number
exports.apiRouter.post("/api/contacts", contact_controller_1.ContactController.create);
exports.apiRouter.get("/api/contacts/:contactId", contact_controller_1.ContactController.get);
exports.apiRouter.put("/api/contacts/:contactId", contact_controller_1.ContactController.update);
exports.apiRouter.delete("/api/contacts/:contactId", contact_controller_1.ContactController.remove);
exports.apiRouter.get("/api/contacts", contact_controller_1.ContactController.search);
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
//ROUTE TestAja
const TestAja_controller_1 = require("../controller/TestAja-controller");
exports.apiRouter.post("/api/testajas", TestAja_controller_1.TestAjaController.create);
exports.apiRouter.get("/api/testajas/:testAjaId", TestAja_controller_1.TestAjaController.get);
exports.apiRouter.put("/api/testajas/:testAjaId", TestAja_controller_1.TestAjaController.update);
exports.apiRouter.delete("/api/testajas/:testAjaId", TestAja_controller_1.TestAjaController.remove);
exports.apiRouter.get("/api/testajas", TestAja_controller_1.TestAjaController.search);
//ROUTE Pmakai
const Pmakai_controller_1 = require("../controller/Pmakai-controller");
exports.apiRouter.post("/api/pmakais", Pmakai_controller_1.PmakaiController.create);
exports.apiRouter.get("/api/pmakais/:pmakaiId", Pmakai_controller_1.PmakaiController.get);
exports.apiRouter.put("/api/pmakais/:pmakaiId", Pmakai_controller_1.PmakaiController.update);
exports.apiRouter.delete("/api/pmakais/:pmakaiId", Pmakai_controller_1.PmakaiController.remove);
exports.apiRouter.get("/api/pmakais", Pmakai_controller_1.PmakaiController.search);
//ROUTE JobFamily
const JobFamily_controller_1 = require("../controller/JobFamily-controller");
exports.apiRouter.post("/api/jobfamilys", JobFamily_controller_1.JobFamilyController.create);
exports.apiRouter.get("/api/jobfamilys/:jobFamilyId", JobFamily_controller_1.JobFamilyController.get);
exports.apiRouter.put("/api/jobfamilys/:jobFamilyId", JobFamily_controller_1.JobFamilyController.update);
exports.apiRouter.delete("/api/jobfamilys/:jobFamilyId", JobFamily_controller_1.JobFamilyController.remove);
exports.apiRouter.get("/api/jobfamilys", JobFamily_controller_1.JobFamilyController.search);
//ROUTE SubJobFamily
const SubJobFamily_controller_1 = require("../controller/SubJobFamily-controller");
exports.apiRouter.post("/api/subjobfamilys", SubJobFamily_controller_1.SubJobFamilyController.create);
exports.apiRouter.get("/api/subjobfamilys/:subJobFamilyId", SubJobFamily_controller_1.SubJobFamilyController.get);
exports.apiRouter.put("/api/subjobfamilys/:subJobFamilyId", SubJobFamily_controller_1.SubJobFamilyController.update);
exports.apiRouter.delete("/api/subjobfamilys/:subJobFamilyId", SubJobFamily_controller_1.SubJobFamilyController.remove);
exports.apiRouter.get("/api/subjobfamilys", SubJobFamily_controller_1.SubJobFamilyController.search);
//ROUTE Kompetensi
const Kompetensi_controller_1 = require("../controller/Kompetensi-controller");
exports.apiRouter.post("/api/kompetensis", Kompetensi_controller_1.KompetensiController.create);
exports.apiRouter.get("/api/kompetensis/:kompetensiId", Kompetensi_controller_1.KompetensiController.get);
exports.apiRouter.put("/api/kompetensis/:kompetensiId", Kompetensi_controller_1.KompetensiController.update);
exports.apiRouter.delete("/api/kompetensis/:kompetensiId", Kompetensi_controller_1.KompetensiController.remove);
exports.apiRouter.get("/api/kompetensis", Kompetensi_controller_1.KompetensiController.search);
//ROUTE Akademi
const Akademi_controller_1 = require("../controller/Akademi-controller");
exports.apiRouter.post("/api/akademis", Akademi_controller_1.AkademiController.create);
exports.apiRouter.get("/api/akademis/:akademiId", Akademi_controller_1.AkademiController.get);
exports.apiRouter.put("/api/akademis/:akademiId", Akademi_controller_1.AkademiController.update);
exports.apiRouter.delete("/api/akademis/:akademiId", Akademi_controller_1.AkademiController.remove);
exports.apiRouter.get("/api/akademis", Akademi_controller_1.AkademiController.search);
exports.apiRouter.get("/api/akademibyuser/:username", Akademi_controller_1.AkademiController.getAkademiByUsername);
// akademiByUsername
//ROUTE UserAkademi
const UserAkademi_controller_1 = require("../controller/UserAkademi-controller");
exports.apiRouter.post("/api/userakademis", UserAkademi_controller_1.UserAkademiController.create);
exports.apiRouter.get("/api/userakademis/:userAkademiId", UserAkademi_controller_1.UserAkademiController.get);
exports.apiRouter.put("/api/userakademis/:userAkademiId", UserAkademi_controller_1.UserAkademiController.update);
exports.apiRouter.delete("/api/userakademis/:userAkademiId", UserAkademi_controller_1.UserAkademiController.remove);
exports.apiRouter.get("/api/userakademis", UserAkademi_controller_1.UserAkademiController.search);
//ROUTE StatusTraining
const StatusTraining_controller_1 = require("../controller/StatusTraining-controller");
exports.apiRouter.post("/api/statustrainings", StatusTraining_controller_1.StatusTrainingController.create);
exports.apiRouter.get("/api/statustrainings/:statusTrainingId", StatusTraining_controller_1.StatusTrainingController.get);
exports.apiRouter.put("/api/statustrainings/:statusTrainingId", StatusTraining_controller_1.StatusTrainingController.update);
exports.apiRouter.delete("/api/statustrainings/:statusTrainingId", StatusTraining_controller_1.StatusTrainingController.remove);
exports.apiRouter.get("/api/statustrainings", StatusTraining_controller_1.StatusTrainingController.search);
//ROUTE Seq
const Seq_controller_1 = require("../controller/Seq-controller");
exports.apiRouter.post("/api/seqs", Seq_controller_1.SeqController.create);
exports.apiRouter.get("/api/seqs/:seqId", Seq_controller_1.SeqController.get);
exports.apiRouter.put("/api/seqs/:seqId", Seq_controller_1.SeqController.update);
exports.apiRouter.delete("/api/seqs/:seqId", Seq_controller_1.SeqController.remove);
exports.apiRouter.get("/api/seqs", Seq_controller_1.SeqController.search);
//ROUTE Training
const Training_controller_1 = require("../controller/Training-controller");
exports.apiRouter.post("/api/trainings", Training_controller_1.TrainingController.create);
exports.apiRouter.get("/api/trainings/:trainingId", Training_controller_1.TrainingController.get);
exports.apiRouter.put("/api/trainings/:trainingId", Training_controller_1.TrainingController.update);
exports.apiRouter.delete("/api/trainings/:trainingId", Training_controller_1.TrainingController.remove);
exports.apiRouter.get("/api/trainings", Training_controller_1.TrainingController.search);
//ROUTE TipeTraining
const TipeTraining_controller_1 = require("../controller/TipeTraining-controller");
exports.apiRouter.post("/api/tipetrainings", TipeTraining_controller_1.TipeTrainingController.create);
exports.apiRouter.get("/api/tipetrainings/:tipeTrainingId", TipeTraining_controller_1.TipeTrainingController.get);
exports.apiRouter.put("/api/tipetrainings/:tipeTrainingId", TipeTraining_controller_1.TipeTrainingController.update);
exports.apiRouter.delete("/api/tipetrainings/:tipeTrainingId", TipeTraining_controller_1.TipeTrainingController.remove);
exports.apiRouter.get("/api/tipetrainings", TipeTraining_controller_1.TipeTrainingController.search);
//ROUTE SubKompetensi
const SubKompetensi_controller_1 = require("../controller/SubKompetensi-controller");
exports.apiRouter.post("/api/subkompetensis", SubKompetensi_controller_1.SubKompetensiController.create);
exports.apiRouter.get("/api/subkompetensis/:subKompetensiId", SubKompetensi_controller_1.SubKompetensiController.get);
exports.apiRouter.put("/api/subkompetensis/:subKompetensiId", SubKompetensi_controller_1.SubKompetensiController.update);
exports.apiRouter.delete("/api/subkompetensis/:subKompetensiId", SubKompetensi_controller_1.SubKompetensiController.remove);
exports.apiRouter.get("/api/subkompetensis", SubKompetensi_controller_1.SubKompetensiController.search);
//ROUTE KompetensiLevel
const KompetensiLevel_controller_1 = require("../controller/KompetensiLevel-controller");
exports.apiRouter.post("/api/kompetensilevels", KompetensiLevel_controller_1.KompetensiLevelController.create);
exports.apiRouter.get("/api/kompetensilevels/:kompetensiLevelId", KompetensiLevel_controller_1.KompetensiLevelController.get);
exports.apiRouter.put("/api/kompetensilevels/:kompetensiLevelId", KompetensiLevel_controller_1.KompetensiLevelController.update);
exports.apiRouter.delete("/api/kompetensilevels/:kompetensiLevelId", KompetensiLevel_controller_1.KompetensiLevelController.remove);
exports.apiRouter.get("/api/kompetensilevels", KompetensiLevel_controller_1.KompetensiLevelController.search);
//ROUTE Checklist
const Checklist_controller_1 = require("../controller/Checklist-controller");
exports.apiRouter.post("/api/checklists", Checklist_controller_1.ChecklistController.create);
exports.apiRouter.get("/api/checklists/:checklistId", Checklist_controller_1.ChecklistController.get);
exports.apiRouter.put("/api/checklists/:checklistId", Checklist_controller_1.ChecklistController.update);
exports.apiRouter.delete("/api/checklists/:checklistId", Checklist_controller_1.ChecklistController.remove);
exports.apiRouter.get("/api/checklists", Checklist_controller_1.ChecklistController.search);
//ROUTE TrainingChecklist
const TrainingChecklist_controller_1 = require("../controller/TrainingChecklist-controller");
exports.apiRouter.post("/api/trainingchecklists", TrainingChecklist_controller_1.TrainingChecklistController.create);
exports.apiRouter.get("/api/trainingchecklists/:trainingChecklistId", TrainingChecklist_controller_1.TrainingChecklistController.get);
exports.apiRouter.put("/api/trainingchecklists/:trainingChecklistId", TrainingChecklist_controller_1.TrainingChecklistController.update);
exports.apiRouter.delete("/api/trainingchecklists/:trainingChecklistId", TrainingChecklist_controller_1.TrainingChecklistController.remove);
exports.apiRouter.get("/api/trainingchecklists", TrainingChecklist_controller_1.TrainingChecklistController.search);
//ROUTE Brand
const Brand_controller_1 = require("../controller/Brand-controller");
exports.apiRouter.post("/api/brands", Brand_controller_1.BrandController.create);
exports.apiRouter.get("/api/brands/:brandId", Brand_controller_1.BrandController.get);
exports.apiRouter.put("/api/brands/:brandId", Brand_controller_1.BrandController.update);
exports.apiRouter.delete("/api/brands/:brandId", Brand_controller_1.BrandController.remove);
exports.apiRouter.get("/api/brands", Brand_controller_1.BrandController.search);
