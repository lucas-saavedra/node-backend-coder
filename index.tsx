import { Application, Router } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { React, ReactDOMServer } from "./dep.ts";
import App from "./components/App.tsx";

const PORT = Deno.env.get("PORT") || 8080;

const app = new Application();
const router = new Router();
router.get("/", (ctx) => {
  ctx.response.headers = new Headers({
    "content-type": "text/html; charset=UTF-8",
  });
  ctx.response.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Deno</title>
    </head>
    <body >
        <div id="root">${ReactDOMServer.renderToString(<App />)}
        </div>
    </body>
    </html>`;
});
router.post("/", async (ctx) => {
  const color = await ctx.request.body().value;
  console.log(JSON.parse(color));
});

app.use(router.routes());

await app.listen({ port: +PORT });
/* app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>Deno</title>
        </head>
        <body >
            <div id="root">${ReactDOMServer.renderToString(<App />)}
            </div>
        </body>
        </html>`,
  });
}); */

/* app.listen({ port: +PORT });

const router = new Router();
router.post("/", (context) => {
  console.log(context.request.body);
});
router.get("/", (context) => {
  context.response.body = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">

          <title>Deno</title>
      </head>
      <body >
          <div id="root">${ReactDOMServer.renderToString(<App />)}
          </div>
      </body>
      </html>`;
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: +PORT });
console.log(`server is running on port: ${+PORT}`); */
