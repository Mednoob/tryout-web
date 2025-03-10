import { createFileRoute } from "@tanstack/react-router";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

import { TryoutAttempt } from "../../../components/TryoutAttempt";
import { APIResult, TryoutInfo } from "../../../typings";
import { TRYOUT_API } from "../../../utils/api";

export const Route = createFileRoute('/tryout/$tryoutId/attempt')({
    component: RouteComponent,
});

function RouteComponent() {
    const { tryoutId } = Route.useParams();
    const { data, error, isLoading } = useSWRImmutable(`${TRYOUT_API}/${tryoutId}`, async (url) => {
        const res = await axios.get<APIResult<TryoutInfo>>(url);

        return res.data;
    });

    return (
        <div className="w-full h-full flex justify-center">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && <TryoutAttempt tryout={data.result} />}
        </div>
    );
}
