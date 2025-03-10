export interface SubmissionAnswer {
    question: string;
    answer: boolean | null;
    correct: boolean;
}

export interface Submission {
    _id: string;
    createdAt: string;
    tryoutId: string;
    tryoutTitle: string;
    answers: SubmissionAnswer[];
}

export interface Question {
    question: string;
    answer: boolean;
}

export interface TryoutInfo {
    _id: string;
    title: string;
    smallDescription?: string;
    fullDescription?: string;
    createdAt: string;
    categories: string[];
    questions: string[];
    submissionCount: number;
}

export interface FullTryoutInfo {
    _id: string;
    title: string;
    smallDescription?: string;
    fullDescription?: string;
    createdAt: string;
    categories: string[];
    questions: Question[];
    submissionCount: number;
}

export interface APIResult<T> {
    status: number;
    result: T;
}
