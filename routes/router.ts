import * as express from "express";
import * as path from "path";

export const router: express.Router = express.Router();

router.get("/", (_req: express.Request, res: express.Response): void => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
