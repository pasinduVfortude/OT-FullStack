import multer from 'multer';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
// import {FileService} from '../service/file';
const xlsx = require('xlsx');

export class FileController {
 async uploadFile(req: Request, res: Response) {
    let name = "";
    const storage = multer.diskStorage({
        destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
            cb(null, './uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, 'OTSheet.xlsx');
            // console.log(file.originalname);
        }
    });
    
    const upload = multer({ storage: storage });
    
    try {
        // Remove all previously uploaded files
        const directory = './uploads/';
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
        
        // Save the latest uploaded file
        upload.single('file')(req, res, async (err) => {
            if (err) throw err;
            res.send('File uploaded successfully');
        });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    }

    async reloadfile(req: Request, res: Response) {
    //     const fileService = new FileService;
    //         const data = await fileService.getData(); 

    //         res.send('File uploaded successfully');
        const filePath = path.join(__dirname,'../../uploads/', 'OTSheet.xlsx');
        const file = fs.readFileSync(filePath);
        console.log(filePath)

        const workbook = xlsx.read(file);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        // console.log(workbook)
        res.json(workbook);

    }
};

export const fileController = new FileController();
