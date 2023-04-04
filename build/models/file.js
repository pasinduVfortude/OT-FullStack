"use strict";
// file.tsmodel file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// define the schema for the User model
const fileSchema = new mongoose_1.default.Schema({
    filename: {
        type: String,
    },
    path: {
        type: String,
    }
});
exports.FileModel = mongoose_1.default.model('File', fileSchema);
