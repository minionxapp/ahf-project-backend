"use strict";
//Create Model UserProject-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserProjectResponse = toUserProjectResponse;
//toUserProjectResponse
function toUserProjectResponse(user_project) {
    return {
        id: user_project.id,
        project_id: user_project.project_id,
        username: user_project.username,
        status: user_project.status,
    };
}
