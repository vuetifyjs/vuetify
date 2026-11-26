# useHotkey / VHotkey vs TanStack Hotkeys

Compared against TanStack Hotkeys `dd07879` (v0.25.0, beta, 2026-11-07) and `@vuetify/v0` `useHotkey` at `fd02fd646`. TanStack paths are relative to `packages/hotkeys/src`.

## Where we were

`useHotkey` (`packages/vuetify/src/composables/hotkey/hotkey.ts`) adds one `window` listener per call, for `keydown` or `keyup` depending on `event`, and compares `event.key` plus exact modifier flags against a parsed string. `VHotkey` renders the same strings with its own platform check and key map. Inside Vuetify the only consumer is labs `VCommandPalette`, which registers item hotkeys with `inputs: true`.

v0 has its own copy (`zero/packages/0/src/composables/useHotkey`), with these differences:

- Input detection uses an allowlist of text input types and also blocks `role` `textbox`, `searchbox`, `combobox` and `spinbutton`.
- iPhone/iPad user agents count as Apple. iPadOS Safari already sends `Macintosh` by default, so this mostly changes iPhone.
- `stopPropagation` option, default `false`. TanStack defaults to `true`.
- Returns `{ isActive, isPaused, pause, resume, stop }` where Vuetify returns a cleanup function.
- Matches modifier-only bindings such as `ctrl` or `shift-shift`. Vuetify's never fire.

## Verified gaps

Checked by dispatching each event against the `useHotkey` from before this change (temporary spec, deleted afterwards).

