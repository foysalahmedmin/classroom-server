import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from '../user/user.controller';
import { UserValidations } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/change-password',
  auth('user', 'admin'),
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoute = router;
