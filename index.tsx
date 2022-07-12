import {
  contentTypeFilter,
  createApp,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react@17.0.2/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@17.0.2/server.js";

import App from "./components/App.tsx";

const PORT = Deno.env.get("PORT") || 8080;
const colorList: Array<string> = [];
const app = createApp();
app.post(
  "/",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("color");
    colorList.push(color);
  },
);
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body style={{ background: "black" }}>
          {App(colorList)}
        </body>
      </html>,
    ),
  });
});
app.listen({ port: +PORT });
