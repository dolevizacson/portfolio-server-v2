import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserCredentialsDto } from './dto/user-credentials.dto';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findOne(searchFilter: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(searchFilter, {}, { lean: true }).exec();
  }

  async create(userCredentialsDto: UserCredentialsDto): Promise<void> {
    await this.userModel.create(userCredentialsDto);
  }
}
