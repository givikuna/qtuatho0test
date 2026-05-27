import * as express from "express";

import { router } from "../routes/router";

const PORT: number = 3000;

const app: express.Application = express.default();

app.use("/", router);

app.listen(3000, (): void => console.log(`app on: ${PORT}`));
