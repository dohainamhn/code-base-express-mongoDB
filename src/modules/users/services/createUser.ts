import { Response } from 'express';
import * as yup from 'yup';
import { ExpressRequest } from '../../../interfaces/ExpressRequest';
import { createUserPayload } from '../interfaces/createUserPayload';
import { userRepository } from '../repository';

export const createUser = async (
  req: ExpressRequest<createUserPayload>,
  res: Response
) => {
  try {
    const { name } = req.body;
    // validate
    const yupSchema = yup.object().shape({
      name: yup.string().required(),
    });
    await yupSchema.validate(req.body);
    // create data
    const updatedUser = await userRepository.create(req.body);
    res.status(201).json(updatedUser)
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || 'Internal server error');
  }
};
