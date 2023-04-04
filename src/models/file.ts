// file.tsmodel file

import mongoose, { Model, Document } from 'mongoose';

export interface File extends Document {
  filename: string;
  path: string;
}


// define the schema for the User model
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    path: {
        type: String,
    }
});

export const FileModel: Model<File> = mongoose.model<File>('File', fileSchema);
