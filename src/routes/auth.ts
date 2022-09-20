import { Router } from 'express';
import Controller from '../controllers/AuthController';
import authSchema from '../reqSchemas/authSchema';
import { validate } from '../middlewares/requestValidator';

const router = Router({ mergeParams: true });
const controller = new Controller();

router.post('/register', validate(authSchema.register), controller.register);
router.post('/login', validate(authSchema.login), controller.login);

export default router;
