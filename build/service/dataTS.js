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
exports.DataService = void 0;
const dataTS_1 = require("../repository/dataTS");
class DataService {
    constructor() {
        this.dataRepository = new dataTS_1.DataRepository;
    }
    createData(team, date, employees) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Working");
            console.log(employees);
            console.log(team);
            console.log(date);
            console.log("Working");
            const data = yield this.dataRepository.create(team, date, employees); //save data details
            return data;
        });
    }
    HODApprove(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.dataRepository.HODApprove(date); //save data details
            return data;
        });
    }
    GMApprove(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.dataRepository.GMApprove(date); //save data details
            return data;
        });
    }
    FindData(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.dataRepository.find(date);
            // console.log("Data: "+data)
            return data;
        });
    }
}
exports.DataService = DataService;
