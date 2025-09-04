"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevCreateService = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateService {
    static createService(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = yield util_1.Util.camelCase(yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            let servicex = '\n//Create Service ' + tableName + '-service.ts\n\n';
            servicex = servicex + 'import { prismaClient } from "../application/database";\n' +
                'import { ResponseError } from "../error/response-error";\n' +
                'import { ' + tableName + 'Response, Create' + tableName + 'Request, Search' + tableName + 'Request, to' + tableName + 'Response, Update' + tableName + 'Request } from "../model/' +
                // (await Util.capitalizeFirstLetter(table.name)).replace('_',"-")  + 
                tableName + '-model";\n' +
                'import { Pageable } from "../model/page";\n' +
                'import { ' + tableName + 'Validation } from "../validation/' +
                //  (await Util.capitalizeFirstLetter(table.name)).replace('_',"-")  +
                tableName + '-validation";\n' +
                'import { Validation } from "../validation/validation";\n' +
                'import { User, ' + tableName + ' } from "@prisma/client";\n' +
                'export class ' + tableName + 'Service {\n' +
                '\n//CREATE \n' +
                'static async create(user: User, request: Create' + tableName + 'Request): Promise<' + tableName + 'Response> {\n' +
                'const createRequest = Validation.validate(' + tableName + 'Validation.CREATE, request)\n' +
                '//belum ada validasi bila tidak boleh sama (uniq) dalam kolom\n //Ubah dulu format datenya spt ini ::2025-03-01T00:00:00.000Z\n';
            //cek untuk tipe Date
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Date') {
                    servicex = servicex + ' let ' + element.name + ' = request.' + element.name + '! //"2025-12-31"\n' +
                        'request.' + element.name + ' =new Date(' + element.name + ')\n';
                }
            }
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.is_uniq == 'Y') {
                    servicex = servicex + 'const total' + element.name + 'Uniq = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.count({\n' +
                        'where: {\n' +
                        '    ' + element.name + ' : createRequest.' + element.name + ',\n' +
                        '//       create_by: user.username\n' +
                        '}\n' +
                        '})\n' +
                        'if(total' + element.name + 'Uniq !=0){\n' +
                        '    throw new ResponseError(400,"' + element.name + ' already axist");\n' +
                        '}\n' + '\n';
                }
            }
            servicex = servicex + 'const record = {\n' +
                '...createRequest,//dari object yang ada\n' +
                '...{ create_by: user.username }, //tambahkan username, dengan value dari object user\n' +
                ' ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user' +
                '}\n' +
                'const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.create({\n' +
                'data: record\n' +
                '})\n' +
                'return to' + tableName + 'Response(' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ')\n' +
                '}\n\n';
            servicex = servicex + '// CEK EXIST\n';
            servicex = servicex + ' //function untuk get' + tableName + ' biar bisa dipakai berulang\n' +
                'static async check' + tableName + 'Mustexist( ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + 'Id: string): Promise<' + tableName + '> {\n' +
                'const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.findFirst({\n' +
                'where: {\n' +
                '   id: ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + 'Id,\n' +
                '   //create_by: user.username\n' +
                '}\n' +
                '})\n' +
                'if (!' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ') {\n' +
                'throw new ResponseError(404, "' + tableName + ' not found")\n' +
                '}\n' +
                'return ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '\n' +
                '}\n\n';
            servicex = servicex + '// GET by Id\n';
            servicex = servicex + ' static async get(user: User,id: string): Promise<' + tableName + 'Response> {\n' +
                'const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await this.check' + tableName + 'Mustexist(id)\n' +
                'return to' + tableName + 'Response(' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ')\n' +
                '}\n\n';
            //SERVICE UPDATE
            servicex = servicex + '// UPDATE by Id\n';
            servicex = servicex + ' static async update(user: User, request: Update' + tableName + 'Request): Promise<' + tableName + 'Response> {\n' +
                ' const updateRequest = Validation.validate(' + tableName + 'Validation.UPDATE, request)\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Date') {
                    servicex = servicex + ' let ' + element.name + ' = request.' + element.name + '! //"2025-12-31"\n' +
                        'request.' + element.name + ' =new Date(' + element.name + ')\n';
                }
            }
            servicex = servicex + ' const record = {\n' +
                '...updateRequest,//dari object yang ada\n' +
                '...{ update_by: user.username },\n' +
                '...{ update_at: new Date()}  //tambahkan username, dengan value dari object user\n' +
                '}\n' +
                ' //cek ' + tableName + ' ada atau tidak\n' +
                ' await this.check' + tableName + 'Mustexist(request.id)\n' +
                ' const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.update({\n' +
                '    where: {\n' +
                '       id: updateRequest.id,\n' +
                '       create_by: user.username\n' +
                '  },\n' +
                '  data: record\n' +
                ' })\n' +
                ' return to' + tableName + 'Response(' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ')\n' +
                '}\n';
            servicex = servicex + "//REMOVE by Id\n";
            servicex = servicex + ' static async remove(user: User, id: string): Promise<' + tableName + 'Response> {\n' +
                ' await this.check' + tableName + 'Mustexist( id)\n' +
                ' const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.delete({\n' +
                ' where: {\n' +
                ' id: id,\n' +
                ' create_by: user.username\n' +
                ' }\n' +
                ' })\n' +
                ' return ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '\n' +
                ' }\n';
            servicex = servicex + "//SEARCH \n";
            servicex = servicex + ' static async search(user: User, request: Search' + tableName + 'Request) : Promise<Pageable<' + tableName + 'Response>> {\n' +
                ' const searchRequest = Validation.validate(' + tableName + 'Validation.SEARCH, request);\n' +
                ' const skip = (searchRequest.page - 1) * searchRequest.size;\n' +
                ' const filters = [];\n' +
                ' // check if name exists\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    servicex = servicex + ' // check if ' + element.name + ' exists\n' +
                        'if(searchRequest.' + element.name + '){\n' +
                        'filters.push({\n' +
                        '   ' + element.name + ': {\n' +
                        '      contains: searchRequest.' + element.name + '\n' +
                        ' }\n' +
                        '})\n' +
                        '}\n';
                }
            }
            servicex = servicex + 'const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + 's = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.findMany({\n' +
                'where: {\n' +
                '  // username: user.username,\n' +
                '  AND: filters\n' +
                '},\n' +
                'take: searchRequest.size,\n' +
                'skip: skip\n' +
                '});\n' +
                'const total = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.count({\n' +
                '    where: {\n' +
                '        create_by: user.username,\n' +
                '        AND: filters\n' +
                '    },\n' +
                '})\n' +
                'return {\n' +
                '    data: ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + 's.map(' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() +
                ' => to' + tableName + 'Response(' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ')),\n' +
                '    paging: {\n' +
                '        current_page: searchRequest.page,\n' +
                '        total_page: Math.ceil(total / searchRequest.size),\n' +
                '        size: searchRequest.size,\n' +
                '        total_rows:total\n' +
                '    }\n' +
                '}\n\n';
            servicex = servicex + '\n}\n';
            servicex = servicex +
                '//GET BY KOLOM //bikin berdasarka kolom yang ada\n' +
                '    //By ID (buat static--> hanya menghasilkan 1 row)\n' +
                '    static async getId(user: User, id: string): Promise<' + ((tableName)) + 'Response> {\n' +
                '        const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.findFirst({\n' +
                '            where: {\n' +
                '                id: id,\n' +
                '                create_by:user.username\n' +
                '            }\n' +
                '        })\n' +
                '        if (!' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ') {\n' +
                '            throw new ResponseError(404, "Data not found")\n' +
                '        }\n' +
                '        return ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '\n' +
                '    }' +
                '// console.log(servicex)\n\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                servicex = servicex +
                    '  //By kolom ' + element.name + ' (menyesuaikan kolom yang ada-->hasil bisa saja lebih dari 1 row)\n' +
                    ' static async get' + (yield util_1.Util.capitalizeFirstLetter(element.name)).toString() + '(user: User, ' +
                    element.name + ': ';
                if (element.type == 'Number') {
                    servicex = servicex + 'number';
                }
                else {
                    servicex = servicex + 'string';
                }
                //  'string'+
                servicex = servicex +
                    '): Promise<Array<' + tableName + 'Response>> {\n' +
                    '     const ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '.findMany({\n' +
                    '         where: {\n' +
                    '             ' + element.name + ': ' + element.name + ',\n' +
                    '               create_by:user.username\n' +
                    '         }\n' +
                    '     })\n' +
                    '     if (!' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + ') {\n' +
                    '         throw new ResponseError(404, "Data not found")\n' +
                    '     }\n' +
                    '     return ' + (yield util_1.Util.lowerFirstLetter(tableName)).toString() + '\n' +
                    ' }\n';
            }
            servicex = servicex + '}\n';
            return servicex;
        });
    }
}
exports.DevCreateService = DevCreateService;
