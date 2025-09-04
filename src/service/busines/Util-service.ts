// import { User } from "@prisma/client";
import { prismaClient } from "../../application/database";
import { UserResponse } from "../../model/user-model";
import { ResponseError } from "../../error/response-error";

export class UtilService {

static async getUser(username: string): Promise<UserResponse> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: username,
            }
        })
        if (!user) {
            throw new ResponseError(404, "User not found")
        }
        return user
    }


}