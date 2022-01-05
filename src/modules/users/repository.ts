import mongoose from 'mongoose';
import { User } from './interfaces/User';
import { UserRepository } from './interfaces/UserRepository';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model('User', userSchema);

const userPopulate = [];

export const userRepository: UserRepository = {
  create: async (payload: User) => {
    return (await userModel.create(payload)) as User;
  },
  get: async (filters: Partial<User>) => {
    return (await userModel
      .find({ ...filters })
      .populate(userPopulate)
      .lean()) as User;
  },
};
