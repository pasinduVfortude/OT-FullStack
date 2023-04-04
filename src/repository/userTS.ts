import mongoose from 'mongoose';
import { UserModel, User } from '../models/userTS';

export class UserRepository {
  // async findUserTS(email: string) {
  async findOne(conditions: object, email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ ...conditions, email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async create(email: string, password: string, accesslevel: number): Promise<User> {
    try {
      const user = new UserModel({ email, password, accesslevel});
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async findLogin(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }
  async findUser(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }
}
