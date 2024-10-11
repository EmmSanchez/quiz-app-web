import { QuestionModel } from '../models/postgresql/question.js';
import { getRandomQuestions } from '../utils/random.js';

export class QuestionController {
  static async getQuestions({ lowerCaseTopic, lowerCaseDifficult, quantity }) {
    try {
      const topic = lowerCaseTopic;
      const difficult = lowerCaseDifficult;
      const questions = await QuestionModel.getQuestions({ topic, difficult });

      if (!questions || questions.length === 0) {
        return [];
      }

      // Contract of questions
      const mappedQuestions = questions.map((question) => ({
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

      return newQuestions;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
