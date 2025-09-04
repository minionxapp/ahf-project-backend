import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse, SearchUserRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { Pageable } from "../model/page";
import { json } from "express";
import { console } from "inspector";

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        //validasi
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)
        //cek user name
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        })
        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already axist");
        }
        //ubah password pake bcrypt
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)
        //simpan
        const user = await prismaClient.user.create({
            data: registerRequest
        })
        //balikannya
        return toUserResponse(user)

    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        //validasi
        const lognRequest = Validation.validate(UserValidation.LOGIN, request)
        //cek database
        let user = await prismaClient.user.findUnique({
            where: {
                username: lognRequest.username
            }
        })
        //user tidak ditemukan
        if (!user) {
            throw new ResponseError(401, "Username or password is wrong")
        }
        //cek compare password request vs database
        const isPasswordValid = await bcrypt.compare(lognRequest.password, user.password)
        //password not match
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong")
        }
        user = await prismaClient.user.update({
            where: {
                username: lognRequest.username
            },
            data: {
                token: uuid()
            }
        })
        const response = toUserResponse(user);
        response.token = user.token!
        return response

    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

     static async getbyusername(user: User,username : string): Promise<UserResponse> {
         const userfind = await this.checkUserMustexist(username)
         console.log("getuserbyname ............."+username)
         console.log(userfind)
        return toUserResponse(userfind);
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        //validasi
        const updateRequest = Validation.validate(UserValidation.UPDATE, request)
        console.log(JSON.stringify(updateRequest))
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        const result = await prismaClient.user.update({
            where: {
                username: updateRequest.username
            },
            data: record
        })

        return toUserResponse(result)
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        })
        return toUserResponse(result)

    }



    //SEARCH 
    static async search(user: User, request: SearchUserRequest): Promise<Pageable<UserResponse>> {
        const searchRequest = Validation.validate(UserValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if username exists
        if (searchRequest.username) {
            filters.push({
                username: {
                    contains: searchRequest.username
                }
            })
        }
        // check if password exists
        if (searchRequest.password) {
            filters.push({
                password: {
                    contains: searchRequest.password
                }
            })
        }
        // check if name exists
        if (searchRequest.name) {
            filters.push({
                name: {
                    contains: searchRequest.name
                }
            })
        }
        // check if token exists
        if (searchRequest.token) {
            filters.push({
                token: {
                    contains: searchRequest.token
                }
            })
        }
        // check if status exists
        if (searchRequest.status) {
            filters.push({
                status: {
                    contains: searchRequest.status
                }
            })
        }
        // check if email exists
        if (searchRequest.email) {
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // check if group exists
        if (searchRequest.group) {
            filters.push({
                group: {
                    contains: searchRequest.group
                }
            })
        }
        const users = await prismaClient.user.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.user.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: users.map(user => toUserResponse(user)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }


    //REMOVE by Id
    static async remove(user: User, username: string): Promise<User> {
        console
        await this.checkUserMustexist(username)
        const userdel = await prismaClient.user.delete({
            where: {
                // id: id,
                username: username
            }
        })
        return userdel
    }

    // CEK EXIST
    //function untuk getUser biar bisa dipakai berulang
    static async checkUserMustexist(username: string): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                // id: userId,
                username: username
            }
        })
        if (!user) {
            throw new ResponseError(404, "User not found")
        }
        return user
    }

}