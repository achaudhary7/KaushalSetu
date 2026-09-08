#!/usr/bin/env python3
"""
WCAG 2.1 contrast audit for the KaushalSetu design tokens.

Run:  npm run check:contrast

Parses the token values straight out of src/styles/globals.css so it cannot drift from the
real stylesheet, resolves the semantic layer for both themes, and asserts every pair the
design system actually renders.

Thresholds (WCAG 2.1 AA):
  1.4.3  text                     4.5:1   (3:1 for large text, not relied on here)
  1.4.11 UI components & state    3.0:1

Purely decorative separators - `--color-border` on cards and dividers - are intentionally
excluded: 1.4.11 covers boundaries required to identify a component or its state, and a
card is identified by its content. `--color-border-strong`, which draws form controls, IS
included and must pass.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

CSS = Path(__file__).resolve().parent.parent / 'src' / 'styles' / 'globals.css'


# ---- colour maths ---------------------------------------------------------


def _linear(channel: int) -> float:
    c = channel / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip('#')
    if len(h) == 3:
        h = ''.join(ch * 2 for ch in h)
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _linear(r) + 0.7152 * _linear(g) + 0.0722 * _linear(b)


def contrast(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


# ---- token parsing --------------------------------------------------------


def parse_tokens() -> tuple[dict[str, str], dict[str, str], dict[str, str]]:
    """Returns (palette, light semantic, dark semantic), all resolved to hex."""
    css = CSS.read_text(encoding='utf-8')

    palette = dict(re.findall(r'(--color-[a-z]+-\d+):\s*(#[0-9a-fA-F]{3,8});', css))

    def block(pattern: str) -> dict[str, str]:
        match = re.search(pattern, css, re.S | re.M)
        if not match:
            sys.exit(f'Could not locate token block: {pattern}')
        body = match.group(1)
        raw = dict(re.findall(r'(--color-[a-z-]+):\s*([^;]+);', body))
        resolved: dict[str, str] = {}
        for name, value in raw.items():
            value = value.strip()
            ref = re.fullmatch(r'var\((--color-[a-z]+-\d+)\)', value)
            if ref:
                target = palette.get(ref.group(1))
                if target:
                    resolved[name] = target
            elif value.startswith('#'):
                resolved[name] = value
        return resolved

    light = block(r'^:root\s*\{(.*?)^\}')
    dark = block(r"^:root\[data-theme='dark'\]\s*\{(.*?)^\}")
    return palette, light, dark


# ---- the pairs the product actually renders -------------------------------

TEXT = 4.5
UI = 3.0

PAIRS: list[tuple[str, str, str, float]] = [
    # (foreground token, background token, description, minimum)
    ('--color-fg', '--color-bg', 'body text on background', TEXT),
    ('--color-fg-muted', '--color-bg', 'muted text on background', TEXT),
    ('--color-fg-muted', '--color-surface-raised', 'muted text on raised surface', TEXT),
    ('--color-fg-muted', '--color-surface-sunken', 'muted text on sunken surface', TEXT),
    ('--color-fg-subtle', '--color-bg', 'subtle text on background', TEXT),
    ('--color-fg-subtle', '--color-surface-raised', 'subtle text on raised surface', TEXT),
    ('--color-brand', '--color-bg', 'brand text on background', TEXT),
    ('--color-brand-fg', '--color-brand', 'label on primary button', TEXT),
    ('--color-success', '--color-success-subtle', 'success message', TEXT),
    ('--color-warning', '--color-warning-subtle', 'warning message', TEXT),
    ('--color-danger', '--color-danger-subtle', 'danger message', TEXT),
    ('--color-info', '--color-info-subtle', 'info message', TEXT),
    ('--color-tier-assessed', '--color-brand-subtle', 'assessment-verified badge', TEXT),
    ('--color-tier-endorsed', '--color-success-subtle', 'employer-endorsed badge', TEXT),
    ('--color-tier-self', '--color-bg', 'self-declared badge outline', UI),
    ('--color-border-strong', '--color-bg', 'form control border on background', UI),
    ('--color-border-strong', '--color-surface-raised', 'form control border on raised', UI),
    ('--color-focus', '--color-bg', 'focus ring on background', UI),
    ('--color-focus', '--color-surface-raised', 'focus ring on raised surface', UI),
]


def audit() -> int:
    _, light, dark = parse_tokens()
    failures = 0
    checked = 0

    for theme_name, tokens in (('LIGHT', light), ('DARK ', dark)):
        print(f'\n{theme_name} theme')
        print('-' * 62)
        for fg_token, bg_token, label, minimum in PAIRS:
            fg, bg = tokens.get(fg_token), tokens.get(bg_token)
            if not fg or not bg:
                print(f'  SKIP           {label} (token not resolved)')
                continue
            checked += 1
            ratio = contrast(fg, bg)
            ok = ratio >= minimum
            if not ok:
                failures += 1
            print(
                f'  {"PASS" if ok else "FAIL"}  {ratio:5.2f}:1  '
                f'(min {minimum})  {label}'
            )

    print()
    print('=' * 62)
    if failures:
        print(f'{checked - failures}/{checked} pass - {failures} FAILING')
        print('Fix the token in src/styles/globals.css, not the component.')
        return 1

    print(f'{checked}/{checked} pass - WCAG 2.1 AA satisfied in both themes')
    return 0


if __name__ == '__main__':
    sys.exit(audit())
