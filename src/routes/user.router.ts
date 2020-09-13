import { Router } from 'express';
import { JoiValidatorMiddleware } from '@shared/middlewares';

import { UserCreateController } from 'src/controllers/user-controller/user-create.controller';
import { UserValidatorSchema } from 'src/validators/user-validators/user.validator';

import { LoginAPIValidatorSchema } from 'src/validators/user-validators/login-api.validator';
import { UserLoginController } from 'src/controllers/user-controller/user-login.controller';

// Init router and path
const router = Router();

// Add sub-routes
router.post('/signup', JoiValidatorMiddleware(UserValidatorSchema), UserCreateController);
router.post('/login', JoiValidatorMiddleware(LoginAPIValidatorSchema), UserLoginController);

// Export the base-router
export default router;
