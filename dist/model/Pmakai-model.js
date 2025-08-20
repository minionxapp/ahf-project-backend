"use strict";
//Create Model Pmakai-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPmakaiResponse = toPmakaiResponse;
//toPmakaiResponse
function toPmakaiResponse(pmakai) {
    return {
        id: pmakai.id,
        username: pmakai.username,
        // password: pmakai.password,
        name: pmakai.name,
        token: pmakai.token,
        status: pmakai.status,
        email: pmakai.email,
        group: pmakai.group,
        expired: pmakai.expired,
    };
}
