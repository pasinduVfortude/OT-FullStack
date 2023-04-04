import mongoose from 'mongoose';
import { FileModel, File } from '../models/file';

export class FileRepository {
    delete(filename: string) {
        throw new Error("Method not implemented.");
    }
    // async findUserTS(email: string) {
    async create(filename: string, path: string): Promise<File> {
      try {
        const file = new FileModel({ filename, path });
        await file.save();
        return file;
      } catch (error) {
        throw error;
      }
    }

    
  }
  