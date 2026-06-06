import * as express from "express";

export const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response): void => {
    console.log(req.oidc.isAuthenticated());

    console.log("Access Token:", req.oidc.accessToken?.access_token);
    console.log("ID Token:", req.oidc.idToken);
    console.log("Full token set:", req.oidc.accessToken);

    if (!req.oidc.isAuthenticated()) {
        res.type("html").send(/* HTML */ `
            <h1>auth0:</h1>
            <p>not logged in.</p>
            <a href="/signup">Sign up</a><br />
            <a href="/login">Log in</a>
        `);
        return;
    }

    const username: string = req.oidc.user?.["name"];

    res.type("html").send(/* HTML */ `
        <h1>profiles:</h1>
        <p>logged in as ${username}</p>
        <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
        <a href="/logout">Log out</a>
    `);
});
