import React, { useState, useEffect } from "react";
import "./ChordGame.css";

// Define the chord data structure
const chordData = {
  C: {
    1: "C",
    2: "Dm",
    3: "Em",
    4: "F",
    5: "G",
    6: "Am",
    7: "Bdim",
  },
  A: {
    1: "A",
    2: "Bm",
    3: "C#m",
    4: "D",
    5: "E",
    6: "F#m",
    7: "G#dim",
  },
  G: {
    1: "G",
    2: "Am",
    3: "Bm",
    4: "C",
    5: "D",
    6: "Em",
    7: "F#dim",
  },
  E: {
    1: "E",
    2: "F#m",
    3: "G#m",
    4: "A",
    5: "B",
    6: "C#m",
    7: "D#dim",
  },
  D: {
    1: "D",
    2: "Em",
    3: "F#m",
    4: "G",
    5: "A",
    6: "Bm",
    7: "C#dim",
  },
};

// Chord descriptions for educational purposes
const chordDescriptions = {
  1: "I - Major (Tonic)",
  2: "ii - Minor (Supertonic)",
  3: "iii - Minor (Mediant)",
  4: "IV - Major (Subdominant)",
  5: "V - Major (Dominant)",
  6: "vi - Minor (Submediant)",
  7: "vii° - Diminished (Leading Tone)",
};

const ChordGame = () => {
  const [currentKey, setCurrentKey] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Generate a new question
  const generateQuestion = () => {
    // Reset previous selection and result
    setSelectedOption(null);
    setResult(null);

    // Select a random key from [C, A, G, E, D]
    const keys = ["C", "A", "G", "E", "D"];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentKey(randomKey);

    // Select a random level from 1-7
    const randomLevel = Math.floor(Math.random() * 7) + 1;
    setCurrentLevel(randomLevel);

    // Generate 4 options including the correct answer
    const correctAnswer = chordData[randomKey][randomLevel];

    // Get all possible chords from all keys
    const allChords = [];
    Object.values(chordData).forEach((keyChords) => {
      Object.values(keyChords).forEach((chord) => {
        if (!allChords.includes(chord) && chord !== correctAnswer) {
          allChords.push(chord);
        }
      });
    });

    // Shuffle and pick 3 wrong answers
    const shuffledChords = allChords.sort(() => 0.5 - Math.random());
    const wrongAnswers = shuffledChords.slice(0, 3);

    // Combine correct and wrong answers, then shuffle
    const allOptions = [correctAnswer, ...wrongAnswers].sort(
      () => 0.5 - Math.random()
    );
    setOptions(allOptions);
  };

  // Check the selected answer
  const checkAnswer = (option) => {
    setSelectedOption(option);
    const correctAnswer = chordData[currentKey][currentLevel];

    if (option === correctAnswer) {
      setResult("correct");
      setScore((prevScore) => prevScore + 1);
      // Generate a new question after a delay
      setTimeout(generateQuestion, 300);
    } else {
      setResult("incorrect");
    }

    setTotalQuestions((prevTotal) => prevTotal + 1);
  };

  // Initialize the game
  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="chord-game">
      <h1>Chord In Key</h1>
      <p className="subtitle">
        Test your knowledge of guitar chords in different keys
      </p>

      <div className="score-container">
        <p>
          Score: {score}/{totalQuestions}
        </p>
      </div>

      {currentKey && currentLevel && (
        <div className="question-container">
          <h2>
            What is the {currentLevel} chord in the key of {currentKey}?
          </h2>
          <p className="chord-description">{chordDescriptions[currentLevel]}</p>

          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === option
                    ? result === "correct" &&
                      option === chordData[currentKey][currentLevel]
                      ? "correct"
                      : result === "incorrect" && option === selectedOption
                      ? "incorrect"
                      : result === "incorrect" &&
                        option === chordData[currentKey][currentLevel]
                      ? "correct-answer"
                      : ""
                    : ""
                }`}
                onClick={() => !selectedOption && checkAnswer(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {result && (
            <div className={`result ${result}`}>
              {result === "correct"
                ? "Correct!"
                : `Incorrect! The correct answer is ${chordData[currentKey][currentLevel]}`}
            </div>
          )}
        </div>
      )}

      <button className="next-button" onClick={generateQuestion}>
        New Question
      </button>
    </div>
  );
};

export default ChordGame;
