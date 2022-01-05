import { Request, Response } from 'express';
import { userRepository } from '../repository';

export const findManyUser = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    // create data
    const response = await userRepository.get(query);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || 'Internal server error');
  }
};
