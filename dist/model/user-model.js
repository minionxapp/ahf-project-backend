"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
//unutk data responsenya 
//unutk konversi dari user prisma menjadi user response
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
        //         id: user.id,
        // username:user.username,
        // password:user.password,
        // name:user.name,
        token: user.token,
        status: user.status,
        email: user.email,
        group: user.group,
        expired: user.expired,
    };
}
