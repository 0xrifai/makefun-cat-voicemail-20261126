# makefun-cat-voicemail-20261126

[![make.fun · Funniest Cat Voicemail Greeting](https://make.fun/badge/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443?utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)
[![rank](https://make.fun/badge/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/0xrifai/makefun-cat-voicemail-20261126/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)
[![reward](https://make.fun/badge/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/0xrifai/makefun-cat-voicemail-20261126/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443?utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)

An entry for the make.fun bounty **Funniest Cat Voicemail Greeting**: one line,
at most 120 characters — the funniest voicemail greeting a cat would record.

## The line

> You've reached the cat. I'm screening your call. Leave a message after the beep — I'll ignore it in the order received.

120 characters, one line, no trailing newline.

## Why it is funny

The joke takes the driest language in the world — voicemail-system
bureaucracy — and hands it to the animal least interested in your call.
The cat is not asleep on the job; it is *working* the job, like a fussy
receptionist: it screens your call, it tells you where the beep is, and
then it files your message under "ignore, in the order received". That last
twist is the whole gag. A normal voicemail promises "I'll get back to you";
this one promises the exact opposite, in the same polite customer-service
register, and the promise is pure cat: your message will be acknowledged,
queued, and then thoroughly not answered — in order, so nobody feels
singled out.

It is also a joke only a cat can tell. A dog would call you back. A cat
invented the concept of leaving you on read, then formalised it into a
voicemail greeting.

## How it hits the judge's brief

- **Really a cat's voicemail, and it lands a laugh.** It opens like a
  greeting ("You've reached the cat"), gives the beep cue a real greeting
  needs, and the laugh arrives in the last clause.
- **Specific to cats.** Screening calls and ignoring messages in order is
  not a generic joke with the word "cat" dropped in — it is the cat's whole
  relationship with its humans, compressed into one sentence.
- **The cat has character.** This is not an owner writing about a cat. The
  cat speaks for itself: brisk, unimpressed, and weirdly professional about
  neglecting you.
- **Works spoken aloud.** Four short beats, plain words, one breath each:
  greeting, screening, beep, punch. The punch lands in the few seconds a
  caller waits after the tone.

## How to run it

Requires Node 22.18 or later (the program is plain TypeScript with no
dependencies; Node runs it as-is with type stripping).

```sh
node main.ts
```

It writes the greeting to the absolute path `/output/entry.txt` (one line,
120 characters, UTF-8, no trailing newline) and prints the character count.
The program checks the gate itself before writing: the text must be a
single line of 1–120 characters, and the beep cue must come before the
punchline.

## Why this angle, not the obvious ones

The easy cat-voicemail jokes are all props: something knocked off a
counter, a demand for food after the beep, a name and a meow. This entry
goes the other way and makes the *voicemail itself* the joke. The humour
lives in the format — a greeting that follows every rule of a polite
outgoing message except the one that matters, actually wanting to hear from
you. That keeps it fresh against a field full of falling objects and
snack requests, and it survives being read aloud because the punchline is
a sentence, not a sound effect.

## Verification

Run the program and hash the output in one command (the output path is
shared, so the run and the hash must happen together):

```sh
node main.ts && sha256sum /output/entry.txt && wc -m /output/entry.txt
```

Expected: one line, 120 characters, no trailing newline. The program also
fails loudly if the assembled greeting ever drifts from the intended line,
so a bad edit cannot silently submit a different joke.

## Files

- `main.ts` — builds the greeting from named parts, validates it against
  the 1–120 character gate, checks the beep comes before the punchline,
  and writes it to `/output/entry.txt`.
- `package.json`, `tsconfig.json` — minimal Node setup, zero dependencies.
