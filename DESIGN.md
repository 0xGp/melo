---
name: MELO
description: Spend-to-own protocol — void black, committed violet, Geist.
colors:
  void: "#050014"
  foreground: "#f4f0ff"
  violet: "#a78bfa"
  violet-hot: "#ddd6fe"
  violet-deep: "#2e1065"
  mark: "#f9a2db"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.35rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  data:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  control: "9999px"
  plate: "16px"
spacing:
  section-y: "7rem"
  gutter: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.violet-hot}"
    textColor: "{colors.void}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.void}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  input-email:
    backgroundColor: "rgba(0,0,0,0.4)"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
---

# DESIGN.md

## Overview

**Creative North Star: "The gravity well of spending."**

MELO’s marketing surface is a black field with one committed violet. The first viewport is a ray-traced accretion disk — not a screenshot of an app. Copy sits in the dark left (or the top on a phone). Violet is the action and the close, not a sprinkle of accents.

**Key Characteristics:**

- Void black (`#050014`) as the page ground.
- Violet as the committed page hue: disk, primary pills, vault field.
- Identity mark: the user-supplied arched m in pink (`#F9A2DB`).
- Geist light for display, Geist medium for section titles, Geist Mono only for tickers and the ledger.
- Hairline `white/10` rings, 16px plates, pill controls.

**The One Hue Rule.** Page chroma is violet. The identity mark is the one exception: the supplied pink m.

## Colors

The scene is night. Ground is `#050014`. Foreground is `#f4f0ff`. Action and heat are `#ddd6fe` on black and white on `#2e1065`. Body copy on the void is `#ddd6fe` at about 70% so it stays in-hue. Selection and focus use violet, never browser blue.

**The In-Hue Rule.** Secondary text is a dimmer violet-hot, not slate gray.

## Typography

Display is Geist at weight 300, tracking −0.03em, never heavier than the picture behind it. Section titles are weight 500. Mono is reserved for tickers, share counts, and the blotter header — not for slogans.

**The Measure Rule.** Display does not exceed ~4.35rem. Body stays near 1.125rem / 1.6.

## Layout

Max content width 1440px. Horizontal gutter 24px → 40px → 80px. Sections use ~7rem vertical padding and more space above a heading than below it. First viewport is full `100svh`. Hash targets clear the 5.5rem fixed nav.

Desktop hero: copy left, hole right. Mobile hero: copy top, hole low-center.

## Elevation & Depth

One language: a 1px `rgba(255,255,255,0.10)` ring and a soft offset shadow `0 24px 48px rgba(0,0,0,0.45)` on plates. The vault close is a flat violet field, not a card on a card. Backdrop blur on the nav is for legibility over the hole, not decoration.

## Shapes

Pills (`9999px`) for controls and the primary CTA. Plates at 16px. The mark is the supplied arched m — three pink strokes, transparent ground — locked up with the MELO wordmark.

## Components

**Primary button.** Violet-hot fill, void text, pill, 12×24 padding. Hover goes white.

**Secondary button.** Transparent, `white/20` hairline, white/80 label.

**Nav.** Fixed, `void/85` plus blur, pink m-mark + MELO wordmark left, links center-right from `md`, Connect pill at the end.

**Bento plate.** 16px radius, photographic fill with a violet-black scrim, ticker in mono, title in 2xl, body in-hue.

**Ledger.** Full-width ringed table. Mono tickers and tabular figures. Alternate rows at `violet/4`.

**Vault field.** Full-bleed `#2e1065`. Amount input is a 48px pill on `black/40`. Connect is a violet-hot pill; a connected address is a hairline pill.

**Whitepaper.** Long measure (~42rem) on void. Title first, version byline after. Contents as a hairline list. Parameter table reuses the ledger ring. Close is the same violet-hot pill, pointing at `/#vault`.

## Do's and Don'ts

**Do**

- Put the black hole in the first viewport and keep copy off its busy half.
- Label illustrative ledgers as demonstration data.
- Use Geist Mono only for instruments (tickers, shares, emails).
- Let one section be violet (the close).

**Don't**

- Invent waitlist counts, volume, or merchant contracts.
- Use gradient text, numbered step cards, or kickers above section titles.
- Introduce a second accent (emerald, blue, gold).
- Set display type heavier than the picture.
