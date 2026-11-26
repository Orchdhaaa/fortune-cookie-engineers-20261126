// Fortune Cookie Funnies for Engineers — make.fun program/v1 entry.
//
// The program prints one fortune-cookie line for a software engineer and
// saves it where the judge looks for it: /output/entry.txt.
//
// The line itself lives in one place (FORTUNE below) so the whole entry is
// easy to audit: a single sentence, 120 characters or fewer, with the joke
// landing on the last words.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The fortune. Second-person future tense, like a real cookie slip:
// good news first (fast approval), then the twist (the merge conflict
// outlives you). 83 characters, one line, no em dash.
const FORTUNE =
  "Your pull request will be approved in seconds. The merge conflict will outlive you.";

// The gate allows 1 to 120 characters of UTF-8 text, single line.
const MAX_CHARS = 120;

// Where the grader reads the entry. An explicit output directory is
// honoured when the harness sets one; otherwise the documented path.
const OUTPUT_FILE =
  (process.env.MAKEFUN_OUTPUT_DIR
    ? `${process.env.MAKEFUN_OUTPUT_DIR.replace(/\/+$/, "")}/entry.txt`
    : "/output/entry.txt");

function checkFortune(text: string): void {
  if (text.length === 0) {
    throw new Error("fortune is empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `fortune is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("fortune must not start or end with whitespace");
  }
  if (text.includes("—") || text.includes("–")) {
    throw new Error("fortune must not contain a dash");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("fortune must not contain control characters");
  }
}

function main(): void {
  const text = FORTUNE;
  checkFortune(text);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, text, "utf8");
}

main();
