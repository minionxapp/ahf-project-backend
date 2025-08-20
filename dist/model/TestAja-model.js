"use strict";
//Create Model TestAja-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTestAjaResponse = toTestAjaResponse;
//toTestAjaResponse
function toTestAjaResponse(test_aja) {
    return {
        id: test_aja.id,
        textaja: test_aja.textaja,
        numberaja: test_aja.numberaja,
        tglaja: test_aja.tglaja,
    };
}
