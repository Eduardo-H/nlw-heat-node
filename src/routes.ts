import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { CreatePrivateChatController } from './controllers/CreatePrivateChatController';
import { CreatePrivateMessageController } from './controllers/CreatePrivateMessageController';
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController';
import { GetUserChatsController } from './controllers/GetUserChatsController';
import { UserProfileController } from './controllers/UserProfileController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle);

router.get('/messages/last-3', new GetLast3MessagesController().handle);

router.get('/profile', ensureAuthenticated, new UserProfileController().handle);

router.post('/chat', ensureAuthenticated, new CreatePrivateChatController().handle);

router.get('/chats', ensureAuthenticated, new GetUserChatsController().handle);

router.post('/chat/messages', ensureAuthenticated, new CreatePrivateMessageController().handle);

export { router };