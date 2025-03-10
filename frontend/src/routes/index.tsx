import { createFileRoute, Link } from "@tanstack/react-router";

import { BoxButton } from "../components/Buttons";

export const Route = createFileRoute('/')({
    component: RouteComponent
})

function RouteComponent() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-5">
                <p className="text-4xl font-bold">Welcome to Tryout!</p>
                <div className="flex gap-5">
                    <Link to="/tryout">
                        <BoxButton color="normal">Tryouts</BoxButton>
                    </Link>
                    <Link to="/submission">
                        <BoxButton color="normal">Submissions</BoxButton>
                    </Link>
                    <Link to="/admin/tryout">
                        <BoxButton color="normal">Admin: Tryout</BoxButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}
