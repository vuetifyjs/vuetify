---
name: docs-writing
description: Use when writing or editing prose in packages/docs pages (guide sections, example intros) or api-generator descriptions in packages/api-generator/src/locale/en
---

# Docs writing

Readers come to a docs page to find basic intro, examples and occasional callouts. They can already access the API table, the usage demo and the examples. Text earns a place only when it says something those don't.

## Cut before you write

Ask of every sentence: would a reader get this wrong without it? If not, delete it.

- avoid stating obvious - what demo or the example code already shows
- implementation details usually don't matter, keep only what matters to reader. If it works the way people expect, say nothing
- avoid edge-value trivia nobody runs into
- Links the API table at the top of the page already has

What stays: things people get wrong, defaults a container imposes, and choices between two ways of doing something.

Less text/information is usually better. We want to aid their discovery process, not replace it.

## Example descriptions

Start from what the developer is trying to accomplish, then point to the prop. Name the general purpose, not one narrow use case. Leave values and object forms to the example code, and order the example so it reads on its own, simplest value first.

## Shape

- One fact per sentence, plain subject and plain verb
- In rare cases it is better to render a table instead of a long convoluted sentence
- Double-check prop names and values

## Machine tone

Rewrite on sight:

- Parallel clauses joined by commas, each repeating the same template
- A colon followed by three items
- "serves as", "acts as" instead of "is"
- A trailing -ing clause that adds a payoff nobody asked for
- "Not X, but Y" when only Y matters

Background: [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), [Google developer docs style: voice and tone](https://developers.google.com/style/tone).

## API descriptions

`packages/api-generator/src/locale/en/*.json`

- One sentence, two at most. Start with what it is
- Don't restate the default; the API table within docs already shows it
- Related props in bold, components as links to their API page

## Before calling it done

Reread the text as a developer trying to get something working. Delete any sentences that get too deep into technical details or a list of capabilities that never says when to use them.
