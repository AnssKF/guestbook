import { Router } from 'express';
import { JoiValidatorMiddleware } from '@shared/middlewares';

import { UserCreateController } from 'src/controllers/user-controller/user-create.controller';
import { UserValidatorSchema } from 'src/validators/user.validator';

// Init router and path
const router = Router();

// Add sub-routes
router.post('/', JoiValidatorMiddleware(UserValidatorSchema), UserCreateController);

// Export the base-router
export default router;
