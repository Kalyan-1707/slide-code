import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface Tile {
  id: number;
  value: number;
  position: number;
}

interface PuzzleGridProps {
  difficulty?: "easy" | "medium" | "hard";
  onMove?: () => void;
  onVictory?: () => void;
  isGameActive?: boolean;
  resetTrigger?: number;
}

const WINNING_SEQUENCE = [8, 0, 1, 3, 6, 6, 5, 3];
const GRID_SIZE = 3;
const EMPTY_VALUE = 9; // Using 9 as empty value instead of 0

const PuzzleGrid = ({
  difficulty = "medium",
  onMove = () => {},
  onVictory = () => {},
  isGameActive = true,
  resetTrigger = 0,
}: PuzzleGridProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [emptyPosition, setEmptyPosition] = useState<number>(8);

  // Initialize the puzzle
  useEffect(() => {
    initializePuzzle();
  }, [resetTrigger, difficulty]);

  const initializePuzzle = () => {
    // Create initial ordered tiles
    const initialTiles: Tile[] = [];
    for (let i = 0; i < 8; i++) {
      initialTiles.push({
        id: i,
        value: WINNING_SEQUENCE[i],
        position: i,
      });
    }

    // Add empty tile
    initialTiles.push({
      id: 8,
      value: EMPTY_VALUE,
      position: 8,
    });

    // Shuffle tiles based on difficulty
    const shuffledTiles = shuffleTiles(initialTiles, difficulty);
    setTiles(shuffledTiles);

    // Find the empty position
    const emptyTile = shuffledTiles.find((tile) => tile.value === EMPTY_VALUE);
    if (emptyTile) {
      setEmptyPosition(emptyTile.position);
    }
  };

  const shuffleTiles = (tiles: Tile[], difficulty: string): Tile[] => {
    const shuffled = [...tiles];
    const moveCount =
      difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100;

    // Simulate random valid moves to ensure solvability
    let currentEmptyPos = 8;

    for (let i = 0; i < moveCount; i++) {
      const validMoves = getValidMoves(currentEmptyPos);
      if (validMoves.length === 0) continue;

      const randomMoveIndex = Math.floor(Math.random() * validMoves.length);
      const tileToMove = validMoves[randomMoveIndex];

      // Find the tile at this position
      const tileIndex = shuffled.findIndex((t) => t.position === tileToMove);

      // Skip if tile not found
      if (tileIndex === -1) continue;

      // Find the empty tile
      const emptyTileIndex = shuffled.findIndex((t) => t.value === EMPTY_VALUE);
      if (emptyTileIndex === -1) continue;

      // Swap positions
      shuffled[tileIndex].position = currentEmptyPos;
      shuffled[emptyTileIndex].position = tileToMove;

      currentEmptyPos = tileToMove;
    }

    return shuffled;
  };

  const getValidMoves = (emptyPos: number): number[] => {
    const validMoves: number[] = [];
    const row = Math.floor(emptyPos / GRID_SIZE);
    const col = emptyPos % GRID_SIZE;

    // Check up
    if (row > 0) validMoves.push(emptyPos - GRID_SIZE);
    // Check down
    if (row < GRID_SIZE - 1) validMoves.push(emptyPos + GRID_SIZE);
    // Check left
    if (col > 0) validMoves.push(emptyPos - 1);
    // Check right
    if (col < GRID_SIZE - 1) validMoves.push(emptyPos + 1);

    return validMoves;
  };

  const handleTileClick = (position: number) => {
    if (!isGameActive) return;

    const validMoves = getValidMoves(emptyPosition);
    if (validMoves.includes(position)) {
      moveTile(position);
    }
  };

  const moveTile = (position: number) => {
    const newTiles = [...tiles];

    // Find the tile at the clicked position
    const tileIndex = newTiles.findIndex((tile) => tile.position === position);
    const emptyTileIndex = newTiles.findIndex(
      (tile) => tile.value === EMPTY_VALUE,
    );

    // Swap positions
    newTiles[tileIndex].position = emptyPosition;
    newTiles[emptyTileIndex].position = position;

    setTiles(newTiles);
    setEmptyPosition(position);
    onMove();

    // Check for victory
    checkVictory(newTiles);
  };

  const checkVictory = (currentTiles: Tile[]) => {
    // Sort tiles by position
    const sortedTiles = [...currentTiles].sort(
      (a, b) => a.position - b.position,
    );

    // Check if the sequence matches the winning sequence
    const currentSequence = sortedTiles.map((tile) => tile.value);
    const isVictory = currentSequence
      .slice(0, 8)
      .every((value, index) => value === WINNING_SEQUENCE[index]);

    if (isVictory) {
      onVictory();
    }
  };

  const getPositionStyles = (position: number) => {
    const row = Math.floor(position / GRID_SIZE);
    const col = position % GRID_SIZE;

    return {
      top: `${row * 33.33}%`,
      left: `${col * 33.33}%`,
      width: "33.33%",
      height: "33.33%",
    };
  };

  return (
    <div className="relative w-full aspect-square bg-slate-200 rounded-lg overflow-hidden shadow-lg">
      {tiles.map(
        (tile) =>
          tile.value !== EMPTY_VALUE && (
            <motion.div
              key={tile.id}
              className={cn(
                "absolute flex items-center justify-center cursor-pointer",
                "bg-white border-2 border-slate-300 rounded-md m-1",
                "font-bold text-3xl text-slate-800 select-none",
                "hover:bg-slate-50 active:scale-95 transition-all",
              )}
              style={getPositionStyles(tile.position)}
              onClick={() => handleTileClick(tile.position)}
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            >
              {tile.value}
            </motion.div>
          ),
      )}
    </div>
  );
};

export default PuzzleGrid;
