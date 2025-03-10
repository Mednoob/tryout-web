import { useState } from "react";

import { BoxButton } from "./Buttons";
import { Markdown } from "./Markdown";
import { FullTryoutInfo } from "../typings/index";

export function TryoutEditor({ tryout, onSubmit }: { tryout?: FullTryoutInfo, onSubmit: (tryout: FullTryoutInfo) => void }) {
    const [title, setTitle] = useState(tryout?.title || '');
    const [smallDescription, setSmallDescription] = useState(tryout?.smallDescription || '');
    const [fullDescription, setFullDescription] = useState(tryout?.fullDescription || '');
    const [questions, setQuestions] = useState(tryout?.questions || []);

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ _id: tryout?._id || "", title, smallDescription, fullDescription, categories: [], questions, createdAt: tryout?.createdAt || "" });
        }}>
            <div className="w-full flex justify-between items-center">
                <p className="text-2xl font-bold">Tryout Editor</p>
                <BoxButton type="submit" color="normal">Submit</BoxButton>
            </div>
            <div className="flex w-full gap-10">
                <div className="w-full">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="smallDescription" className="block text-sm font-medium text-gray-700">Small Description</label>
                    <input
                        id="smallDescription"
                        name="smallDescription"
                        value={smallDescription}
                        onChange={(e) => setSmallDescription(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="flex w-full gap-10">
                <div className="w-full">
                    <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">Full Description</label>
                    <textarea
                        id="fullDescription"
                        name="fullDescription"
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        className="mt-1 p-2 h-96 resize-none block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="markdown" className="block text-sm font-medium text-gray-700">Markdown Preview</label>
                    <div className="mt-1 h-96 max-h-96 overflow-auto border border-black">
                        <Markdown>{fullDescription}</Markdown>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-between">
                    <p className="text-xl font-bold">Questions</p>
                    <BoxButton type="button" color="normal" onClick={() => setQuestions([...questions, { question: "Sample Question", answer: true }])}>
                        Add Question
                    </BoxButton>
                </div>
                <div className="mt-5 w-full flex flex-col items-center gap-5">
                    {questions.length
                        ? (
                            questions.map((question, i) => (
                                <div key={i} className="relative w-full rounded p-5 border border-black">
                                    <div className="font-bold text-lg flex">
                                        <p className="inline-block whitespace-pre-wrap">{i+1}. </p>
                                        <input
                                            type="text"
                                            value={question.question}
                                            onChange={(e) => setQuestions(questions.map((q, j) => i === j ? { ...q, question: e.target.value } : q))}
                                            className="inline-block border-b-2 border-black focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="block">
                                            <input
                                                type="radio"
                                                id={`true-${i}`}
                                                name={`answer-${i}`}
                                                value="true"
                                                checked={question.answer}
                                                onChange={() => setQuestions(questions.map((q, j) => i === j ? { ...q, answer: true } : q))}
                                                />
                                            <label htmlFor={`true-${i}`} className="ml-1">True</label>
                                        </div>

                                        <div className="block">
                                            <input
                                                type="radio"
                                                id={`false-${i}`}
                                                name={`answer-${i}`}
                                                value="false"
                                                checked={!question.answer}
                                                onChange={() => setQuestions(questions.map((q, j) => i === j ? { ...q, answer: false } : q))}
                                                />
                                            <label htmlFor={`false-${i}`} className="ml-1">False</label>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <BoxButton type="button" color="danger" onClick={() => setQuestions(questions.filter((_, j) => i !== j))}>
                                            Remove
                                        </BoxButton>
                                    </div>
                                </div>
                            ))
                        )
                        : <p>No questions found</p>
                    }
                </div>
            </div>
        </form>
    );
}
