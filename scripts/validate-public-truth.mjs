#!/usr/bin/env node
import { validatePublicTruth } from "../src/lib/truth.ts";

const errors = validatePublicTruth({
  siteUrl: process.env.PUBLIC_SITE_URL,
  contactEmail: process.env.PUBLIC_CONTACT_EMAIL,
  securityEmail: process.env.PUBLIC_SECURITY_EMAIL,
});

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log("Public truth env gate passed");
