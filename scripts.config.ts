import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";
const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run index.tsx",
      desc: "run my index.tsx file",
      allow: ["env", "net"],
      env: await env()
    },
    
  },
};

export default config;
