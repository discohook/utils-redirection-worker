import { AutoRouter, type IRequest } from "itty-router";

const redirect = (path: string, env: Env, status = 301) =>
  new Response(undefined, {
    status,
    headers: {
      Location: `${env.DISCOHOOK_ORIGIN}${path}`,
    },
  });

const to = (path: string) => (_: IRequest, env: Env) => redirect(path, env);

const router = AutoRouter()
  .get("/scheduler/*", to("/guide/deprecated/discoscheduler"))
  .get("/invite", to("/bot"))
  .get("/support", to("/discord"))
  .get("/bot/formatting", to("/guide/getting-started/formatting"))
  .get("*", to("/guide/deprecated/migrate-utils"));

export default router;
