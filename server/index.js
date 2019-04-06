import express from 'express';
import mobileRoute from './routes/mobileRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mobileRoute);

app.get('*', (req, res) => res.status(200).send({
  status: res.statusCode,
  message: 'Welcome to the default API route',
}));

app.listen(PORT);
