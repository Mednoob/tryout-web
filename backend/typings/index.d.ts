import mongoose from "mongoose";

export interface APITryoutInfo {
    _id: mongoose.Types.ObjectId;
    title: string;
    fullDescription: string;
    smallDescription: string;
    createdAt: Date;
    categories: string[];
    questionCount: number;
}
