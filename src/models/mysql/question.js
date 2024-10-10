import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const dbPassword = process.env.VITE_DB_PASSWORD;

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: dbPassword,
  database: 'questionsdb',
};

const connection = await mysql.createConnection(config);

export class QuestionModel {
  static async getAll({ topic, difficult }) {
    const lowerCaseTopic = topic.toLowerCase();
    const lowerCaseDifficult = difficult.toLowerCase();

    const [questions] = await connection.query(
      'SELECT * FROM questions WHERE topic = ? AND difficult = ?;',
      [lowerCaseTopic, lowerCaseDifficult]
    );

    return questions;
  }
}
