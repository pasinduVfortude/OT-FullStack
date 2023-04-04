import { Request, Response } from 'express';
import { UserService } from '../service/userTS';

export class UserController {

    // private userService: UserService;

    // constructor() {
    // this.userService = new UserService();
    // }

    async Register(req: Request, res: Response) {
        const {email, password, accesslevel} = req.body;
        // console.log("triggered")
        // check input validity
        console.log((email && password))
        if (!(email && password && accesslevel)) {
            res.status(400).send("Both email and password required");
        }else{
            const userService = new UserService();
            const user = await userService.createUser(email, password, accesslevel);
            res.json(user);
        }
    }


    async Login(req: Request, res: Response) {
        const {email, password} = req.body;
        console.log("email: "+email + "Password" + password);
        // check input validity
        if (!(email && password)) {
            res.status(400).send("Both email and password required");
        }else{
            const userService = new UserService();
            const user = await userService.LoginUser(email, password);

            if(user !== null){
                const access = user.accesslevel.toString(); // convert accesslevel to string
                console.log("---------");
                console.log(access)
                console.log("---------")
                res.status(200).json(user);
                console.log("success")
            } else {
                res.status(401).json("Invalid Credentials");
            }

        }
    }
}

export const userController = new UserController();



