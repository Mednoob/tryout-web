import { Link } from "@tanstack/react-router";

import { OutlinedButton } from "./Buttons";
import { Tryout } from "../typings";

export function TryoutList({ tryouts }: { tryouts: Tryout[] }) {
    return (
        <div className="flex flex-col items-center w-full h-full">
            {tryouts.length
                ? (
                    <div className="w-full h-full grid grid-cols-3 gap-5">
                        {tryouts.map((tryout) => (
                            <div key={tryout.title} className="flex flex-col justify-between border border-black py-2 px-3 gap-4 rounded-lg">
                                <div className="flex flex-col gap-4">
                                    <p className="font-bold text-xl">{tryout.title}</p>
                                    <p>{tryout.smallDescription ?? "No description"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link to="/tryout/$tryoutId" params={{ tryoutId: tryout._id }} className="hover:underline">
                                        <OutlinedButton color="normal">Details</OutlinedButton>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                : <div>No tryouts found</div>
            }
        </div>
    );
}
