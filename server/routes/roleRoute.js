import express from 'express';
import roles from '../controllers/roleController';

const route = express.Router();
/**
 * Role routes.  CRUD operation.
 */
route.post('/', roles.createRole);
route.get('/', roles.viewAllRole);
route.delete('/:id', roles.deleteRole);

export default route;
