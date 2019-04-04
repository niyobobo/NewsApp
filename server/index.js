import express from 'express';
import mobileRoute from './routes/mobileRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mobileRoute);

app.listen(PORT);
