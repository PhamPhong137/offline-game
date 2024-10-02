import { Button } from "@/components/ui/button"
import { ArrowLeft, Gamepad2, Ghost } from "lucide-react"
import { Link } from "react-router-dom"

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-primary/20 p-4 text-center">
            <div className="relative mb-8">
                <Gamepad2 className="w-32 h-32 text-primary animate-pulse" />
                <Ghost className="w-16 h-16 text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Game Over: 404</h1>
            <p className="text-lg mb-8 max-w-md">
                Oops! It looks like our game character took a wrong turn. The page you're looking for doesn't exist in this game world.
            </p>
            <Button asChild className="gap-2">
                <Link to="/">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Main Menu
                </Link>
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
                Ready for a new adventure? Try exploring a different level or start a new game!
            </p>
        </div>
    )
}