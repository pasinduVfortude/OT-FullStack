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
exports.Auth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const userTS_1 = require("../repository/userTS");
const secret = "een2jjnJNIUEJFNSUDFJNDSnkjs";
class Auth {
    constructor() {
        this.userRepository = new userTS_1.UserRepository();
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove "Bearer" from the token string
            const Token = token.replace('Bearer ', '');
            try {
                // Verify the JWT
                const decoded = jwt.verify(Token, secret);
                const email = decoded.email;
                // console.log(email);
                // Check if the user still exists in the database
                const user = yield this.userRepository.findUser(email);
                if (!user) {
                    throw new Error("User not found");
                }
                else {
                    console.log("verified");
                    // Return the user
                    return user;
                }
            }
            catch (err) {
                // If the JWT is invalid or has been tampered with, an exception will be thrown
                console.error(err);
            }
        });
    }
}
exports.Auth = Auth;
