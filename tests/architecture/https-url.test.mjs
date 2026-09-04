import assert from "node:assert/strict";
import test from "node:test";
import { isHttpsUrl } from "../../src/lib/https-url.ts";

test("isHttpsUrl accepts only https absolute URLs", () => {
  assert.equal(isHttpsUrl("https://blueskyz.labs/products/"), true);
  assert.equal(isHttpsUrl("http://blueskyz.labs/"), false);
  assert.equal(isHttpsUrl("javascript:alert(1)"), false);
  assert.equal(isHttpsUrl("data:text/html,hi"), false);
  assert.equal(isHttpsUrl("mailto:owner@blueskyz.labs"), false);
  assert.equal(isHttpsUrl("/relative"), false);
});
