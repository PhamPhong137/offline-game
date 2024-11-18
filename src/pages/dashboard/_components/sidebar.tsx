import { Gamepad2,  } from 'lucide-react'
import { Link,   } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import SparklesText from "@/components/ui/sparkles-text"
import { Separator } from "@/components/ui/separator"


const offlineGames = [
  { id: 'tic-tac-toe', name: "Tic Tac Toe", icon: "🎮" },
  { id: 2, name: "Crossword", icon: "📝" },
  { id: 3, name: "Chess", icon: "♟️" },
  { id: 4, name: "Solitaire", icon: "🃏" },
  { id: 5, name: "Minesweeper", icon: "💣" },
]



const Sidebar = () => {
  const [createHover, setCreateHover] = useState(false)

  return (
    <div className="hidden border-r bg-muted/40 md:block h-full">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to={`/dashboard/abc`}
            className="flex items-center gap-2 font-semibold"
          >
            <Gamepad2 className="size-6 text-primary" />
            <span className="">Offline Games</span>
          </Link>
        </div>
        <nav className="grow flex flex-col items-start px-2 text-sm font-medium lg:px-4">
          <SparklesText
            className="my-4 w-full"
            disabled={!createHover}
          >
            <Button
              className="w-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md font-bold uppercase group"
              size="lg"
              onMouseOver={() => setCreateHover(true)}
              onMouseLeave={() => setCreateHover(false)}
              asChild
            >
              <Link to={`/dashboard/abc/new-game`}>
                Add New Game
              </Link>
            </Button>
          </SparklesText>
          <Separator className="mb-4" />
          {offlineGames.map((game) => (
            <Link
              key={game.id}
              to={`/dashboard/abc/game/${game.id}`}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <span className="text-xl">{game.icon}</span>
              {game.name}
            </Link>
          ))}
          <Separator className="my-4" />

        </nav>
      </div>
    </div>
  )
}

export default Sidebar