import { createFileRoute } from "@tanstack/react-router";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

import { SubmissionList } from "../../components/SubmissionList";

import { SUBMISSION_API } from "../../utils/api";
import { APIResult, Submission } from "../../typings";

export const Route = createFileRoute('/submission/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading, error } = useSWRImmutable(`${SUBMISSION_API}`, async (url) => {
        const res = await axios.get<APIResult<Submission[]>>(url);

        return res.data;
    });

    return (
        <div className="w-full flex justify-center p-20">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && (
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex justify-center">
                        <p className="font-bold text-3xl">Submission List</p>
                    </div>
                    <SubmissionList submissions={data.result} />
                </div>
            )}
        </div>
    );
}
