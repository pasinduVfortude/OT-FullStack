import {DataModel, Data } from "../models/dataTS";

const mongoose = require('mongoose');

export class DataRepository {
    async create(team: string, date: string, employees:string): Promise<Data> {
        console.log("ok")
        console.log(team, date, employees)        
        console.log("ok")
        const data = new DataModel({ team, date, employees, HOD:false, GM:false});
        try {
            await data.save();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async HODApprove(date: string) { //edit
        try {
              const data = await DataModel.updateMany({ date: date }, 
              { $set: { HOD: true } }
              // ,
              // (err: any, result: any) => {
              //   if (err) {
              //     console.log(err);
              //   } else {
              //     console.log(result);
              //   }
              // }

              )          
        //   if (!data) {
        //     throw new Error('Data not found');
        //   }
        //   data.Age = Age;
        //   console.log("Data "+data)
          // await data.save();
          return data;
        } catch (error) {
          console.log("Error in edit repo")
          throw error;
        }}
      // }}

      async GMApprove(date: string) { //edit
        try {
              const data = await DataModel.updateMany({ date: date }, 
              { $set: { GM: true } }
              // ,
              // (err: any, result: any) => {
              //   if (err) {
              //     console.log(err);
              //   } else {
              //     console.log(result);
              //   }
              // }

              )          
        //   if (!data) {
        //     throw new Error('Data not found');
        //   }
        //   data.Age = Age;
        //   console.log("Data "+data)
          // await data.save();
          return data;
        } catch (error) {
          console.log("Error in edit repo")
          throw error;
        }}
    
      async find(date: string) { //retrieve all
        try{
            const data = await DataModel.find({date });
            console.log("dat55: "+date)
            return data;
          } catch (error) {
            throw error;
          }
      }
    
      // async findSpecial(id: string, UID: string){ //retrieve special one
      //   try{
      //     const data = await DataModel.findOne({ _id:id, UID:UID });
      //     console.log(data)
      //     return data;
      //   }catch (error) {
      //     throw error;
      //   }
      // }
    
      // async delete(id: string) { //delete special one
      //   try {
      //       await DataModel.findByIdAndDelete(id);
      //       } catch (error) {
      //       throw error;
      //       }
      // }
}