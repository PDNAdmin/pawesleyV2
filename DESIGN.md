---
name: Forever In Our Heart
description: The family's printed burial programme, re-set as a cinematic film-and-booklet for phones.
colors:
  gold: "#DE992E"
  gold-hi: "#F0B44E"
  gold-ink: "#8C5410"
  gold-ink-lg: "#9A5E0E"
  wine: "#7F2923"
  wine-hi: "#962F28"
  programme-red: "#B90000"
  cinema: "#1E0E05"
  cinema-2: "#2A1408"
  brown: "#642900"
  paper: "#FBF3E2"
  paper-2: "#F4E6C8"
  card-paper: "#FFFCF4"
  field-white: "#FFFFFF"
  ink: "#1C1109"
  ink-soft: "#5A4433"
  on-cinema: "#F7EBD6"
  on-cinema-soft: "#CDB894"
typography:
  display:
    fontFamily: "Reina Neue, Playfair Display, Georgia, serif"
    fontSize: "min(clamp(2.4rem, 1.2rem + 6vw, 6rem), 10.5svh)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Reina Neue, Playfair Display, Georgia, serif"
    fontSize: "clamp(2.4rem, 1.6rem + 3.6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Reina Neue, Playfair Display, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  card-title:
    fontFamily: "Reina Neue, Playfair Display, Georgia, serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.25
  numeral:
    fontFamily: "Reina Neue, Playfair Display, Georgia, serif"
    fontSize: "clamp(2.4rem, 2rem + 2vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "lnum, tnum"
  script:
    fontFamily: "Ludovica, Great Vibes, cursive"
    fontSize: "1.45em"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "0em"
  tall:
    fontFamily: "FounFree, Anton, sans-serif"
    fontSize: "clamp(3.6rem, 12.5vw, 11.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.01em"
  body:
    fontFamily: "Red Hat Display, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0em"
  body-reader:
    fontFamily: "Red Hat Display, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 500
    lineHeight: 1.78
  body-small:
    fontFamily: "Red Hat Display, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Red Hat Display, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "6px"
  field: "10px"
  dialog: "14px"
  sheet: "16px"
  pill: "999px"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4rem"
  s-9: "6rem"
  s-10: "8rem"
  gutter: "clamp(1.25rem, 5vw, 4rem)"
  section: "clamp(4.5rem, 3rem + 6vw, 8.5rem)"
  measure: "66ch"
  maxw: "76rem"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.cinema}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "52px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hi}"
  button-ghost:
    backgroundColor: "rgb(30 14 5 / .25)"
    textColor: "{colors.on-cinema}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "52px"
  button-wine:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.field-white}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    height: "52px"
  button-wine-hover:
    backgroundColor: "{colors.wine-hi}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.2rem"
    height: "48px"
  button-candle:
    backgroundColor: "{colors.cinema}"
    textColor: "{colors.on-cinema}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem 0.75rem 1.1rem"
    height: "52px"
  button-candle-hover:
    backgroundColor: "{colors.brown}"
  button-candle-lit:
    backgroundColor: "{colors.cinema-2}"
    textColor: "{colors.gold-hi}"
  track-button:
    backgroundColor: "{colors.cinema}"
    textColor: "{colors.on-cinema}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1.3rem 0.4rem 0.4rem"
    height: "56px"
  track-button-hover:
    backgroundColor: "{colors.brown}"
  track-button-disabled:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-soft}"
  track-icon:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.cinema}"
    rounded: "{rounded.pill}"
    size: "48px"
  tab-link:
    textColor: "{colors.ink-soft}"
    padding: "0 0.5rem"
    height: "3.75rem"
  tab-link-active:
    textColor: "{colors.ink}"
  text-size-toggle:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 0.7rem"
    height: "44px"
  text-size-toggle-on:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.field-white}"
  lang-toggle:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0 1.05rem"
    height: "48px"
  lang-toggle-selected:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.field-white}"
  date-chip:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.field-white}"
    rounded: "{rounded.sm}"
    padding: "0.28rem 0.8rem"
  relationship-chip:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.1rem"
    height: "48px"
  relationship-chip-selected:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.field-white}"
  quiet-panel:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "1.4rem 1.5rem"
  tribute-card:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.4rem 1.4rem 1.2rem"
  guest-card:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.2rem 1.3rem"
  search-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.1rem"
    height: "52px"
  text-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.85rem 1rem"
    height: "52px"
  dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    width: "min(46rem, calc(100vw - 2rem))"
  toast:
    backgroundColor: "{colors.cinema}"
    textColor: "{colors.on-cinema}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.3rem"
  film-play-disc:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.cinema}"
    rounded: "{rounded.pill}"
    size: "clamp(64px, 9vw, 84px)"
  player-bar:
    backgroundColor: "{colors.cinema}"
    textColor: "{colors.on-cinema}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.6rem 0.5rem 0.5rem"
    width: "min(40rem, calc(100vw - 1.5rem))"
