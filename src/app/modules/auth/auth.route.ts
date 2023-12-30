import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from '../user/user.controller';
import { UserValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

export const AuthRoute = router;
