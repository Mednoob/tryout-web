import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import useSWR from "swr";

import { BoxButton, OutlinedButton } from "../../../components/Buttons";

import { TRYOUT_API } from "../../../utils/api";
import { APIResult, Tryout } from "../../../typings";

export const Route = createFileRoute('/admin/tryout/')({
  component: RouteComponent,
})

function RouteComponent() {
    const [isDisabled, setIsDisabled] = useState(false);

    const { data, isLoading, error, mutate } = useSWR(`${TRYOUT_API}`, async (url) => {
        const res = await fetch(url, {
            method: "GET"
        });

        return res.json() as Promise<APIResult<Tryout[]>>;
    }, { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateOnMount: true });

    return (
        <div className="w-full flex justify-center p-20">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && (
                <div className="flex flex-col gap-5 items-center w-full h-full">
                    <div className="flex justify-between w-full">
                        <p className="font-bold text-2xl">Tryouts</p>
                        <Link to="/admin/tryout/create">
                            <BoxButton color="normal">Create New Tryout</BoxButton>
                        </Link>
                    </div>
                    {data.result.length
                        ? (
                            <div className="w-full h-full grid grid-cols-3 gap-5">
                                {data.result.map((tryout) => (
                                    <div key={tryout.title} className="flex flex-col justify-between border border-black py-2 px-3 gap-4 rounded-lg">
                                        <div className="flex flex-col gap-4">
                                            <p className="font-bold text-xl">{tryout.title}</p>
                                            <p>{tryout.smallDescription ?? "No description"}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Link to="/tryout/$tryoutId" params={{ tryoutId: tryout._id }}>
                                                <OutlinedButton color="normal" disabled={isDisabled}>Details</OutlinedButton>
                                            </Link>
                                            <Link to="/admin/tryout/edit/$tryoutId" params={{ tryoutId: tryout._id }}>
                                                <OutlinedButton color="warn" disabled={isDisabled}>Edit</OutlinedButton>
                                            </Link>
                                            <OutlinedButton color="danger" disabled={isDisabled} onClick={
                                                async () => {
                                                    setIsDisabled(true);

                                                    await fetch(`${TRYOUT_API}/${tryout._id}`, {
                                                        method: "DELETE"
                                                    });

                                                    mutate();
                                                    setIsDisabled(false);
                                                }
                                            }>Delete</OutlinedButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                        : <div>No tryouts found</div>
                    }
                </div>
            )}
        </div>
    )
}
