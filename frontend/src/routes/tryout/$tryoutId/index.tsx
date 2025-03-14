import useSWRImmutable from "swr/immutable";
import { createFileRoute, Link } from "@tanstack/react-router";

import { BoxButton } from "../../../components/Buttons";
import { Markdown } from "../../../components/Markdown";

import { TRYOUT_API } from "../../../utils/api";
import { APIResult, FullTryoutInfo } from "../../../typings";

export const Route = createFileRoute('/tryout/$tryoutId/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { tryoutId } = Route.useParams();

    const { data, isLoading, error } = useSWRImmutable(`${TRYOUT_API}/${tryoutId}`, async (url) => {
        const res = await fetch(url, {
            method: "GET"
        });

        return res.json() as Promise<APIResult<FullTryoutInfo>>;
    });

    return (
        <div className="w-full h-screen flex flex-col items-center px-20 py-10">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && (
                <div className="w-full h-full flex">
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-5">
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-400 mb-2">TRYOUT</p>
                                <p className="font-bold text-2xl">{data.result.title}</p>
                                <p className="text-gray-500 text-sm mt-2">{data.result.smallDescription ?? "No description"}</p>
                            </div>
                        </div>
                        <div className="w-full max-w-full overflow-auto">
                            <Markdown>{data.result.fullDescription ?? ""}</Markdown>
                        </div>
                    </div>
                    <div className="h-full px-10 gap-5 border-l-2 border-gray-300">
                        <div className="flex flex-col gap-3 items-center">
                            <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                                <p>Questions</p>
                                <p className="w-min">{data.result.questions.length}</p>
                                <p>Submissions</p>
                                <p className="w-min">{data.result.submissionCount}</p>
                            </div>
                            <Link to="/tryout/$tryoutId/attempt" params={{ tryoutId }}>
                                <BoxButton color="normal">Attempt</BoxButton>
                            </Link>
                        </div>
                    </div>
                </div>
                
            )}
        </div>
    );
}
