"use strict";
//Create Model TrainingChecklist-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTrainingChecklistResponse = toTrainingChecklistResponse;
//toTrainingChecklistResponse
function toTrainingChecklistResponse(training_checklist) {
    return {
        id: training_checklist.id,
        training_kode: training_checklist.training_kode,
        checklist_kode: training_checklist.checklist_kode,
        file_1: training_checklist.file_1,
        file_2: training_checklist.file_2,
        file_3: training_checklist.file_3,
        file_4: training_checklist.file_4,
        status: training_checklist.status,
        checklist_name: training_checklist.checklist_name,
    };
}
