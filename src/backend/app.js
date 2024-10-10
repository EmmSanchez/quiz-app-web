import express from 'express';
import cors from 'cors';
import { QuestionController } from '../controllers/questions.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.get('/questions', QuestionController.getAll);

app.listen(3000, () => {
  console.log(`Backend corriendo en http://localhost:${3000}`);
});
