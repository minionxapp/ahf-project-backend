//Create Model UserProject-model.ts

import { UserProject } from '@prisma/client'
export type UserProjectResponse = {
    id: string,
    project_id: number,
    username?: string | null,
    status?: string | null,
}

//CreateUserProjectRequest
export type CreateUserProjectRequest = {
    id: string,
    project_id: number,
    username?: string | null,
    status?: string | null,
}

//UpdateUserProjectRequest
export type UpdateUserProjectRequest = {
    id: string,
    project_id: number,
    username?: string | null,
    status?: string | null,
}

//SearchUserProjectRequest
export type SearchUserProjectRequest = {
    //id: string,
    username?: string | null,
    status?: string | null,
    page: number,
    size: number,
}

//toUserProjectResponse
export function toUserProjectResponse(user_project: UserProject): UserProjectResponse {
    return {
        id: user_project.id,
        project_id: user_project.project_id,
        username: user_project.username,
        status: user_project.status,
    }
}
