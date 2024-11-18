import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const games = [
  {
    id: 1,
    name: "Tic Tac Toe",
    icon: "⭕",
    description: "Classic X's and O's game. Challenge your friends or AI in a simple yet strategic game.",
  },
  {
    id: 2,
    name: "Snake",
    icon: "🐍",
    description: "Eat the apples and grow longer. Avoid hitting yourself or the walls!",
  },
  {
    id: 3,
    name: "Tetris",
    icon: "🟦",
    description: "Fit the blocks into place and clear rows to score. A true test of spatial awareness.",
  },
  {
    id: 4,
    name: "Minesweeper",
    icon: "💣",
    description: "Use logic to locate all the mines without triggering any! Classic puzzle for thinkers.",
  },
  {
    id: 5,
    name: "Solitaire",
    icon: "🃏",
    description: "Arrange cards in sequential order by suit. A calming yet challenging card game.",
  },
  {
    id: 6,
    name: "Chess",
    icon: "♟️",
    description: "Strategic board game. Outsmart your opponent in this timeless battle of wits.",
  },
  {
    id: 7,
    name: "Sudoku",
    icon: "🔢",
    description: "Fill the grid with numbers 1-9, ensuring no repeats in rows, columns, or boxes.",
  },
  {
    id: 8,
    name: "Memory Cards",
    icon: "🎴",
    description: "Flip cards and find matching pairs. A game to test and train your memory!",
  },
  {
    id: 9,
    name: "2048",
    icon: "🔄",
    description: "Swipe and merge numbers to reach 2048. Addictive and fun for all ages.",
  },
  {
    id: 10,
    name: "Hangman",
    icon: "👤",
    description: "Guess the word letter by letter. Watch out for incorrect guesses!",
  },
  {
    id: 11,
    name: "Puzzle",
    icon: "🧩",
    description: "Solve picture puzzles by arranging pieces in the correct order.",
  },
  {
    id: 12,
    name: "Pacman",
    icon: "👾",
    description: "Navigate the maze, eat dots, and avoid ghosts in this iconic arcade game.",
  },
  {
    id: 13,
    name: "Pinball",
    icon: "🔴",
    description: "Classic arcade fun! Keep the ball bouncing and score high points.",
  },
  {
    id: 14,
    name: "Mahjong",
    icon: "🀄",
    description: "Match tiles to clear the board in this ancient Chinese puzzle game.",
  },
  {
    id: 15,
    name: "Crossword",
    icon: "📝",
    description: "Solve clues and fill the grid with words. Test your vocabulary and wit!",
  },
];


export function GamesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 8;
  const totalPages = Math.ceil(games.length / gamesPerPage);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentGames.map((game) => (
          <Card
            key={game.id}
            className="hover:shadow-xl transition-all transform hover:-translate-y-2 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-lg overflow-hidden"
          >
            <CardHeader className="space-y-2 p-4 bg-gradient-to-r from-indigo-300 to-blue-400 text-white">
              <CardTitle className="text-xl font-semibold flex items-center gap-3">
                <span className="text-3xl">{game.icon}</span>
                {game.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">{game.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center mt-8 gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-100 transition"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
