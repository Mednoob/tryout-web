import { Hono } from "hono";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { APIFullTryoutInfo, APITryoutInfo } from "../typings/index.d.ts";
import { SubmissionModel } from "../models/Submission.ts";
import { TryoutClass, TryoutModel } from "../models/Tryout.ts";
import { CategoryModel } from "../models/Category.ts";
import mongoose from "mongoose";

export const tryoutRouter = new Hono().basePath("/tryout");

const createSchema = z.object({
    title: z.string(),
    smallDescription: z.optional(z.string()),
    fullDescription: z.optional(z.string()),
    categories: z.optional(z.array(z.string())),
    questions: z.optional(z.array(z.object({
        question: z.string(),
        answer: z.boolean()
    })))
});

function toInfo(tryout: TryoutClass & { _id: mongoose.Types.ObjectId }, submissionCount: number): APITryoutInfo {
    return {
        _id: tryout._id,
        title: tryout.title,
        fullDescription: tryout.fullDescription || "",
        smallDescription: tryout.smallDescription || "",
        createdAt: tryout.createdAt,
        categories: tryout.categories,
        questions: tryout.questions.map(x => x.question),
        submissionCount
    };
}

tryoutRouter.post("/", zValidator("json", createSchema), async (c) => {
    const data = c.req.valid("json");

    const tryout = {
        title: data.title,
        smallDescription: data.smallDescription,
        fullDescription: data.fullDescription,
        categories: [] as string[],
        questions: data.questions
    };

    for (const category of data.categories || []) {
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return c.json({ status: 400, message: `Category with id '${category}' doesn't exists.` });
        }

        tryout.categories.push(category);
    }

    TryoutModel.create(tryout);

    return c.json({ status: 200, message: "Tryout Created" });
});

tryoutRouter.get("/", async c => {
    const tryouts = await TryoutModel.find();
    const submissions = await SubmissionModel.find();

    return c.json({
        status: 200,
        result: tryouts.map(tryout => toInfo(tryout, submissions.filter(x => x.tryoutId === tryout._id.toString()).length)) });
});

tryoutRouter.get("/:id", async c => {
    const tryout = await TryoutModel.findById(c.req.param().id);
    if (!tryout) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' doesn't exists.` });
    }

    const submissions = await SubmissionModel.find({ tryoutId: tryout._id.toString() });

    return c.json({ status: 200, result: toInfo(tryout, submissions.length) });
});

tryoutRouter.get("/:id/questions", async c => {
    const tryout = await TryoutModel.findById(c.req.param().id);
    if (!tryout) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' doesn't exists.` });
    }

    return c.json({ status: 200, result: tryout.questions.map(x => x.question) });
});

tryoutRouter.get("/:id/full-info", async c => {
    const tryout = await TryoutModel.findById(c.req.param().id);
    if (!tryout) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' doesn't exists.` });
    }

    const submissions = await SubmissionModel.find({ tryoutId: tryout._id.toString() });

    const fullInfo: APIFullTryoutInfo = {
        _id: tryout._id,
        title: tryout.title,
        fullDescription: tryout.fullDescription || "",
        smallDescription: tryout.smallDescription || "",
        createdAt: tryout.createdAt,
        categories: tryout.categories,
        questions: tryout.questions,
        submissionCount: submissions.length
    };

    return c.json({ status: 200, result: fullInfo });
});

tryoutRouter.put("/:id", zValidator("json", createSchema), async c => {
    const data = c.req.valid("json");

    const tryoutExists = await TryoutModel.findById(c.req.param().id);
    if (!tryoutExists) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' doesn't exists.`});
    }

    const submissions = await SubmissionModel.find({ tryoutId: c.req.param().id });
    if (submissions.length > 0) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' has submissions, can't be updated.` });
    }

    const tryout = {
        title: data.title,
        smallDescription: data.smallDescription,
        fullDescription: data.fullDescription,
        categories: [] as string[],
        questions: data.questions
    };

    for (const category of data.categories || []) {
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return c.json({ status: 400, message: `Category with id '${category}' doesn't exists.` });
        }

        tryout.categories.push(category);
    }

    await TryoutModel.findByIdAndUpdate(c.req.param().id, tryout);

    return c.json({ status: 200, message: "Tryout Updated" });
});

tryoutRouter.delete("/:id", async c => {
    await TryoutModel.findByIdAndDelete(c.req.param().id);

    return c.json({ status: 200, message: "Tryout Deleted" });
});
