import express from 'express';
import route from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

app.get('/', (req, res) => res.status(200).send({
  status: res.statusCode,
  message: 'Welcome to the default API route',
}));

app.listen(PORT, () => console.log(`Connected to ......${PORT}`));
