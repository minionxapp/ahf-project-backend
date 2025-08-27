import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
// import { ContactController } from "../controller/contact-controller";
import {Dev_projectController } from "../controller/dev-project-controller";
import {Dev_tablexController } from "../controller/dev-tablex-controller";
import {DevTableKolomController } from "../controller/DevTableKolom-controller";
import {DevDirektoriController } from "../controller/DevDirektori-controller";
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//user api
apiRouter.get("/api/users/current", UserController.get)

apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)
//bikinin user
apiRouter.post("/api/users",UserController.register)
apiRouter.get("/api/users", UserController.search)
apiRouter.delete("/api/users/:username", UserController.remove)
apiRouter.put("/api/users/:username",UserController.update)
apiRouter.get("/api/users/:username", UserController.getbyusername)

//Contact API  \\d --> validasi hanya untuk number
// apiRouter.post("/api/contacts", ContactController.create)
// apiRouter.get("/api/contacts/:contactId", ContactController.get)
// apiRouter.put("/api/contacts/:contactId", ContactController.update)
// apiRouter.delete("/api/contacts/:contactId", ContactController.remove)
// apiRouter.get("/api/contacts", ContactController.search)

//ROUTE Dev_tablex
apiRouter.get("/api/dev_tablexs/projectid/:dev_tablexId",Dev_tablexController.getByProjectId)
apiRouter.post("/api/dev_tablexs",Dev_tablexController.create)
apiRouter.get("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.get)
apiRouter.put("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.update)
apiRouter.delete("/api/dev_tablexs/:dev_tablexId", Dev_tablexController.remove)
apiRouter.get("/api/dev_tablexs", Dev_tablexController.search)

//ROUTE Dev_project
apiRouter.post("/api/dev_projects",Dev_projectController.create)
apiRouter.get("/api/dev_projects/:dev_projectId",Dev_projectController.get)
apiRouter.put("/api/dev_projects/:dev_projectId",Dev_projectController.update)
apiRouter.delete("/api/dev_projects/:dev_projectId", Dev_projectController.remove)
apiRouter.get("/api/dev_projects", Dev_projectController.search)

apiRouter.post("/api/devTableKoloms",DevTableKolomController.create)
apiRouter.get("/api/devTableKoloms/tableid/:devTableKolomTableId",DevTableKolomController.getTableId)
apiRouter.get("/api/devTableKoloms/:devTableKolomId",DevTableKolomController.get)
apiRouter.put("/api/devTableKoloms/:devTableKolomId",DevTableKolomController.update)
apiRouter.delete("/api/devTableKoloms/:devTableKolomId", DevTableKolomController.remove)
apiRouter.get("/api/devTableKoloms", DevTableKolomController.search)

                                
//ROUTE DevDirektori
apiRouter.post("/api/devdirektoris",DevDirektoriController.create)
apiRouter.get("/api/devdirektoris/:devDirektoriId",DevDirektoriController.get)
apiRouter.put("/api/devdirektoris/:devDirektoriId",DevDirektoriController.update)
apiRouter.delete("/api/devdirektoris/:devDirektoriId", DevDirektoriController.remove)
apiRouter.get("/api/devdirektoris", DevDirektoriController.search)

import {GroupController } from "../controller/Group-controller";

apiRouter.post("/api/groups",GroupController.create)
apiRouter.get("/api/groups/:groupId",GroupController.get)
apiRouter.put("/api/groups/:groupId",GroupController.update)
apiRouter.delete("/api/groups/:groupId", GroupController.remove)
apiRouter.get("/api/groups", GroupController.search)


//ROUTE UserProject

import {UserProjectController } from "../controller/User-project-controller";
apiRouter.post("/api/userprojects",UserProjectController.create)
apiRouter.get("/api/userprojects/:userProjectId",UserProjectController.get)
apiRouter.put("/api/userprojects/:userProjectId",UserProjectController.update)
apiRouter.delete("/api/userprojects/:userProjectId", UserProjectController.remove)
apiRouter.get("/api/userprojects", UserProjectController.search)

//ROUTE Seq
import {SeqController } from "../controller/Seq-controller";
apiRouter.post("/api/seqs",SeqController.create)
apiRouter.put("/api/seqs/:seqId",SeqController.update)
apiRouter.delete("/api/seqs/:seqId", SeqController.remove)
apiRouter.get("/api/seqs/:seqId",SeqController.get)
apiRouter.get("/api/seqs", SeqController.search)

//ROUTE TableCoba
import {TableCobaController } from "../controller/TableCoba-controller";
apiRouter.post("/api/tablecobas",TableCobaController.create)
apiRouter.get("/api/tablecobas/:tableCobaId",TableCobaController.get)
apiRouter.put("/api/tablecobas/:tableCobaId",TableCobaController.update)
apiRouter.delete("/api/tablecobas/:tableCobaId", TableCobaController.remove)
apiRouter.get("/api/tablecobas", TableCobaController.search)





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

