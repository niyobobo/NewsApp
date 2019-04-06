import express from 'express';
import roles from '../controllers/roleController';

const route = express.Router();

route.post('/api/v1/role', roles.createRole);

export default route;
