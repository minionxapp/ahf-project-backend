import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { DevUtil } from '../dev/dev-util'
export class DevCreateRoute {
    static async createRoute(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = await Util.camelCase(await Util.capitalizeFirstLetter(table.name))
        const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
        const columns = await DevUtil.getColoumn(tabelId)
        const fileName = await Util.fileNameFormat(tableName)
        let route = '\n//ROUTE ' + tableName + '\nimport {' + tableName + 'Controller } from "../controller/' +
            // (await Util.capitalizeFirstLetter(table.name)).replace('_',"-")  + 
            tableName + '-controller";' + '\n' +
            'apiRouter.post("/api/' + tableNameLow.toLowerCase() + 's",' + tableName + 'Controller.create)\n' +
            'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's/:' /*+ tableNameLow */+ 'Id",' + tableName + 'Controller.get)\n' +
            'apiRouter.put("/api/' + tableNameLow.toLowerCase() + 's/:' /*+ tableNameLow */+ 'Id",' + tableName + 'Controller.update)\n' +
            'apiRouter.delete("/api/' + tableNameLow.toLowerCase() + 's/:' /*+ tableNameLow*/ + 'Id", ' + tableName + 'Controller.remove)\n' +
            'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's", ' + tableName + 'Controller.search)\n' +

            'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's/id/:' + /*tableNameLow.toLowerCase() + */'Id", ' + tableName + 'Controller.getId)\n'

        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            route = route + 'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's/' + element.name + '/:' + /*tableNameLow.toLowerCase() +*/
                (await Util.capitalizeFirstLetter(element.name)).toString() + '", ' + tableName + 'Controller.get' +
                (await Util.capitalizeFirstLetter(element.name)).toString() + ')\n'
        }
        /*
        apiRouter.get("/api/subjobfamilys/id/:subJobFamilyId", SubJobFamilyController.getId)
        apiRouter.get("/api/subjobfamilys/kode/:subJobFamilyKode", SubJobFamilyController.getKode)
        apiRouter.get("/api/subjobfamilys/nama/:subJobFamilyNama", SubJobFamilyController.getNama)

        */
        return route
    }
}