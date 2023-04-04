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
exports.DataRepository = void 0;
const dataTS_1 = require("../models/dataTS");
const mongoose = require('mongoose');
class DataRepository {
    create(team, date, employees) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ok");
            console.log(team, date, employees);
            console.log("ok");
            const data = new dataTS_1.DataModel({ team, date, employees, HOD: false, GM: false });
            try {
                yield data.save();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    HODApprove(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dataTS_1.DataModel.updateMany({ date: date }, { $set: { HOD: true } }
                // ,
                // (err: any, result: any) => {
                //   if (err) {
                //     console.log(err);
                //   } else {
                //     console.log(result);
                //   }
                // }
                );
                //   if (!data) {
                //     throw new Error('Data not found');
                //   }
                //   data.Age = Age;
                //   console.log("Data "+data)
                // await data.save();
                return data;
            }
            catch (error) {
                console.log("Error in edit repo");
                throw error;
            }
        });
    }
    // }}
    GMApprove(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dataTS_1.DataModel.updateMany({ date: date }, { $set: { GM: true } }
                // ,
                // (err: any, result: any) => {
                //   if (err) {
                //     console.log(err);
                //   } else {
                //     console.log(result);
                //   }
                // }
                );
                //   if (!data) {
                //     throw new Error('Data not found');
                //   }
                //   data.Age = Age;
                //   console.log("Data "+data)
                // await data.save();
                return data;
            }
            catch (error) {
                console.log("Error in edit repo");
                throw error;
            }
        });
    }
    find(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dataTS_1.DataModel.find({ date });
                console.log("dat55: " + date);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DataRepository = DataRepository;