---

# Design System: Forever In Our Heart

## Overview

**Creative North Star: "The Programme, Projected"**

The family's printed burial programme, re-set for screens as a film and a booklet that alternate. Deep programme-brown grounds carry the cinematic moments (the cover showreel, the Biography hush, the photo rail, the film, the closing Appreciation); warm cream paper carries everything that is read (the funeral service, the order, the liturgy and hymns, the life, the tributes). The palette, the four type voices and the section order are the printed booklet's own, not house defaults; the job of this system is to keep them and make them legible for an elder reading on a phone in a church.

Density is generous and calm. Body text never drops below 17px, every control is at least 48px, and reading columns hold a 66ch measure; a guest can raise all text by 15% from the tab bar. Gold behaves as light: hairline rules, numerals, the play control, the primary action, the reading-progress line, and the one place light is literal, the candles. Wine is the liturgy's voice, the selected state and the act of writing. Motion is slow and documentary (photographs push in, words develop out of blur, blocks rise once into full ink) and never surprises: nothing autoplays with sound, and reduced motion is honoured.

The memorial-template look (pastel hero, clip-art candle icon, an undifferentiated card grid as the page's structure) and a literal scan of the print (dense dot fields, crowded centred blocks) are both confirmed rejections. The tributes are opened as numbered programme entries in the booklet's order, and the candle is drawn as a living flame; neither is the template.

**Key Characteristics:**
- Two grounds, cinema brown and cream paper, alternating by chapter; never a third.
- Gold as light, deeper gold steps as text on paper.
- Didone for names and headings, script only for the programme's own script words, a tall condensed face for the single Biography title, Red Hat Display for everything read.
- Hairline rules and tonal panels for reading; quiet, hairline-ringed cards only for things a guest opens; pills for every touch control.
- Real text over all video; the showreel and film poster carry no baked words.
- Glow is candlelight only.

## Colors

A warm, low-key programme palette: two browns and a cream as grounds, gold as light, wine as voice, and one drop of print red.

### Primary
- **Programme Gold** (gold): the print gold, used as light. Primary button fill, play-control discs (including the large film play disc), hairline section rules (1.5px), the 55% gold rule above tribute and reader signatures, the 2px reading-progress line under the tabs, the player seek accent and hymn equaliser bars, the selection highlight, the Biography title on cinema. On paper it is a rule or fill, never text.
- **Lamp Gold** (gold-hi): gold for small text and hover on cinema grounds (the "Pa." in the hero name, film and colophon links, the photo-rail closing line, the lit candle button, focus rings on dark), and the body of the candle flame and candle lights.
- **Gold Ink** (gold-ink): gold as small text on paper, 5.4:1. Numbers in the order list, verse numbers, column labels, officiant roles, tribute numbers and signatures, guest names, the reader's "n of N" count, Yorùbá sub-headings.
- **Gold Ink, Large** (gold-ink-lg): gold as large text on paper, 4.6:1. Item numerals, the darkroom year, the honoured name in the funeral service.

### Secondary
- **Liturgy Wine** (wine): liturgy speaker names, the grave-side column head, the script words in item titles, the selected language button, the selected relationship chip, the larger-text toggle when on, the active tab underline, the date chip, the "Read the tribute" link, the write-a-message button, field focus borders, the form error, the closing line of the biography, focus rings on paper, the skip link.
- **Wine, Lifted** (wine-hi): hover on wine-filled buttons only.

### Tertiary
- **Programme Red** (programme-red): the print's small red tab, used once: the "of" box in the Biography title. Not an accent to spread.

### Neutral
- **Cinema** (cinema): the film ground. Hero, hush, photo rail, film, appreciation, player bar, primary track buttons, the candle button, the toast.
- **Cinema Raised** (cinema-2): a raised surface on cinema: dark track buttons, photo placeholders, the lit candle button.
- **Print Brown** (brown): the programme's exact brown; hover fill for track and candle buttons, scrollbar tint, showreel grade.
- **Reading Paper** (paper): the reading ground, the sticky tab bar, and the reader and writing dialogs.
- **Quiet Panel** (paper-2): the one darker tonal panel on paper (church needs, the guest-book mode note, disabled tracks, list hover, round icon buttons).
- **Card Paper** (card-paper): one step lighter than Reading Paper; the tribute cards only.
- **Field White** (field-white): where a guest types or chooses: the search field, text fields, relationship chips, the language switch, the text-size toggle, guest message cards; also the text on wine fills.
- **Ink** (ink) and **Soft Ink** (ink-soft, 8.1:1 on paper): primary and secondary text on paper.
- **Cream on Cinema** (on-cinema) and **Soft Cream** (on-cinema-soft, 9.6:1 on cinema): primary and secondary text on dark grounds.
- Rules are mixed, not new colors: ink at 13% on paper, gold at 30% on cinema, gold at 45% between service items, gold at 55% above signatures and the guest book. The form error is wine at 12% in white. Dialog backdrops are rgb(20 9 3 / .62).

### Named Rules
**The Gold Is Light Rule.** Programme Gold never sets text on paper. Small gold text on paper uses Gold Ink; large gold text uses Gold Ink, Large; gold text on cinema uses Lamp Gold or Programme Gold at display size.

**The Two Grounds Rule.** Every chapter is either cinema or paper. Surfaces on paper go one tonal step: darker (Quiet Panel) for notes, lighter (Card Paper, Field White) for what a guest opens, writes in or chooses. Never a card on a card.

**The Brief-Pinned Palette Rule.** These colors are the printed programme's. Do not substitute "nicer" neutrals or add an accent; new needs are met from these roles. Wine, Lifted, Card Paper and Field White are steps of existing roles, not new voices.

**The Candlelight Rule.** Glow exists only as literal candlelight: the flame in the candle button, the field of candle lights behind the Appreciation, and the brief candle moment. Cream-white core, Lamp Gold body, fading to nothing. No glows on text, buttons, cards or photographs.

## Typography

**Display Font:** Reina Neue, standing in as Playfair Display (with Georgia, serif)
**Script Font:** Ludovica, standing in as Great Vibes (with cursive)
**Tall Font:** FounFree, standing in as Anton (with sans-serif)
**Body Font:** Red Hat Display, the programme's actual body face (with system-ui, sans-serif)

**Character:** The booklet's four voices kept intact: a high-contrast didone for names and chapter heads, a formal script for the programme's own script words, one tall condensed word, and a warm geometric sans for every line that is read. Each stack names the licensed face first, so dropping in the licensed files swaps the stand-in without code changes.

### Hierarchy
- **Display** (800, clamp 2.4rem to 6rem capped at 10.5svh, 0.98): the name on the cover, max 13ch, three lines lower-left. The height cap and the hero's top padding (clamp 5rem to 7rem) keep the name clear of the logo on short screens.
- **Headline** (700, clamp 2.4rem to 4.6rem, 1.02, balanced): chapter titles on both grounds. The Funeral Service title runs larger (clamp 3.4rem to 7rem).
- **Title** (700, clamp 1.5rem to 2.1rem, 1.15): service item titles, the honoured name, the guest-book title; the reader's tribute title at clamp 1.5rem to 2rem, 1.2; the writing dialog title at 1.5rem; hymn titles at 1.3rem.
- **Card Title** (700, 1.2rem, 1.25, balanced): tribute titles on cards; the card number above it in Gold Ink didone at 1.05rem.
- **Numeral** (didone 700, clamp 2.4rem to 3.4rem, lining tabular figures): service item numbers; the darkroom year runs at 800, clamp 4.2rem to 7.4rem, 0.85, -0.035em.
- **Script** (400, 1.45em of its title, Liturgy Wine): only the words "Hymn" / "Orin" in item titles and "Late" in the Biography title.
- **Tall** (400, clamp 3.6rem to 12.5vw to 11.5rem, uppercase, 0.88): the single word "Biography" in the hush.
- **Body** (500, 17 to 19px fluid, 1.7, 66ch): all reading text. The biography reads larger (clamp 1.12rem to 1.28rem, 1.78). Card excerpts are 1rem, 1.6, Soft Ink, clamped to 4 lines (3 under a title). Emphasis is 800.
- **Body, Reader** (500, clamp 1.125rem to 1.25rem, 1.78): a tribute opened in the reader; the largest reading size on the site.
- **Body Small** (600, 0.9375rem): Yorùbá sub-lines, signatures' relationships, secondary metadata, form notes.
- **Label** (800, 0.8125rem, 0.05 to 0.08em, uppercase): column heads, officiant roles, language column labels. Functional labels for content, not decoration. Field labels are sentence case, 800, at body size.

### Named Rules
**The Four Voices Rule.** Didone for names, headings and numerals; script only where the programme sets script; the tall face only for "Biography"; Red Hat Display for everything a guest reads. No fifth face.

**The Elder Floor Rule.** Reading text is 17px minimum and 500 weight; nothing a guest must read goes below 0.9375rem except labels and player times, which are 800 and 700 weight. The larger-text toggle scales the root to 115% and every size follows.

**The Licensed-First Rule.** Every stack names the programme's licensed face before its stand-in. Keep that order.

## Layout

One long page in the printed programme's exact order, each chapter a full-width band. Content sits in a centred container (76rem max) with a fluid gutter (clamp 1.25rem to 4rem); chapters breathe with fluid vertical padding (clamp 4.5rem to 8.5rem). Spacing follows a 4px base scale (0.25rem to 8rem).

- **Cover:** full-viewport (100svh) showreel; words weighted lower-left under a left and bottom brown scrim; logo small top-left aligned to the container; pause control bottom-right. Under 700px the scrim becomes a stronger bottom-up shade (95% to 15%), the pause control moves top-right and the dates stack.
- **Tabs:** a sticky 3.75rem bar on translucent paper with a 10px backdrop blur; horizontally scrollable, masked at the edge when overflowing; logo hidden under 700px; the larger-text toggle sits at the right end. A 2px gold hairline along its bottom edge fills left to right with progress through the current chapter. Anchors offset by the bar height.
- **Reading chapters:** asymmetric two-column grids (7:5 for the funeral service, 5:6 for the darkroom, 1:1 for the order and for English/Yorùbá parallel text), collapsing to one column at 860px. Single-language reading constrains the column to the 66ch measure.
- **Service language switch:** floats fixed under the tab bar while the service is on screen, so it is always one tap away.
- **Tributes:** a name search (30rem max) over a card grid in programme order (auto-fill, 19rem minimum, gaps clamp 0.9rem to 1.25rem). Below a 1.5px gold-55% rule, the guest book: messages in masonry columns (3 at most, 18rem minimum, 1.25rem gaps), each message whole.
- **Dialogs:** the reader and the writing form are centred paper dialogs (46rem max, 52rem or viewport-minus-2rem tall) with a fixed top bar and fixed bottom bar around a scrolling body. Under 700px they become bottom sheets, full width, 92svh tall, respecting the safe-area inset.
- **Scroll acts (scrollcraft engine):** the Biography title is a pinned hush (held for 1.5 viewports); Photo Speak is a pinned horizontal rail that pans as you scroll (5 viewports), photographs in tall and paired columns at 74svh (62svh on phones).
- **Darkroom:** the photo plate is sticky beside the biography text; under 860px it becomes a slim sticky year strip and the prints move inline.
- **Film:** a 16:9 frame (64rem container); on tall screens (aspect 4:5 or narrower) a 9:16 frame up to 76svh tall, centred.

## Elevation & Depth

Depth comes mostly from grounds and light, not shadow: cinema versus paper, radial brown glows behind the hush, a scrim over video, a masked dot whisper at the top of some paper chapters, and candlelight in the Appreciation. Shadows are soft, warm and brown-tinted, reserved for photographs, floating controls, opened dialogs and the lift of a card under the pointer.

### Shadow Vocabulary
- **Photograph lift** (`box-shadow: 0 1px 2px rgb(40 18 4 / .12), 0 14px 32px -18px rgb(40 18 4 / .45)`): photographs on paper (service photo, darkroom prints); also the fall under a hovered tribute card.
- **Card at rest** (`box-shadow: 0 0 0 1px <ink 13%>, 0 1px 2px rgb(40 18 4 / .05)`): tribute cards; guest cards carry the hairline ring alone.
- **Card hover** (`box-shadow: 0 0 0 1px <gold 55%>, <photograph lift>` with a 3px rise): tribute cards on fine pointers only.
- **Floating bar** (`box-shadow: 0 1px 0 <ink 13%>, 0 10px 24px -22px rgb(40 18 4 / .6)`): the sticky tab bar and the floating language switch; a hairline plus a faint fall.
- **Dialog** (`box-shadow: 0 40px 90px -30px rgb(20 9 3 / .8)` over a `rgb(20 9 3 / .62)` backdrop): the reader and writing dialogs.
- **Player dock** (`box-shadow: 0 0 0 1px <gold 30%>, 0 20px 40px -20px rgb(0 0 0 / .7)`): the docked hymn player.
- **Toast** (`box-shadow: 0 16px 34px -16px rgb(0 0 0 / .7)`): the cinema confirmation pill.
- **Film frame** (`box-shadow: 0 30px 60px -34px #000`): the memorial film on cinema; its play disc falls `0 10px 30px -10px rgb(0 0 0 / .6)`.
- **Field focus** (`box-shadow: 0 0 0 3px <wine 22%>` with a wine border): search and text fields.

### Named Rules
**The Warm Shadow Rule.** Shadows on paper are tinted programme brown (rgb 40 18 4, or the deeper rgb 20 9 3 for dialogs), soft and offset downward with negative spread. No grey, no hard offsets.

**The Dot Whisper Rule.** The print's dot pattern appears only as a 22px gold dot grid fading out over the top 22rem of a paper chapter. Never a full field.

**The Rest Is Flat Rule.** At rest a card is a hairline ring and at most a 2px whisper; lift appears only as a response to the pointer.

## Shapes

Two shape families. Touch controls are pills or circles (999px): buttons, track buttons, the candle button, the language switch, the text-size toggle, relationship chips, the search field, the toast, the player bar; play, pause, close and icon controls are 48px circles, and the film play disc is 64 to 84px. Surfaces are gently squared: panels, tribute and guest cards and the film frame at 6px, photographs and the date chip at 4px. Writing surfaces step up a little: text fields and the error note at 10px, dialogs at 14px, and the phone bottom sheet at 16px on its top corners only. Rules are hairlines: 1px in ink or gold mixes, 1.5px solid gold for a section's leading rule, 1.5px gold at 55% above a signature. The active tab is marked by a 3px wine underline with rounded top corners that scales in from the centre. (The direction contract called for "square-ish 6px corners" throughout; the build reserved 6px for reading surfaces, made every control a pill and softened the writing surfaces, and the build is the record.)

## Components

### Buttons
Warm, confident and large; every one is a target an elder can hit.
- **Shape:** full pill (999px), 52px minimum height, 1.5px border slot.
- **Gold (primary, on cinema):** Programme Gold fill, Cinema text, 700 1rem Red Hat Display, 0.75rem by 1.5rem padding. Hover lifts to Lamp Gold.
- **Ghost (on cinema):** cream border at 45%, cream text, a faint brown wash behind; hover turns the border Lamp Gold and the text white.
- **Wine (primary, on paper):** Liturgy Wine fill, white text; the write-a-message and send actions. Hover lifts to Wine, Lifted.
- **Line (secondary, on paper):** transparent with an ink-13% border; hover rings in gold; disabled at 45% opacity (the reader's previous/next at the ends).
- **Small:** 48px, 0.55rem by 1.2rem, 0.95rem text.
- **Press:** a 1px downward nudge (120ms). Transitions are 160ms on the house ease. Hover states apply on fine pointers only.
- **Focus:** 3px wine outline offset 3px on paper; Lamp Gold on cinema.

### Candle (signature)
A Cinema pill reading "Light a candle" with a small drawn flame (14 by 22px: a Soft Cream wick under a teardrop of cream-white core and Lamp Gold body). Unlit, the flame sits at 35% opacity and 55% scale; pressed, it grows to full over 600ms and flickers on a 2.6s loop, and the button turns Cinema Raised with Lamp Gold text. Hover deepens to Print Brown. In the Appreciation the same action appears as a Lamp Gold underlined text link beside the count. Lighting a candle triggers the candle moment: for 2.6s the whole page takes a warm radial wash (Lamp Gold at 14% at the centre to Cinema at 35% at the edges) that rises and fades, and the candle field pulses faster.

### Candle Field
Behind the Appreciation, scattered points of candlelight: 6px dots scaled per light, a cream-white core through Lamp Gold at 55% to nothing, a soft Lamp Gold halo at 25%, each breathing between 55% and 100% opacity on a 3.6s loop with its own delay. Decorative and hidden from assistive technology.

### Hymn Track (signature)
Each hymn is a numbered track with one large control.
- **Shape:** pill, 56px tall, a 48px gold disc holding the play/pause icon at the left, a label ("Play the instrumental") over the hymn title in Soft Cream.
- **Default:** Cinema fill on paper; on cinema it becomes Cinema Raised with a 30% gold hairline. Hover deepens to Print Brown.
- **Playing:** three 3px gold equaliser bars (16px tall, rounded) rise and fall on a 900ms loop, staggered by a third.
- **Missing audio:** disabled, Quiet Panel fill with Soft Ink text and a muted disc, reading "Instrumental coming soon". On cinema it becomes an outline only.
- **Behaviour:** pressing docks the player bar; one track at a time; never autoplays.

### Player Bar
A dark pill docked at the bottom centre (40rem max), gold 48px play/pause disc, title link back to the service, elapsed and total times in 700 tabular figures, a gold-accented seek range, a transparent close disc. It rises in over 360ms.

### Navigation (Tabs)
Translucent paper bar, 700 0.95rem Soft Ink links filling the bar height; the current section turns Ink and gains the wine underline. Hover darkens to Ink on fine pointers only. The bar scrolls horizontally on phones with an edge fade. A 2px gold progress hairline along the bottom edge scales from the left with progress through the current chapter.

### Text Size Toggle
A white pill (48px wide, 44px tall) with an ink-13% ring at the right end of the tab bar, an "A" with a larger "A" in 800. Pressed, it turns Liturgy Wine with white text and scales the root type to 115%; the choice is remembered.

### Language Switch
A white pill segmented control with a hairline ring, three 48px pill buttons (English, Yorùbá, both); the selected one is Liturgy Wine with white text. While the service is on screen it docks full-width under the tabs.

### Chips
- **Date chip:** Liturgy Wine, white 800 text, 4px corners; marks the date of passing.
- **Relationship chips:** white pills, 48px tall, a 1.5px ink-13% inset ring, 700 text; selected turns Liturgy Wine with white text and no ring; focus is a 3px wine outline. Single choice, in the writing form.

### Cards / Containers
Reading is grouped with hairline rules, column heads with a 1.5px gold (or wine) underline, and one tonal panel. Cards exist only for things a guest opens.
- **Quiet panel:** Quiet Panel fill, 6px corners, 1.4rem by 1.5rem padding, no border or shadow (church needs, the guest-book mode note at 0.8rem by 1rem).
- **Order rows:** 56px rows divided by ink hairlines, gold numeral, English title over Yorùbá sub-line, a gold note icon on hymns; hover fills Quiet Panel.
- **Tribute card:** a whole-card button on Card Paper, 6px corners, 1.4rem padding (1.2rem bottom), 15rem minimum height, resting on a hairline ring. Top to bottom: the programme number in Gold Ink didone, the Card Title, a 3 to 4 line Soft Ink excerpt, then pushed to the foot a signature under a 1.5px gold-55% rule (name in uppercase 800 Gold Ink at 0.9375rem, relationship in Soft Ink 600) and "Read the tribute" in 800 wine with a drawn chevron. On fine pointers it rises 3px, rings in gold and the chevron steps 3px right (260ms); press settles to 99%. Cards filtered out by the search are removed from the grid.
- **Guest card:** a white masonry card, 6px corners, 1.2rem by 1.3rem padding, hairline ring only; the message (pre-line, 1.6, clamped to 6 lines), then the name in 800 Gold Ink over relationship and date in Soft Ink. A newly posted card arrives with a 3px gold ring and an 8px rise that settles to the hairline over 1.8s.

### Inputs / Fields
- **Search:** a white 52px pill, 1.5px ink-13% border, 600 1.0625rem text, an 800 sentence-case label above. Filters tribute cards by name as you type; no matches shows a Soft Ink line.
- **Text fields:** white, 1.5px ink-13% border, 10px corners, 0.85rem by 1rem padding, 500 1.0625rem/1.55; single-line at 52px, the message area 9rem minimum and vertically resizable. A tabular character counter sits right-aligned beneath in Soft Ink 600.
- **Focus:** the border turns Liturgy Wine with a 3px wine-22% ring; no outline.
- **Error:** a 10px-cornered note, wine at 12% in white, wine 700 text, above the actions.

### Reader (signature)
One tribute at a time, as a page in a booklet. A paper dialog: a top bar with the "n of N" count in 800 Gold Ink tabular figures and a round close control; a scrolling body with the reader title, the tribute in Body, Reader size, and the signature under a gold-55% rule; a bottom bar with Line buttons for previous and next. Pages turn with a 24px slide and fade over 380ms in the direction of travel; arrow keys and horizontal swipes turn them too. Opens by rising 18px from 98.5% scale over 380ms; under 700px it is a bottom sheet that rises 40px.

### Writing Form
The same dialog shell, titled in didone at 1.5rem, with a scrolling stack of fields (1.2rem gaps, 1.4rem by 1.5rem padding): name, relationship chips, message with counter, a Soft Ink note, the error state when needed, and a Wine send button in the bottom bar.

### Toast
A Cinema pill with cream 700 text, 0.9rem by 1.3rem, docked above the player position at the bottom centre; it rises 1rem and fades in over 260ms, then leaves the same way.

### Biography Darkroom (signature)
A sticky plate shows the year in large Gold Ink didone and a tray of prints that develop as the paragraph beside them is read: each print starts sepia, low-contrast and over-bright and resolves to full colour, then yields to the next. The year steps through only the years the current paragraph states, 1943 to 2026. The paragraph being read sits at full opacity, the rest at 85%. The closing line is set in wine didone.

### Photo Rail
On cinema, the photographs sit in tall and paired columns with 4px corners and a slight desaturation that lifts (with a 1.035 scale) on hover; tapping opens a near-black lightbox with 52px circular translucent controls.

### Film Player
A text-free poster in the film frame under one large control: a Programme Gold play disc (64 to 84px) at the lower left over a bottom-up Cinema shade (82% to nothing at 55%), beside it "Play the film" in cream 700 over its running time in Soft Cream 600. Hover grows the disc to 1.06 (200ms). On play the overlay fades out over 300ms. The phone and tall-screen frame is 9:16 with its own poster and source.

### Motion and Film
- **House ease:** cubic-bezier(0.16, 1, 0.3, 1); 160ms for state changes, 240ms for the tab underline, 260ms for card lift and the toast, 360ms for reading focus and the player entrance, 380ms for dialogs and page turns, 600ms for photo hover.
- **Arrivals:** each reading block (titles, ledes, service items, order rows, verses, paragraphs, tribute cards, the film frame, the Appreciation lines) rises into place once as it reaches the reader: from 14px below and transparent to full ink over 640ms; chapter titles rise from 22px over 900ms. Siblings stagger by 55ms, capped at five steps. It never repeats and never runs on scroll back.
- **Showreel (cover):** slow graded crossfades of his photographs, 4s each with 1.2s dissolves, a gentle push from 1.06 to 1.0 with alternating 1.2% drift. Portrait photographs in a widescreen frame are shown whole, right of centre, their sides feathered into a blurred, darkened copy of themselves. Grade: saturate .86, contrast 1.04, sepia .12, darker warm edges and a soft-light brown wash. No text is baked in; all words are page markup.
- **Memorial film:** the same push and blurred-fill framing, with a bottom brown shade under the words. Words arrive from an 8px blur while rising 14px, settle, and leave the same way. Years in gold didone, lines in cream Red Hat Display, the hymn line in script on a radial brown glow, ending on the logo and service details on Cinema.
- **Reduced motion:** arrivals are not applied; transitions and animations are removed from the darkroom, the tab underline, the player, the dialogs and page turns, new guest cards, the candle field, the flame and the equaliser; the cover reel has a pause control.

## Do's and Don'ts

### Do:
- **Do** set every reading surface on Reading Paper with Ink or Soft Ink text at 17px or more, 500 weight, 1.7 line height.
- **Do** use Gold Ink (small) and Gold Ink, Large (large) whenever gold must be read on paper.
- **Do** make every control at least 48px, and the primary ones 52 to 56px, as pills or circles.
- **Do** carry grouping with hairline rules and a 1.5px gold leading rule rather than boxes; reserve cards for what a guest opens.
- **Do** put all words over video in real markup, on a brown scrim weighted to where the words sit.
- **Do** keep motion slow and documentary: pushes, dissolves, words developing out of blur, blocks rising once into full ink.
- **Do** degrade missing audio to a disabled track reading "Instrumental coming soon".
- **Do** put typing and choosing on Field White, and mark focus and selection in Liturgy Wine.
- **Do** show one tribute at a time in the reader, at the reader's larger size, in programme order.

### Don't:
- **Don't** use the memorial template: pastel hero, clip-art candle icon, a card grid as the page's structure.
- **Don't** reproduce the print literally: dense dot fields or crowded centred blocks.
- **Don't** set Programme Gold as text on paper.
- **Don't** use the script or tall faces outside the programme's own script words and the Biography title.
- **Don't** nest cards, or add shadows to text panels on paper; a card lifts only under the pointer.
- **Don't** autoplay sound, or bake text into the showreel or the film poster.
- **Don't** spread Programme Red beyond the programme's single red tab.
- **Don't** use glow anywhere but candlelight.
- **Don't** replay arrivals on scroll back or under reduced motion.
