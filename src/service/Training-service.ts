//Create Service Training-service.ts

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { TrainingResponse, CreateTrainingRequest, SearchTrainingRequest, toTrainingResponse, UpdateTrainingRequest } from "../model/Training-model";
import { Pageable } from "../model/page";
import { TrainingValidation } from "../validation/Training-validation";
import { Validation } from "../validation/validation";
import { User, Training } from "@prisma/client";
import { Util } from "../util/util";
export class TrainingService {

    //CREATE 
    static async create(user: User, request: CreateTrainingRequest): Promise<TrainingResponse> {
        const createRequest = Validation.validate(TrainingValidation.CREATE, request)
        let tgl_mulai = request.tgl_mulai! //"2025-12-31"
        request.tgl_mulai = new Date(tgl_mulai)
        let tgl_akhir = request.tgl_akhir! //"2025-12-31"
        request.tgl_akhir = new Date(tgl_akhir)
        const totalkodeUniq = await prismaClient.training.count({
            where: {
                kode: createRequest.kode
            }
        })
        if (totalkodeUniq != 0) {
            throw new ResponseError(400, "kode already axist");
        }

        //set kodeTraining
        const nomorTraning = await Util.setKodeTraining(createRequest.akademi!)
        // console.log(nomorTraning)
        createRequest.kode = nomorTraning
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const training = await prismaClient.training.create({
            data: record
        })

        //set ceklist training
        const ceklists = await prismaClient.checklist.findMany({
            where: {
                group: "TRAINING"
            }
        })

        for (let index = 0; index < ceklists.length; index++) {
            const element = ceklists[index];
            const trainingCeklist = await prismaClient.trainingChecklist.create({
                data: {
                    training_kode: nomorTraning,
                    checklist_kode: element.kode,
                    create_by: user.name,
                    file_1: '',
                    file_2: '',
                    file_3: '',
                    file_4: '',
                    status: 'N',
                    checklist_name: element.nama
                }
            })
        }
        return toTrainingResponse(training)
    }

    // CEK EXIST
    //function untuk getTraining biar bisa dipakai berulang
    static async checkTrainingMustexist(trainingId: number): Promise<Training> {
        const training = await prismaClient.training.findFirst({
            where: {
                id: trainingId,
            }
        })
        if (!training) {
            throw new ResponseError(404, "Training not found")
        }
        return training
    }

    // GET by Id
    static async get(user: User, id: number): Promise<TrainingResponse> {
        const training = await this.checkTrainingMustexist(id)
        return toTrainingResponse(training)
    }

    // UPDATE by Id
    static async update(user: User, request: UpdateTrainingRequest): Promise<TrainingResponse> {
        const updateRequest = Validation.validate(TrainingValidation.UPDATE, request)
        let tgl_mulai = request.tgl_mulai! //"2025-12-31"
        request.tgl_mulai = new Date(tgl_mulai)
        let tgl_akhir = request.tgl_akhir! //"2025-12-31"
        request.tgl_akhir = new Date(tgl_akhir)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Training ada atau tidak
        await this.checkTrainingMustexist(request.id)
        const training = await prismaClient.training.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: record
        })
        return toTrainingResponse(training)
    }
    //REMOVE by Id
    static async remove(user: User, id: number): Promise<TrainingResponse> {
        await this.checkTrainingMustexist(id)
        const training = await prismaClient.training.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return training
    }
    //SEARCH 
    static async search(user: User, request: SearchTrainingRequest): Promise<Pageable<TrainingResponse>> {
        const searchRequest = Validation.validate(TrainingValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if kode exists
        if (searchRequest.kode) {
            filters.push({
                kode: {
                    contains: searchRequest.kode
                }
            })
        }
        // check if nama exists
        if (searchRequest.nama) {
            filters.push({
                nama: {
                    contains: searchRequest.nama
                }
            })
        }
        // check if akademi exists
        if (searchRequest.akademi) {
            filters.push({
                akademi: {
                    contains: searchRequest.akademi
                }
            })
        }
        // check if tipe exists
        if (searchRequest.tipe) {
            filters.push({
                tipe: {
                    contains: searchRequest.tipe
                }
            })
        }
        // check if pic exists
        if (searchRequest.pic) {
            filters.push({
                pic: {
                    contains: searchRequest.pic
                }
            })
        }
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }
        // check if kompetensi exists
        if (searchRequest.kompetensi) {
            filters.push({
                kompetensi: {
                    contains: searchRequest.kompetensi
                }
            })
        }
        // check if sub_kompetensi exists
        if (searchRequest.sub_kompetensi) {
            filters.push({
                sub_kompetensi: {
                    contains: searchRequest.sub_kompetensi
                }
            })
        }
        // check if status_training exists
        if (searchRequest.status_training) {
            filters.push({
                status_training: {
                    contains: searchRequest.status_training
                }
            })
        }
        // check if kode_job_family exists
        if (searchRequest.kode_job_family) {
            filters.push({
                kode_job_family: {
                    contains: searchRequest.kode_job_family
                }
            })
        }
        // check if kode_sub_job_family exists
        if (searchRequest.kode_sub_job_family) {
            filters.push({
                kode_sub_job_family: {
                    contains: searchRequest.kode_sub_job_family
                }
            })
        }
        const trainings = await prismaClient.training.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.training.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: trainings.map(training => toTrainingResponse(training)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}
