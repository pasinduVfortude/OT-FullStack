// data.ts

import mongoose, { Model, Document, Date } from 'mongoose';

export interface Data extends Document {
  team: string;
  date: string;
  employees: Array<object>;
  HOD: boolean;
  GM: boolean;
}


// define the schema for the User model
const dataSchema = new mongoose.Schema({
    team: {
        type: String,
      },
      date: {
        type: String,
      },
      employees: {
        type: Array,
      },
      HOD: {
        type: Boolean,
      },
      GM: {
        type: Boolean
      }

});

export const DataModel: Model<Data> = mongoose.model<Data>('Data', dataSchema);
