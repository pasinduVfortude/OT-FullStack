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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = exports.FileController = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import {FileService} from '../service/file';
const xlsx = require('xlsx');
class FileController {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = "";
            const storage = multer_1.default.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './uploads/');
                },
                filename: (req, file, cb) => {
                    cb(null, 'OTSheet.xlsx');
                    // console.log(file.originalname);
                }
            });
            const upload = (0, multer_1.default)({ storage: storage });
            try {
                // Remove all previously uploaded files
                const directory = './uploads/';
                fs_1.default.readdir(directory, (err, files) => {
                    if (err)
                        throw err;
                    for (const file of files) {
                        fs_1.default.unlink(path_1.default.join(directory, file), err => {
                            if (err)
                                throw err;
                        });
                    }
                });
                // Save the latest uploaded file
                upload.single('file')(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    res.send('File uploaded successfully');
                }));
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Server error');
            }
        });
    }
    reloadfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //     const fileService = new FileService;
            //         const data = await fileService.getData(); 
            //         res.send('File uploaded successfully');
            const filePath = path_1.default.join(__dirname, '../../uploads/', 'OTSheet.xlsx');
            const file = fs_1.default.readFileSync(filePath);
            console.log(filePath);
            const workbook = xlsx.read(file);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(sheet);
            // console.log(workbook)
            res.json(workbook);
        });
    }
}
exports.FileController = FileController;
;
exports.fileController = new FileController();
