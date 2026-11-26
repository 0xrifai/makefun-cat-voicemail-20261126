import { mkdirSync, writeFileSync } from "node:fs";

// Funniest Cat Voicemail Greeting — make.fun entry.
// One line, at most 120 characters: the voicemail a cat would record.
// The joke turns voicemail-system language into cat behaviour: the cat
// screens calls like a fussy receptionist, then files every message
// under "ignore, in the order received" — polite, bureaucratic, and
// exactly how a cat treats its humans.

const OUTPUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 120;

// The greeting is assembled from named parts so each beat of the joke
// can be read, tuned, and checked on its own.
const OPENER = "You've reached the cat.";
const SCREENING = "I'm screening your call.";
const BEEP_CUE = "Leave a message after the beep";
const PUNCHLINE = "I'll ignore it in the order received";

// The exact line this entry submits, kept as a single literal so the
// assembled greeting can be checked against it character for character.
const EXPECTED_LINE =
  "You've reached the cat. I'm screening your call. Leave a message after the beep — I'll ignore it in the order received";

/** Collapse any stray line breaks or repeated spaces to a single line. */
function normalizeSingleLine(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").replace(/[ \t]{2,}/g, " ").trim();
}

/** Count characters the way the gate does (code points, not bytes). */
function charCount(text: string): number {
  return [...text].length;
}

/** Assemble the greeting: opener, screening, beep cue, then the punch. */
function buildGreeting(): string {
  const beforeBeep = [OPENER, SCREENING, BEEP_CUE].join(" ");
  const greeting = `${beforeBeep} — ${PUNCHLINE}`;
  return normalizeSingleLine(greeting);
}

/**
 * Voicemail framing check: a real greeting names the beep before the
 * sign-off, so the caller knows when to talk. The punchline must land
 * after the beep cue, never before it — otherwise the joke fires while
 * the caller is still waiting for the tone.
 */
function checkBeepOrder(greeting: string): void {
  const beepAt = greeting.indexOf(BEEP_CUE);
  const punchAt = greeting.indexOf(PUNCHLINE);
  if (beepAt === -1) {
    throw new Error("greeting never tells the caller about the beep");
  }
  if (punchAt === -1 || punchAt < beepAt) {
    throw new Error("punchline must come after the beep cue");
  }
}

/** Name each beat of the joke, so a log line shows the shape of it. */
function describeBeats(): string {
  const beats = [
    `opener: ${OPENER}`,
    `screening: ${SCREENING}`,
    `beep: ${BEEP_CUE}`,
    `punch: ${PUNCHLINE}`,
  ];
  return beats.join(" | ");
}

/** The gate: UTF-8 text of 1–120 characters, not only whitespace. */
function assertGate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("greeting must not be only whitespace");
  }
  const n = charCount(text);
  if (n < MIN_CHARS || n > MAX_CHARS) {
    throw new Error(`greeting is ${n} chars, outside the ${MIN_CHARS}–${MAX_CHARS} gate`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("greeting must be a single line");
  }
}

/** Write the greeting to the absolute output path the grader reads. */
function writeEntry(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

function main(): void {
  const greeting = buildGreeting();
  if (greeting !== EXPECTED_LINE) {
    throw new Error(
      `assembled greeting differs from the intended line (${charCount(greeting)} chars)`,
    );
  }
  assertGate(greeting);
  checkBeepOrder(greeting);
  writeEntry(greeting);
  console.log(describeBeats());
  console.log(`wrote ${charCount(greeting)} chars to ${OUTPUT_PATH}`);
}

main();
