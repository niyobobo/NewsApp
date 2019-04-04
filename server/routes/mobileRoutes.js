import express from 'express';
import 'express-group-routes';

const mobileRoute = express.Router();

/**
 * Register router group to let all end point has same prefix
*/
mobileRoute.group('/api/v1', (router) => {
  router.get('/post', ()=>{});
});

export default mobileRoute;
