import { createFileRoute } from "@tanstack/react-router"
import useSWRImmutable from "swr/immutable";

import { TryoutList } from "../../components/TryoutList";

import { TRYOUT_API } from "../../utils/api";
import { APIResult, Tryout } from "../../typings";

export const Route = createFileRoute("/tryout/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useSWRImmutable(`${TRYOUT_API}`, async (url) => {
        const res = await fetch(url, {
            method: "GET"
        });

        return res.json() as Promise<APIResult<Tryout[]>>;
    });

    return (
        <div className="w-full flex justify-center p-20">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && (
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex justify-center">
                        <p className="font-bold text-3xl">Tryout List</p>
                    </div>
                    <TryoutList tryouts={data.result} />
                </div>
            )}
        </div>
    )
}
