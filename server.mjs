import { createServer, STATUS_CODES } from "node:http";
import { readFileSync } from "node:fs";
import { setTimeout } from "node:timers/promises";

let variantsRaw;
/**
 * ÐŸÐ¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ Ñ„Ð°Ð¹Ð» Ñ Ð²Ð°Ñ€Ð¸Ð°Ð½Ñ‚Ð°Ð¼Ð¸ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð»ÐµÐ¶Ð°Ñ‚ÑŒ Ñ€ÑÐ´Ð¾Ð¼ Ñ server.mjs
 */
try {
  variantsRaw = readFileSync("./variants.json", "utf-8");
} catch (error) {
  if (error?.code === "ENOENT") {
    console.error(
      "Ð¤Ð°Ð¹Ð» variants.json Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð½Ð°Ñ…Ð¾Ð´Ð¸Ñ‚ÑŒÑÑ Ñ€ÑÐ´Ð¾Ð¼ Ñ server.mjs"
    );
  }

  throw error;
}

// ÐŸÐ¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ Ð²Ð°Ñ€Ð¸Ð°Ð½Ñ‚Ñ‹ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ñ‹ JSON Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ
try {
  JSON.parse(variantsRaw);
} catch (error) {
  console.error(
    "Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ Ð½ÐµÐ²Ð°Ð»Ð¸Ð´Ð½Ñ‹Ð¹ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ Ð´Ð°Ð½Ð½Ñ‹Ñ… (Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ json) Ð¸Ð»Ð¸ json ÑÐ»Ð¾Ð¼Ð°Ð½"
  );

  throw error;
}

const server = createServer();

server.on("request", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  console.info(`[inconming message]: ${req.method} ${url.pathname}`);

  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-allow-origin", "*");

  if (/^\/get-variants\/?$/.test(url.pathname)) {
    if (req.method !== "GET") {
      return notAllowed(res);
    }

    res.setHeader("Content-Type", "application/json");

    await setTimeout(1000);

    res.write(variantsRaw);

    res.end();

    return;
  }

  if (/^\/save-variant\/?$/.test(url.pathname)) {
    if (req.method !== "POST") {
      return notAllowed(res);
    }

    res.setHeader("Content-Type", "text/plain");

    res.write(STATUS_CODES[200]);

    res.end();

    return;
  }

  res.statusCode = 404;

  res.write(STATUS_CODES[404]);

  res.end();
});

function notAllowed(res) {
  res.statusCode = 405;

  res.write(STATUS_CODES[405]);

  res.end();
}

server.listen(8080, () => {
  console.info(`Server start on http://localhost:8080/`);
});