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
exports.DevCreateRoute = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateRoute {
    static createRoute(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = yield util_1.Util.camelCase(yield util_1.Util.capitalizeFirstLetter(table.name));
            const tableNameLow = (yield util_1.Util.lowerFirstLetter(tableName)).toString();
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            let route = '\n//ROUTE ' + tableName + '\nimport {' + tableName + 'Controller } from "../controller/' +
                // (await Util.capitalizeFirstLetter(table.name)).replace('_',"-")  + 
                tableName + '-controller";' + '\n' +
                'apiRouter.post("/api/' + tableNameLow.toLowerCase() + 's",' + tableName + 'Controller.create)\n' +
                'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's/:' /*+ tableNameLow */ + 'Id",' + tableName + 'Controller.get)\n' +
                'apiRouter.put("/api/' + tableNameLow.toLowerCase() + 's/:' /*+ tableNameLow */ + 'Id",' + tableName + 'Controller.update)\n' +
                'apiRouter.delete("/api/' + tableNameLow.toLowerCase() + 's/:' /*+ tableNameLow*/ + 'Id", ' + tableName + 'Controller.remove)\n' +
                'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's", ' + tableName + 'Controller.search)\n' +
                'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's/id/:' + /*tableNameLow.toLowerCase() + */ 'Id", ' + tableName + 'Controller.getId)\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                route = route + 'apiRouter.get("/api/' + tableNameLow.toLowerCase() + 's/' + element.name + '/:' + /*tableNameLow.toLowerCase() +*/
                    (yield util_1.Util.capitalizeFirstLetter(element.name)).toString() + '", ' + tableName + 'Controller.get' +
                    (yield util_1.Util.capitalizeFirstLetter(element.name)).toString() + ')\n';
            }
            /*
            apiRouter.get("/api/subjobfamilys/id/:subJobFamilyId", SubJobFamilyController.getId)
            apiRouter.get("/api/subjobfamilys/kode/:subJobFamilyKode", SubJobFamilyController.getKode)
            apiRouter.get("/api/subjobfamilys/nama/:subJobFamilyNama", SubJobFamilyController.getNama)
    
            */
            return route;
        });
    }
}
exports.DevCreateRoute = DevCreateRoute;
