import { Link } from "@tanstack/react-router";

export function Navbar() {
    return (
        <nav className="w-full h-16 flex gap-5 items-center bg-gray-800 text-white px-5">
            <Link to="/" className="text-xl font-bold">Tryout</Link>
            <div className="flex gap-5">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/tryout" className="hover:underline">Tryouts</Link>
                <Link to="/submission" className="hover:underline">Submissions</Link>
                <Link to="/admin/tryout" className="hover:underline">Admin: Tryout</Link>
            </div>
        </nav>
    );
}