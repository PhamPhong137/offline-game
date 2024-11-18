import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

type Player = 'X' | 'O' | null
type WinningLine = [number, number, number] | null

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null)
  const [winningLine, setWinningLine] = useState<WinningLine>(null)

  const lines: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const checkWinner = (squares: Player[]): [Player | 'Draw' | null, WinningLine] => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]]
      }
    }

    if (squares.every((square) => square !== null)) {
      return ['Draw', null]
    }

    return [null, null]
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const [gameWinner, gameWinningLine] = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setWinningLine(gameWinningLine)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setWinningLine(null)
  }

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
  )

  return (
    <div className="flex flex-col items-center justify-center mt-20 bg-background">
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
        {winningLine && (
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            <line
              x1={`${(winningLine[0] % 3 + 0.5) * 33.33}%`}
              y1={`${(Math.floor(winningLine[0] / 3) + 0.5) * 33.33}%`}
              x2={`${(winningLine[2] % 3 + 0.5) * 33.33}%`}
              y2={`${(Math.floor(winningLine[2] / 3) + 0.5) * 33.33}%`}
              stroke="red"
              strokeWidth="4"
            />
          </svg>
        )}
      </div>
      <div className="text-xl font-semibold mb-4">
        {winner ? 'Game Over' : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>

      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-sm">
          <AlertDialog open={winner !== null} onOpenChange={(open) => !open && setWinner(null)}>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Game Over</AlertDialogTitle>
                <AlertDialogDescription>
                  {winner === 'Draw' 
                    ? "It's a draw!" 
                    : `Player ${winner} wins!`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setWinner(null)}>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}