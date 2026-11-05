import React from "react";
import { AbsoluteFill, Sequence, Img, staticFile, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { loadFont as loadRedHat } from "@remotion/google-fonts/RedHatDisplay";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadVibes } from "@remotion/google-fonts/GreatVibes";

const { fontFamily: TEXT } = loadRedHat("normal", { weights: ["500", "600", "700"], subsets: ["latin"] });
const { fontFamily: DIDONE } = loadPlayfair("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: SCRIPT } = loadVibes("normal", { weights: ["400"], subsets: ["latin"] });

const C = { ground: "#1E0E05", gold: "#DE992E", goldSoft: "#E9B45C", cream: "#F7EBD6", creamSoft: "#D9C3A0" };
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

const useLayout = () => {
  const { width, height } = useVideoConfig();
  return { width, height, tall: height > width, u: Math.min(width, height) / 1080 };
};

/* words arrive from a soft blur, settle, and leave the same way */
const Line = ({ at, len, children, style }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [at, at + 24, len - 20, len], [0, 1, 1, 0], clamp);
  const b = interpolate(f, [at, at + 24], [8, 0], clamp);
  const y = interpolate(f, [at, at + 30], [14, 0], { ...clamp, easing: ease });
  return <div style={{ opacity: o, filter: `blur(${b}px)`, transform: `translateY(${y}px)`, ...style }}>{children}</div>;
};

const Photo = ({ src, len, pos = "50% 30%", dir = 1, fit = "cover" }) => {
  const f = useCurrentFrame();
  const { width, height } = useLayout();
  const s = interpolate(f, [0, len], [1.08, 1.0], { easing: Easing.bezier(0.33, 0, 0.2, 1) });
  const x = interpolate(f, [0, len], [dir * 1.4, -dir * 1.4]);
  return (
    <>
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width, height, objectFit: "cover", filter: "blur(40px) brightness(.5)", transform: "scale(1.2)" }} />
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width, height, objectFit: fit, objectPosition: pos, transform: `scale(${s}) translateX(${x}%)`, filter: "saturate(.88) contrast(1.04) sepia(.1)" }} />
    </>
  );
};

const Shade = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(30,14,5,0) 38%, rgba(30,14,5,.55) 66%, rgba(30,14,5,.92) 100%)" }} />
);

const Fade = ({ len, children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: interpolate(f, [0, 18, len - 18, len], [0, 1, 1, 0], clamp) }}>{children}</AbsoluteFill>;
};

/* a chapter of his life: photograph, a year in gold, one line of the programme */
const Chapter = ({ len, src, pos, year, text, dir }) => {
  const { u, tall } = useLayout();
  return (
    <Fade len={len}>
      <Photo src={src} len={len} pos={pos} dir={dir} />
      <Shade />
      <div style={{ position: "absolute", left: (tall ? 72 : 120) * u, right: (tall ? 72 : 560) * u, bottom: (tall ? 170 : 110) * u }}>
        {year && (
          <Line at={10} len={len} style={{ fontFamily: DIDONE, fontWeight: 800, fontSize: (tall ? 150 : 132) * u, lineHeight: 0.9, letterSpacing: "-0.03em", color: C.gold, marginBottom: 22 * u, fontVariantNumeric: "lining-nums" }}>{year}</Line>
        )}
        <Line at={22} len={len} style={{ fontFamily: TEXT, fontWeight: 600, fontSize: (tall ? 48 : 42) * u, lineHeight: 1.34, color: C.cream, textWrap: "balance" }}>{text}</Line>
      </div>
    </Fade>
  );
};

const Title = ({ len }) => {
  const { u, tall } = useLayout();
  return (
    <Fade len={len}>
      <Photo src="img-04.jpg" len={len} pos="50% 22%" dir={-1} />
      <Shade />
      <div style={{ position: "absolute", left: (tall ? 72 : 120) * u, bottom: (tall ? 170 : 110) * u, right: 72 * u }}>
        <Line at={14} len={len} style={{ fontFamily: DIDONE, fontWeight: 800, fontSize: (tall ? 120 : 128) * u, lineHeight: 0.95, letterSpacing: "-0.025em", color: C.cream }}>
          Pa. Wesley Olajide<br />Ojo Aiyegboka
        </Line>
        <Line at={36} len={len} style={{ fontFamily: TEXT, fontWeight: 600, fontSize: 30 * u, letterSpacing: "0.06em", color: C.creamSoft, marginTop: 30 * u }}>4th March 1943 &nbsp;·&nbsp; 23rd September 2026</Line>
      </div>
    </Fade>
  );
};

