import mongoose from "mongoose";

export interface APITryoutInfo {
    _id: mongoose.Types.ObjectId;
    title: string;
    fullDescription: string;
    smallDescription: string;
    createdAt: Date;
    categories: string[];
    questions: string[];
    submissionCount: number;
}

export interface APIFullTryoutInfo {
    _id: mongoose.Types.ObjectId;
    title: string;
    fullDescription: string;
    smallDescription: string;
    createdAt: Date;
    categories: string[];
    questions: { question: string; answer: boolean }[];
    submissionCount: number;
}
