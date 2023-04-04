import { Request, Response } from 'express';
import {DataService} from '../service/dataTS';
import {Auth} from '../Middlewares/Auth'

export class DataController{
    private auth: Auth;
    constructor() {
        this.auth = new Auth();
    }
    async createData(req: Request, res: Response) {
        // Get the token from the request header
        const token = req.header('Authorization');
    
        // If there is no token, return an error
        // if (!token) {
        //    return res.status(401).json({ message: 'Unauthorized' });
        // }else{
            try{
            // Verify the token
                // const user = await this.auth.verifyToken(token);
                // console.log("User: "+user);
                // console.log(req.body);
                const {date} = req.body;
                const {team} = req.body;
                const {jsonObj} = req.body;
                console.log("ddd")
                console.log(date)
                console.log(team)
                console.log(jsonObj)
                console.log("ddd")
                // console.log(jsonObj)
            // check input validity
                if (!(date)) {
                    res.status(400).send("Date required");
                }else{
                    const dataServise = new DataService;
            //call createData function
           
            
                    const data = await dataServise.createData(team, date, jsonObj); 
            
                    res.json(data);
                }
            }catch(error){
                res.json({message:"Error in authenticatoin"})
            }
        // }
    }
    
    async HODApprove(req: Request, res: Response) {
        // Get the token from the request header
        const token = req.header('Authorization');
        const {date} = req.body;
        // If there is no token, return an error
        if (!token) {
           return res.status(401).json({ message: 'Unauthorized' });
        }else{
            try{
            // Verify the token
                const user = await this.auth.verifyToken(token);
                console.log("=========")
                console.log(user)
                console.log("=========")
                if(user){
                    try{
                        const dataServise = new DataService;
                        const data = await dataServise.HODApprove(date); 
                        res.json(data);
                    }catch(error){
                        console.log("Error in function call")
                    }
                }else{
                    res.status(401).json({ message: 'Unauthorized' });
                }
            //call createData function
                    

            }catch(error){
                res.json({message:"Error in authenticatoin"})
            }
        }
    }

    async GMApprove(req: Request, res: Response) {
        // Get the token from the request header
        const token = req.header('Authorization');
        const {date} = req.body;
        // If there is no token, return an error
        if (!token) {
           return res.status(401).json({ message: 'Unauthorized' });
        }else{
            try{
            // Verify the token
                const user = await this.auth.verifyToken(token);
                console.log("=========")
                console.log(user)
                console.log("=========")
                if(user){
                    try{
                        const dataServise = new DataService;
                        const data = await dataServise.GMApprove(date); 
                        res.json(data);
                    }catch(error){
                        console.log("Error in function call")
                    }
                }else{
                    res.status(401).json({ message: 'Unauthorized' });
                }
            //call createData function
                    

            }catch(error){
                res.json({message:"Error in authenticatoin"})
            }
        }
    }
    
    async ViewData(req: Request, res: Response){
        console.log("date")
        const token = req.header('Authorization');
        const {date} = req.body;
        // If there is no token, return an error
        if (!token) {
           return res.status(401).json({ message: 'Unauthorized' });
        }else{
            try{
            // Verify the token
            const user = await this.auth.verifyToken(token);
            // console.log("User: "+user);
            const uid = user._id;
            //call createData function
                try{
                  const dataServise = new DataService;
                  const data = await dataServise.FindData(date); 
                  console.log(data)
                  res.json(data);
                }catch(error){
                  console.log("Error in function call");
                }
            }catch(error){
                res.json({message:"Error in authenticatoin"});
            }
        }
    }
    
    // async ViewOneData(req: Request, res: Response){
    //     const token = req.header('Authorization');
    
    //     // If there is no token, return an error
    //     if (!token) {
    //        return res.status(401).json({ message: 'Unauthorized' });
    //     }else{
    //         try{
    //     // Verify the token
    //         const user = await this.auth.verifyToken(token);
    //         const {id} = req.body;
    //         const uid = user._id;
    //     // check input validity
    //         if (!(id)) {
    //           res.status(400).send("id required");
    //         }
    //     //call createData function
    //         try{
    //             const dataServise = new DataService;
    //           const data = await dataServise.FindSpecial(id,uid); 
    //           res.json(data);
    //         }catch(error){
    //           console.log("Error in function call")
    //         }
            
    //         }catch(error){
    //             res.json({message:"Error in authenticatoin"})
    //         }
    //     }
    // }
    
    // async Delete(req: Request, res: Response){
    //     const token = req.header('Authorization');
    
    //     // If there is no token, return an error
    //     if (!token) {
    //        return res.status(401).json({ message: 'Unauthorized' });
    //     }else{
    //         try{
    //         // Verify the token
    //             const user = await this.auth.verifyToken(token);
    //             const id = req.params.id;
    //         //call createData function
    //                 const dataServise = new DataService;
    //                 const data = await dataServise.DeleteData(id); 
    //                 res.json(data);
                

    //         }catch(error){
    //             res.json({message:"Error in authenticatoin"})
    //         }
    //     }
    // }
      
}