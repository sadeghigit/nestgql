import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    return await this.userModel.create(createUserInput);
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().lean();
  }

  async getUser(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async getUsersCount(): Promise<number> {
    return await this.userModel.countDocuments();
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<boolean> {
    const result = await this.userModel.updateOne({ _id: id }, updateUserInput);
    return result.modifiedCount === 1;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
