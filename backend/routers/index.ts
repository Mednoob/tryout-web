import { Hono } from "hono";

import { submissionRouter } from "./submission.ts";
import { categoryRouter } from "./category.ts";
import { tryoutRouter } from "./tryout.ts";

export const apiRouter = new Hono().basePath("/api");

apiRouter.route("/", submissionRouter);
apiRouter.route("/", categoryRouter);
apiRouter.route("/", tryoutRouter);
