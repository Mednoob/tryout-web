import { createFileRoute } from "@tanstack/react-router";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

import { Submission } from "../../typings";
import { SUBMISSION_API } from "../../utils/api";
import { formatDate } from "../../utils/formatDate";

export const Route = createFileRoute('/submission/$submissionId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { submissionId } = Route.useParams()
    const { data, error, isLoading } = useSWRImmutable(`${SUBMISSION_API}/${submissionId}`, async (url) => {
        const res = await axios.get<Submission>(url)

        return res.data
    });

    return (
        <div className="w-full h-full flex flex-col items-center px-20 py-10">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && (
                <div className="w-full h-full flex">
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-5">
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-400 mb-2">SUBMISSION</p>
                                <p className="font-bold text-2xl">{data.tryoutTitle}</p>
                                <p className="text-gray-500 text-sm mt-2">{formatDate(new Date(data.createdAt))}</p>
                            </div>
                        </div>
                        <div className="w-full max-w-full overflow-auto">
                            <p>Meh</p>
                        </div>
                    </div>
                    <div className="h-full flex flex-col px-10 gap-5 border-l-2 border-gray-300">
                        
                    </div>
                </div>
            )}
        </div>
    )
}
