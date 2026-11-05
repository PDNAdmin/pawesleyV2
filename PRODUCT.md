# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and vanilla JS (no build step). The scrollcraft engine (`js/vendor/scrollcraft.js`) drives scroll acts. The memorial film and hero showreel are rendered separately with Remotion in `film/` and shipped as MP4 files. Deployed as static files (`index.html`, `css/`, `js/`, `assets/`).

## Users

Equally two audiences:
- Mourners at the burial and funeral service, many of them elders, reading along on phones in the church and at the graveside.
- The family and friends who revisit and share the link afterwards as a keepsake, on any device.

## Product Purpose

The online form of the printed burial and funeral service programme for Pa. Wesley Olajide Ojo Aiyegboka (4th March 1943 to 23rd September 2026), service on Friday 6th November 2026 at St. Paul's Cathedral Church, Iyara. Guests follow the order of service and hymns, read his biography and the tributes, see the photographs, hear the hymn instrumentals, and watch a memorial film. Success: the client and family feel it is their programme, modernised and dignified; guests can read every word easily on a phone.

## Positioning

It is the family's own programme, not a generic memorial template: the same order, words, colours and type voices as the printed booklet, made into a modern cinematic web experience.

## Operating Context

- Used in a church on mobile data, often in bright or dim light, by older readers.
- The printed programme (`Burial Program (1).pdf`) is the single source of truth for content and order.
- Content must follow the PDF order exactly: front cover, Funeral Service, Order of Funeral Services and Church Needs, service items 1 to 17, Biography, Tributes (34, fixed order), Photo Speak, then the memorial film, then the back cover Appreciation.

## Capabilities and Constraints

- One long page. A sticky tab bar mimics the programme's sections, highlights the current section as you scroll and jumps when tapped.
- Service text shown in English, Yorùbá, or both.
- Hymn instrumentals: a play control on each hymn (Jesus Lives, Jerusalem on High, Hymn 261, Sleep on Beloved, In Christ Alone) plus an optional background track for the photo section. A docked player bar keeps playing while the visitor scrolls; one track at a time; never autoplays. The client will upload the audio files; missing files must degrade to "coming soon".
- Hero: a background showreel video of his photographs, with all text as real markup over it.
- Memorial film (landscape and vertical) for viewing and WhatsApp sharing.
- "In Christ Alone" lyrics are not reproduced (still under copyright).
- Display fonts in the PDF (Reina Neue, Ludovica, Nexa, FounFree) are unlicensed for web; free lookalikes stand in, with stacks ready for licensed files.

## Brand Commitments

- Use the PDF's colours and type voices (Red Hat Display is the exact body face), modernised for screens. Client rejected v1 as boring and a literal copy of the PDF as dated; wants "a modernized version of the pdf", "cinematic, legible and modern", patterns kept only if beautiful and clear.
- Title phrase: "Forever In Our Heart". Logo artwork extracted from the PDF at `assets/print/logo.webp`.

## Evidence on Hand

- Verbatim text: `js/data-service.js`, `js/data-tributes.js`, biography in `index.html`.
- 32 family photographs: `assets/photos/full`, `assets/photos/thumb`.
- PDF artwork: `assets/print/` (cover and biography portrait cutouts, gold silk, wax seal, logo, cross ground, dotted paper, prayer photograph).
- Printed programme PDF: `assets/docs/`.
- No audio yet (client to upload). Do not invent captions, dates, places or relationships not stated in the programme.

## Product Principles

1. The programme's words and order are sacred: verbatim, complete, in sequence.
2. Legible first: every line readable by an elder on a phone in church.
3. The family's own world, modernised: their colours, faces and print voice, not a template.
4. Quiet dignity over spectacle: motion and sound serve remembrance and never surprise.

## Accessibility & Inclusion

Older readers: body text 17 to 19px minimum, WCAG AA contrast on every text, 48px tap targets, reduced-motion respected, audio never autoplays, captions or text for everything shown in video.
