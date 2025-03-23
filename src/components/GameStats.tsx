import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Clock, MoveHorizontal } from "lucide-react";

interface GameStatsProps {
  moves?: number;
  time?: number;
  isActive?: boolean;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const GameStats: React.FC<GameStatsProps> = ({
  moves = 0,
  time = 0,
  isActive = true,
  className,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(time);

  useEffect(() => {
    // Reset current time when time prop changes
    setCurrentTime(time);
  }, [time]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  console.log(`GameStats isActive: ${isActive}`);

  return (
    <div
      className={cn(
        "bg-white p-4 rounded-lg shadow-md w-full flex justify-between items-center",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="text-xl font-bold">{formatTime(currentTime)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <MoveHorizontal className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm text-gray-500">Moves</p>
          <p className="text-xl font-bold">{moves}</p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
