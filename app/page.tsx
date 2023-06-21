"use client";
import { useEffect, useState } from "react";
import data from "@/lib/data.json";

interface Stats {
  player1: number;
  player2: number;
  readyplayer1: boolean;
  readyplayer2: boolean;
  started: boolean;
  rounds: number;
  round:number;
  [key: string]: number | boolean;

}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    player1: 0,
    player2: 0,
    readyplayer1: false,
    readyplayer2: false,
    started: false,
    rounds: 0,
    round:0
  });

  const check = (player: keyof Pick<Stats, 'player1' | 'player2'>, answer: string) => {
    if (answer === question.correct.answer) {
      setStats((prevStats) => ({
        ...prevStats,
        [player]: prevStats[player] + 1,
        round: prevStats.round + 1,
      }));
      setVisibility(true);
    }
  };
  const [visibility, setVisibility] = useState(false);
  const [question, setQuestion] = useState(data.questions[0]);

  const randomize = () => {
    const randomIndex = Math.floor(Math.random() * data.questions.length);
    const randomQuestion = data.questions[randomIndex];
    setQuestion(randomQuestion);
  };



  const next = (player: string) => {
    setStats((prevStats) => ({
      ...prevStats,
      readyplayer1:
        player === "player1" ? !prevStats.readyplayer1 : prevStats.readyplayer1,
      readyplayer2:
        player === "player2" ? !prevStats.readyplayer2 : prevStats.readyplayer2,
    }));
  };

  useEffect(() => {
    if (stats.readyplayer1 && stats.readyplayer2) {
      setStats((prevStats) => ({
        ...prevStats,
        readyplayer1: false,
        readyplayer2: false,
      }));  if (stats.rounds===stats.round){
             setStats((prevStats) => ({
        ...prevStats,
        started:false
      })); 
      }
      setVisibility(false);
      randomize();
    }
    

    
  }, [stats]);

  return (
    <main className="flex flex-col dark:bg-neutral-900 dark:text-neutral-200 bg-neutral-200 text-neutral-900">
      {stats.started ? (
        <>
          <div className="grow flex flex-col rotate-180 p-4">
            <div className="mb-2 text-lg h-24 flex items-center justify-center text-center">
              {question.question}
            </div>
            <div className="grid grid-cols-2 gap-2 grow">
              {question.answers.map((answer) => (
                <button
                  key={answer}
                  className="dark:bg-neutral-800 bg-neutral-300 rounded-lg"
                  onClick={() => check("player1", answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
          <div className="h-0.5 rounded dark:bg-neutral-800 bg-neutral-300 mx-4"></div>
          <div className="grow flex flex-col p-4">
            <div className="mb-2 text-lg h-24 flex items-center justify-center text-center">
              {question.question}
            </div>
            <div className="grid grid-cols-2 gap-4 grow">
              {question.answers.map((answer) => (
                <button
                  key={answer}
                  onClick={() => check("player2", answer)}
                  className="dark:bg-neutral-800 bg-neutral-300 rounded-lg"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 bg-black dark:bg-white/5 h-full bg-opacity-10 p-6 backdrop-blur-sm ${
              visibility ? "block" : "hidden"
            } `}
          >
            <div className="h-full flex flex-col bg-neutral-50 dark:bg-neutral-950 rounded-lg p-2">
              <div className="grow flex flex-col p-4 rotate-180">
                <div className="grow text-center flex items-center">
                  {question.correct.explanation}
                </div>
                <button
                  onClick={() => next("player2")}
                  className={`${
                    stats.readyplayer2
                      ? "bg-neutral-300 dark:bg-neutral-800"
                      : "bg-transparent"
                  } rounded py-4 border border-neutral-800`}
                >
                  next
                </button>
              </div>
              <div className="h-0.5 rounded bg-neutral-200 dark:bg-neutral-900 w-full"></div>
              <div className="grow flex flex-col p-4">
                <div className="grow text-center flex items-center">
                  {question.correct.explanation}
                </div>
                <button
                  onClick={() => next("player1")}
                  className={`${
                    stats.readyplayer1
                      ? "bg-neutral-300 dark:bg-neutral-800"
                      : "bg-transparent"
                  } rounded py-4 border border-neutral-800`}
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col m-auto">
          <div>The Game</div>
          <button 
          className="dark:bg-neutral-800 bg-neutral-300 rounded-lg my-3 py-3"
            onClick={() =>
              setStats((prevStats) => ({
                ...prevStats,
                started: true,
                readyplayer1: false,
                readyplayer2: false,
                rounds: 2,
                player1: 0,
                player2: 0,
              }))}>start</button>
        </div>
      )}
    </main>
  );
}
