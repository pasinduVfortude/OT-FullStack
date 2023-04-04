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
exports.UserRepository = void 0;
const userTS_1 = require("../models/userTS");
class UserRepository {
    // async findUserTS(email: string) {
    findOne(conditions, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userTS_1.UserModel.findOne(Object.assign(Object.assign({}, conditions), { email }));
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(email, password, accesslevel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new userTS_1.UserModel({ email, password, accesslevel });
                yield user.save();
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userTS_1.UserModel.findOne({ email });
            return user;
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userTS_1.UserModel.findOne({ email });
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
