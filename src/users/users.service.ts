import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { DeleteResult, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  static SALT_ROUNDS = 10;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {};
  
  /**
   * Create a new user
   * 
   * @param input CreateUserInput
   * @returns Created user
   */
  async create(input: CreateUserInput) {
    const username = input.username;
    const password = input.password;

    if (!username || !password) {
        throw new BadRequestException("Username or password is missing");
    }

    const exists = await this.findByName(username);

    if (exists) {
        throw new BadRequestException("Username already exists");
    }

    // Replace the password with its correspond bcrypt hash.
    input.password = await bcrypt.hash(password, UsersService.SALT_ROUNDS);

    const user = new this.userModel(input);
    return await user.save();
  }
  
  /**
   * Fetch all users
   * 
   * @returns All users
   */
  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().select({ password: 0 }).exec();
  }

  /**
   * Fetch a user by its id
   * 
   * @param id
   * @returns User
   */
  async findOne(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  /**
   * Fetch a user by its name
   * 
   * @param username Username
   * @returns User
   */
  async findByName(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({username}).exec();
  }

  /**
   * Update one user
   * 
   * @param id User id
   * @param updateUserInput UserUpdateDTO
   * @returns updated user
   */
  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.userModel.findOneAndUpdate({_id: id}, updateUserInput);
  }

  /**
   * Delete one user
   * 
   * @param id User id
   * @returns deleted user
   */
  async remove(id: number): Promise<DeleteResult | null> {
    return await this.userModel.deleteOne({_id: id});
  }
}
