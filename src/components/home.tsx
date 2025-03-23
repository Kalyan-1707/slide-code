import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GameBoard from "./GameBoard";
import InstructionsOverlay from "./InstructionsOverlay";
import { Button } from "./ui/button";
import { Puzzle, Info, Github } from "lucide-react";

const Home: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [firstVisit, setFirstVisit] = useState<boolean>(true);

  // Check if this is the user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("slidecode_visited");
    if (!hasVisitedBefore) {
      setShowInstructions(true);
      localStorage.setItem("slidecode_visited", "true");
    } else {
      setFirstVisit(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center space-x-2 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Puzzle className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-indigo-800">SlideCode</h1>
          </motion.div>
          <p className="text-lg text-indigo-600 max-w-lg mx-auto">
            Crack the puzzle by arranging the tiles to form the sequence{" "}
            <span className="font-mono font-bold">80136653</span>
          </p>
        </header>

        <div className="flex flex-col items-center justify-center">
          <GameBoard className="w-full max-w-md" />

          <div className="mt-6">
            <Button
              variant="outline"
              className="px-6"
              onClick={() => setShowInstructions(true)}
            >
              View Instructions
            </Button>
          </div>
        </div>

        <footer className="mt-12 text-center text-indigo-600/70 text-sm">
          <p>© 2025 SlideCode Puzzle Game</p>
          <div className="flex items-center justify-center mt-2">
            <a
              href="https://github.com/Kalyan-1707/slide-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-indigo-800 transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              View on GitHub
            </a>
          </div>
        </footer>
      </motion.div>

      <InstructionsOverlay
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        firstTime={firstVisit}
      />
    </div>
  );
};

export default Home;
