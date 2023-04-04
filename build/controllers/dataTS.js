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
exports.DataController = void 0;
const dataTS_1 = require("../service/dataTS");
const Auth_1 = require("../Middlewares/Auth");
class DataController {
    constructor() {
        this.auth = new Auth_1.Auth();
    }
    createData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the token from the request header
            const token = req.header('Authorization');
            // If there is no token, return an error
            // if (!token) {
            //    return res.status(401).json({ message: 'Unauthorized' });
            // }else{
            try {
                // Verify the token
                // const user = await this.auth.verifyToken(token);
                // console.log("User: "+user);
                // console.log(req.body);
                const { date } = req.body;
                const { team } = req.body;
                const { jsonObj } = req.body;
                console.log("ddd");
                console.log(date);
                console.log(team);
                console.log(jsonObj);
                console.log("ddd");
                // console.log(jsonObj)
                // check input validity
                if (!(date)) {
                    res.status(400).send("Date required");
                }
                else {
                    const dataServise = new dataTS_1.DataService;
                    //call createData function
                    const data = yield dataServise.createData(team, date, jsonObj);
                    res.json(data);
                }
            }
            catch (error) {
                res.json({ message: "Error in authenticatoin" });
            }
            // }
        });
    }
    HODApprove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the token from the request header
            const token = req.header('Authorization');
            const { date } = req.body;
            // If there is no token, return an error
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                try {
                    // Verify the token
                    const user = yield this.auth.verifyToken(token);
                    console.log("=========");
                    console.log(user);
                    console.log("=========");
                    if (user) {
                        try {
                            const dataServise = new dataTS_1.DataService;
                            const data = yield dataServise.HODApprove(date);
                            res.json(data);
                        }
                        catch (error) {
                            console.log("Error in function call");
                        }
                    }
                    else {
                        res.status(401).json({ message: 'Unauthorized' });
                    }
                    //call createData function
                }
                catch (error) {
                    res.json({ message: "Error in authenticatoin" });
                }
            }
        });
    }
    GMApprove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the token from the request header
            const token = req.header('Authorization');
            const { date } = req.body;
            // If there is no token, return an error
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                try {
                    // Verify the token
                    const user = yield this.auth.verifyToken(token);
                    console.log("=========");
                    console.log(user);
                    console.log("=========");
                    if (user) {
                        try {
                            const dataServise = new dataTS_1.DataService;
                            const data = yield dataServise.GMApprove(date);
                            res.json(data);
                        }
                        catch (error) {
                            console.log("Error in function call");
                        }
                    }
                    else {
                        res.status(401).json({ message: 'Unauthorized' });
                    }
                    //call createData function
                }
                catch (error) {
                    res.json({ message: "Error in authenticatoin" });
                }
            }
        });
    }
    ViewData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("date");
            const token = req.header('Authorization');
            const { date } = req.body;
            // If there is no token, return an error
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                try {
                    // Verify the token
                    const user = yield this.auth.verifyToken(token);
                    // console.log("User: "+user);
                    const uid = user._id;
                    //call createData function
                    try {
                        const dataServise = new dataTS_1.DataService;
                        const data = yield dataServise.FindData(date);
                        console.log(data);
                        res.json(data);
                    }
                    catch (error) {
                        console.log("Error in function call");
                    }
                }
                catch (error) {
                    res.json({ message: "Error in authenticatoin" });
                }
            }
        });
    }
}
exports.DataController = DataController;
