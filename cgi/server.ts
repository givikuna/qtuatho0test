import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import { auth, ConfigParams } from "express-openid-connect";

import { router } from "../routes/router";

const PORT: number = 3000;

const app: express.Application = express.default();

const config: ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env["SECRET"]!,
    baseURL: process.env["BASE_URL"]!,
    clientID: process.env["CLIENT_ID"]!,
    issuerBaseURL: process.env["ISSUER_BASE_URL"]!,
};

app.use(auth(config));

app.use("/", router);

app.listen(3000, (): void => console.log(`app on: ${PORT}`));
