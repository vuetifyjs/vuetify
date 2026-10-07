# Layout SSR fix: scenarios, risks, related issues

https://play.vuetifyjs.com/playgrounds/z3A4wA

## Scenario results (server HTML vs hydrated page)

The playground has 26 numbered cases. A compare script measures every layout child with JS off and with JS on, and compares the boxes, z-order and `v-main` padding.

- **Match (20 cases):** 1–9, 11–17, 20, 21, 23–25. This covers two drawers, system bar + app bar, prominent/compact/extended app bars, the `#extension` slot, a bottom app bar, bottom navigation, `v-model=false`, expand-on-hover, RTL `start`, scrollable main, and a right-side `30%` drawer.
- **Known limits (4 cases):**
  - **10** (app bar `order="-1"` placed after the drawer in the DOM) and **22** (`overlaps`): an item can't react during SSR to siblings that register after it. The drawer covers the bar until hydration.
  - **18** (`height="auto"` footer): SSR assumes 32px until the ResizeObserver measures it.
  - **19** (`height="20%"` footer): `v-main` gets no bottom padding until measured.
- **26** (drawer open on the server, closed on the client) is a deliberate mismatch on the app side. Vue warns about it, and the page still ends up correct after hydration.

Two more fixes came out of these cases, both in `layout.ts`:

- **`overlaps` (22):** the overlap amount was added to the cached `items` entry on every style recompute, so it piled up. Mounted, the drawer sat at top 193px. It now works on a copy. This existed on `master`, but the change made it recompute more often, which made it worse.
- **Vertical percentages (19):** `v-main` no longer gets a `calc(20%)` top/bottom padding, which CSS resolved against the width and turned into 193px.

Related specs (692 tests), typecheck and eslint pass.

## Risks

1. **Hydration recovery depends on a style re-patch.** Vue doesn't fix `style` mismatches during hydration. When server and client compute different offsets (case 26), the DOM keeps the server value until the element re-renders. Before this change, every item re-rendered on mount because the styles grew. Now the recovery comes from two things:
   - the z-index switch on mount re-renders the items;
   - `v-main` re-renders when `ssrBootStyles` changes one frame later.

   Vue rewrites every key whenever it patches a style object, so both of these overwrite the server values. If either trigger goes away (for example, the z-index switch is removed), an app with a hydration mismatch could keep stale padding. In our own cases, server and client compute the same thing.
2. **Client-only apps now compute offsets on the first render**, where they used to wait for mount. Siblings that register later still get fixed in the scheduler flush before paint. Everything checked passes, but VLayout layouts in user apps that add `order` or `v-if` items are covered by nothing beyond the 692 related specs.
3. **Z-index values before mount are lower**, starting at `root` and going down by 2 per item, instead of `root + 2N`. The relative order of layout items stays the same. User content with a z-index between those two ranges could sit on the other side of a layout item for that one frame.
4. **The app bar's extension check before mount** uses whether the slot exists, while VToolbar checks whether the slot rendered anything. An `#extension` slot that renders nothing gives 48px until mount.
5. **VAppBar's scroll thresholds** (`useScroll` `layoutSize`) now start at the real height instead of 0.
6. **Mounted behaviour didn't change.** The z-index formula after mount and the mounted styles are the same as before, which fits a `master` fix.

## Issues this fixes

- **#22925**: `permanent` `rail` drawer flashes on load in Nuxt SSR. With no width in SSR it rendered at content width, then shrank to 56px. That's case 5. Fixed.
- **#22944**: the same code (the repro repo copies #22925's example). It's a duplicate and is fixed too. The comment there blaming the SSR window size is a red herring for this repro, because `permanent` ignores the mobile breakpoint.
- **#15202** (app bar collapses on reload, SSR): closed. The comments from Nuxt v4 users describe the main top padding jump, which the VAppBar part of this fixes.

## Overlapping PRs

- **#20563** (userquin, `fix(VAppBar): vertical main layout shift on SSR`, base `master`). It uses the same idea as the VAppBar change here: compute the height from props when there's no VToolbar ref yet. This change replaces it. Differences:
  - It only patches `height`. `appBarHeight`, which feeds `useScroll`, stays 0 before mount.
  - It calls `slots.extension?.()` inside a computed, which renders the slot outside a render function. This change checks `!!slots.extension`.
  - It doesn't touch `layout.ts`, so the drawer and main still had no offsets or size before mount. That's probably why it seemed to make "no difference", and then "the app bar shifts because of the sidebar".

  Close it in favour of this one.
- **#23078** (`fix(VToolbar): parse string height/extensionHeight`, fixes #22007): it edits the height formula that moved into `VToolbar/toolbar.ts`, so it will conflict. Either retarget it there or fold `parseFloat` into `useToolbarHeight`.
- **#22301** (`fix(VFab, VFooter)`, #20398): it touches `useLayoutItem` in `layout.ts` in a different hunk, so a trivial rebase. Non-app footers would then register as inactive items, which still compute pre-mount styles. They're unused, so it's harmless.
- **#21118** (draft, base `dev`, removes `findChildrenWithProvide`): conflicts in `register` and in the `isMounted` block. Pushing items in registration order matches setup order, which this fix relies on in SSR.
- **#23043** (base `next`, VFooter padding in measured height): different lines, no conflict.
