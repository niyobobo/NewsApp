import express from 'express';
import mobileRoute from './mobileRoutes';
import roleRouter from './roleRoute';
import userRoute from './userRoute';
import postRoute from './postRoute';

const route = express.Router();

route.use('/api/v1/role', roleRouter);
route.use('/api/v1/auth', userRoute);
route.use('/api/v1/mobile', mobileRoute);
route.use('/api/v1/post', postRoute);

export default route;
