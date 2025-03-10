import { Hono } from "hono";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { SubmissionModel } from "../models/Submission.ts";
import { TryoutModel } from "../models/Tryout.ts";

export const submissionRouter = new Hono().basePath("/submission");

const createSchema = z.object({
    tryoutId: z.string(),
    answers: z.array(z.boolean().or(z.null()))
});

submissionRouter.post("/", zValidator("json", createSchema), async c => {
    const data = c.req.valid("json");

    const tryout = await TryoutModel.findById(data.tryoutId);
    if (!tryout) {
        return c.json({ status: 400, message: `Tryout with id '${data.tryoutId}' doesn't exists.` });
    }

    if (tryout.questions.length !== data.answers.length) {
        return c.json({ status: 400, message: "Invalid answers length." });
    }

    const submissionData = {
        tryoutId: data.tryoutId,
        tryoutTitle: tryout.title,
        answers: data.answers.map((answer, index) => ({
            question: tryout.questions[index].question,
            answer,
            correct: tryout.questions[index].answer
        }))
    };

    const submission = await SubmissionModel.create(submissionData);
    return c.json({ status: 200, message: "Submission Created", result: submission._id.toString() });
});

submissionRouter.get("/", async c => {
    const submissions = await SubmissionModel.find();

    return c.json({ status: 200, result: submissions });
});

submissionRouter.get("/:id", async c => {
    const submission = await SubmissionModel.findById(c.req.param().id);

    if (!submission) {
        return c.json({ status: 400, message: `Submission with id '${c.req.param().id}' doesn't exists.` });
    }

    return c.json({ status: 200, result: submission });
});