| Binding | Event | Fired | Expected |
| --- | --- | --- | --- |
| `ctrl+x-ctrl+c` | Ctrl+X, Control pressed again, Ctrl+C | no | yes. The Control keydown reset the sequence |
| `g-g` | G, then G auto-repeat | yes | no |
| `enter` | Enter with `isComposing` | yes | no. IME Enter commits text |
| `alt+k` | macOS Option+K (`key: '˚'`, `code: 'KeyK'`) | no | yes |
| `ctrl+k` | Russian layout (`key: 'л'`, `code: 'KeyK'`) | no | yes |
| `ctrl+1` | AZERTY (`key: '&'`, `code: 'Digit1'`) | no | yes |
| `shift+1` | US (`key: '!'`, `code: 'Digit1'`) | no | yes |
| `?`, `plus` | US Shift+/ and Shift+= | no | yes |
| `k` | checkbox focused | no | yes |
| `ctrl+s`, `escape` | text input focused | no | arguable. TanStack fires both by default |
| `cmd+s` with `event: 'keyup'` | macOS | no (by TanStack's analysis, not dispatched) | yes. macOS drops the keyup of a key released while Cmd is held |

Two registrations of the same key both fire on one press. Fine until matching gets fuzzier.

## How TanStack handles each

Core is `_match.ts` and `_keyboard-event.ts`. Behavior is written up in `docs/guides/sensible-defaults.md`.

**Logical key first, position as fallback.** Match `event.key`. Fall back to `event.code` mapped to its US QWERTY key only when the character can't name a shortcut (`positionStandsIn`, `_match.ts:93`):

- `Unidentified`, except on letter positions
- dead keys
- the digit row (AZERTY `&` for 1)
- ASCII symbols typed with Shift (`!` for Shift+1)
- non-Latin characters, or anything typed with Alt (Russian `л`, macOS Option `˚`)
- Latin letters on punctuation keys with Ctrl/Meta (German Cmd+ü fires `Mod+[`)

ASCII letters and named keys never fall back.

**Implicit Shift for symbols.** A binding of `?` or `+` matches when the event typed exactly that character, even with Shift held. Letters stay strict. Exact matches score 3, implicit-Shift matches 2 and fallbacks 1, and the manager only fires the best-scoring registrations on a target (`hotkey-manager.ts:1314`).

**Composition.** Ignored when `isComposing`, `keyCode === 229`, or `key === 'Process'`. Safari sends the committing Enter after `compositionend` with `keyCode` 229.

**AltGr.** Off macOS, `getModifierState('AltGraph')` marks character entry. Then nothing matches a Ctrl or Alt binding and there is no position fallback, so typing `@` or `ś` never runs `ctrl+alt+…`.

**Sequences.** Modifier-only keydowns don't break a sequence, auto-repeats are not steps, and a wrong key that equals the first step restarts the attempt (`G X G G` completes `G G`).

**Inputs.** `ignoreInputs: 'auto'`: plain keys and Shift/Alt chords are ignored in text fields, while Ctrl/Meta chords and Escape fire. Text fields come from a denylist, so unknown input types count as text and read-only inputs don't. Focused widgets keep their own keys, following WAI-ARIA APG: Enter/Space on buttons, arrows in listbox/menu/grid (`_event-target.ts:197`).

**Escape and native layers.** Escape is left to an open modal `<dialog>` or popover when the hotkey's target isn't inside it (`_event-target.ts:356`). `ignoreDefaultPrevented` skips keys a component library already handled, the usual case being a dialog closing on Escape.

**keyup.** A keyup chord fires when its key or one of its modifiers is released, so it survives macOS dropping keyups under Cmd.

**Held keys.** `KeyStateTracker` clears held keys on window blur, `visibilitychange` and native context menus, and when a modifier is released.

**Other options.** `target` for element-scoped hotkeys, `capture`, `stopPropagation`, `requireReset` (once per press), conflict warnings, scopes, and one listener per target instead of one per hotkey.

**Physical bindings.** `[KeyS]` in a string, or `{ code: 'KeyS' }`, matches `event.code` exactly.

Shadow DOM is not a gap for us: Vuetify's `getActiveElement` already walks shadow roots.

## What changed in this branch

- **Composition:** skipped (`isComposing`, `keyCode` 229, `Process`).
- **Sequences:** modifier-only keydowns don't reset them, auto-repeats don't advance them, and a wrong key that equals the first step restarts the attempt. Auto-repeat still fires single-step hotkeys, so holding `+` keeps zooming.
- **Position fallback:** TanStack's rules, with two guards:
  - AltGr off macOS blocks both the fallback and direct matches against Ctrl/Alt bindings.
  - While a text field has focus, the fallback needs Ctrl, Meta or Alt, so typing Russian in a field with `inputs: true` doesn't trigger plain-letter bindings.
- **Input detection:** text input types, textarea, select, contenteditable, and `role` `textbox`/`searchbox` block every key. Other inputs (checkbox, radio, range, button types) only keep Space, Enter, arrows, Home/End and PageUp/PageDown when no Ctrl/Meta/Alt is held.
- **Apple detection:** `useHotkey` and `VHotkey` both count iPhone/iPad/iPod user agents as Apple, so display and behavior agree.

Behavior that existing apps may notice:

- **Newly firing:**
  - `alt+…` with macOS Option, including Option dead keys (`alt+e`)
  - Ctrl/Meta chords on non-Latin layouts
  - plain letters on non-Latin layouts outside text fields
  - digit bindings on AZERTY
  - `shift+1` / `shift+/` on US
  - `ctrl+[` from German ü
- **Double firing:** no scoring yet, so separate `&` and `1` registrations both fire on AZERTY.
- **Sequences:** a held key no longer completes one.
- **Focused checkboxes and button inputs:** no longer block hotkeys on keys they don't use.

These widen when hotkeys fire rather than changing existing exact matches, so the branch is `dev`.

Tests: one table in `hotkey.spec.ts` covers fallback cases, composition, the sequence fixes, AltGr, and focused checkbox/text inputs.

## Recording

TanStack's `HotkeyRecorder` (`hotkey-recorder.ts`, `_recorder-chord.ts`, `_recording-guard.ts`):

- Records physical positions by default (`recordBy: 'code'`). Option+S on macOS records `Alt+[KeyS]`, not `Alt+ß`. `recordBy: 'key'` records characters.
- Escape cancels. Backspace/Delete removes the last step or clears. Enter commits a multi-step recording, and an optional idle timeout commits too.
- Skips modifier-only presses, composition, auto-repeat, and AltGr character entry. Typing in other text fields passes through.
- Pauses every registered hotkey while recording, and keeps the recorded keys' repeats and keyups from reaching them after commit, so pressing Ctrl+S to record it doesn't also save.
- `validate` and conflict detection reject a candidate without leaving recording mode.

Implemented here as `useHotkeyRecorder` (`composables/hotkey/hotkey-recorder.ts`):

- It listens on the element the dev binds it to, not on the document. Calling `preventDefault` and `stopPropagation` there keeps recorded keys from `useHotkey`, which listens on `window` in the bubble phase. No global recording flag is needed.
- `recordBy: 'code'` produces `ctrl+[KeyS]`. The new physical token is matched against `event.code` and rendered by `VHotkey` as the US key (`S`). `recordBy: 'key'` produces the typed character with separators spelled out (`shift+plus`). Use it to check what the logical matcher sees.
- Enter commits, Escape cancels, Backspace/Delete removes a step or clears, a chord past `maxSteps` starts over, and unmodified Tab and Shift+Tab pass through so keyboard users can leave the field. It skips composition, modifier-only presses, auto-repeat and AltGr. The Windows key is skipped too, because `meta` means Ctrl outside macOS.
- Keyups of recorded keys are stopped even after the recording ends, with a release on modifier keyup for macOS.
- Conflict checks are left to the app.

## Still open

- **Implicit Shift for symbols.** Makes `plus` and `?` work without `shift+` variants, but without scoring `?` and `shift+?` registered together would both fire. Needs a registry.
- **Ctrl/Meta chords and Escape inside text fields.** TanStack fires them by default. Changing our default breaks apps that rely on the current one, so `next` or an opt-in `inputs: 'auto'`.
- **keyup on macOS.** Fire a keyup binding when one of its modifiers is released.
- **Escape and overlays.** Leave Escape to an open VDialog/VOverlay or native `<dialog>`, or offer `ignoreDefaultPrevented`.
- **New options:** `target`, `stopPropagation`, `requireReset`. These go on `dev`.
- **v0's return shape** `{ pause, resume, stop, isActive }`: breaking, `next`.
- **Shared registry with one listener per target.** Enables scoring, conflict warnings, scopes, the recording guard, and a cheat sheet built from registered hotkeys.

- **Space in `VHotkey` strings.** Display-only grouping from the original component, rendered without "or". `useHotkey` doesn't match it, and a string like `shift+left up right down` reads as Shift on every arrow. Decide whether it stays as a gapless grouping (arrow clusters) or goes.

## v0

Vuetify will rebuild on v0, and the two copies already differ. The fixes here port to v0 with one caveat: v0 supports modifier-only bindings, so skipping modifier keydowns there must only apply while a binding is waiting for a non-modifier key. Registry, recorder and new options should be designed in v0 and re-exported here.
