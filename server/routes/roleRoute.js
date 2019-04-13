import express from 'express';
import roles from '../controllers/roleController';

const route = express.Router();
/**
 * Role routes.  CRUD operation.
 */
route.post('/api/v1/role', roles.createRole);
route.get('/api/v1/role', roles.viewAllRole);
route.delete('/api/v1/role/:id', roles.deleteRole);

export default route;
