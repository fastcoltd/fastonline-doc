# Regression Checklist

Use this checklist after every selector simplification batch.

## Static Checks

Run:

```bash
node scripts/build-pages.js
git diff --check
```

If JS changed, run syntax checks for each changed JS file, for example:

```bash
node --check js/common.js
```

## Baseline Setup

Create a temporary baseline from `HEAD` without touching the current worktree:

```bash
rm -rf /tmp/fastresp-server-web-baseline
git worktree add --detach /tmp/fastresp-server-web-baseline HEAD
```

Serve current and baseline builds on different ports:

```bash
python3 -m http.server 4173
python3 -m http.server 4174
```

Use `4173` for the current worktree and `4174` for the baseline worktree.

Clean up after verification:

```bash
git worktree remove /tmp/fastresp-server-web-baseline --force
```

## Visual Regression

Test at least:

- PC viewport: `1440x900`
- Mobile viewport: `375x812`

For the changed component:

- Open the same generated root page in current and baseline.
- Trigger the same UI state, such as opening a dropdown.
- Compare screenshots clipped to the changed component and nearby affected area.
- A zero-regression selector refactor should produce identical screenshots for the clipped area.

## Computed Style Checks

Compare current and baseline values for affected nodes:

- bounding rect: `x`, `y`, `width`, `height`
- `display`
- `padding`
- `margin`
- `font-family`
- `font-size`
- `font-weight`
- `line-height`
- `color`
- `background-color`
- `border-radius`
- `cursor`
- `gap`
- flex/grid alignment values

Expected difference should be limited to removed class names or intentionally changed selector hooks.

## Behavior Checks

For changed interactive modules, verify:

- menu/dialog/filter opens and closes
- option selection updates state and text
- selected/active/disabled state classes still apply
- search/navigation URL parameters remain unchanged from baseline
- keyboard or enter behavior remains unchanged when relevant
- related modules that share the same JS helper still work

If a behavior looks wrong, run the same test against baseline before changing it. If baseline has the same behavior, report it as pre-existing.

## Final Notes

- Do not leave temporary servers running.
- Do not leave temporary worktrees behind.
- Do not keep browser viewport overrides after verification.
- Summarize exact checks performed in the final response.

## Whole-Page Stage Gate

For whole-page refactors, each stage must finish with:

- build completed
- static checks completed
- visual and behavior regression completed for that stage
- stage commit created
- stage commit pushed

Do not begin the next stage until all items above are complete. If commit or push is blocked, stop and report the exact blocker.
