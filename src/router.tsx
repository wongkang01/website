import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

const rootRoute = new RootRoute({
  component: () => {
    useEffect(() => {
      const lenis = new Lenis();
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }, []);

    return (
      <div className="min-h-screen bg-black">
        <Header />
        <Outlet />
      </div>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const projectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/projects/$projectId",
  component: ProjectDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, projectRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
