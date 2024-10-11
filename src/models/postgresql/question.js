import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKet = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = await createClient(supabaseUrl, supabaseKet);

export class QuestionModel {
  static async getQuestions({ topic, difficult }) {
    try {
      let query = supabase.from('questions').select('*');
      if (topic) {
        query = query.eq('topic', topic);
      }
      if (difficult) {
        query = query.eq('difficult', difficult);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching questions:', error);
        return [];
      }

      return data;
    } catch (err) {
      console.error('Unexpected Error', err);
      return [];
    }
  }
}
