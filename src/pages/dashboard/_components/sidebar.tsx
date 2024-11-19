"use client";

import * as React from "react";
import { Gamepad2, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

type Game = {
  id: string | number;
  name: string;
  icon: string;
  modes?: string[]; // Optional modes for games like Tic Tac Toe
};

const offlineGames: Game[] = [
  { id: "tic-tac-toe", name: "Tic Tac Toe", icon: "🎮", modes: ["3x3", "5x5"] },
  { id: 2, name: "Crossword", icon: "📝" },
  { id: 3, name: "Chess", icon: "♟️" },
  { id: 4, name: "Solitaire", icon: "🃏" },
  { id: 5, name: "Minesweeper", icon: "💣" },
];

export default function GameSidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState<string | number | null>(null);
  const navigate = useNavigate();

  const handleGameClick = (gameId: string | number) => {
    setExpanded(expanded === gameId ? null : gameId);
  };

  const handleModeClick = (mode: string) => {
    if (mode === "3x3") {
      navigate("/dashboard/abc/game/tic-tac-toe/3x3");
    }
    if (mode === "5x5") {
      alert("5x5");
    }
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-[240px]">
        <SidebarHeader className="border-b px-6">
          <Link to="/dashboard/abc" className="flex items-center gap-2 py-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Offline Games</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {offlineGames.map((game) => (
                  <SidebarMenuItem key={game.id}>
                    <Collapsible
                      open={expanded === game.id}
                      onOpenChange={() => handleGameClick(game.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname.includes(
                            `/game/${game.id}`
                          )}
                        >
                          <Link
                            to={`/dashboard/abc/game/${game.id}`}
                            className={cn(
                              "flex w-full items-center justify-between",
                              expanded === game.id &&
                                "font-semibold text-primary"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-xl">{game.icon}</span>
                              {game.name}
                            </span>
                            {game.modes && (
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  expanded === game.id && "rotate-90"
                                )}
                              />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {game.modes && (
                        <CollapsibleContent className="space-y-1 px-6 py-2">
                          {game.modes.map((mode) => (
                            <Button
                              key={mode}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start pl-9 font-normal"
                              onClick={() => handleModeClick(mode)}
                            >
                              {mode}
                            </Button>
                          ))}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
