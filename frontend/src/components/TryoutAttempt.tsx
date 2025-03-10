import { useState } from "react";
import axios from "axios";

import { SUBMISSION_API } from "../utils/api";
import { BoxButton } from "./Buttons";
import { FullTryoutInfo } from "../typings";

export function TryoutAttempt({ tryout }: { tryout: FullTryoutInfo }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(tryout.questions.length).fill(null));

    function handleAnswer(questionIndex: number, answer: boolean) {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = answer;

            return newAnswers;
        });
    }

    async function handleSubmit() {
        if (isSubmitting) return;

        setIsSubmitting(true);
        const submitted = await axios.post(SUBMISSION_API, {
            tryoutId: tryout._id,
            answers
        });

        setIsSubmitting(false);

        if (submitted.status === 200) {
            const data = submitted.data as { result: string };
            window.location.href = `/submission/${data.result}`;
        }
    }

    return (
        <div className="w-full flex flex-col p-10">
            <div className="flex justify-center border-b-2 border-gray-300 pb-5">
                <p className="font-bold text-2xl">{tryout.title}</p>
            </div>
            <div className="w-full flex">
                <div className="w-64 h-96 flex flex-col items-center p-3 border-r-2 border-gray-300">
                    <p>Questions</p>
                    <div className="w-full mt-1">
                        {tryout.questions.map((_, i) => (
                            <div key={i} className={`inline-block border border-black rounded text-center py-1 px-2 mx-1 mt-1 cursor-pointer ${currentQuestionIndex === i ? "bg-gray-300" : answers[i] !== null ? "bg-green-200" : ""}`} onClick={() => setCurrentQuestionIndex(i)}>
                                <p>{i + 1}</p>
                            </div>
                        ))}
                    </div>
                    <BoxButton type="button" color="normal" onClick={handleSubmit} className="mt-5">End Tryout</BoxButton>
                </div>
                <div className="w-full flex flex-col justify-between h-full px-7 pt-7">
                    <div>
                        <p className="font-bold text-lg">{currentQuestionIndex + 1}. {tryout.questions[currentQuestionIndex].question}</p>
                        <div className="mt-5">
                            <div className="block">
                                <input
                                    type="radio"
                                    id="true"
                                    name="answer"
                                    value="true"
                                    checked={answers[currentQuestionIndex] === true}
                                    onChange={() => handleAnswer(currentQuestionIndex, true)}
                                />
                                <label htmlFor="true" className="ml-1">True</label>
                            </div>
                            <div className="block">
                                <input
                                    type="radio"
                                    id="false"
                                    name="answer"
                                    value="false"
                                    checked={answers[currentQuestionIndex] === false}
                                    onChange={() => handleAnswer(currentQuestionIndex, false)}
                                />
                                <label htmlFor="false" className="ml-1">False</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <BoxButton color="normal" disabled={currentQuestionIndex <= 0} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                            Previous Question
                        </BoxButton>
                        <BoxButton color="normal" onClick={() => currentQuestionIndex === tryout.questions.length - 1 ? handleSubmit() : setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                            {currentQuestionIndex === tryout.questions.length - 1 ? "End Tryout" : "Next Question"}
                        </BoxButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
