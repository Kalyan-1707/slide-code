import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Clock,
  MoveHorizontal,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import ReactConfetti from "react-confetti";
import useSound from "use-sound";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface VictoryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPlayAgain?: () => void;
  stats?: {
    time: number;
    moves: number;
    bestTime?: number;
    bestMoves?: number;
  };
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const VictoryModal = ({
  isOpen = true,
  onClose = () => {},
  onPlayAgain = () => {},
  stats = {
    time: 125,
    moves: 42,
    bestTime: 98,
    bestMoves: 35,
  },
}: VictoryModalProps) => {
  const [playVictory] = useSound("/sounds/victory.mp3", { volume: 0.5 });

  useEffect(() => {
    if (isOpen) {
      playVictory();
    }
  }, [isOpen, playVictory]);
  const isNewBestTime = stats.bestTime ? stats.time < stats.bestTime : true;
  const isNewBestMoves = stats.bestMoves ? stats.moves < stats.bestMoves : true;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {isOpen && <ReactConfetti recycle={false} numberOfPieces={500} />}
      <DialogContent className="bg-gradient-to-b from-indigo-50 to-blue-50 border-2 border-indigo-200 max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-yellow-500 mb-2"
            >
              <Sparkles size={40} />
            </motion.div>
            <DialogTitle className="text-2xl font-bold text-indigo-700 mb-2">
              You Cracked the Code!
            </DialogTitle>
            <div className="flex items-center justify-center mb-2">
              <Trophy className="text-yellow-500 mr-2" size={24} />
              <span className="text-xl font-semibold text-indigo-600">
                80136653
              </span>
            </div>
            <DialogDescription className="text-center text-indigo-600">
              Congratulations! You've successfully arranged the tiles in the
              winning sequence.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <div className="bg-white rounded-lg p-4 shadow-inner my-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Your Performance
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="text-indigo-500 mr-2" size={20} />
                <span className="text-gray-700">Time:</span>
              </div>
              <div className="flex items-center">
                <span className="font-mono text-lg">
                  {formatTime(stats.time)}
                </span>
                {isNewBestTime && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                  >
                    NEW BEST!
                  </motion.span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MoveHorizontal className="text-indigo-500 mr-2" size={20} />
                <span className="text-gray-700">Moves:</span>
              </div>
              <div className="flex items-center">
                <span className="font-mono text-lg">{stats.moves}</span>
                {isNewBestMoves && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                  >
                    NEW BEST!
                  </motion.span>
                )}
              </div>
            </div>

            {(stats.bestTime || stats.bestMoves) && (
              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Previous Best
                </h4>
                {stats.bestTime && (
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Best Time:</span>
                    <span className="font-mono">
                      {formatTime(stats.bestTime)}
                    </span>
                  </div>
                )}
                {stats.bestMoves && (
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Best Moves:</span>
                    <span className="font-mono">{stats.bestMoves}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button
            onClick={onPlayAgain}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VictoryModal;
