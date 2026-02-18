# VNavigationDrawer Rail Mode Text Visibility Fix

## Issue Description

When using `VNavigationDrawer` with the `rail` prop set to `true`, if the list item spacer width is reduced by setting the CSS variable `--v-list-prepend-gap` to a small or zero value, list item text will incorrectly show at the edge of the drawer instead of being completely hidden.

### Reproduction Steps
1. Create a VNavigationDrawer with `rail` prop enabled
2. Add list items with text/title
3. Set `--v-list-prepend-gap` CSS variable to `0px` or a very small value
4. **Expected**: Text should be completely hidden (overflow: hidden)
5. **Actual**: Text starts showing at the edge

### Root Cause

The issue was introduced by commit `5c9dcb3` which added `min-width: 40px` to `.v-list-item__content` to fix a TreeView accessibility issue (#21387). 

However, when a list item is rendered inside a VNavigationDrawer in rail mode:
- Rail mode width is 56px
- Content prepend area (icon) takes ~24-36px depending on density
- If `--v-list-prepend-gap` is 0px, only ~20-32px is left for content
- The `min-width: 40px` on content forces it to overflow beyond the 56px boundary
- Although parent has `overflow: hidden`, some text still appears at the edge

#### Layout breakdown for rail mode with reduced gap:
```
[drawer: 56px]
  ├─ icon: ~24-28px
  ├─ spacer: 0px (via --v-list-prepend-gap: 0px)
  └─ content: min-width: 40px (OVERFLOWS when <40px available)
```

## Solution

Override the `min-width` property to `0` for `.v-list-item__content` when inside a VNavigationDrawer in rail mode (both collapsed and "expand on hover" collapsed states).

This allows the content area to shrink to 0 width, ensuring proper text hiding via the existing `overflow: hidden`.

### Code Changes

**File**: `packages/vuetify/src/components/VList/VListItem.sass`

```scss
.v-list-item__content
  align-self: center
  grid-area: content
  overflow: hidden
  min-width: $list-item-content-min-width

  // NEW: Reset min-width for rail mode to allow content to shrink
  .v-navigation-drawer--rail:not(.v-navigation-drawer--expand-on-hover) &,
  .v-navigation-drawer--rail.v-navigation-drawer--expand-on-hover:not(.v-navigation-drawer--is-hovering) &
    min-width: 0
```

### Why This Solution Works

1. **Preserves accessibility fix**: The `min-width: 40px` remains for normal (non-rail) list items, maintaining the TreeView accessibility fix from #21387

2. **Respects parent container**: In rail mode, the content area can now shrink below 40px, respecting the parent drawer width constraint

3. **Leverages existing overflow handling**: The `.v-list-item__content` already has `overflow: hidden`, so with `min-width: 0`, text is properly hidden rather than overflowing

4. **Handles both rail states**: Covers both:
   - `v-navigation-drawer--rail:not(.v-navigation-drawer--expand-on-hover)` - standard rail mode
   - `v-navigation-drawer--rail.v-navigation-drawer--expand-on-hover:not(.v-navigation-drawer--is-hovering)` - rail mode when hover-expanded is collapsed

## Files Changed

1. **`packages/vuetify/src/components/VList/VListItem.sass`**
   - Added nested CSS rule to override `min-width` for rail mode

2. **`packages/vuetify/src/components/VNavigationDrawer/__tests__/VNavigationDrawer.spec.browser.tsx`**
   - Added test case: `should hide list item text in rail mode with reduced prepend gap`
   - Verifies that content area has `min-width: 0px` when in rail mode
   - Added VList and VListItem imports

3. **`packages/docs/src/examples/v-navigation-drawer/issue-rail-text-visibility.vue`** (new)
   - Example component demonstrating the fix
   - Shows VNavigationDrawer in rail mode with reduced `--v-list-prepend-gap`

## Testing

The fix includes a new browser test that:
1. Renders a VNavigationDrawer in rail mode with `--v-list-prepend-gap: 0px`
2. Creates list items with icon and title
3. Verifies that `.v-list-item__content` has computed `min-width: 0px`

### Manual Testing

To verify the fix:
1. Create a VNavigationDrawer with `rail` prop and `style="--v-list-prepend-gap: 0px"`
2. Add list items with text
3. Text should be completely hidden within the 56px rail width
4. Expanding the drawer (via expandOnHover) should show the text

## Impact Analysis

- **Backward Compatible**: Yes - only affects rail mode behavior
- **Accessibility Impact**: None - preserves TreeView accessibility fix
- **Performance Impact**: None - simple CSS override
- **CSS Specificity**: Higher specificity than base rule, ensuring override works

## Related Issues

- Fixes: Issue where list item text is visible in rail mode with reduced gap
- Related to: #21387 (TreeView overflow fix that caused this issue)
- Commit: 5c9dcb3 (introduced the min-width that caused the problem)
