import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PuzzleGrid from "./PuzzleGrid";
import GameControls from "./GameControls";
import GameStats from "./GameStats";
// Create a custom implementation of VictoryModal since the import is causing issues
// We'll implement it directly in this file instead of importing it

interface GameBoardProps {
  className?: string;
}

// Define the VictoryModal component directly in this file
interface VictoryModalProps {
  moves: number;
  time: number;
  onPlayAgain: () => void;
  open: boolean;
}

const VictoryModal: React.FC<VictoryModalProps> = ({
  moves = 0,
  time = 0,
  onPlayAgain = () => {},
  open = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Victory!
        </h2>
        <div className="text-center mb-6">
          <p className="text-lg mb-2">You cracked the code: 80136653</p>
          <div className="flex justify-center space-x-8 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-xl font-semibold">
                {Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Moves</p>
              <p className="text-xl font-semibold">{moves}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onPlayAgain}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const GameBoard: React.FC<GameBoardProps> = ({ className = "" }) => {
  // Game state
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  // Reset game function
  const handleReset = () => {
    setMoves(0);
    setTime(0);
    setIsGameActive(true);
    setShowVictory(false);
    setResetTrigger((prev) => prev + 1);
  };

  // Handle move
  const handleMove = () => {
    setMoves((prev) => prev + 1);
    // Play sound effect if enabled
    if (soundEnabled) {
      // Sound effect would be implemented here
    }
  };

  // Handle victory
  const handleVictory = () => {
    // Stop the timer by setting isGameActive to false
    setIsGameActive(false);
    setShowVictory(true);
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setMoves(0);
    setTime(0);
    setIsGameActive(true);
    setShowVictory(false);
    setResetTrigger((prev) => prev + 1);
  };

  // Handle sound toggle
  const handleSoundToggle = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Handle play again from victory modal
  const handlePlayAgain = () => {
    handleReset();
  };

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;

    if (isGameActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive]);

  return (
    <motion.div
      className={`w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
        SlideCode Puzzle
      </h2>

      <div className="space-y-4">
        {/* Game Stats Component */}
        <GameStats
          moves={moves}
          time={time}
          isActive={isGameActive}
          className="mb-4"
        />

        {/* Puzzle Grid Component */}
        <div className="w-full aspect-square mb-4">
          <PuzzleGrid
            difficulty={difficulty.toLowerCase() as "easy" | "medium" | "hard"}
            onMove={handleMove}
            onVictory={handleVictory}
            isGameActive={isGameActive}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Game Controls Component */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onReset={handleReset}
          soundEnabled={soundEnabled}
          onSoundToggle={handleSoundToggle}
        />
      </div>

      {/* Victory Modal */}
      <VictoryModal
        open={showVictory}
        time={time}
        moves={moves}
        onPlayAgain={handlePlayAgain}
      />
    </motion.div>
  );
};

export default GameBoard;
