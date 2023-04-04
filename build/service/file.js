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
exports.FileService = void 0;
const file_1 = require("../repository/file");
class FileService {
    constructor() {
        this.fileRepository = new file_1.FileRepository;
    }
    createData(filename, path) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Working");
            const data = yield this.fileRepository.create(filename, path); //save data details
            return data;
        });
    }
    // async editData(id: string, uid: string, Age: number): Promise<any> { //edit data
    //     const data = await this.fileRepository.edit(id, uid, Age); //save data details
    //     return data;
    // }
    // async FindData(uid: string) { //retrieve all
    //     const data = await this.fileRepository.find(uid);
    //     return data;
    // }
    // async FindSpecial(id: string, uid: string){ //retrieve special one
    //     const data = await this.fileRepository.findSpecial(id, uid);
    //     return data;
    // }
    DeleteData(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fileRepository.delete(filename);
            return data;
        });
    }
}
exports.FileService = FileService;
