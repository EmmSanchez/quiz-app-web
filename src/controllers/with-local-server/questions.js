// import { QuestionModel } from '../models/mysql/question.js';
import { QuestionModel } from '../../models/postgresql/question.js';
import { getRandomQuestions } from '../../utils/random.js';

export class QuestionController {
  static async getQuestions(req, res) {
    try {
      const { topic, difficult, quantity } = req.query;
      const questions = await QuestionModel.getQuestions({
        topic,
        difficult,
      });

      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: 'No questions found.' });
      }

      // Contract of questions
      const mappedQuestions = questions?.map((question) => ({
        question_text: question.question_text,
        options: [
          question.option_1,
          question.option_2,
          question.option_3,
          question.option_4,
        ],
        correct_option: question.correct_option,
        code_text: question.code_text,
      }));

      const newQuestions = getRandomQuestions(
        0,
        mappedQuestions.length - 1,
        quantity,
        mappedQuestions
      );

      res.json(newQuestions);
    } catch (err) {
      console.error('Error in getQuestions', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}
