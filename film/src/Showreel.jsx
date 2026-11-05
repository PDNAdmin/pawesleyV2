import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";

/* Background showreel for the website hero. No text: all words are real markup on the page.
   Slow graded crossfades of his photographs, a gentle push on each, warm programme-brown grade. */

export const REEL = [
  { src: "img-05.jpg", pos: "50% 25%", portrait: 1066 / 1600 },
  { src: "img-26.jpg", pos: "50% 30%" },
  { src: "img-19.jpg", pos: "50% 35%" },
  { src: "img-21.jpg", pos: "50% 35%" },
  { src: "img-30.jpg", pos: "50% 30%" },
  { src: "img-32.jpg", pos: "45% 30%" },
  { src: "img-16.jpg", pos: "50% 25%", portrait: 770 / 1080 },
];
export const SHOT = 120;   // 4s per photograph
export const FADE = 36;    // 1.2s dissolve
export const REEL_DURATION = REEL.length * (SHOT - FADE) + FADE;

const ease = Easing.bezier(0.33, 0, 0.2, 1);

const Shot = ({ src, pos, i, portrait }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const o = interpolate(f, [0, FADE, SHOT - FADE, SHOT], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s = interpolate(f, [0, SHOT], [1.06, 1.0], { easing: ease });
  const drift = interpolate(f, [0, SHOT], i % 2 ? [-1.2, 1.2] : [1.2, -1.2]);
  const grade = "saturate(.86) contrast(1.04) sepia(.12)";
  // a portrait photograph in a widescreen frame is shown whole, right of centre, its sides feathered into its own blurred fill
  const framed = portrait && width > height;
  const pw = Math.min(width * 0.62, height * portrait);
  const feather = "linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%)";
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width, height, objectFit: "cover", filter: "blur(40px) brightness(.55) saturate(.8)", transform: "scale(1.2)" }} />
      {framed ? (
        <div style={{ position: "absolute", top: 0, height, width: pw, left: width * 0.72 - pw / 2, transform: `scale(${s}) translateX(${drift}%)`, WebkitMaskImage: feather, maskImage: feather }}>
          <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, filter: grade }} />
        </div>
      ) : (
        <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width, height, objectFit: "cover", objectPosition: pos, transform: `scale(${s}) translateX(${drift}%)`, filter: grade }} />
      )}
    </AbsoluteFill>
  );
};

export const Showreel = () => {
  return (
    <AbsoluteFill style={{ background: "#1E0E05" }}>
      {REEL.map((r, i) => (
        <Sequence key={r.src} from={i * (SHOT - FADE)} durationInFrames={SHOT}>
          <Shot {...r} i={i} />
        </Sequence>
      ))}
      {/* the programme-brown grade: warm, darker at the edges, never a flat overlay */}
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 60% 40%, rgba(30,14,5,0) 40%, rgba(30,14,5,.55) 100%)", mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(100,41,0,.10), rgba(100,41,0,.22))", mixBlendMode: "soft-light" }} />
    </AbsoluteFill>
  );
};
