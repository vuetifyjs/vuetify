---
name: docs-writing
description: Use when writing or editing prose in packages/docs pages (guide sections, example intros) or api-generator descriptions in packages/api-generator/src/locale/en
---

# Docs writing

Readers come to a docs page to find basic intro, examples and occasional callouts. They can already access the API table, the usage demo and the examples. Text earns a place only when it says something those don't.

Composable pages (`pages/en/features/`) have no inline API table. Their options and defaults belong on the page, in a compact table.

## Check facts first

Older pages carry facts from earlier majors and sentences copied from sibling pages. A page that reads well can still be wrong.

- Confirm each claim in the source under `packages/vuetify/src` and in the example file it introduces, not only prop names
- Code snippets must run: the import exists and is public, every variable is defined, values match current defaults
- External links point to what the text claims (`KeyboardEvent.key` is not `KeyboardEvent.code`)
- A bug in the code or in an API description found along the way gets reported, not fixed in the docs pass

## Cut before you write

Ask of every sentence: would a reader get this wrong without it? If not, delete it.

- avoid stating obvious - what demo or the example code already shows
- implementation details usually don't matter, keep only what matters to reader. If it works the way people expect, say nothing. Rendered HTML dumps rarely pass
- avoid edge-value trivia nobody runs into
- Links the API table at the top of the page already has
- "Best practices", "Key features" and bold-label lists (**When to use:** …) usually repeat the page. Keep only the items that pass the question above

What stays: things people get wrong, defaults a container imposes, and choices between two ways of doing something.

Less text/information is usually better. We want to aid their discovery process, not replace it.

## Thin pages

No guide is better than filler, but "Coming soon" or a page that hides a gotcha is not done. Add only from the "what stays" list, a sentence or two each. Don't add examples or sections to fill the page.

## Example descriptions

Start from what the developer is trying to accomplish, then point to the prop. Name the general purpose, not one narrow use case. Leave values and object forms to the example code, and order the example so it reads on its own, simplest value first.

When the heading already says it all, write no description.

## Shape

- One fact per sentence, plain subject and plain verb
- In rare cases it is better to render a table instead of a long convoluted sentence
- Double-check prop names and values
- Use "X does Y" only for what happens on its own. For something developers can choose to do, write "Use X to …" or "X allows to …" (meaning matters, not an exact template).

## Machine tone

Rewrite on sight:

- Parallel clauses joined by commas, each repeating the same template
- A colon followed by three items
- "serves as", "acts as" instead of "is"
- A trailing -ing or ", so …" clause that adds a payoff nobody asked for
- "Not X, but Y" when only Y matters
- Filler adverbs: "easily", "seamlessly", "automatically" when nothing manual was expected

Background: [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), [Google developer docs style: voice and tone](https://developers.google.com/style/tone).

## API descriptions

`packages/api-generator/src/locale/en/*.json`

- One sentence, two at most. Start with what it is
- Don't restate the default; the API table within docs already shows it
- Related props in bold, components as links to their API page

## Before calling it done

Reread the text as a developer trying to get something working. Delete any sentences that get too deep into technical details or a list of capabilities that never says when to use them.

On a page that already reads well, expect a diff of a few lines. Leave sentences that pass unchanged.
