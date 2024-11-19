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
    newBoard: Player[],
    depth: number,
    isMaximizing: boolean
  ): number => {
    const [gameWinner] = checkWinner(newBoard);
    if (gameWinner === "O") return 10 - depth;
    if (gameWinner === "X") return depth - 10;
    if (!newBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
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
        currentBoard[i] = "O";
        const score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
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
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const [gameWinner, gameWinningLine] = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(gameWinningLine);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = (aiGoesFirst: boolean = false) => {
    setBoard(Array(9).fill(null));
    setWinningLine(null);
    setWinner(null);
    setIsXNext(!aiGoesFirst);

    if (aiGoesFirst) {
      const newBoard = Array(9).fill(null);
      newBoard[4] = "O";
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  const aiMove = () => {
    if (winner) return; // Nếu đã có người thắng, AI không được đi
    if (isXNext) return; // Nếu không phải lượt của AI, dừng lại

    const bestMove = findBestMove(board); // Tìm nước đi tối ưu
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = "O"; // AI đi "O"
      setBoard(newBoard);

      const [gameWinner, gameWinningLine] = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setWinningLine(gameWinningLine);
      } else {
        setIsXNext(true); // Chuyển lượt cho người chơi
      }
    }
  };

  const renderSquare = (index: number) => (
    <Button
      variant="outline"
      className="w-20 h-20 text-4xl font-bold relative"
      onClick={() => handleClick(index)}
    >
      {board[index]}
      {winningLine && winningLine.includes(index) && (
        <div className="absolute inset-0 bg-green-500 opacity-30" />
      )}
    </Button>
  );

  const handlePlayWithAI = () => {
    setIsPlayingWithAI(!isPlayingWithAI);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-background relative w-[100%]">
      <div className="absolute top-4 left-4">
        <Button onClick={handlePlayWithAI} className="gap-2 w-40">
          {isPlayingWithAI ? "Play with Human" : "Play with AI"}
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe 3x3</h1>

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

      <div className="text-xl font-semibold mb-4">
        {winner ? "Game Over" : `Next player: ${isXNext ? "X" : "O"}`}
      </div>

      <Button onClick={() => resetGame(isPlayingWithAI)}>Reset Game</Button>

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
