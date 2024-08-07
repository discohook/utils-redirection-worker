import { AutoRouter, json, type IRequest } from "itty-router";

const redirect = (path: string, env: Env, status = 301) =>
  new Response(undefined, {
    status,
    headers: {
      Location: `${env.DISCOHOOK_ORIGIN}${path}`,
    },
  });

const to = (path: string) => (_: IRequest, env: Env) => redirect(path, env);

const warning =
  "This service is not supported anymore. Switch to https://discohook.app, which now supports this feature natively.";

const router = AutoRouter()
  .get("/scheduler/*", to("/guide/deprecated/discoscheduler"))
  .get("/invite", to("/bot"))
  .get("/support", to("/discord"))
  .get("/bot/formatting", to("/guide/getting-started/formatting"))
  .options("/api/*", (request) => {
    const { host, origin } = new URL(request.url);
    new Response(undefined, {
      status: 204,
      headers: [
        "dutils.shay.cat",
        "discohook.org",
        "www.discohook.org",
        "discohook.app",
        "www.discohook.app",
      ].includes(host)
        ? {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": origin,
          }
        : {},
    });
  })
  .get("/api/v1/users/:id", () =>
    json({
      message: warning,
      name: "deprecated",
      discriminator: "0",
    }),
  )
  .get("/api/v1/roles/:id", () =>
    json({
      message: warning,
      name: "deprecated",
      color: 0,
    }),
  )
  .get("/api/v1/channels/:id", () =>
    json({
      message: warning,
      name: "deprecated",
      type: 0,
    }),
  )
  .get("*", to("/guide/deprecated/migrate-utils"));

export default router;
