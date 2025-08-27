import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { DevUtil } from '../dev/dev-util'
import { DevCreateModel } from "./dev-create-model";
import { DevCreateValidation } from "./dev-create-validation";
import { DevCreateService } from "./dev-create-service";
import { DevCreateController } from "./dev-create-controller";
import { DevCreateTest } from "./dev-create-test";
import { DevCreateRoute } from "./dev-create-route";
import { DevCreateUtilTest } from "./dev-create-util-test";
import { DevCreateSchema } from "./dev-create-schema";
import { User } from "@prisma/client";

export class DevCreateFile {
    static async createScriptFiles(tabelId: number, createFile: string): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = (await Util.camelCase(await Util.capitalizeFirstLetter(table.name)))
        
        const tableNameCamelCase = await Util.camelCase(tableName)
        const fileName = await Util.capitalizeFirstLetter(await Util.fileNameFormat(tableName))
        const columns = await DevUtil.getColoumn(tabelId)
        const devname = "tester"
        const folderProjectBack = await prismaClient.devDirektori.findFirst({
            where: {
                username: devname
            }
        })
        let folder = folderProjectBack!.backend//'/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        let file = ''
        const folderModel = 'src/model/'//'src/model/'
        const folderValidation = 'src/validation/'//'src/validation/'
        const folderController = 'src/controller/'//'src/controller/'
        const folderService = 'src/service/'//'src/service/'
        const folderTest = 'test/'
        const folderUtilTest = 'test/util/'
        const folderRoute = 'src/coba/'//'test/'
        const folderSchema = 'src/coba/'//'test/'


        if (createFile == 'true') {
            
            file = folder + folderModel + tableName + '-model.ts\n'
            Util.createFile(file, (await DevCreateModel.createModel(tabelId)).toString())

            file = folder + folderValidation + tableName + '-validation.ts\n\n'
            Util.createFile(file, (await DevCreateValidation.createValidation(tabelId)).toString())

            file = folder + folderService + tableName + '-service.ts\n\n'
            Util.createFile(file, (await DevCreateService.createService(tabelId)).toString())

            file = folder + folderController + tableName + '-controller.ts\n\n'
            Util.createFile(file, (await DevCreateController.createController(tabelId)).toString())

            file = folder + folderTest + tableName + '.test.ts\n\n'
            Util.createFile(file, (await DevCreateTest.createTest(tabelId)).toString())

            file = folder + folderUtilTest + tableName + '-util-test.ts\n\n'
            Util.createFile(file, (await DevCreateUtilTest.createUtilTest(tabelId)).toString())

        }

       
        file = file + "\nCREATE FILE"
        let foldercreate = '\ntouch '+folder// /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'

        file = file + foldercreate + folderModel + tableName + '-model.ts'
        file = file + foldercreate + folderValidation + tableName + '-validation.ts'
        file = file + foldercreate + folderService + tableName + '-service.ts'
        file = file + foldercreate + folderController + tableName + '-controller.ts'
        file = file + foldercreate + folderTest + tableName + '.test.ts'
        file = file + foldercreate + folderUtilTest + tableName + '-util-test.ts'
        // file = file + folder + folderRoute + tableName + '-route.txt'
        // file = file + folder + folderSchema + tableName + '-schema.txt\n'

        file = file + "\nREMOVE FILE"
        let folderremove = '\nrm '+folder// /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folderremove + folderModel + tableName + '-model.ts'
        file = file + folderremove + folderValidation + tableName + '-validation.ts'
        file = file + folderremove + folderService + tableName + '-service.ts'
        file = file + folderremove + folderController + tableName + '-controller.ts'
        file = file + folderremove + folderTest + tableName + '.test.ts'
        file = file + folderremove + folderUtilTest + tableName + '-util-test.ts'
        // file = file + folder + folderRoute + tableName + '-route.txt'
        // file = file + folder + folderSchema + tableName + '-schema.txt\n'

        return file.toString()

    }



    static async createFiles(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        // const tableName = (await Util.lowerFirstLetter(table.name))
        const tableName = (await Util.camelCase(await Util.capitalizeFirstLetter(table.name)))
        const tableNameCamelCase = await Util.camelCase(tableName)
        const fileName = await Util.fileNameFormat(tableName)
        const columns = await DevUtil.getColoumn(tabelId)

        let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        let file = ''
        const folderModel = 'src/model/'//'src/model/'
        const folderValidation = 'src/validation/'//'src/validation/'
        const folderController = 'src/controller/'//'src/controller/'
        const folderService = 'src/service/'//'src/service/'
        const folderTest = 'test/'
        const folderUtilTest = 'test/util/'
        const folderRoute = 'src/coba/'//'test/'
        const folderSchema = 'src/coba/'//'test/'


        file = file + "\nCREATE FILE"
        folder = '\ntouch /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + folderModel + tableName + '-model.ts'
        file = file + folder + folderValidation + tableName + '-validation.ts'
        file = file + folder + folderService + tableName + '-service.ts'
        file = file + folder + folderController + tableName + '-controller.ts'
        file = file + folder + folderTest + tableName + '.test.ts'
        file = file + folder + folderUtilTest + tableName + '-util-test.ts'
        // file = file + folder + folderRoute + tableName + '-route.txt'
        // file = file + folder + folderSchema + tableName + '-schema.txt\n'

        file = file + "\nREMOVE FILE"
        folder = '\nrm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + folderModel + tableName + '-model.ts'
        file = file + folder + folderValidation + tableName + '-validation.ts'
        file = file + folder + folderService + tableName + '-service.ts'
        file = file + folder + folderController + tableName + '-controller.ts'
        file = file + folder + folderTest + tableName + '.test.ts'
        file = file + folder + folderUtilTest + tableName + '-util-test.ts'
        // file = file + folder + folderRoute + tableName + '-route.txt'
        // file = file + folder + folderSchema + tableName + '-schema.txt\n'
        // console.log(file)

        return file

    }
}


