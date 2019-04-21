import express from 'express';
import validate from '../validations/userValidation';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/create', validate.user, userController.signUp);

router.post('/login', validate.login, userController.login);

router.post('/forgetPassword', validate.email, userController.forgetPassword);

router.post('/resetPassword', validate.reset, userController.resetPassord);

export default router;
