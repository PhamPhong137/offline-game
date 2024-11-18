import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/homepage";
import { NotFoundPage } from "./pages/404";
import { LoginPage } from "./pages/(auth)/login";
import DashboardLayout from "./pages/dashboard/dashboard-layout";
import { TicTacToe } from "./pages/dashboard/_games/tic-tac-toe";
import { GamesList } from "./pages/dashboard/game-list";

const queryClient = new QueryClient();

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <Outlet />,
        children: [
          {
            path: ":orgId",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <GamesList />,
              },
              {
                path: "game",
                element: <Outlet />,
                children: [
                  {
                    path:"tic-tac-toe",
                    element: <TicTacToe />
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
