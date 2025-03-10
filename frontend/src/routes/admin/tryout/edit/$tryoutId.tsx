import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import useSWR from "swr";

import { TryoutEditor } from "../../../../components/TryoutEditor";
import { APIResult, FullTryoutInfo } from "../../../../typings";
import { TRYOUT_API } from "../../../../utils/api";

export const Route = createFileRoute("/admin/tryout/edit/$tryoutId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { tryoutId } = Route.useParams();
    const { data, error } = useSWR(`${TRYOUT_API}/${tryoutId}`, async (url) => {
        const res = await axios.get<APIResult<FullTryoutInfo>>(url);

        return res.data;
    });

    return (
        <div className="w-full flex justify-center p-20">
            {error && <div>Error: {error.message}</div>}
            {!error && !data && <div>Loading...</div>}
            {data && <TryoutEditor tryout={data.result} onSubmit={async (tryout) => {
                await axios.put(`${TRYOUT_API}/${tryoutId}`, tryout);

                window.location.href = "/admin/tryout";
            }} />}
        </div>
    )
}
