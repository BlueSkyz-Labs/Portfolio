import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";

for (const file of ["dist/index.html", "dist/404.html"]) {
  assert.ok(existsSync(file), `${file} must exist`);
  assert.ok(statSync(file).size > 0, `${file} must not be empty`);
}

assert.ok(existsSync("dist/_headers"), "dist/_headers must exist");

console.log("Static export verified");
