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
exports.DevCreateFile = void 0;
const database_1 = require("../application/database");
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
const dev_create_model_1 = require("./dev-create-model");
const dev_create_validation_1 = require("./dev-create-validation");
const dev_create_service_1 = require("./dev-create-service");
const dev_create_controller_1 = require("./dev-create-controller");
const dev_create_test_1 = require("./dev-create-test");
const dev_create_util_test_1 = require("./dev-create-util-test");
class DevCreateFile {
    static createScriptFiles(tabelId, createFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.camelCase(yield util_1.Util.capitalizeFirstLetter(table.name)));
            const tableNameCamelCase = yield util_1.Util.camelCase(tableName);
            const fileName = yield util_1.Util.capitalizeFirstLetter(yield util_1.Util.fileNameFormat(tableName));
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            const devname = "tester";
            const folderProjectBack = yield database_1.prismaClient.devDirektori.findFirst({
                where: {
                    username: devname
                }
            });
            let folder = folderProjectBack.backend; //'/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
            let file = '';
            const folderModel = 'src/model/'; //'src/model/'
            const folderValidation = 'src/validation/'; //'src/validation/'
            const folderController = 'src/controller/'; //'src/controller/'
            const folderService = 'src/service/'; //'src/service/'
            const folderTest = 'test/';
            const folderUtilTest = 'test/util/';
            const folderRoute = 'src/coba/'; //'test/'
            const folderSchema = 'src/coba/'; //'test/'
            if (createFile == 'true') {
                file = folder + folderModel + tableName + '-model.ts\n';
                util_1.Util.createFile(file, (yield dev_create_model_1.DevCreateModel.createModel(tabelId)).toString());
                file = folder + folderValidation + tableName + '-validation.ts\n\n';
                util_1.Util.createFile(file, (yield dev_create_validation_1.DevCreateValidation.createValidation(tabelId)).toString());
                file = folder + folderService + tableName + '-service.ts\n\n';
                util_1.Util.createFile(file, (yield dev_create_service_1.DevCreateService.createService(tabelId)).toString());
                file = folder + folderController + tableName + '-controller.ts\n\n';
                util_1.Util.createFile(file, (yield dev_create_controller_1.DevCreateController.createController(tabelId)).toString());
                file = folder + folderTest + tableName + '.test.ts\n\n';
                util_1.Util.createFile(file, (yield dev_create_test_1.DevCreateTest.createTest(tabelId)).toString());
                file = folder + folderUtilTest + tableName + '-util-test.ts\n\n';
                util_1.Util.createFile(file, (yield dev_create_util_test_1.DevCreateUtilTest.createUtilTest(tabelId)).toString());
            }
            file = file + "\nCREATE FILE";
            let foldercreate = '\ntouch ' + folder; // /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
            file = file + foldercreate + folderModel + tableName + '-model.ts';
            file = file + foldercreate + folderValidation + tableName + '-validation.ts';
            file = file + foldercreate + folderService + tableName + '-service.ts';
            file = file + foldercreate + folderController + tableName + '-controller.ts';
            file = file + foldercreate + folderTest + tableName + '.test.ts';
            file = file + foldercreate + folderUtilTest + tableName + '-util-test.ts';
            // file = file + folder + folderRoute + tableName + '-route.txt'
            // file = file + folder + folderSchema + tableName + '-schema.txt\n'
            file = file + "\nREMOVE FILE";
            let folderremove = '\nrm ' + folder; // /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
            file = file + folderremove + folderModel + tableName + '-model.ts';
            file = file + folderremove + folderValidation + tableName + '-validation.ts';
            file = file + folderremove + folderService + tableName + '-service.ts';
            file = file + folderremove + folderController + tableName + '-controller.ts';
            file = file + folderremove + folderTest + tableName + '.test.ts';
            file = file + folderremove + folderUtilTest + tableName + '-util-test.ts';
            // file = file + folder + folderRoute + tableName + '-route.txt'
            // file = file + folder + folderSchema + tableName + '-schema.txt\n'
            return file.toString();
        });
    }
    static createFiles(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            // const tableName = (await Util.lowerFirstLetter(table.name))
            const tableName = (yield util_1.Util.camelCase(yield util_1.Util.capitalizeFirstLetter(table.name)));
            const tableNameCamelCase = yield util_1.Util.camelCase(tableName);
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            let file = '';
            const folderModel = 'src/model/'; //'src/model/'
            const folderValidation = 'src/validation/'; //'src/validation/'
            const folderController = 'src/controller/'; //'src/controller/'
            const folderService = 'src/service/'; //'src/service/'
            const folderTest = 'test/';
            const folderUtilTest = 'test/util/';
            const folderRoute = 'src/coba/'; //'test/'
            const folderSchema = 'src/coba/'; //'test/'
            file = file + "\nCREATE FILE";
            folder = '\ntouch /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            file = file + folder + folderModel + tableName + '-model.ts';
            file = file + folder + folderValidation + tableName + '-validation.ts';
            file = file + folder + folderService + tableName + '-service.ts';
            file = file + folder + folderController + tableName + '-controller.ts';
            file = file + folder + folderTest + tableName + '.test.ts';
            file = file + folder + folderUtilTest + tableName + '-util-test.ts';
            // file = file + folder + folderRoute + tableName + '-route.txt'
            // file = file + folder + folderSchema + tableName + '-schema.txt\n'
            file = file + "\nREMOVE FILE";
            folder = '\nrm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            file = file + folder + folderModel + tableName + '-model.ts';
            file = file + folder + folderValidation + tableName + '-validation.ts';
            file = file + folder + folderService + tableName + '-service.ts';
            file = file + folder + folderController + tableName + '-controller.ts';
            file = file + folder + folderTest + tableName + '.test.ts';
            file = file + folder + folderUtilTest + tableName + '-util-test.ts';
            // file = file + folder + folderRoute + tableName + '-route.txt'
            // file = file + folder + folderSchema + tableName + '-schema.txt\n'
            // console.log(file)
            return file;
        });
    }
}
exports.DevCreateFile = DevCreateFile;
