import { useState } from 'react';
import { Quiz } from './Quiz';
import { Login } from './Login';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
// import questions from '../data/data.json';

export function AppContainer() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSettings, setSelectedSettings] = useState({
    topic: 'JavaScript',
    difficult: 'Easy',
    questions: 5,
    minutesPerQuestion: 0,
  });
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleSubmit = async () => {
    const { topic, difficult, questions } = selectedSettings;
    try {
      const res = await fetch(
        `http://localhost:3000/questions?topic=${topic.toLowerCase()}&difficult=${difficult.toLowerCase()}&quantity=${questions.toString()}`
      );

      const fetchedQuestions = await res.json();

      setFilteredQuestions(fetchedQuestions);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <NavBar />
      {isSubmitted ? (
        <Quiz
          setIsSubmitted={setIsSubmitted}
          selectedSettings={selectedSettings}
          filteredQuestions={filteredQuestions}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Login
          handleSubmit={handleSubmit}
          selectedSettings={selectedSettings}
          setSelectedSettings={setSelectedSettings}
        />
      )}
      <Footer />

      <div className="fixed inset-0 -z-10 h-full w-dvw items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#003566_100%)]"></div>
    </div>
  );
}
