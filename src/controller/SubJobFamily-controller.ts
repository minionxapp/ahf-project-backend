//Create Controller SubJobFamily-controller.ts

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateSubJobFamilyRequest, SearchSubJobFamilyRequest, UpdateSubJobFamilyRequest } from "../model/SubJobFamily-model";
import { SubJobFamilyService } from "../service/SubJobFamily-service";
import { number } from "zod";
export class SubJobFamilyController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateSubJobFamilyRequest = req.body as CreateSubJobFamilyRequest;
            const response = await SubJobFamilyService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const subJobFamilyId = (req.params.subJobFamilyId)
            const response = await SubJobFamilyService.get(req.user!, subJobFamilyId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateSubJobFamilyRequest = req.body as UpdateSubJobFamilyRequest;
            request.id = (req.params.subJobFamilyId)
            const response = await SubJobFamilyService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const subJobFamilyId = (req.params.subJobFamilyId)
            const response = await SubJobFamilyService.remove(req.user!, subJobFamilyId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchSubJobFamilyRequest = {
                kode: req.query.kode as string,
                nama: req.query.nama as string,
                kode_jf: req.query.kode_jf as string,
                nama_jf: req.query.nama_jf as string,
                aktive: req.query.aktive as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await SubJobFamilyService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    //for GET 
    //ID
    static async getId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.subJobFamilyId)
            const response = await SubJobFamilyService.getId(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //kode
    static async getKode(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.subJobFamilyKode)
            const response = await SubJobFamilyService.getKode(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //nama
    static async getNama(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.subJobFamilyNama)
            const response = await SubJobFamilyService.getNama(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //kode_jf
    static async getKode_jf(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.subJobFamilyKode_jf)
            const response = await SubJobFamilyService.getKode_jf(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //nama_jf
    static async getNama_jf(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.subJobFamilyNama_jf)
            const response = await SubJobFamilyService.getNama_jf(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //aktive
    static async getAktive(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = (req.params.subJobFamilyAktive)
            const response = await SubJobFamilyService.getAktive(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    //urutan
    static async getUrutan(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const param = Number(req.params.subJobFamilyUrutan)
            const response = await SubJobFamilyService.getUrutan(req.user!, param)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