const Hymn = ({ len }) => {
  const { u, tall } = useLayout();
  return (
    <Fade len={len}>
      <AbsoluteFill style={{ background: `radial-gradient(80% 70% at 50% 45%, #3E1F0B 0%, ${C.ground} 75%)` }} />
      <AbsoluteFill style={{ display: "grid", placeItems: "center", textAlign: "center", padding: `0 ${(tall ? 80 : 320) * u}px` }}>
        <div>
          <Line at={6} len={len} style={{ fontFamily: SCRIPT, fontSize: 120 * u, lineHeight: 1.1, color: C.goldSoft }}>Sleep on, beloved</Line>
          <Line at={26} len={len} style={{ fontFamily: TEXT, fontWeight: 600, fontSize: 40 * u, lineHeight: 1.45, color: C.cream, marginTop: 26 * u, textWrap: "balance" }}>
            Lay down thy head upon thy Saviour's breast: we love thee well; but Jesus loves thee best.
          </Line>
        </div>
      </AbsoluteFill>
    </Fade>
  );
};

/* faces, one after another, held a little longer than a blink */
const FACES = ["img-07.jpg", "img-14.jpg", "img-17.jpg", "img-27.jpg", "img-06.jpg", "img-15.jpg", "img-20.jpg", "img-28.jpg", "img-22.jpg"];
const STEP = 42;
const Faces = ({ len }) => (
  <Fade len={len}>
    {FACES.map((src, i) => (
      <Sequence key={src} from={i * STEP} durationInFrames={STEP + 18}>
        <Fade len={STEP + 18}><Photo src={src} len={STEP + 18} dir={i % 2 ? 1 : -1} /></Fade>
      </Sequence>
    ))}
  </Fade>
);

const End = ({ len }) => {
  const f = useCurrentFrame();
  const { u, tall } = useLayout();
  const o = interpolate(f, [0, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity: o, background: C.ground, display: "grid", placeItems: "center", textAlign: "center" }}>
      <div>
        <Line at={10} len={len + 40} style={{ width: (tall ? 560 : 460) * u, margin: "0 auto" }}>
          <Img src={staticFile("logo.webp")} style={{ width: "100%" }} />
        </Line>
        <Line at={30} len={len + 40} style={{ fontFamily: TEXT, fontWeight: 600, fontSize: 30 * u, color: C.creamSoft, marginTop: 50 * u, lineHeight: 1.5 }}>
          Burial and Funeral Service, Friday 6th November 2026<br />St. Paul's Cathedral Church, Iyara
        </Line>
      </div>
    </AbsoluteFill>
  );
};

const SCENES = [
  [Title, 180, {}],
  [Chapter, 165, { src: "img-01.jpg", pos: "50% 22%", year: "1943", dir: 1, text: "Born on the 4th of March 1943 in Bukuru, a sleepy town 5km south of Jos, Plateau State." }],
  [Chapter, 165, { src: "img-09.jpg", pos: "50% 35%", year: "1972", dir: -1, text: "On 25th of April 1972, he married his Wife, Helen Abidemi Ojo Aiyegboka of blessed memory." }],
  [Chapter, 155, { src: "img-02.jpg", pos: "50% 25%", dir: 1, text: "Olajide was a larger-than-life character." }],
  [Chapter, 165, { src: "img-30.jpg", pos: "50% 30%", dir: -1, text: "His greatest investment was not in business but in people." }],
  [Chapter, 175, { src: "img-05.jpg", pos: "50% 22%", year: "2026", dir: 1, text: "He returned home, and when God called, he answered." }],
  [Faces, FACES.length * STEP + 30, {}],
  [Hymn, 210, {}],
  [Chapter, 180, { src: "img-26.jpg", pos: "50% 30%", dir: -1, text: "He will be deeply missed, fondly remembered and forever loved by his people." }],
  [End, 200, {}],
];
const OVERLAP = 18;
export const DURATION = SCENES.reduce((n, s) => n + s[1], 0) - OVERLAP * (SCENES.length - 1);

export const Memorial = () => {
  let at = 0;
  return (
    <AbsoluteFill style={{ background: C.ground, fontFamily: TEXT }}>
      {SCENES.map(([Comp, len, props], i) => {
        const from = at;
        at += len - OVERLAP;
        return (
          <Sequence key={i} from={from} durationInFrames={len}>
            <Comp len={len} {...props} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
