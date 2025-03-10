import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="w-full flex flex-col">
                <Navbar />
                <div className="w-full min-h-screen grow">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
});
