import express from 'express';
import validate from '../validations/postValidation';
import controller from '../controllers/postController';
import auth from '../middleware/auth';

const route = express.Router();

route.get('/', auth.verifyToken, controller.getAllPost);

route.post('/create', auth.verifyToken, validate.post, controller.createPost);

route.put('/update', auth.verifyToken, validate.update, controller.updatePost);

route.put('/approve/:id', auth.verifyToken, validate.postId, controller.approvePost);

route.delete('/:id', auth.verifyToken, validate.postId, controller.deletePost);

route.get('/author/:username', auth.verifyToken, validate.author, controller.getAllByAuthor);

export default route;
