import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { RefreshCw, Volume2, VolumeX } from "lucide-react";

interface GameControlsProps {
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  onReset: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

const GameControls = ({
  difficulty = "Medium",
  onDifficultyChange = () => {},
  onReset = () => {},
  soundEnabled = true,
  onSoundToggle = () => {},
}: GameControlsProps) => {
  return (
    <div className="w-full p-4 bg-slate-100 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <label htmlFor="difficulty" className="text-sm font-medium">
          Difficulty:
        </label>
        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger id="difficulty" className="w-[120px]">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm">
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </span>
          <Switch
            checked={soundEnabled}
            onCheckedChange={onSoundToggle}
            id="sound-toggle"
          />
        </div>
      </div>
    </div>
  );
};

export default GameControls;
