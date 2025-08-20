//Create Model TestAja-model.ts

import { TestAja } from '@prisma/client'
export type TestAjaResponse = {
    id: number,
    textaja?: string | null,
    numberaja: number,
    tglaja?: Date | null,
}

//CreateTestAjaRequest
export type CreateTestAjaRequest = {
    id: number,
    textaja?: string | null,
    numberaja: number,
    tglaja?: Date | null,
}

//UpdateTestAjaRequest
export type UpdateTestAjaRequest = {
    id: number,
    textaja?: string | null,
    numberaja: number,
    tglaja?: Date | null,
}

//SearchTestAjaRequest
export type SearchTestAjaRequest = {
    //id: number,
    textaja?: string | null,
    page: number,
    size: number,
}

//toTestAjaResponse
export function toTestAjaResponse(test_aja: TestAja): TestAjaResponse {
    return {
        id: test_aja.id,
        textaja: test_aja.textaja,
        numberaja: test_aja.numberaja,
        tglaja: test_aja.tglaja,
    }
}
