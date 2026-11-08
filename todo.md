# Hotkey follow-ups (dev)

Still in the working tree, uncommitted.

- [ ] **Layout fallback.** `positionKey` + `codeToKey` in `hotkey.ts`/`key-aliases.ts`, AltGr guard (`isAltGraph`), and while a text field has focus the fallback needs Ctrl/Meta/Alt. Tests: Option, Russian, AZERTY, Shift+digit, AltGr, letters/symbols that must not fall back. Docs: "Keys match the character…" line. Widens when hotkeys fire; separate `&` and `1` registrations both fire on AZERTY until there is scoring.
- [ ] **`[code]` physical keys.** `physicalCode` in `matchesKeyGroup`, `physicalKeyName` in `VHotkey`. Tests: physical key match/mismatch. Docs: bracket code line.
- [ ] **`useHotkeyRecorder`.** `hotkey-recorder.ts`, exports in `hotkey/index.ts` and `composables/index.ts`, `hotkey-recorder.spec.ts`, `api-generator/src/locale/en/useHotkeyRecorder.json`, docs "Recording hotkeys" section. Needs `[code]` for `recordBy: 'code'` and the `isAltGraph`/`isComposing`/`isModifierKey` exports.
