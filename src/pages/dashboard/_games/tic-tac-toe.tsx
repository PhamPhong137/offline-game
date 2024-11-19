import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Player = "X" | "O" | null;
type WinningLine = [number, number, number] | null;

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isPlayingWithAI, setIsPlayingWithAI] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (isPlayingWithAI) {
      resetGame(true); // AI đi trước
    } else {
      resetGame(false); // Chơi giữa người với người
    }
  }, [isPlayingWithAI]);

  useEffect(() => {
    if (isPlayingWithAI && !isXNext && !winner) {
      setTimeout(aiMove, 500); // Chờ 500ms trước khi AI đi
    }
  }, [isXNext, isPlayingWithAI, winner]);

  const lines: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const minimax = (
    board: Player[],
    depth: number,
    isMaximizing: boolean
  ): number => {
    const [gameWinner] = checkWinner(board);
    if (gameWinner === "O") return 10 - depth;
    if (gameWinner === "X") return depth - 10;
    if (!board.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const findBestMove = (currentBoard: Player[]): number => {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        const newBoard = [...currentBoard];
        newBoard[i] = "O";
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const checkWinner = (
    squares: Player[]
  ): [Player | "Draw" | null, WinningLine] => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], lines[i]];
      }
    }

    if (squares.every((square) => square !== null)) {
      return ["Draw", null];
    }

    return [null, null];
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const [gameWinner, gameWinningLine] = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(gameWinningLine);
      setGameOver(true); // Set gameOver to true
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = (aiGoesFirst: boolean = false) => {
    setBoard(Array(9).fill(null));
    setWinningLine(null);
    setWinner(null);
    setIsXNext(!aiGoesFirst);
    setGameOver(false); // Reset gameOver to false

    if (aiGoesFirst) {
      const newBoard = Array(9).fill(null);
      newBoard[4] = "O";
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  const aiMove = () => {
    if (gameOver || isXNext) return;

    const bestMove = findBestMove(board);
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = "O";
      setBoard(newBoard);

      const [gameWinner, gameWinningLine] = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setWinningLine(gameWinningLine);
        setGameOver(true); // Set gameOver to true
      } else {
        setIsXNext(true);
      }
    }
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    let colorClass = "";

    if (value === "X") {
      colorClass = "text-red-800"; // Màu đậm cho 'X'
    } else if (value === "O") {
      colorClass = "text-blue-800"; // Màu đậm cho 'O'
    }

    return (
      <Button
        variant="outline"
        className="w-20 h-20 text-4xl font-extrabold relative"
        onClick={() => handleClick(index)}
        disabled={gameOver}
      >
        <span className={`${colorClass}`}>{value}</span>
        {winningLine && winningLine.includes(index) && (
          <div className="absolute inset-0 bg-green-700 opacity-30" />
        )}
      </Button>
    );
  };

  const handlePlayWithAI = () => {
    setIsPlayingWithAI(!isPlayingWithAI);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-background relative w-[100%]">
      <div className="absolute top-12 left-4 ">
        <Button onClick={handlePlayWithAI} className="gap-2 w-40 md:w-48">
          {isPlayingWithAI ? "Play with Human" : "Play with AI"}
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-20 ">Tic-Tac-Toe 3x3</h1>

      <div className="mb-4 relative">
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <div className="text-center text-xl font-semibold mb-4">
        {winner ? "Game Over" : `Next player: ${isXNext ? "X" : "O"}`}
      </div>

      <Button onClick={() => resetGame(isPlayingWithAI)} className="mb-4">
        Reset Game
      </Button>

      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-sm">
          <AlertDialog
            open={winner !== null}
            onOpenChange={(open) => !open && setWinner(null)}
          >
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Game Over</AlertDialogTitle>
                <AlertDialogDescription>
                  {winner === "Draw"
                    ? "It's a draw!"
                    : `Player ${winner} wins!`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setWinner(null)}>
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
