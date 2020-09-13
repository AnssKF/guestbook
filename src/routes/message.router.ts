import { Router } from 'express';
import { JoiValidatorMiddleware, IsLoggedInMiddleware } from '@shared/middlewares';

import { MessageCreateAPIValidatorSchema } from 'src/validators/message-validators/message-create-api.validator';
import { MessageCreateController } from 'src/controllers/message-controller/message-create.controller';


// Init router and path
const router = Router();

// Add sub-routes
router.post('/', IsLoggedInMiddleware, JoiValidatorMiddleware(MessageCreateAPIValidatorSchema), MessageCreateController);

// Export the base-router
export default router;
