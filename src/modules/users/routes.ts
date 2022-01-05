import { Router } from 'express';
import { createUser } from './services/createUser';
import { findManyUser } from './services/findManyUser';

export const routes = (path: string, router: Router) => {
  router.post(path + '/', createUser);
  router.get(path + '/', findManyUser);
};
