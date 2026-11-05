import { registerRoot, Composition } from "remotion";
import { Memorial, DURATION } from "./Memorial.jsx";
import { Showreel, REEL_DURATION } from "./Showreel.jsx";

const Root = () => (
  <>
    <Composition id="Memorial" component={Memorial} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
    <Composition id="MemorialVertical" component={Memorial} durationInFrames={DURATION} fps={30} width={1080} height={1920} />
    <Composition id="Showreel" component={Showreel} durationInFrames={REEL_DURATION} fps={30} width={1920} height={1080} />
    <Composition id="ShowreelVertical" component={Showreel} durationInFrames={REEL_DURATION} fps={30} width={1080} height={1920} />
  </>
);

registerRoot(Root);
