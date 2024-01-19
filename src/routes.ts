import { Router } from 'express';
import { authMiddleware } from './infra/middlewares/auth.middleware';
import { checkUserIdMatch } from './infra/middlewares/check-user-id-match.middleware';
import { can } from './infra/middlewares/permissions.middleware';
import multerConfig from './infra/config/multer';
import multer from 'multer';

import {
  authController,
  userController,
  eventController,
  userAccountController,
  paymentController,
  ticketController,
  permissionController,
  userPermissionController,
  eventPhotoController
} from './infra/shared/container/injection';

const router = Router();
router.post('/login', authController.login);
router.post('/users', userController.create);
router.get('/users/:id', authMiddleware, userController.findById);
router.patch(
  '/users/:id/picture',
  [multer(multerConfig).single('file'), authMiddleware],
  userController.update
);

router.get(
  '/user-accounts/:userId',
  [authMiddleware, checkUserIdMatch],
  userAccountController.findAll
);
router.post('/user-accounts', authMiddleware, userAccountController.create);

router.get('/events', eventController.findAll);
router.post(
  '/events',
  [authMiddleware, checkUserIdMatch, can('admin')],
  eventController.create
);
router.get('/events/:id', authMiddleware, eventController.findById);
router.post(
  '/event-photos/:id/photos',
  [authMiddleware, multer(multerConfig).array('file')],
  eventPhotoController.create
);

router.post('/payments', [authMiddleware], paymentController.create);

router.get(
  '/tickets/:userId',
  [authMiddleware, checkUserIdMatch],
  ticketController.get
);

router.post('/permissions', authMiddleware, permissionController.create);
router.post(
  '/user-permissions',
  authMiddleware,
  userPermissionController.create
);

export default router;
