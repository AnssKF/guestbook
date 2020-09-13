import { Router } from 'express';
import { JoiValidatorMiddleware, IsLoggedInMiddleware } from '@shared/middlewares';

import { MessageCreateAPIValidatorSchema } from 'src/validators/message-validators/message-create-api.validator';
import { MessageCreateController } from 'src/controllers/message-controller/message-create.controller';
import { MessageUpdateController } from 'src/controllers/message-controller/message-update.controller';
import { MessageDeleteController } from 'src/controllers/message-controller/message-delete.controller';

import { MessageListFetchController } from 'src/controllers/message-controller/message-fetch.controller';

import { MessageReplyAPIValidatorSchema } from 'src/validators/message-validators/message-reply-api.validator';
import { MessageReplyController } from 'src/controllers/message-controller/message-reply.controller';


// Init router and path
const router = Router();

// Add sub-routes
router.get('/', MessageListFetchController);
router.post('/', IsLoggedInMiddleware, JoiValidatorMiddleware(MessageCreateAPIValidatorSchema), MessageCreateController);
router.put('/:id', IsLoggedInMiddleware, JoiValidatorMiddleware(MessageCreateAPIValidatorSchema), MessageUpdateController);
router.delete('/:id', IsLoggedInMiddleware, MessageDeleteController);
router.post('/reply/:id', IsLoggedInMiddleware, JoiValidatorMiddleware(MessageReplyAPIValidatorSchema), MessageReplyController);

// Export the base-router
export default router;
