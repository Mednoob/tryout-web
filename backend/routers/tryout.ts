import { Hono } from "hono";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { APITryoutInfo } from "../typings/index.d.ts";
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

function toInfo(tryout: TryoutClass & { _id: mongoose.Types.ObjectId }): APITryoutInfo {
    return {
        _id: tryout._id,
        title: tryout.title,
        fullDescription: tryout.fullDescription || "",
        smallDescription: tryout.smallDescription || "",
        createdAt: tryout.createdAt,
        categories: tryout.categories,
        questionCount: tryout.questions.length
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

    return c.json({ status: 200, result: tryouts.map(toInfo) });
});

tryoutRouter.get("/:id", async c => {
    const tryout = await TryoutModel.findById(c.req.param().id);
    if (!tryout) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' doesn't exists.` });
    }

    return c.json({ status: 200, result: tryout });
});

tryoutRouter.put("/:id", zValidator("json", createSchema), async c => {
    const data = c.req.valid("json");

    const tryoutExists = await TryoutModel.findById(c.req.param().id);
    if (!tryoutExists) {
        return c.json({ status: 400, message: `Tryout with id '${c.req.param().id}' doesn't exists.`});
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
