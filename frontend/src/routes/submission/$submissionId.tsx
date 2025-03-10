import { createFileRoute } from "@tanstack/react-router";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

import { APIResult, Submission } from "../../typings";
import { SUBMISSION_API } from "../../utils/api";
import { formatDate } from "../../utils/formatDate";

export const Route = createFileRoute('/submission/$submissionId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { submissionId } = Route.useParams()
    const { data, error, isLoading } = useSWRImmutable(`${SUBMISSION_API}/${submissionId}`, async (url) => {
        const res = await axios.get<APIResult<Submission>>(url)

        return res.data
    });

    return (
        <div className="w-full h-full flex flex-col items-center px-20 py-10">
            {error && <div>Error: {error.message}</div>}
            {!error && isLoading && <div>Loading...</div>}
            {data && (
                <div className="w-full h-full flex flex-col">
                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-5">
                        <div className="flex flex-col">
                            <p className="font-bold text-gray-400 mb-2">SUBMISSION</p>
                            <p className="font-bold text-2xl">{data.result.tryoutTitle}</p>
                            <p className="text-gray-500 text-sm mt-2">{formatDate(new Date(data.result.createdAt))}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                            <p>Answered</p>
                            <p>{data.result.answers.filter(x => x.answer !== null).length} / {data.result.answers.length} Questions</p>
                            <p>Correct Answers</p>
                            <p>{data.result.answers.filter(x => x.answer === x.correct).length} / {data.result.answers.length} Questions</p>
                        </div>
                    </div>
                    <div className="flex flex-col px-10 gap-5">
                        {data.result.answers.map((answer, i) => (
                            <div key={i} className="flex justify-between items-center border-b-2 border-gray-300 py-5">
                                <p>{i + 1}. {answer.question}</p>
                                <p>{answer.answer === null ? "Not Answered" : answer.answer === answer.correct ? "Correct" : "Incorrect"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
