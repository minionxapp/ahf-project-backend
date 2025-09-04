"use strict";
//Create Model UserAkademi-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserAkademiResponse = toUserAkademiResponse;
//toUserAkademiResponse
function toUserAkademiResponse(user_akademi) {
    return {
        id: user_akademi.id,
        username: user_akademi.username,
        kode_akademi: user_akademi.kode_akademi,
        aktive: user_akademi.aktive,
    };
}
