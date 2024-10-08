import { CircleProgressBar } from './CircleProgressBar';
import { formatTime } from '../utils/formatTime';

/* eslint-disable react/prop-types */
export function FinalScore({
  totalQuestions,
  rightCounter,
  wrongCounter,
  timeTaken,
  handleRestart,
  handleExit,
}) {
  const percentage = (rightCounter / totalQuestions) * 100;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full px-6 py-2">
      <div className="flex flex-row items-center gap-14">
        <div className="flex flex-1 flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-bold">Final Score</h2>

          <div className="flex flex-col flex-wrap w-full gap-2">
            <div className="flex gap-2">
              <section className="flex-1 px-4 py-2 w-[200px] rounded-lg bg-zinc-900 border-solid border-[1px] border-zinc-800">
                <p className="text-2xl font-bold">{rightCounter}</p>
                <p className="font-light whitespace-nowrap">Correct Answers</p>
              </section>
              <section className="flex-1 px-4 py-2 w-[200px] rounded-lg bg-zinc-900 border-solid border-[1px] border-zinc-800">
                <p className="text-2xl font-bold">{wrongCounter}</p>
                <p className="font-light whitespace-nowrap">
                  Incorrect Answers
                </p>
              </section>
            </div>
            <section className="px-4 py-2 rounded-lg bg-zinc-900 border-solid border-[1px] border-zinc-800">
              <p className="text-2xl font-bold">{formatTime(timeTaken)}</p>
              <p className="font-light">Time Taken</p>
            </section>
          </div>

          <div className="flex w-full justify-center gap-4">
            <button
              className="flex-1 font-medium py-2 border-solid border-[1px] border-zinc-800 rounded-lg"
              onClick={(e) => handleRestart(e)}
            >
              Restart Quiz
            </button>
            <button
              className="flex-1 font-medium py-2 rounded-lg bg-zinc-100 text-zinc-950"
              onClick={(e) => handleExit(e)}
            >
              Back to Start
            </button>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          {/* Circle Progress Bar */}
          <CircleProgressBar targetPercentage={percentage} />
        </div>
      </div>
    </div>
  );
}
