# VDateTimeInput (#459)

## Decisions

- Ship `VDateTimeInput` only, starting in labs and targeting `dev`. No `VDateTimePicker` component.
- "Picker without input" (Gmail / Google Tasks style) is a docs example: `VDatePicker` plus `VTimeInput` inside a `VCard`. Promote it to a component only if there's real demand.
- Reuse the existing pickers: `VDatePicker` and `VTimePicker`, each in its own menu (dialog on mobile). No new picker visuals.
- Parse and format through the date adapter, not a native `<input type="datetime-local">`. Native input can't be copied from and its format is locked to the OS locale.
- Icons are optional. The field must be fully usable without them (design-system constraint).
- Nothing is rendered into `append-inner` by default. Users put things there (e.g. a time zone `VChip`) and the slot must behave like in every other field.

## Constraints

- Must fit MD3 look and feel. The MD3 spec has no datetime guidance.
- No range mode, ever. Ranges are two (or four) separate fields.
- Must work on mobile: one picker at a time.
- Realistic width with a time zone chip in `append-inner` is about 320–340px if we add icons inside the field. With no icons the target is about 250–280px.
- a11y: without icons, pickers must still be discoverable and reachable from the keyboard.
- i18n/RTL: combined format follows the locale. Icon order and caret segment detection must work in RTL.

## Interaction

- **Caret-based opening:** clicking in the date part of the text opens the date picker, and clicking in the time part opens the time picker. We build the formatted string, so the boundary between the parts is known.
- **Keyboard:** Alt+↓ (or F4) opens the picker for the caret's segment. Needs `aria-haspopup` plus a description on the field.
- **Defaults when only one part is set:**
  - picking a date first sets the time to `defaultTime` (`00:00`)
  - picking a time first sets the date to `defaultDate` (today)
- **Typing always works.** The pickers are a helper, not required.

## API sketch

```ts
modelValue: string | null              // local 'YYYY-MM-DDTHH:mm', adapter independent (see Model)
'v-model:menu': 'date' | 'time' | false  // lets any trigger open a picker (chip, outside button)
openOnFocus: boolean                   // as in VTimeInput
defaultTime: string                    // '00:00'
defaultDate: unknown                   // today
dateIcon: IconValue | false            // opt-in, rendered in prepend (VDateInput convention)
timeIcon: IconValue | false            // opt-in
format / ampm / useSeconds             // time part: mirror VTimeInput
datePickerProps / timePickerProps      // passthrough
menuProps
hideActions                            // + #actions slot, as in VDateInput
```

## Model

Local `YYYY-MM-DDTHH:mm` string, independent of the date adapter. `min`/`max` use the same format; a date-only `min`/`max` means start/end of that day.

- An adapter date doesn't work: `StringDateAdapter` serializes to date-only ISO, so `setHours`/`setMinutes` lose the time.
- The field holds a wall-clock time with no time zone. A `Date` is an instant in the browser's zone and moves DST-gap times (e.g. 02:30 → 03:30).
- Same shape as native `datetime-local` and `VTimeInput`'s `HH:mm` string model.
- Matches `Temporal.PlainDateTime` (`from()` / `toString({ smallestUnit: 'minute' })`), so a v5 move to Temporal is a type swap with the same meaning.
- Makes `use-seconds` possible later (`THH:mm:ss`). Not shipped yet.
- Inside: the adapter keeps date-only work (picker value, locale format, allowed-dates); time is plain string handling; clamp is string comparison.

## Rejected

| Option | Why |
|---|---|
| Time columns in a sidebar (Ant / native desktop) | Not MD3, and it's a new time-picker variant. If ever needed, it belongs in `VTimePicker` |
| Time options list (e.g. 30m interval) | Separate feature: a list-style menu in `VTimeInput` (like the Google Tasks dropdown) |
| Date and time pickers side by side | Breaks on mobile; the pickers have different heights |
| Tabs or header toggle (MUI, semi-ui) | Works like a wizard with extra clicks; the header repeats the input; only makes sense with a picker component |
| hour / minute / am-pm spinbuttons below | Already covered by `VTimePicker`'s keyboard input mode |
| Two icons in `append-inner` | Takes width, conflicts with user content in `append-inner` |

## Open questions to dig into

1. Opening on click vs focus:
   - **Click only** (not when tabbing in), and close on typing. Typing stays smooth, but people who Tab in must know about Alt+↓.
   - **Behind `openOnFocus`**, as in `VTimeInput` today. Safer, but then the default needs a visible trigger.
2. Time zones: settled on wall-clock strings (see Model). Still open: should docs show converting a zone-chip value to an instant?
3. Combined format: is it just date format + separator + time format? How do we parse partial or typed input with ampm/24hr and optional seconds? Can we reuse `useDateFormat` and the `VTimeInput` parsing, or do they need extracting?
4. Caret segment detection: does it survive locales where time comes before date, or uses other separators?
5. Mobile: do caret-based opening and `v-model:menu` still work when pickers open as dialogs?
6. Do we keep a default `prepend` icon for parity with `VDateInput`, or default to none?

## Code to read

- `packages/vuetify/src/components/VDateInput/VDateInput.tsx`: menu, `VConfirmEdit`, prepend icon, `useDateFormat`
- `packages/vuetify/src/labs/VTimeInput/VTimeInput.tsx`: time parsing, `openOnFocus`, `menu` prop
- `packages/vuetify/src/components/VInput/InputIcon.tsx`: icon a11y labels
- `packages/vuetify/src/components/VTimePicker/`: `VTimePickerField` (keyboard mode)
- Prior art for dual-icon input: https://github.com/matraic/m3e/blob/c46ec8255da9a7dfd1d313e9b1f59441c96cbdd3/docs/components/date-input.html#L229-L243
