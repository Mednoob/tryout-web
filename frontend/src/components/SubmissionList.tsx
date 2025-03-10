import { Link } from "@tanstack/react-router";

import { formatDate } from "../utils/formatDate";
import { Submission } from "../typings/index";
import { OutlinedButton } from "./Buttons";

export function SubmissionList({ submissions }: { submissions: Submission[] }) {
    console.log(submissions);
    return (
        <div className="flex flex-col items-center w-full h-full">
            {submissions.length
                ? (
                    <div className="w-full h-full grid grid-cols-3 gap-5">
                        {submissions.map((submission) => (
                            <div key={submission._id} className="flex flex-col justify-between border border-black py-2 px-3 gap-4 rounded-lg">
                                <div className="flex flex-col gap-4">
                                    <p className="font-bold text-xl">{submission.tryoutTitle}</p>
                                    <p>{formatDate(new Date(submission.createdAt))}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link to="/submission/$submissionId" params={{ submissionId: submission._id }} className="hover:underline">
                                        <OutlinedButton color="normal">Details</OutlinedButton>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                : <div>No submissions found</div>
            }
        </div>
    )
}
