"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserService = void 0;
const userTS_1 = require("../repository/userTS");
const jwt = require('jsonwebtoken');
const bcrypt = __importStar(require("bcrypt"));
const secret = "een2jjnJNIUEJFNSUDFJNDSnkjs";
class UserService {
    constructor() {
        this.userRepository = new userTS_1.UserRepository();
    }
    createUser(email, password, accesslevel) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.userRepository.findUser(email);
            console.log("Repo returned: " + check);
            if (check) {
                return "User already exists";
            }
            else {
                const lowercaseEmail = email.toLowerCase();
                const encryPassword = yield bcrypt.hash(password, 10); //hashing password
                const user = yield this.userRepository.create(lowercaseEmail, encryPassword, accesslevel); //save user details
                //token generation
                const token = jwt.sign({ user_id: user._id, email }, secret, {
                    expiresIn: "48h",
                });
                // save user token
                user.token = token;
                return user;
            }
        });
    }
    LoginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findLogin(email);
            if (user && (yield bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign({ user_id: user._id, email }, secret, {
                    expiresIn: "48h",
                });
                // save user token
                user.token = token;
                // console.log(user)
                return user;
                // user
            }
            else {
                return null;
            }
            // res.status(400).send("Invalid Credentials");
        });
    }
}
exports.UserService = UserService;
