import { Hono } from "hono";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { CategoryModel } from "../models/Category.ts";
import { TryoutModel } from "../models/Tryout.ts";

export const categoryRouter = new Hono().basePath("/category");

const createSchema = z.object({
    name: z.string()
});

categoryRouter.post("/", zValidator("json", createSchema), async c => {
    const data = c.req.valid("json");

    const categoryExists = await CategoryModel.findById(data.name);
    if (categoryExists) {
        return c.json({ status: 400, message: `Category with name '${data.name}' already exists.` });
    }

    await CategoryModel.create({ _id: data.name });
    return c.json({ status: 200, message: "Category Created" });
});

categoryRouter.get("/", async c => {
    const categories = await CategoryModel.find();

    return c.json({ status: 200, result: categories });
});

categoryRouter.get("/:id", async c => {
    const category = await CategoryModel.findById(c.req.param().id);
    if (!category) {
        return c.json({ status: 400, message: `Category with id '${c.req.param().id}' doesn't exists.` });
    }

    const tryouts = await TryoutModel.find({ categories: category._id });
    return c.json({ status: 200, result: tryouts });
});

categoryRouter.delete("/:id", async c => {
    const category = await CategoryModel.findById(c.req.param().id);
    if (!category) {
        return c.json({ status: 400, message: `Category with id '${c.req.param().id}' doesn't exists.` });
    }

    await category.deleteOne();
    return c.json({ status: 200, message: "Category Deleted" });
});
