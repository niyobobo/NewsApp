import express from 'express';
import mobileRoute from './routes/mobileRoutes';
import roleRouter from './routes/roleRoute';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mobileRoute);
app.use(roleRouter);

app.get('*', (req, res) => res.status(200).send({
  status: res.statusCode,
  message: 'Welcome to the default API route',
}));

app.listen(PORT);
