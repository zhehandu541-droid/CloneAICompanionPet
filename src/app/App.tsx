import image___2026_07_14_16_19_26_1 from '@/imports/__2026-07-14_16.19.26-1.png'; void image___2026_07_14_16_19_26_1;
import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ChevronLeft, Send, X, Search, Camera } from "lucide-react";

// ── Room / scene images ───────────────────────────────────────────────
import houseBgImg  from "@/imports/xie3xR5ZNm3ImSSbLXJrA-1.png";
import kitchenWindow  from "@/imports/PhoneShell-3/3cb948f1213e956ba32bf4ececfbd3541a24bf08.png";
import kitchenSink    from "@/imports/PhoneShell-3/df0c972304727053f2ec9b2f7d552690109d7fdc.png";
import kitchenStove   from "@/imports/PhoneShell-3/96c1d0ac96479420a9e52e761403c777dad1e851.png";
import kitchenTable   from "@/imports/PhoneShell-3/2dfa2ba61469cd15e7b865fc71cb2b8eafe02f4f.png";
import kitchenBasket  from "@/imports/PhoneShell-3/e7570e02db179d3d873471f16019788c1760a2e8.png";
import kitchenBurger  from "@/imports/PhoneShell-3/c3d023433712c0f31dfb614313aa22bbedcda16c.png";
import kitchenIcon    from "@/imports/PhoneShell-3/a85220379f09fd3800d29f7cec2ab869b4c58214.png";
import worldMapImg from "@/imports/ofrSzK3BDwfibZ1PCoXt2.png";

// ── Postcard destination scenes ───────────────────────────────────────
import postcardBeach   from "@/imports/__2026-07-14_16.14.13.png";
import postcardMeadow  from "@/imports/__2026-07-14_16.14.06.png";
import postcardForest  from "@/imports/__2026-07-14_16.31.00.png";
import postcardChurch  from "@/imports/__2026-07-14_16.31.17.png";

// ── Bedroom scene assets (originals kept to suppress unused-local errors) ─
import bedroomBed         from "@/imports/__2026-07-14_16.19.17.png";
import bedroomNightstand  from "@/imports/__2026-07-14_16.19.10.png";
import bedroomRoundTable  from "@/imports/__2026-07-14_16.19.26.png";
// ── Bedroom cutout replacements ───────────────────────────────────────
import bedroomNightstandCutout from "@/imports/d92596e2-936d-4195-98b8-b9727db5ab72.png"; void bedroomNightstandCutout;
import bedroomVanity           from "@/imports/bf9f77e3-7807-411d-a837-954a2056c0d8.png"; void bedroomVanity;
// ── Figma PhoneShell-2 bedroom assets (source of truth) ──────────────
import ps2Bed        from "@/imports/PhoneShell-2/e3e04f8f39ea60b72d421465f504c8da607a7565.png";
import ps2Wardrobe   from "@/imports/PhoneShell-2/feee5112f01dd8b05c3261c99982bce8d9720ff4.png";
import ps2Flowers    from "@/imports/PhoneShell-2/0b7e1a8bbd05a977f4192e4793ed94f25db662c5.png";
import ps2Balloon    from "@/imports/PhoneShell-2/90667ffcfdfebed1058f58e32c6f587efd29e3e5.png";
import ps2Table      from "@/imports/PhoneShell-2/1640aa871e1776c49d8c53a4a622b5af81f4a94f.png";
import ps2JournalBook from "@/imports/PhoneShell-2/55045d7036b5d362211a41a7a48f5f260c12f31d.png";

// ── Pet images ────────────────────────────────────────────────────────
import redPandaCoffee  from "@/imports/_4OjUQ2qMqEE2AizF2A5L.png";
import catCaramel      from "@/imports/35xWmsUNmiQ9DwD6-TS9_.png";
import fluffyDog       from "@/imports/a_AdKu89fQNnt_tZd2dAH.png";
import fox             from "@/imports/De7FYYD8GZvjeehwo51Lm.png";
import hedgehog        from "@/imports/dWJKUxbXZ86ZlO9Iq8V_R.png";
import bunny           from "@/imports/eZfZL4cZcsvOLvH-m82sj.png";
import penguin         from "@/imports/IofGdcbjtHozWERe-nYEf.png";
import goldenRetriever from "@/imports/kJ9PUl8X3-hLAVs40UQdG.png";
import bear            from "@/imports/kro8cx2qzYM32Cg8SLOZ4.png";
import fluffyCat       from "@/imports/PmsGMjxO1a3xrEleihhbW.png";
import goldenDog       from "@/imports/Vs20OxD5SCDwZ25ztpfUr.png";
import collie          from "@/imports/VjDkYTZBVgSInK1KMxszi.png"; void collie;

// ── Kawaii UI icons ───────────────────────────────────────────────────
import bedIcon        from "@/imports/__2026-07-11_18.25.41.png";
import diningIcon     from "@/imports/__2026-07-11_18.25.15.png";
import strawbookIcon  from "@/imports/uI2pD3RrCUu9-VMKflHcy.png";
import gearIcon       from "@/imports/__2026-07-11_18.25.55.png";
import newRewardIcon  from "@/imports/5XQcXb7oCcR5FFbTXQQyq-1.png"; void newRewardIcon;
import bookIcon       from "@/imports/__2026-07-10_21.14.48.png";
import frameIcon      from "@/imports/1yoRVOUwrDPP4JUU2_poy.png"; void frameIcon;
import wardrobeIcon   from "@/imports/5XQcXb7oCcR5FFbTXQQyq.png"; void wardrobeIcon;
import pawStampIcon   from "@/imports/-CeJICC-m5LXlOYU97T85.png";
import balloonIcon    from "@/imports/__2026-07-14_16.20.27-1.png";
import giftBoxIcon    from "@/imports/__2026-07-11_18.26.06-1.png";
// ── Store furniture items ─────────────────────────────────────────────
import storeMiniFridge   from "@/imports/Gr-5m5wXMOssl9FyVcgO7.png";
import storeDiningTable  from "@/imports/__2026-07-15_00.13.01.png";
import storeCatBasket    from "@/imports/__2026-07-15_00.13.21.png";
import storeCakeTable    from "@/imports/__2026-07-15_00.13.39.png";
import storeBreakfastTable from "@/imports/__2026-07-15_00.13.53.png";
import storeCandelabra   from "@/imports/__2026-07-15_00.14.13.png";
import storeWarmWindow   from "@/imports/__2026-07-15_00.14.29.png";
import storeFlowerVase   from "@/imports/__2026-07-15_00.14.45.png";
import storeCabinet      from "@/imports/__2026-07-15_00.14.57.png";
import storePhotoFrame      from "@/imports/__2026-07-15_00.15.10.png";
import storeKitchenSinkUnit from "@/imports/aUSxgjATqqxZXZm4Fd0qJ-1.png";
import storePendulumClock   from "@/imports/__2026-07-15_00.15.28-1.png";
import storeVanityTable     from "@/imports/__2026-07-14_16.20.03-2.png";
import storeBedsideDrawers  from "@/imports/__2026-07-14_16.19.10-2.png";
import storeTVStand         from "@/imports/__2026-07-14_16.20.39-2.png";
// ── Store clothing items ──────────────────────────────────────────────
import clothingStrawHat   from "@/imports/1IXsWQXhpzFHEaMx9U3nJ.png";
import clothingBeret      from "@/imports/OZZ8iqNqq2hd1_CZg4qIZ.png";
import clothingBucketHat  from "@/imports/l5g0VscFHswqKCZhd_WD0.png";
import clothingStarGlasses from "@/imports/7b9i86X29EjqPf5H04N9l.png";
import clothingGreenBow   from "@/imports/SCHujXIBNiiocxSHE4aw3.png";
import clothingPinkBow    from "@/imports/mq86i7IAxGh3hIAmExGZE.png";
import clothingSunglasses from "@/imports/y0QENmMxCnTvDiHc161UG.png";
import clothingPlaidBow   from "@/imports/Vw3ahjSPSVKPZo1gfbsdC.png";
import clothingCanvasBag  from "@/imports/Yt5hrqMWa-kfUXVA7_Cms.png";
import clothingRainCape   from "@/imports/y0J9fHTdqD2yMQcdZBrrG.png";
import clothingBackpack   from "@/imports/STkePI9KwmDi5_xDfIfT4.png";
import clothingMessengerBag from "@/imports/uqDVHdfimRVBV1N9_lhPJ.png";
import clothingPoncho     from "@/imports/ckh3GH4lSQ8NwXrTstGTI.png";
import clothingStarBandana from "@/imports/ER1i1bN_uTFrwcW2dmrwk.png";
import clothingPawCollar  from "@/imports/gpg2HmhiUsxywJBGbUXu0.png";
import clothingBellCollar from "@/imports/rqvkwctCMctYfqeDYX4Ug.png";
import clothingPearlNecklace from "@/imports/TItJfAkaPEfgL8xVX6gXu.png";
import clothingFlowerCrown from "@/imports/tN4a8gpKgHpb0RvwT-Yfw.png";
import trendArrowIcon from "@/imports/BVwVQz4niJ5GN5qblqQrl.png";
// ── Gym room assets (Document Figma) ─────────────────────────────────
import docGymIcon      from "@/imports/Document/cc64bd176408bec084b4659295c112893ff5c8f4.png";
import docGymBoard     from "@/imports/Document/e58d9116dd046dfecb5aa75bd38e8ee6ec297d83.png";
import docGymRack      from "@/imports/Document/26dfeb3c3557424db00c84fa4944c76619266f78.png";
import docGymTreadmill from "@/imports/Document/7713c971b02cf27d34d78c923dad47d8dc63dee7.png";
import docGymBottle    from "@/imports/Document/fbf7952617afb64621cd9611c5aa1affdf33b0e5.png";
import docGymSticker   from "@/imports/Document/56b37bace9069c6b5f090585da6dcdeabe3fa38e.png";
import docGymYogaMat   from "@/imports/Document/2e2062dbc0a72e503ece6da41555b0b2d1760af0.png";

// ── Food & activity icons ─────────────────────────────────────────────
import burgerIcon from "@/imports/aqBCeLdGIP26RIoYAY3fk.png";
import cakeImg    from "@/imports/__2026-07-11_19.27.32.png";
import noodlesImg from "@/imports/__2026-07-11_19.27.38.png";
import curryImg   from "@/imports/__2026-07-11_19.27.44.png";
import matchaImg  from "@/imports/__2026-07-11_19.28.01.png";
import crabImg    from "@/imports/__2026-07-11_19.28.07.png";
import pizzaImg   from "@/imports/__2026-07-11_19.28.16.png";
import runDogImg  from "@/imports/xhmEedfEbOaH_s2AvmIvC.png";

// ── Types ─────────────────────────────────────────────────────────────
type Screen =
  | "welcome" | "pet-select" | "cgm-pair"
  | "home"
  | "kitchen-detail" | "gym-detail" | "bedroom-detail" | "food-log"
  | "wardrobe" | "store" | "activity" | "postcards" | "journal"
  | "chat" | "trend" | "log" | "companion-space" | "rewards" | "friend-chat";

type Pet = { id: string; trait: string; image: string; color: string; };
type Msg = { from: "user" | "pet"; text: string; };

// ── Design tokens ─────────────────────────────────────────────────────
const BG     = "#F8F4EE";
const CARD   = "#FDFAF6";
const TXT    = "#3D2B1F";
const MUTED  = "#9B8870";
const SAGE   = "#7A9E7E";
const ROSE   = "#C4917A";
const BORDER = "rgba(61,43,31,0.10)";
const FF     = "Nunito, sans-serif";
const ROOM_BTN: React.CSSProperties = { background: "rgba(253,248,242,0.96)", border: "1.5px solid rgba(61,43,31,0.16)", borderRadius: 20, padding: "6px 13px", fontSize: 11, fontWeight: 900, color: "#3D2B1F", fontFamily: "Nunito, sans-serif", whiteSpace: "nowrap", boxShadow: "0 3px 10px rgba(0,0,0,0.15)", display: "inline-block" };

// ── Static data ───────────────────────────────────────────────────────
const PETS: Pet[] = [
  { id: "mocha",       trait: "Warm & steady",    image: redPandaCoffee,  color: "#C4917A" },
  { id: "rusty",       trait: "Curious & gentle",  image: fox,             color: "#C87A40" },
  { id: "marshmallow", trait: "Soft & quiet",      image: fluffyDog,       color: "#B09AC0" },
  { id: "caramel",     trait: "Playful & alert",   image: catCaramel,      color: "#B88A30" },
  { id: "clover",      trait: "Shy & thoughtful",  image: hedgehog,        color: "#7A9E5F" },
  { id: "daisy",       trait: "Sweet & bashful",   image: bunny,           color: "#D08090" },
  { id: "biscuit",     trait: "Eager & loyal",     image: goldenRetriever, color: "#C09840" },
  { id: "pebble",      trait: "Watchful & calm",   image: penguin,         color: "#5A9EA8" },
  { id: "teddy",       trait: "Slow & cosy",       image: bear,            color: "#907040" },
  { id: "luna",        trait: "Gentle & wistful",  image: fluffyCat,       color: "#D4A0B8" },
  { id: "milo",        trait: "Cheerful & bright", image: goldenDog,       color: "#C09040" },
];

const RANDOM_PET_NAMES = [
  "Maple", "Clover", "Biscuit", "Mochi", "Acorn", "Pebble", "Daisy",
  "Hazel", "Coco", "Chai", "Fern", "Rusty", "Pudding", "Juniper",
  "Tofu", "Sable", "Wren", "Thistle", "Nutmeg", "Pippin",
];

const DEVICES = ["SiBionics", "Dexcom", "Abbott (FreeStyle Libre)", "Medtronic", "OuTai"];

function makeTIR(vh: number, h: number, ir: number, l: number, vl: number) {
  return [
    { label: "Very high", pct: vh, color: "#F4B88A" },
    { label: "High",      pct: h,  color: "#F0D080" },
    { label: "In range",  pct: ir, color: "#7AB87E" },
    { label: "Low",       pct: l,  color: "#A8C0DC" },
    { label: "Very low",  pct: vl, color: "#D4A0B0" },
  ];
}
const TIR_DATA: Record<string, ReturnType<typeof makeTIR>> = {
  "3":  makeTIR(10, 18, 63, 7, 2),
  "7":  makeTIR(12, 20, 58, 8, 2),
  "14": makeTIR(14, 22, 55, 7, 2),
  "30": makeTIR(16, 24, 52, 6, 2),
  "90": makeTIR(18, 26, 48, 6, 2),
};
const AVG_G: Record<string, number> = { "3": 6.9, "7": 7.1, "14": 7.3, "30": 7.4, "90": 7.6 };

const REPLIES = [
  "I'm here with you. What's on your mind?",
  "You don't have to explain everything. I'm just glad you checked in.",
  "Rest is allowed today. How's your body feeling right now?",
  "That sounds like a lot. Take a breath — I've got time.",
  "Patterns can be interesting rather than scary. Want to look at today's together?",
  "I'm all ears. (Literally — look at these ears.)",
  "You're doing better than you think. I mean it.",
];

const FRIENDS = [
  { id: 1, name: "Yuki", initials: "Y", color: "#E8A8B0", last: "Good night from Osaka! 🌙",       time: "2m",  msgs: [
    { from: "them" as const, text: "Hey! How was your glucose today?" },
    { from: "them" as const, text: "Mine was all over the place after lunch 😅" },
    { from: "me"   as const, text: "Not bad! Stayed in range most of the morning" },
    { from: "them" as const, text: "Good night from Osaka! 🌙" },
  ]},
  { id: 2, name: "Hana", initials: "H", color: "#A8C8A0", last: "Having matcha today, so cosy ☕",  time: "1h",  msgs: [
    { from: "me"   as const, text: "How's it going in Tokyo?" },
    { from: "them" as const, text: "Rainy today but cosy indoors" },
    { from: "them" as const, text: "Having matcha today, so cosy ☕" },
  ]},
  { id: 3, name: "Ren",  initials: "R", color: "#A0B8D0", last: "Anyone heading to Shibuya this weekend?", time: "3h", msgs: [
    { from: "them" as const, text: "Anyone heading to Shibuya this weekend?" },
    { from: "me"   as const, text: "Maybe! What's going on?" },
    { from: "them" as const, text: "There's a little market on Sunday 🍡" },
  ]},
];

const GLOBAL_POSTS = [
  { id: 1, region: "Sakura Village",  pet: goldenRetriever, text: "Good morning from Kyoto! Cherry blossoms are drifting by my window today 🌸" },
  { id: 2, region: "Misty Highlands", pet: fox,             text: "Just moved to Edinburgh last month — anyone else here from Scotland? ⛰️" },
  { id: 3, region: "Clover Fields",   pet: bear,            text: "Rainy Sunday, reading with tea. My companion is curled up next to me 📖" },
  { id: 4, region: "Snowpeak Town",   pet: penguin,         text: "Good night, everyone. Rest well wherever you are 🌙" },
];

const WARDROBE_ITEMS = [
  { id: 1, name: "Cosy Scarf", emoji: "🧣", owned: true,  equipped: true  },
  { id: 2, name: "Straw Hat",  emoji: "👒", owned: true,  equipped: false },
  { id: 3, name: "Bow Ribbon", emoji: "🎀", owned: true,  equipped: false },
  { id: 4, name: "Sunglasses", emoji: "🕶️", owned: false, equipped: false },
  { id: 5, name: "Rain Cape",  emoji: "🧥", owned: false, equipped: false },
  { id: 6, name: "Party Hat",  emoji: "🎩", owned: false, equipped: false },
]; void WARDROBE_ITEMS;

const MAP_REGIONS = [
  { id: 1, name: "Sakura Village",  emoji: "🌸", top: "72%", left: "24%", unlocked: true,  scene: postcardMeadow, postcard: "A warm afternoon in Sakura Village. Cherry petals drifting into your tea." },
  { id: 2, name: "Castle Isle",     emoji: "🏰", top: "16%", left: "72%", unlocked: true,  scene: postcardChurch, postcard: "The lighthouse was on all night. Felt safe knowing it was there." },
  { id: 3, name: "Lantern Town",    emoji: "🏮", top: "42%", left: "50%", unlocked: false, scene: postcardForest, postcard: "" },
  { id: 4, name: "Clover Cove",     emoji: "🍀", top: "78%", left: "64%", unlocked: false, scene: postcardBeach,  postcard: "" },
  { id: 5, name: "Misty Highlands", emoji: "⛰️", top: "22%", left: "22%", unlocked: false, scene: postcardForest, postcard: "" },
];

const REWARD_MILESTONES = [
  { stamps: 5,  name: "First Steps",   item: "Cosy Scarf"        },
  { stamps: 10, name: "Steady Days",   item: "Sakura Postcard"   },
  { stamps: 20, name: "Kind Patterns", item: "Lantern Town Map"  },
  { stamps: 35, name: "Quiet Courage", item: "Star Rug"          },
  { stamps: 50, name: "All Seasons",   item: "Maple Heights Trip" },
];

const FOOD_CARBS = [
  { name: "Curry rice",        carbs: 52, image: curryImg   },
  { name: "Ramen noodles",     carbs: 40, image: noodlesImg },
  { name: "Cake slice",        carbs: 45, image: cakeImg    },
  { name: "Matcha soft serve", carbs: 28, image: matchaImg  },
  { name: "Crab plate",        carbs: 8,  image: crabImg    },
  { name: "Pizza (1 slice)",   carbs: 30, image: pizzaImg   },
  { name: "Burger",            carbs: 35, image: burgerIcon },
];

// ── Glucose color helper ───────────────────────────────────────────────
function glucoseColor(val: number): string {
  if (val < 3.9 || val > 13.9) return "#D9534F";
  if (val > 10.0) return "#E8A030";
  return SAGE;
}

// ── Glucose SVG chart ──────────────────────────────────────────────────
function GlucoseChart() {
  const W = 300, H = 100, PAD = 8;
  const yMin = 3.5, yMax = 11;
  const pts = [
    { t: "6am",  v: 5.8 as number | null, p: null as number | null },
    { t: "7am",  v: 6.3,  p: null },
    { t: "8am",  v: 7.0,  p: null },
    { t: "9am",  v: 7.7,  p: null },
    { t: "10am", v: 7.9,  p: null },
    { t: "11am", v: 7.4,  p: null },
    { t: "Now",  v: 7.2,  p: 7.2  },
    { t: "+30m", v: null, p: 7.5  },
  ];
  const xStep = (W - PAD * 2) / (pts.length - 1);
  const toY = (v: number) => H - PAD - ((v - yMin) / (yMax - yMin)) * (H - PAD * 2);
  const toX = (i: number) => PAD + i * xStep;
  const solidPts = pts.slice(0, 7).map((p, i) => `${toX(i)},${toY(p.v!)}`).join(" ");
  const dashPts  = pts.slice(6).filter(p => p.p !== null).map((p, i) => `${toX(6 + i)},${toY(p.p!)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block", overflow: "visible" }}>
      <line x1={PAD} y1={toY(10)} x2={W-PAD} y2={toY(10)} stroke="rgba(61,43,31,0.10)" strokeWidth={1} strokeDasharray="3 3" />
      <line x1={PAD} y1={toY(4)}  x2={W-PAD} y2={toY(4)}  stroke="rgba(61,43,31,0.10)" strokeWidth={1} strokeDasharray="3 3" />
      <polyline points={solidPts} fill="none" stroke={SAGE} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={dashPts}  fill="none" stroke={SAGE} strokeWidth={2}   strokeDasharray="5 4"  strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={toX(6)} cy={toY(7.2)} r={5} fill={SAGE} stroke="#fff" strokeWidth={2} />
      {pts.map((p, i) => (
        <text key={p.t} x={toX(i)} y={H-1} textAnchor="middle" fontSize={8} fill={MUTED} fontFamily={FF} fontWeight={600}>{p.t}</text>
      ))}
    </svg>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────
function BackBtn({ onPress }: { onPress: () => void }) {
  return (
    <button onClick={onPress} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0, flexShrink: 0 }}>
      <ChevronLeft size={22} color={TXT} strokeWidth={2.5} />
    </button>
  );
}

function SHeader({ title, onBack, right }: { title: string; onBack: () => void; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 14px" }}>
      <BackBtn onPress={onBack} />
      <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>{title}</h2>
      {right}
    </div>
  );
}

function RoomBtn({ image, label, top, left, onClick }: { image: string; label: string; top: string; left: string; onClick: () => void }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick(); }} style={{
      position: "absolute", top, left, transform: "translate(-50%,-50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      background: "rgba(253,250,246,0.94)", borderRadius: 16, padding: "8px 10px",
      border: "1.5px solid rgba(61,43,31,0.12)", boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
      cursor: "pointer", zIndex: 5,
    }}>
      <div style={{ width: 36, height: 36 }}>
        <ImageWithFallback src={image} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 800, color: TXT, fontFamily: FF, whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );
}

// ── Phone shell ────────────────────────────────────────────────────────
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#C8C4B8", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0", fontFamily: FF }}>
      <div style={{ width: 393, height: 852, borderRadius: 54, background: BG, boxShadow: "0 50px 100px rgba(0,0,0,0.40), 0 0 0 2px rgba(255,255,255,0.20), inset 0 0 0 1px rgba(0,0,0,0.06)", overflow: "hidden", position: "relative", flexShrink: 0, fontFamily: FF }}>
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#0a0a0a", borderRadius: 20, zIndex: 200, pointerEvents: "none" }} />
        {children}
      </div>
    </div>
  );
}

// ── Welcome ────────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: "0 0 60%", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 25% 35%, rgba(255,200,210,0.85) 0%, transparent 55%), radial-gradient(ellipse at 78% 18%, rgba(180,230,210,0.80) 0%, transparent 50%), radial-gradient(ellipse at 55% 75%, rgba(255,218,185,0.75) 0%, transparent 50%), radial-gradient(ellipse at 8% 72%, rgba(200,205,240,0.70) 0%, transparent 48%), #F0EBE3" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(115deg, transparent, transparent 18px, rgba(255,255,255,0.10) 18px, rgba(255,255,255,0.10) 19px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 24 }}>
          <div style={{ width: 230, height: 230, filter: "drop-shadow(0 16px 40px rgba(61,43,31,0.28))" }}>
            <ImageWithFallback src={redPandaCoffee} alt="Tend mascot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </div>
        <div style={{ height: 58 }} />
      </div>
      <div style={{ flex: 1, background: CARD, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 32px 48px", gap: 18, textAlign: "center", borderRadius: "0 0 54px 54px" }}>
        <div>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: TXT, letterSpacing: "-0.5px", margin: "0 0 10px", fontFamily: FF }}>Tend</h1>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.65, margin: 0, maxWidth: 250 }}>Gentle care for your glucose patterns.</p>
        </div>
        <button onClick={onNext} style={{ width: "100%", padding: "17px 0", borderRadius: 18, background: ROSE, color: "#fff", border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 16, boxShadow: "0 8px 24px rgba(196,145,122,0.35)", marginTop: 6 }}>{"Let's begin"}</button>
      </div>
    </div>
  );
}

// ── Pet Select ─────────────────────────────────────────────────────────
function PetSelectScreen({ onNext }: { onNext: (pet: Pet, pn: string, un: string) => void }) {
  const [sel, setSel]           = useState(0);
  const [petName, setPetName]   = useState("");
  const [userName, setUserName] = useState("");
  const inp: React.CSSProperties = { boxSizing: "border-box", padding: "14px 16px", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 15, color: TXT, outline: "none" };

  const surpriseMe = () => {
    const name = RANDOM_PET_NAMES[Math.floor(Math.random() * RANDOM_PET_NAMES.length)];
    setPetName(name);
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", paddingTop: 66, overflow: "hidden" }}>
      <div style={{ padding: "0 24px 12px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: TXT, margin: "0 0 4px", fontFamily: FF }}>Choose your companion</h1>
        <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.55 }}>{"Just a feeling — you can't pick wrong."}</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px", scrollbarWidth: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
          {PETS.map((pet, i) => {
            const on = sel === i;
            return (
              <button key={pet.id} onClick={() => setSel(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 6px 10px", borderRadius: 18, background: on ? CARD : "#EAE5DB", border: `2px solid ${on ? ROSE : "transparent"}`, cursor: "pointer", boxShadow: on ? "0 4px 18px rgba(196,145,122,0.22)" : "none", transition: "all 0.14s" }}>
                <div style={{ width: 60, height: 60 }}><ImageWithFallback src={pet.image} alt={pet.trait} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                <span style={{ fontSize: 10, fontWeight: 700, color: on ? TXT : MUTED, marginTop: 5, textAlign: "center", lineHeight: 1.3, fontFamily: FF }}>{pet.trait}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: MUTED, display: "block", marginBottom: 7, fontFamily: FF }}>Name them (optional)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={petName} onChange={e => setPetName(e.target.value)} placeholder="Your companion" style={{ ...inp, flex: 1 }} />
              <button onClick={surpriseMe} style={{ padding: "0 14px", borderRadius: 16, background: ROSE + "22", border: `1.5px solid ${ROSE}66`, cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 12, color: ROSE, whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                Surprise me!
              </button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: MUTED, display: "block", marginBottom: 7, fontFamily: FF }}>What should I call you?</label>
            <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="friend" style={{ ...inp, width: "100%" }} />
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 24px 44px" }}>
        <button onClick={() => onNext(PETS[sel], petName || "Your companion", userName || "friend")} style={{ width: "100%", padding: "16px 0", borderRadius: 18, background: ROSE, color: "#fff", border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 16 }}>Continue</button>
      </div>
    </div>
  );
}

// ── CGM Pair ───────────────────────────────────────────────────────────
function CGMPairScreen({ onNext }: { onNext: () => void }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", paddingTop: 66 }}>
      <div style={{ padding: "0 28px 22px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: TXT, margin: "0 0 8px", fontFamily: FF }}>Pair your CGM</h1>
        <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.55 }}>Simulated for this prototype.</p>
      </div>
      <div style={{ flex: 1, padding: "0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {DEVICES.map(dev => (
          <button key={dev} onClick={() => setSel(dev)} style={{ width: "100%", padding: "18px 20px", textAlign: "left", borderRadius: 16, background: CARD, border: `1.5px solid ${sel === dev ? ROSE : BORDER}`, fontFamily: FF, fontSize: 16, fontWeight: 600, color: TXT, cursor: "pointer", boxShadow: sel === dev ? "0 4px 16px rgba(196,145,122,0.18)" : "none", transition: "all 0.14s" }}>{dev}</button>
        ))}
      </div>
      <div style={{ padding: "20px 24px 44px" }}>
        <button onClick={onNext} style={{ width: "100%", padding: "16px 0", borderRadius: 18, background: "transparent", color: TXT, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Connect later</button>
      </div>
    </div>
  );
}

// ── Home ───────────────────────────────────────────────────────────────
function HomeScreen({ pet, petName, stamps, onMenu, onTrend, onLog, onChat, onKitchen, onBedroom }: {
  pet: Pet; petName: string; stamps: number;
  onMenu: () => void; onTrend: () => void; onLog: () => void;
  onChat: () => void; onKitchen: () => void; onBedroom: () => void;
}) {
  const glucoseVal = 7.2;
  const gColor = glucoseColor(glucoseVal);
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "62px 18px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onMenu} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 4.5, padding: "2px 0" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2.5, background: TXT, borderRadius: 2 }} />)}
          </button>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: TXT, fontFamily: FF, lineHeight: 1.1 }}>Tend</div>
            <div style={{ fontSize: 10, color: MUTED, fontFamily: FF, fontWeight: 600 }}>Your glucose, gently understood.</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: CARD, borderRadius: 22, padding: "6px 11px 6px 8px", boxShadow: "0 2px 8px rgba(0,0,0,0.09)", border: `1px solid ${BORDER}` }}>
          <div style={{ width: 22, height: 22 }}><ImageWithFallback src={pawStampIcon} alt="stamps" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          <span style={{ fontSize: 14, fontWeight: 900, color: TXT, fontFamily: FF }}>{stamps}</span>
          <span style={{ fontSize: 10, color: MUTED, fontFamily: FF }}>stamps</span>
        </div>
      </div>

      <div style={{ margin: "0 14px 8px", background: CARD, borderRadius: 18, padding: "12px 16px", border: `1.5px solid ${BORDER}`, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: gColor + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: gColor }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: gColor, fontFamily: FF, lineHeight: 1 }}>{glucoseVal}</span>
              <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>mmol/L</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: SAGE, marginLeft: 4 }}>{"↗ Rising gently"}</span>
            </div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 2, fontFamily: FF }}>{"Comfortable range · soft prediction"}</div>
          </div>
          <button onClick={onTrend} style={{ display: "flex", alignItems: "center", gap: 3, background: "#EDE8DE", border: "none", borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 12, color: TXT, flexShrink: 0 }}>
            View trend <ChevronLeft size={12} color={TXT} style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative", margin: "0 14px", borderRadius: 22, overflow: "hidden", background: "#EDE8DE", minHeight: 0 }}>
        <ImageWithFallback src={houseBgImg} alt="Your house" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }} />
        <button onClick={onChat} style={{ position: "absolute", bottom: "2%", left: "50%", transform: "translateX(-50%)", width: 110, height: 110, background: "transparent", border: "none", cursor: "pointer", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.22))", zIndex: 5 }}>
          <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </button>
        <div onClick={onChat} style={{ position: "absolute", bottom: "30%", left: "50%", transform: "translateX(-10%)", background: CARD, borderRadius: "12px 12px 12px 3px", padding: "7px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.13)", cursor: "pointer", maxWidth: 172, border: `1px solid ${BORDER}`, zIndex: 5 }}>
          <p style={{ fontSize: 11, color: TXT, fontFamily: FF, fontWeight: 700, margin: 0, lineHeight: 1.4 }}>{"I'm here if you want to talk."}</p>
        </div>
        <button onClick={onBedroom} style={{ position: "absolute", bottom: "6%", left: "8%", width: "24%", height: "40%", background: "transparent", border: "none", cursor: "pointer", zIndex: 4 }} aria-label="Bedroom" />
        <button onClick={onKitchen} style={{ position: "absolute", bottom: "10%", right: "4%", width: "32%", height: "36%", background: "transparent", border: "none", cursor: "pointer", zIndex: 4 }} aria-label="Kitchen" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "8px 14px 36px", flexShrink: 0 }}>
        {([
          { label: "Chat",   sub: `Talk with ${petName}`, src: pet.image,       cb: onChat  },
          { label: "Trend",  sub: "See your patterns",    src: trendArrowIcon,  cb: onTrend },
          { label: "Record", sub: "Add a quick note",     src: strawbookIcon,   cb: onLog   },
        ] as const).map(tile => (
          <button key={tile.label} onClick={tile.cb} style={{ background: CARD, border: `1.5px solid ${BORDER}`, borderRadius: 18, padding: "12px 6px 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F0EAE0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ImageWithFallback src={tile.src} alt={tile.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 900, color: TXT, fontFamily: FF }}>{tile.label}</div>
            <div style={{ fontSize: 10, color: MUTED, fontFamily: FF, textAlign: "center", lineHeight: 1.3 }}>{tile.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Menu Drawer ────────────────────────────────────────────────────────
function MenuDrawer({ open, onClose, onNavigate, pet }: { open: boolean; onClose: () => void; onNavigate: (s: Screen) => void; pet: Pet }) {
  const items: { image: string; label: string; dest: Screen }[] = [
    { image: diningIcon,         label: "Kitchen",         dest: "kitchen-detail"  },
    { image: docGymIcon,         label: "Gym",             dest: "gym-detail"      },
    { image: bedIcon,            label: "Bedroom",         dest: "bedroom-detail"  },
    { image: balloonIcon,        label: "Postcard World",  dest: "postcards"       },
    { image: pet.image,          label: "Companion Space", dest: "companion-space" },
    { image: pawStampIcon,       label: "Store",           dest: "store"           },
    { image: giftBoxIcon,        label: "Stamp Journey",   dest: "rewards"         },
    { image: gearIcon,           label: "Settings",        dest: "home"            },
  ];
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 150, background: "rgba(61,43,31,0.35)", backdropFilter: "blur(2px)" }} />}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "72%", background: "#F8F4EC", zIndex: 160, borderRadius: "0 28px 28px 0", boxShadow: "4px 0 40px rgba(0,0,0,0.22)", transform: open ? "translateX(0)" : "translateX(-102%)", transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column", paddingTop: 68 }}>
        <div style={{ padding: "0 28px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0 }}>Menu</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color={MUTED} /></button>
        </div>
        {items.map((item, i) => (
          <button key={item.label} onClick={() => { onClose(); onNavigate(item.dest); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", background: "none", border: "none", borderTop: i === 0 ? `1px solid ${BORDER}` : "none", borderBottom: `1px solid ${BORDER}`, cursor: "pointer", fontFamily: FF }}>
            <div style={{ width: 38, height: 38, flexShrink: 0 }}>
              <ImageWithFallback src={item.image} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: TXT }}>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ── Kitchen ────────────────────────────────────────────────────────────
function KitchenDetailScreen({ pet, petName, onBack, onFoodLog, onActivity }: { pet: Pet; petName: string; onBack: () => void; onFoodLog: () => void; onActivity: () => void }) {
  void onActivity;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header — bg #F5EBD8 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 20px 8px", flexShrink: 0, background: "#F5EBD8", zIndex: 10 }}>
        <BackBtn onPress={onBack} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>Kitchen</div>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>Cook and log your meals</div>
        </div>
        <div style={{ width: 34, height: 34 }}>
          <ImageWithFallback src={kitchenIcon} alt="Kitchen" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>

      {/* ── KITCHEN ROOM SCENE — 738.5px reference height ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#C8B898" }}>

        {/* Wall — linear-gradient(174.833deg, #F5E8D5, #EAD AC5) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "54.99%", background: "linear-gradient(174.833deg, rgb(245,232,213) 3.67%, rgb(234,218,197) 96.33%)", zIndex: 0 }} />

        {/* Wall texture stripes x=66,165,264,330 */}
        {[66, 165, 264, 330].map(x => (
          <div key={x} style={{ position: "absolute", top: 0, left: x, width: 1, height: "55%", background: "rgba(200,170,130,0.22)", zIndex: 1 }} />
        ))}

        {/* Floor — from-#d8c8a8 to-#c4b090, starts at 50% */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, #D8C8A8, #C4B090)", zIndex: 0 }} />

        {/* Floor plank stripes x=44,132,220,308 */}
        {[44, 132, 220, 308].map(x => (
          <div key={x} style={{ position: "absolute", top: "50%", bottom: 0, left: x, width: 1, background: "rgba(150,120,80,0.22)", zIndex: 1 }} />
        ))}

        {/* Window — right wall, top:85/738.5=11.5%, left:192.5, 205×205 */}
        <div style={{ position: "absolute", top: "11.5%", left: 192, width: 205, height: 205, zIndex: 2 }}>
          <ImageWithFallback src={kitchenWindow} alt="Window" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Sink + upper cabinet — left:-60.5, top:154/738.5=20.9%, 325×337, overflow clip */}
        <div style={{ position: "absolute", top: "20.9%", left: -60, width: 325, height: 337, overflow: "hidden", zIndex: 3 }}>
          <ImageWithFallback src={kitchenSink} alt="Sink" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
          {/* Vegetable basket inside sink at left:153, top:126 */}
          <div style={{ position: "absolute", left: 153, top: 126, width: 100, height: 100 }}>
            <ImageWithFallback src={kitchenBasket} alt="Vegetables" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
          </div>
        </div>

        {/* Stove — in floor container at left:201.5, top:-33.25 → scene top:336/738.5=45.5%, 151×151 */}
        <div style={{ position: "absolute", top: "45.5%", left: 201, width: 151, height: 151, zIndex: 4 }}>
          <ImageWithFallback src={kitchenStove} alt="Stove" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
        </div>

        {/* Dining table — left:37.5, top:472/738.5=63.9%, 303×239, overflow clip */}
        {/* Pet inside at left:-14, top:-18 → scene left:23.5, top:454 (61.5%) */}
        <div style={{ position: "absolute", top: "63.9%", left: 37, width: 303, height: 239, overflow: "hidden", zIndex: 5 }}>
          <ImageWithFallback src={kitchenTable} alt="Dining table" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
          {/* Pet: left:-14, top:-18 within table container */}
          <div style={{ position: "absolute", left: -14, top: -18, width: 129, height: 142, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.16))", zIndex: 2 }}>
            <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {/* Meal Log pill button: left:126, top:8 within table container */}
          <button onClick={onFoodLog} style={{ position: "absolute", left: 126, top: 8, zIndex: 3, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ background: "rgba(253,248,242,0.96)", border: "1.5px solid rgba(61,43,31,0.16)", borderRadius: 20, boxShadow: "0 3px 10px rgba(0,0,0,0.15)", height: 32, display: "flex", alignItems: "center", gap: 6, padding: "0 15px" }}>
              <ImageWithFallback src={kitchenBurger} alt="Meal" style={{ width: 18, height: 18, objectFit: "contain", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 900, color: TXT, fontFamily: FF, whiteSpace: "nowrap" as const }}>Meal Log</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Gym ────────────────────────────────────────────────────────────────
function GymDetailScreen({ pet, petName, onBack, onActivity }: { pet: Pet; petName: string; onBack: () => void; onActivity: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 20px 8px", flexShrink: 0, background: "#E6F0EE", zIndex: 10 }}>
        <BackBtn onPress={onBack} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>Gym</div>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>Move, sweat, recover</div>
        </div>
        <div style={{ width: 34, height: 34 }}>
          <ImageWithFallback src={docGymIcon} alt="Gym" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>

      {/* ── GYM ROOM SCENE ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#C0CEC8" }}>

        {/* Wall */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "56%", background: "linear-gradient(174.74deg, #E4EFEB 0%, #D0E4DE 100%)", zIndex: 0 }} />

        {/* Wall texture stripes — x=59,138,216,295 of 393px */}
        {[59, 138, 216, 295].map(x => (
          <div key={x} style={{ position: "absolute", top: 0, left: x, width: 1, height: "56%", background: "rgba(180,210,200,0.3)", zIndex: 1 }} />
        ))}

        {/* Floor */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, #D8C8A8, #C8B898)", zIndex: 0 }} />

        {/* Floor plank stripes — x=39,118,197,275,354 of 393px */}
        {[39, 118, 197, 275, 354].map(x => (
          <div key={x} style={{ position: "absolute", top: "50%", bottom: 0, left: x, width: 1, background: "rgba(160,130,90,0.25)", zIndex: 1 }} />
        ))}

        {/* Baseboard */}
        <div style={{ position: "absolute", top: "56%", left: 0, right: 0, height: 5, background: "#B0A08A", zIndex: 3 }} />

        {/* "Small Steps Count Too" sticker — left wall, top:7%, left:16 */}
        <div style={{ position: "absolute", top: "7%", left: 16, width: 96, zIndex: 3, filter: "drop-shadow(1px 3px 8px rgba(0,0,0,0.18))" }}>
          <ImageWithFallback src={docGymSticker} alt="Small steps count too" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>

        {/* "Checks In" board — right wall, top:11%, left:181.5 */}
        <div style={{ position: "absolute", top: "11%", left: 181, width: 179, height: 179, zIndex: 3 }}>
          <ImageWithFallback src={docGymBoard} alt="Checks In board" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Dumbbell rack — straddles wall/floor boundary, top:33.6%, left:184 */}
        <div style={{ position: "absolute", top: "33.6%", left: 184, width: 209, height: 209, zIndex: 4, mixBlendMode: "multiply" as const }}>
          <ImageWithFallback src={docGymRack} alt="Dumbbell rack" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Treadmill — top:50%, left:-50, 253×270, mix-blend-mode:multiply */}
        <div style={{ position: "absolute", top: "50%", left: -50, width: 253, height: 270, overflow: "hidden", zIndex: 4 }}>
          <ImageWithFallback src={docGymTreadmill} alt="Treadmill" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Pet — top:54.5%, left:59, 182×152 */}
        <div style={{ position: "absolute", top: "54.5%", left: 59, width: 182, height: 152, zIndex: 5, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.18))" }}>
          <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          {/* Water bottle overlay — left:45, top:60 within pet */}
          <div style={{ position: "absolute", left: 45, top: 60, width: 93, height: 79, zIndex: 6 }}>
            <ImageWithFallback src={docGymBottle} alt="Water bottle" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </div>

        {/* Yoga mat — top:61.3%, left:204.5, 198×259 */}
        <div style={{ position: "absolute", top: "61.3%", left: 204, width: 198, height: 259, zIndex: 4 }}>
          <ImageWithFallback src={docGymYogaMat} alt="Yoga mat" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Rubber mat strip — top:70%, left:8, 377×14 */}
        <div style={{ position: "absolute", top: "70%", left: 8, width: 377, height: 14, borderRadius: 6, background: "rgba(80,100,90,0.18)", zIndex: 3 }} />

        {/* Loose dumbbells — top:79%, left:7.5, 115×110 */}
        <div style={{ position: "absolute", top: "79%", left: 7, width: 115, height: 110, zIndex: 5 }}>
          <ImageWithFallback src={docGymIcon} alt="Dumbbells" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Today's Activity button — top:88%, left:113.5, width:166 */}
        <button onClick={onActivity} style={{
          position: "absolute", top: "88%", left: 113, width: 166,
          zIndex: 9, background: "none", border: "none", cursor: "pointer", padding: 0,
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.22))",
        }}>
          <div style={{ background: TXT, borderRadius: 24, padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <span style={{ fontSize: 15 }}>🏃</span>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#FFF8F0", fontFamily: FF, whiteSpace: "nowrap" as const }}>{"Today's Activity"}</span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Food Log ───────────────────────────────────────────────────────────
function FoodLogScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [foodSearch, setFoodSearch] = useState("");
  const [photoMode, setPhotoMode]   = useState(false);
  const [carbEst, setCarbEst]       = useState<number | null>(null);
  const [logged, setLogged]         = useState<{ name: string; carbs: number }[]>([]);
  const filtered = FOOD_CARBS.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));

  const simulateScan = () => {
    setPhotoMode(false);
    setCarbEst(28 + Math.floor(Math.random() * 30));
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {photoMode && (
        <div style={{ position: "absolute", inset: 0, zIndex: 250, background: "rgba(20,16,10,0.90)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ width: 220, height: 220, borderRadius: 28, border: "2.5px dashed rgba(255,255,255,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Camera size={52} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: FF }}>Frame your meal</span>
          </div>
          <button onClick={simulateScan} style={{ padding: "15px 44px", borderRadius: 20, background: ROSE, border: "none", color: "#fff", fontFamily: FF, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>Scan</button>
          <button onClick={() => setPhotoMode(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontFamily: FF, fontSize: 14, cursor: "pointer" }}>Cancel</button>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 14px", flexShrink: 0 }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Meal Log</h2>
        <div style={{ width: 34, height: 34 }}><ImageWithFallback src={burgerIcon} alt="Meal" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px", scrollbarWidth: "none" }}>
        <button onClick={() => setPhotoMode(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 18, background: "#FFF5E8", border: "1.5px solid rgba(196,145,122,0.28)", cursor: "pointer", marginBottom: 12, textAlign: "left" }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: ROSE + "22", display: "flex", alignItems: "center", justifyContent: "center" }}><Camera size={20} color={ROSE} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF }}>Scan food with camera</div>
            <div style={{ fontSize: 12, color: MUTED }}>Auto-estimates carbs from photo</div>
          </div>
        </button>
        {carbEst !== null && (
          <div style={{ padding: "12px 16px", borderRadius: 14, background: "#F0D08044", border: "1.5px solid rgba(184,160,80,0.35)", marginBottom: 12, fontSize: 13, color: TXT, fontFamily: FF, fontWeight: 700 }}>
            Estimated ~{carbEst}g carbs from your photo
          </div>
        )}
        {logged.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8, fontFamily: FF }}>Logged today</div>
            {logged.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderRadius: 12, background: SAGE + "18", border: "1px solid " + SAGE + "44", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: TXT, fontFamily: FF }}>{l.name}</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: SAGE, fontFamily: FF }}>{l.carbs}g</span>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUTED, textAlign: "right", marginTop: 4, fontFamily: FF }}>
              Total: <strong style={{ color: TXT }}>{logged.reduce((s, l) => s + l.carbs, 0)}g</strong> carbs
            </div>
          </div>
        )}
        <div style={{ fontSize: 13, fontWeight: 800, color: TXT, marginBottom: 10, fontFamily: FF }}>Carb reference</div>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={15} color={MUTED} style={{ position: "absolute", top: "50%", left: 14, transform: "translateY(-50%)" }} />
          <input value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder="Search food…" style={{ width: "100%", boxSizing: "border-box" as const, padding: "12px 14px 12px 38px", borderRadius: 14, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(foodSearch ? filtered : FOOD_CARBS).map(f => (
            <button key={f.name} onClick={() => setLogged(l => [...l, { name: f.name, carbs: f.carbs }])} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 14, background: CARD, border: `1.5px solid ${BORDER}`, cursor: "pointer", textAlign: "left", width: "100%" }}>
              <div style={{ width: 40, height: 40, flexShrink: 0 }}><ImageWithFallback src={f.image} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: TXT, fontFamily: FF }}>{f.name}</span>
              <div style={{ background: "#F0D08088", borderRadius: 8, padding: "4px 10px" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#7A6A30", fontFamily: FF }}>{f.carbs}g</span>
              </div>
              <span style={{ fontSize: 11, color: MUTED }}>+ Add</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 16px 40px", flexShrink: 0 }}>
        <button onClick={onSave} style={{ width: "100%", padding: "14px 0", borderRadius: 16, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer" }}>Save meal log</button>
      </div>
    </div>
  );
}

// ── Bedroom Detail ─────────────────────────────────────────────────────
function BedroomDetailScreen({ pet, petName, onBack, onWardrobe, onPostcards, onJournal, onChat }: {
  pet: Pet; petName: string;
  onBack: () => void; onWardrobe: () => void; onPostcards: () => void; onJournal: () => void; onChat: () => void;
}) {
  void bedroomBed; void bedroomNightstand; void bedroomRoundTable;

  return (
    <div style={{ height: "100%", background: "#EDE0D5", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── HEADER ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 22px 8px", flexShrink: 0, background: "#F5EDE4", zIndex: 10 }}>
        <BackBtn onPress={onBack} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>Bedroom</div>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>Rest, explore, and reflect</div>
        </div>
      </div>

      {/* ── ROOM SCENE ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#B8A692" }}>

        {/* Wall */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "57%", background: "linear-gradient(170.826deg, #F7EFE6 6%, #EDE4D8 94%)", zIndex: 0 }} />
        {/* Floor */}
        <div style={{ position: "absolute", top: "57%", left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, #C8B8A4, #B8A692)", zIndex: 0 }} />
        {/* Baseboard */}
        <div style={{ position: "absolute", top: "57%", left: 0, right: 0, height: 5, background: "#A89070", zIndex: 2 }} />

        {/* ── BUTTON 1: POSTCARDS ── */}
        <button onClick={onPostcards} style={{
          position: "absolute", top: "5%", left: 16, width: 100,
          zIndex: 3, background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          filter: "drop-shadow(2px 5px 10px rgba(0,0,0,0.28))",
        }}>
          <div style={{ width: "100%", background: "#FEF5EB", borderRadius: "8px 8px 0 0", border: "3.5px solid #C89060", padding: 6, overflow: "hidden" }}>
            <ImageWithFallback src={ps2Balloon} alt="Postcards" style={{ width: "100%", height: 86, objectFit: "cover", borderRadius: 3, display: "block" }} />
          </div>
          <div style={{ ...ROOM_BTN }}>✈ Postcards</div>
        </button>

        {/* Flowers — decorative, larger */}
        <div style={{ position: "absolute", top: "5%", left: 198, width: 78, zIndex: 3, pointerEvents: "none", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.16))" }}>
          <ImageWithFallback src={ps2Flowers} alt="" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>

        {/* ── WARDROBE image (non-interactive) ── */}
        <div style={{
          position: "absolute", top: "22%", left: -6, width: 172, zIndex: 4,
          filter: "drop-shadow(3px 8px 16px rgba(0,0,0,0.30))", pointerEvents: "none",
        }}>
          <ImageWithFallback src={ps2Wardrobe} alt="Wardrobe" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
        {/* ── BUTTON 2: WARDROBE — tight hit-zone over wardrobe image only ── */}
        <button onClick={onWardrobe} style={{
          position: "absolute", top: "22%", left: -6, width: 172, height: "38%",
          zIndex: 5, background: "transparent", border: "none", cursor: "pointer", padding: 0,
        }} aria-label="Open wardrobe">
          <div style={{ position: "absolute", bottom: 8, left: 16, pointerEvents: "none" }}>
            <div style={{ ...ROOM_BTN }}>Wardrobe</div>
          </div>
        </button>

        {/* BED — shifted right */}
        <div style={{
          position: "absolute", top: "38%", left: "60%", transform: "translateX(-50%)",
          width: 218, height: 230, zIndex: 5, pointerEvents: "none",
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.22))", overflow: "hidden",
        }}>
          <ImageWithFallback src={ps2Bed} alt="Bed" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* ── BUTTON 3: JOURNAL ── */}
        <button onClick={onJournal} style={{
          position: "absolute", top: "68%", left: -17, width: 167,
          zIndex: 6, background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5,
        }}>
          <div style={{ position: "relative", width: "100%", height: 157, overflow: "clip" }}>
            <ImageWithFallback src={ps2Table} alt="Table" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            <div style={{ position: "absolute", top: 119, left: 103, width: 42, height: 41 }}>
              <ImageWithFallback src={ps2JournalBook} alt="Journal" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>
          <div style={{ ...ROOM_BTN, marginLeft: 22 }}>Journal</div>
        </button>

        {/* Pet */}
        <div style={{
          position: "absolute", top: "72%", left: 158, width: 138,
          zIndex: 7, pointerEvents: "none",
          filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.22))",
        }}>
          <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>

        {/* ── BUTTON 4: CHAT ── */}
        <button onClick={onChat} style={{
          position: "absolute", top: "75%", left: 252,
          zIndex: 8, background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <div style={{ ...ROOM_BTN, fontSize: 11, padding: "7px 14px" }}>Chat</div>
        </button>
      </div>
    </div>
  );
}

// ── Wardrobe ───────────────────────────────────────────────────────────
function WardrobeScreen({ pet, stamps, onBack, onStore }: { pet: Pet; stamps: number; onBack: () => void; onStore: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [dressed, setDressed]   = useState<number | null>(null);

  const selItem = selected !== null ? CLOTHING_ITEMS[selected] : null;

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: FF }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 20px 10px", flexShrink: 0 }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Dress Up</h2>
        <button onClick={onStore} style={{ display: "flex", alignItems: "center", gap: 5, background: ROSE + "1A", borderRadius: 14, padding: "6px 12px", border: `1.5px solid ${ROSE}44`, cursor: "pointer" }}>
          <span style={{ fontSize: 13 }}>🛍</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: ROSE, fontFamily: FF }}>Visit Store</span>
        </button>
      </div>

      {/* Stage */}
      <div style={{ margin: "0 16px", borderRadius: 22, overflow: "hidden", position: "relative", height: 220, flexShrink: 0 }}>
        {/* Curtain backdrop */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #4A2E4A 0%, #7A4A7A 45%, #C8A8C8 100%)" }} />
        {/* Stage spotlight glow */}
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 180, height: 220, background: "radial-gradient(ellipse at center, rgba(255,240,200,0.50) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Curtain side drapes */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 48, bottom: 0, background: "linear-gradient(90deg, #3A1E3A, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 48, bottom: 0, background: "linear-gradient(270deg, #3A1E3A, transparent)", pointerEvents: "none" }} />
        {/* Stage floor */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: "linear-gradient(to bottom, #8A6A5A, #6A4A3A)", borderTop: "2px solid rgba(255,220,160,0.30)" }} />
        {/* Stage light bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #FFD080, #FFF0A0, #FFD080)", boxShadow: "0 2px 12px rgba(255,220,100,0.60)" }} />

        {/* Pet on stage */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", width: 120, height: 130, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.40))" }}>
          <ImageWithFallback src={pet.image} alt="Your pet" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          {/* Clothing item overlay on top of pet */}
          {dressed !== null && (
            <div style={{ position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)", width: 72, height: 72, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.30))" }}>
              <ImageWithFallback src={CLOTHING_ITEMS[dressed].img} alt={CLOTHING_ITEMS[dressed].name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          )}
        </div>

        {/* Current outfit label */}
        <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,230,180,0.90)", fontFamily: FF, letterSpacing: "0.06em" }}>
            {dressed !== null ? CLOTHING_ITEMS[dressed].name : "No outfit selected"}
          </span>
        </div>
      </div>

      {/* Clothing selection grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 0", scrollbarWidth: "none" as const }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em", color: MUTED, marginBottom: 10 }}>Select an item</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, paddingBottom: 16 }}>
          {CLOTHING_ITEMS.map((item, i) => {
            const unlocked = item.cost <= stamps;
            const isSel    = selected === i;
            return (
              <button key={i} onClick={() => unlocked && setSelected(isSel ? null : i)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                padding: "12px 6px 10px", borderRadius: 16, cursor: unlocked ? "pointer" : "default",
                background: isSel ? pet.color + "22" : unlocked ? CARD : "#ECEAE6",
                border: `2px solid ${isSel ? pet.color : "transparent"}`,
                opacity: unlocked ? 1 : 0.52,
                position: "relative",
              }}>
                {!unlocked && (
                  <div style={{ position: "absolute", top: 7, right: 7, fontSize: 11 }}>🔒</div>
                )}
                <div style={{ width: 52, height: 52, filter: unlocked ? "none" : "grayscale(0.7)" }}>
                  <ImageWithFallback src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: isSel ? pet.color : unlocked ? TXT : MUTED, textAlign: "center", lineHeight: 1.2, fontFamily: FF }}>{item.name}</span>
                {!unlocked && (
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div style={{ width: 11, height: 11 }}><ImageWithFallback src={pawStampIcon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                    <span style={{ fontSize: 9, fontWeight: 800, color: MUTED }}>{item.cost}</span>
                  </div>
                )}
                {isSel && <span style={{ fontSize: 9, color: pet.color, fontWeight: 900 }}>selected ✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dress Up button */}
      <div style={{ padding: "10px 16px 40px", flexShrink: 0 }}>
        {selItem ? (
          <button onClick={() => { setDressed(selected); setSelected(null); }} style={{ width: "100%", padding: "14px 0", borderRadius: 18, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer", boxShadow: "0 6px 20px rgba(196,145,122,0.35)" }}>
            Dress Up — {selItem.name}
          </button>
        ) : (
          <button disabled style={{ width: "100%", padding: "14px 0", borderRadius: 18, background: "#EDE8DE", border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: MUTED, cursor: "default" }}>
            Tap an item to preview
          </button>
        )}
      </div>
    </div>
  );
}

// ── Activity ───────────────────────────────────────────────────────────
function ActivityScreen({ onBack }: { onBack: () => void }) {
  const [sleepTab, setSleepTab] = useState<"last" | "week">("last");
  const stages = [
    { label: "Awake", pct: 8,  color: "#C4917A" },
    { label: "Light", pct: 42, color: "#A8C4D4" },
    { label: "Deep",  pct: 28, color: "#5A7EA8"  },
    { label: "REM",   pct: 22, color: "#8A6EC4"  },
  ];
  const weekSleep = [
    { day: "M", hrs: 7.2, q: 78 }, { day: "T", hrs: 6.5, q: 65 },
    { day: "W", hrs: 8.1, q: 88 }, { day: "T", hrs: 7.8, q: 82 },
    { day: "F", hrs: 6.9, q: 71 }, { day: "S", hrs: 8.5, q: 91 },
    { day: "S", hrs: 7.5, q: 80 },
  ];
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <SHeader title="Today's Activity" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 36px", display: "flex", flexDirection: "column", gap: 12, scrollbarWidth: "none" as const }}>

        {/* Steps hero */}
        <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, fontFamily: FF }}>July 14</div>
        <div style={{ background: CARD, borderRadius: 22, padding: "18px 20px", border: `1.5px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em", color: MUTED, marginBottom: 6, fontFamily: FF }}>Steps today</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: TXT, fontFamily: FF, lineHeight: 1 }}>4,862</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>steps · A light active day</div>
          </div>
          <div style={{ width: 80, height: 80, flexShrink: 0 }}><ImageWithFallback src={runDogImg} alt="Activity" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Calories",    value: "312", unit: "kcal", accent: "#F4B88A" },
            { label: "Active time", value: "28",  unit: "min",  accent: "#B5EAD7" },
            { label: "Distance",    value: "3.2", unit: "km",   accent: "#F0D080" },
            { label: "Duration",    value: "22",  unit: "min",  accent: "#DDD6FE" },
          ].map(s => (
            <div key={s.label} style={{ background: CARD, borderRadius: 18, padding: "14px 16px", border: `1.5px solid ${BORDER}` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.accent, marginBottom: 8 }} />
              <div style={{ fontSize: 26, fontWeight: 900, color: TXT, fontFamily: FF, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 3, fontFamily: FF }}>{s.unit} · {s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#B5EAD755", borderRadius: 16, padding: "13px 16px", border: "1.5px solid rgba(122,158,126,0.25)" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF }}>Morning walk · 08:30</div>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>22 min · ~145 kcal · steadier glucose noted</div>
        </div>

        {/* ── SLEEP QUALITY ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: TXT, fontFamily: FF }}>🌙 Sleep Quality</div>
          <div style={{ display: "flex", background: "#E8EEEC", borderRadius: 12, padding: 3, gap: 2 }}>
            {(["last", "week"] as const).map(t => (
              <button key={t} onClick={() => setSleepTab(t)} style={{ padding: "4px 10px", borderRadius: 9, background: sleepTab === t ? CARD : "transparent", border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 10, color: sleepTab === t ? TXT : MUTED }}>
                {t === "last" ? "Last night" : "This week"}
              </button>
            ))}
          </div>
        </div>

        {sleepTab === "last" && (<>
          <div style={{ background: CARD, borderRadius: 18, padding: "14px 16px", border: `1.5px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid #8A6EC4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#5A7EA8", fontFamily: FF, lineHeight: 1 }}>82</span>
              <span style={{ fontSize: 8, color: MUTED, fontFamily: FF }}>/100</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 900, color: TXT, fontFamily: FF }}>Good · 7h 56m</div>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>11:12 pm – 7:08 am</div>
              <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                {[{ l: "HR", v: "58 bpm" }, { l: "SpO₂", v: "97%" }].map(s => (
                  <div key={s.l} style={{ background: "#F0EDE8", borderRadius: 7, padding: "2px 7px", fontSize: 10, color: MUTED, fontFamily: FF }}>
                    {s.l} <strong style={{ color: TXT }}>{s.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: CARD, borderRadius: 16, padding: "12px 14px", border: `1.5px solid ${BORDER}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, fontFamily: FF, marginBottom: 8 }}>Sleep stages</div>
            <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 12, marginBottom: 10 }}>
              {stages.map(s => <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
              {stages.map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                  <span style={{ fontSize: 10, color: TXT, fontFamily: FF }}>{s.label} <span style={{ color: MUTED }}>{s.pct}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {sleepTab === "week" && (
          <div style={{ background: CARD, borderRadius: 18, padding: "14px 16px", border: `1.5px solid ${BORDER}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, fontFamily: FF, marginBottom: 10 }}>Avg 7.5 hrs · Quality 79/100</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 64 }}>
              {weekSleep.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ width: "100%", borderRadius: "3px 3px 0 0", background: d.q >= 80 ? "#5A7EA8" : d.q >= 70 ? "#A8C4D4" : "#C4917A", height: `${(d.hrs / 10) * 64}px` }} />
                  <span style={{ fontSize: 8, color: MUTED, fontFamily: FF }}>{d.day}</span>
                  <span style={{ fontSize: 8, fontWeight: 800, color: TXT, fontFamily: FF }}>{d.hrs}h</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Store ──────────────────────────────────────────────────────────────
const CLOTHING_ITEMS = [
  { img: clothingStarBandana,   name: "Star Bandana",   cost: 8  },
  { img: clothingPawCollar,     name: "Paw Collar",     cost: 10 },
  { img: clothingBellCollar,    name: "Bell Collar",    cost: 12 },
  { img: clothingStrawHat,      name: "Straw Hat",      cost: 14 },
  { img: clothingBeret,         name: "Beret",          cost: 16 },
  { img: clothingBucketHat,     name: "Bucket Hat",     cost: 18 },
  { img: clothingRainCape,      name: "Rain Cape",      cost: 20 },
  { img: clothingBackpack,      name: "Cute Backpack",  cost: 22 },
  { img: clothingStarGlasses,   name: "Star Glasses",   cost: 23 },
  { img: clothingGreenBow,      name: "Green Bow Tie",  cost: 26 },
  { img: clothingPinkBow,       name: "Pink Bow",       cost: 28 },
  { img: clothingMessengerBag,  name: "Messenger Bag",  cost: 30 },
  { img: clothingSunglasses,    name: "Sunglasses",     cost: 35 },
  { img: clothingPoncho,        name: "Cream Poncho",   cost: 38 },
  { img: clothingPlaidBow,      name: "Plaid Bow",      cost: 40 },
  { img: clothingCanvasBag,     name: "Canvas Bag",     cost: 42 },
  { img: clothingPearlNecklace, name: "Pearl Necklace", cost: 45 },
  { img: clothingFlowerCrown,   name: "Flower Crown",   cost: 50 },
];

const STORE_ITEMS = [
  { img: storeFlowerVase,      name: "Flower Vase",       cost: 5  },
  { img: storePhotoFrame,      name: "Photo Frame",       cost: 8  },
  { img: storeCatBasket,       name: "Cat Basket",        cost: 12 },
  { img: storeMiniFridge,      name: "Mini Fridge",       cost: 15 },
  { img: storeCandelabra,      name: "Candelabra",        cost: 20 },
  { img: storeCabinet,         name: "Side Cabinet",      cost: 25 },
  { img: storeBreakfastTable,  name: "Breakfast Table",   cost: 28 },
  { img: storeCakeTable,       name: "Cake Table",        cost: 30 },
  { img: storeWarmWindow,      name: "Warm Window",       cost: 35 },
  { img: storeDiningTable,     name: "Dinner Table",      cost: 40 },
  { img: storeBedsideDrawers,  name: "Bedside Drawers",   cost: 45 },
  { img: storePendulumClock,   name: "Pendulum Clock",    cost: 50 },
  { img: storeVanityTable,     name: "Vanity Table",      cost: 55 },
  { img: storeKitchenSinkUnit, name: "Kitchen Sink",      cost: 60 },
  { img: storeTVStand,         name: "TV Stand",          cost: 68 },
];

function StoreItemGrid({ items, stamps, purchased, onBuy }: {
  items: { img: string; name: string; cost: number }[];
  stamps: number;
  purchased: Set<number>;
  onBuy: (i: number) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {items.map((item, i) => {
        const unlocked = item.cost <= stamps;
        const bought   = purchased.has(i);
        return (
          <div key={i} style={{
            background: CARD, borderRadius: 18,
            border: `1.5px solid ${unlocked ? BORDER : "rgba(61,43,31,0.06)"}`,
            overflow: "hidden", opacity: unlocked ? 1 : 0.55,
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "14px 10px 12px", position: "relative",
          }}>
            {!unlocked && (
              <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(61,43,31,0.18)", borderRadius: 10, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 13 }}>🔒</span>
              </div>
            )}
            <div style={{ width: 88, height: 88, display: "flex", alignItems: "center", justifyContent: "center", filter: unlocked ? "none" : "grayscale(0.6)" }}>
              <ImageWithFallback src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, color: TXT, textAlign: "center", marginTop: 8, lineHeight: 1.3 }}>{item.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 5, background: unlocked ? "rgba(122,158,126,0.15)" : "rgba(61,43,31,0.07)", borderRadius: 10, padding: "3px 8px" }}>
              <div style={{ width: 14, height: 14 }}><ImageWithFallback src={pawStampIcon} alt="stamps" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <span style={{ fontSize: 11, fontWeight: 900, color: unlocked ? SAGE : MUTED }}>{item.cost}</span>
            </div>
            {unlocked && (
              <button onClick={() => onBuy(i)} disabled={bought} style={{ marginTop: 10, width: "100%", border: "none", borderRadius: 12, cursor: bought ? "default" : "pointer", padding: "7px 0", fontSize: 11, fontWeight: 900, background: bought ? "rgba(122,158,126,0.18)" : SAGE, color: bought ? SAGE : "#fff" }}>
                {bought ? "✓ Owned" : "Buy"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StoreScreen({ stamps, onBack }: { stamps: number; onBack: () => void }) {
  const [tab, setTab]            = useState<"furniture" | "clothing">("furniture");
  const [furnitureBought, setFurnitureBought] = useState<Set<number>>(new Set());
  const [clothingBought, setClothingBought]   = useState<Set<number>>(new Set());

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: FF }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 20px 10px", flexShrink: 0, background: BG, zIndex: 10 }}>
        <BackBtn onPress={onBack} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: TXT }}>Store</div>
          <div style={{ fontSize: 11, color: MUTED }}>Spend your stamps</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(61,43,31,0.07)", borderRadius: 14, padding: "5px 10px" }}>
          <div style={{ width: 16, height: 16 }}><ImageWithFallback src={pawStampIcon} alt="stamps" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          <span style={{ fontSize: 13, fontWeight: 900, color: TXT }}>{stamps}</span>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ padding: "0 16px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", borderRadius: 14, background: "#EDE8DE", padding: 3, gap: 3 }}>
          {(["furniture", "clothing"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "9px 0", borderRadius: 11,
              background: tab === t ? CARD : "transparent",
              color: tab === t ? TXT : MUTED,
              border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 13,
              boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}>
              {t === "furniture" ? "Furniture" : "Clothing"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 36px", scrollbarWidth: "none" as const }}>
        {tab === "furniture" ? (
          <StoreItemGrid items={STORE_ITEMS} stamps={stamps} purchased={furnitureBought} onBuy={i => setFurnitureBought(s => { const n = new Set(s); n.add(i); return n; })} />
        ) : (
          <StoreItemGrid items={CLOTHING_ITEMS} stamps={stamps} purchased={clothingBought} onBuy={i => setClothingBought(s => { const n = new Set(s); n.add(i); return n; })} />
        )}
      </div>
    </div>
  );
}

// ── Postcards ──────────────────────────────────────────────────────────
function PostcardsScreen({ stamps, onBack }: { stamps: number; onBack: () => void }) {
  const [selected, setSelected] = useState<typeof MAP_REGIONS[number] | null>(null);
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 10px" }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Postcard World</h2>
        <div style={{ width: 34, height: 34 }}><ImageWithFallback src={frameIcon} alt="Collection" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
      </div>
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{ background: CARD, borderRadius: 14, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, border: `1.5px solid ${BORDER}` }}>
          <div style={{ width: 28, height: 28 }}><ImageWithFallback src={pawStampIcon} alt="stamps" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF }}>{stamps} stamps collected</div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: MUTED }}>Tap a region</div>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", margin: "0 16px 16px", borderRadius: 22, overflow: "hidden", border: `1.5px solid ${BORDER}` }}>
        <ImageWithFallback src={worldMapImg} alt="World map" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        {MAP_REGIONS.map(region => (
          <button key={region.id} onClick={() => region.unlocked && setSelected(region)} style={{ position: "absolute", top: region.top, left: region.left, transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", background: region.unlocked ? "rgba(253,250,246,0.96)" : "rgba(200,196,188,0.85)", border: `2.5px solid ${region.unlocked ? ROSE : "#B8B0A0"}`, boxShadow: region.unlocked ? "0 4px 14px rgba(0,0,0,0.20)" : "none", cursor: region.unlocked ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, zIndex: 5 }}>
            {region.unlocked ? region.emoji : "🔒"}
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ position: "absolute", inset: 0, zIndex: 250, background: "rgba(61,43,31,0.45)", display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: CARD, borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 40px rgba(0,0,0,0.22)", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 12px" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>{selected.emoji} {selected.name}</div>
              <button onClick={() => setSelected(null)} style={{ background: "#EDE8DE", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={MUTED} /></button>
            </div>
            {/* Scenic postcard image */}
            <div style={{ position: "relative", height: 164, margin: "0 16px", borderRadius: 16, overflow: "hidden", marginBottom: 14 }}>
              <ImageWithFallback src={selected.scene} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(20,12,6,0.62) 100%)" }} />
              {selected.postcard && (
                <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
                  <p style={{ fontSize: 13, color: "#fff", fontFamily: FF, lineHeight: 1.55, margin: 0, fontStyle: "italic", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>"{selected.postcard}"</p>
                </div>
              )}
            </div>
            <div style={{ fontSize: 12, color: MUTED, textAlign: "center", fontFamily: FF, padding: "0 24px 40px" }}>— from {selected.name} · visit more regions to collect all</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Journal (Records) ──────────────────────────────────────────────────
function JournalScreen({ pet, petName, onBack }: { pet: Pet; petName: string; onBack: () => void }) {
  const [tab, setTab] = useState<"basal" | "bolus" | "food" | "glucose">("basal");
  const [shareToast, setShareToast] = useState(false);

  // Basal rate schedule (not injection events — the programmed daily profile)
  const basalSchedule = [
    { period: "00:00 – 06:00", rate: "0.80 u/hr", daily: "4.8u",  note: "Overnight low-demand"  },
    { period: "06:00 – 09:00", rate: "1.20 u/hr", daily: "3.6u",  note: "Dawn phenomenon bump"  },
    { period: "09:00 – 12:00", rate: "0.90 u/hr", daily: "2.7u",  note: "Morning activity"       },
    { period: "12:00 – 18:00", rate: "0.75 u/hr", daily: "4.5u",  note: "Afternoon stable"       },
    { period: "18:00 – 22:00", rate: "1.00 u/hr", daily: "4.0u",  note: "Evening meal window"    },
    { period: "22:00 – 00:00", rate: "0.80 u/hr", daily: "1.6u",  note: "Pre-sleep taper"        },
  ];
  const basalTotal = "21.2u / day";

  // Bolus injection log
  const bolusLog = [
    { date: "Jul 14", time: "08:05", dose: "4u",  meal: "Breakfast",  bg: "6.2",  carbs: "45g"  },
    { date: "Jul 14", time: "13:10", dose: "6u",  meal: "Lunch",       bg: "7.8",  carbs: "72g"  },
    { date: "Jul 14", time: "19:30", dose: "5u",  meal: "Dinner",      bg: "8.1",  carbs: "58g"  },
    { date: "Jul 13", time: "08:00", dose: "4u",  meal: "Breakfast",  bg: "5.9",  carbs: "42g"  },
    { date: "Jul 13", time: "12:45", dose: "7u",  meal: "Lunch",       bg: "9.2",  carbs: "80g"  },
    { date: "Jul 13", time: "19:15", dose: "6u",  meal: "Dinner",      bg: "7.4",  carbs: "65g"  },
    { date: "Jul 12", time: "08:10", dose: "4u",  meal: "Breakfast",  bg: "6.5",  carbs: "40g"  },
    { date: "Jul 12", time: "20:00", dose: "8u",  meal: "Dinner (big)","bg": "10.3","carbs": "95g"},
  ];

  // Food log — photo-based, incomplete
  const foodLog = [
    { date: "Jul 14", time: "08:00", meal: "Toast + scrambled egg", photo: "📷", complete: true  },
    { date: "Jul 14", time: "13:00", meal: "Curry rice (medium)",   photo: "📷", complete: true  },
    { date: "Jul 14", time: "19:25", meal: "Hot pot dinner",        photo: "📷", complete: true  },
    { date: "Jul 13", time: "08:05", meal: "Oatmeal + banana",      photo: "📷", complete: true  },
    { date: "Jul 13", time: "15:30", meal: "Afternoon snack",       photo: null, complete: false },
    { date: "Jul 13", time: "19:10", meal: "Ramen noodles",         photo: "📷", complete: true  },
    { date: "Jul 12", time: "12:45", meal: "Crab rice plate",       photo: "📷", complete: true  },
    { date: "Jul 12", time: "17:00", meal: "Tea + biscuits",        photo: null, complete: false },
    { date: "Jul 12", time: "20:00", meal: "Fancy birthday dinner", photo: "📷", complete: true  },
  ];

  // Blood glucose readings — displayed only, no manual entry
  const glucoseLog = [
    { date: "Jul 14", time: "07:45", value: 6.2,  label: "Pre-breakfast"  },
    { date: "Jul 14", time: "10:30", value: 8.4,  label: "Post-breakfast" },
    { date: "Jul 14", time: "12:50", value: 7.1,  label: "Pre-lunch"      },
    { date: "Jul 14", time: "15:20", value: 9.6,  label: "Post-lunch"     },
    { date: "Jul 14", time: "18:55", value: 7.8,  label: "Pre-dinner"     },
    { date: "Jul 14", time: "21:30", value: 10.2, label: "Post-dinner"    },
    { date: "Jul 13", time: "07:50", value: 5.9,  label: "Pre-breakfast"  },
    { date: "Jul 13", time: "10:15", value: 7.7,  label: "Post-breakfast" },
    { date: "Jul 13", time: "12:30", value: 6.8,  label: "Pre-lunch"      },
    { date: "Jul 13", time: "15:10", value: 11.4, label: "Post-lunch"     },
    { date: "Jul 13", time: "19:00", value: 7.3,  label: "Pre-dinner"     },
    { date: "Jul 13", time: "21:45", value: 9.1,  label: "Post-dinner"    },
  ];

  const glucoseColor = (v: number) => v < 4 ? "#C4917A" : v <= 10 ? SAGE : "#C4917A";
  const glucoseLabel = (v: number) => v < 4 ? "Low" : v <= 10 ? "In range" : "High";

  const TABS = [
    { key: "basal",   label: "Basal",   icon: "💉" },
    { key: "bolus",   label: "Bolus",   icon: "⚡" },
    { key: "food",    label: "Food",    icon: "🍱" },
    { key: "glucose", label: "Glucose", icon: "📊" },
  ] as const;

  const thS: React.CSSProperties = { fontSize: 10, fontWeight: 800, color: MUTED, fontFamily: FF, padding: "8px 8px", textAlign: "left" as const, background: "#EDE8DE", whiteSpace: "nowrap" as const };
  const tdS: React.CSSProperties = { fontSize: 11, color: TXT, fontFamily: FF, padding: "9px 8px", borderBottom: `1px solid ${BORDER}`, verticalAlign: "top" as const };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 18px 10px", flexShrink: 0 }}>
        <BackBtn onPress={onBack} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>Records</div>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>Jul 12 – Jul 14</div>
        </div>
        <button
          onClick={() => { setShareToast(true); setTimeout(() => setShareToast(false), 2200); }}
          style={{ display: "flex", alignItems: "center", gap: 5, background: TXT, borderRadius: 20, padding: "7px 14px", border: "none", cursor: "pointer", boxShadow: "0 3px 10px rgba(61,43,31,0.28)" }}
        >
          <span style={{ fontSize: 13 }}>↑</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#FFF8F0", fontFamily: FF }}>Share</span>
        </button>
      </div>

      {/* Share toast */}
      {shareToast && (
        <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)", background: TXT, color: "#FFF8F0", borderRadius: 16, padding: "9px 20px", fontSize: 12, fontWeight: 700, fontFamily: FF, zIndex: 99, boxShadow: "0 4px 16px rgba(0,0,0,0.22)", whiteSpace: "nowrap" }}>
          Report link copied — share with doctor or family ♥
        </div>
      )}

      {/* 4-tab selector */}
      <div style={{ padding: "0 16px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", borderRadius: 14, background: "#EDE8DE", padding: 3, gap: 2 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              flex: 1, padding: "8px 0", borderRadius: 11,
              background: tab === t.key ? CARD : "transparent",
              color: tab === t.key ? TXT : MUTED,
              border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 11,
              boxShadow: tab === t.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px", scrollbarWidth: "none" as const }}>

        {/* ── BASAL TAB ── */}
        {tab === "basal" && (<>
          <div style={{ background: CARD, borderRadius: 16, padding: "12px 14px", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, fontFamily: FF, marginBottom: 6 }}>Daily basal profile · prescribed schedule</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: TXT, fontFamily: FF }}>21.2u</span>
              <span style={{ fontSize: 12, color: MUTED, fontFamily: FF }}>total / day</span>
              <span style={{ marginLeft: "auto", background: "#B5EAD733", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 800, color: SAGE, fontFamily: FF }}>On schedule</span>
            </div>
          </div>
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#EDE8DE" }}>
                <th style={thS}>Time period</th>
                <th style={{ ...thS, textAlign: "right" as const }}>Rate</th>
                <th style={{ ...thS, textAlign: "right" as const }}>Subtotal</th>
                <th style={thS}>Note</th>
              </tr></thead>
              <tbody>
                {basalSchedule.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? CARD : "#FAF6F0" }}>
                    <td style={{ ...tdS, fontWeight: 700, fontSize: 10 }}>{r.period}</td>
                    <td style={{ ...tdS, fontWeight: 900, color: SAGE, textAlign: "right" as const }}>{r.rate}</td>
                    <td style={{ ...tdS, fontWeight: 700, color: MUTED, textAlign: "right" as const }}>{r.daily}</td>
                    <td style={{ ...tdS, color: MUTED, fontSize: 10 }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background: "#EDE8DE", borderRadius: 12, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: TXT, fontFamily: FF }}>Total daily basal</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: SAGE, fontFamily: FF }}>{basalTotal}</span>
          </div>
        </>)}

        {/* ── BOLUS TAB ── */}
        {tab === "bolus" && (<>
          <div style={{ background: CARD, borderRadius: 16, padding: "12px 14px", border: `1.5px solid ${BORDER}`, marginBottom: 12, display: "flex", gap: 16 }}>
            {[{ label: "Avg bolus", val: "5.5u" }, { label: "Injections", val: "3 / day" }, { label: "Avg pre-BG", val: "7.4" }].map(s => (
              <div key={s.label} style={{ flex: 1, textAlign: "center" as const }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>{s.val}</div>
                <div style={{ fontSize: 10, color: MUTED, fontFamily: FF }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#EDE8DE" }}>
                <th style={thS}>Date</th>
                <th style={thS}>Time</th>
                <th style={{ ...thS, textAlign: "right" as const }}>Dose</th>
                <th style={thS}>Meal</th>
                <th style={{ ...thS, textAlign: "right" as const }}>Pre-BG</th>
                <th style={{ ...thS, textAlign: "right" as const }}>Carbs</th>
              </tr></thead>
              <tbody>
                {bolusLog.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? CARD : "#FAF6F0" }}>
                    <td style={{ ...tdS, fontWeight: 700, color: MUTED }}>{r.date}</td>
                    <td style={{ ...tdS, color: MUTED }}>{r.time}</td>
                    <td style={{ ...tdS, fontWeight: 900, color: ROSE, textAlign: "right" as const }}>{r.dose}</td>
                    <td style={{ ...tdS }}>{r.meal}</td>
                    <td style={{ ...tdS, textAlign: "right" as const, fontWeight: 700, color: parseFloat(r.bg) > 10 ? ROSE : SAGE }}>{r.bg}</td>
                    <td style={{ ...tdS, textAlign: "right" as const, color: MUTED }}>{r.carbs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>)}

        {/* ── FOOD TAB ── */}
        {tab === "food" && (<>
          <div style={{ background: "#FFF8EC", borderRadius: 14, padding: "10px 14px", border: "1.5px solid #E8C87A44", marginBottom: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>📸</span>
            <p style={{ fontSize: 11, color: "#7A6030", fontFamily: FF, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
              Food log is photo-based and may be <strong>incomplete</strong>. Major meals are usually captured; everyday snacks or simple meals might be missing.
            </p>
          </div>
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            {foodLog.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderBottom: i < foodLog.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? CARD : "#FAF6F0" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: r.complete ? "#EDE8DE" : "#F5F0EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, border: `1.5px solid ${BORDER}` }}>
                  {r.complete ? r.photo : "·"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: r.complete ? TXT : MUTED, fontFamily: FF, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{r.meal}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontFamily: FF }}>{r.date} · {r.time}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, fontFamily: FF, borderRadius: 8, padding: "2px 8px", background: r.complete ? "#B5EAD733" : "#F0D08033", color: r.complete ? SAGE : "#9A8030", flexShrink: 0 }}>
                  {r.complete ? "Logged" : "Missing"}
                </span>
              </div>
            ))}
          </div>
        </>)}

        {/* ── GLUCOSE TAB ── */}
        {tab === "glucose" && (<>
          <div style={{ background: CARD, borderRadius: 16, padding: "12px 14px", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, fontFamily: FF, marginBottom: 8 }}>Today at a glance</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "In range", val: "67%", color: SAGE    },
                { label: "High",     val: "25%", color: ROSE    },
                { label: "Low",      val: "8%",  color: "#C4917A" },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: "#F4EFE8", borderRadius: 10, padding: "8px 6px", textAlign: "center" as const }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: s.color, fontFamily: FF }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontFamily: FF }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#F0F8EE", borderRadius: 14, padding: "9px 14px", border: "1.5px solid #B5EAD740", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#5A7A5E", fontFamily: FF, fontWeight: 600 }}>
              📊 Readings are logged automatically — no manual entry needed.
            </span>
          </div>
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            {glucoseLog.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < glucoseLog.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? CARD : "#FAF6F0" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: glucoseColor(r.value) + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: glucoseColor(r.value), fontFamily: FF }}>{r.value}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TXT, fontFamily: FF }}>{r.label}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontFamily: FF }}>{r.date} · {r.time}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, borderRadius: 8, padding: "2px 9px", background: glucoseColor(r.value) + "22", color: glucoseColor(r.value), fontFamily: FF }}>
                  {glucoseLabel(r.value)}
                </span>
              </div>
            ))}
          </div>
        </>)}

        {/* Pet insight strip */}
        <div style={{ background: pet.color + "18", borderRadius: 16, padding: "12px 14px", border: `1.5px solid ${pet.color}33`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, flexShrink: 0 }}><ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          <p style={{ fontSize: 12, color: TXT, fontFamily: FF, lineHeight: 1.55, margin: 0, fontWeight: 600 }}>
            {tab === "basal" && "Your basal covers the dawn rise well. Let's keep watching that 6–9 am window. ♥"}
            {tab === "bolus" && "Bolus timing looks good! The Jul 13 lunch spike is worth chatting about when you're ready."}
            {tab === "food" && "Big meals are captured — that's what matters most for pattern-spotting. Nice work logging!"}
            {tab === "glucose" && "Two-thirds in range is genuinely great. The post-dinner highs are a useful clue. 📈"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Chat ───────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: "Explain my recent trend",  icon: "📈" },
  { label: "I feel a bit anxious",     icon: "🌿" },
  { label: "Help me reflect on today", icon: "💭" },
];

function ChatScreen({ pet, petName, userName, onBack }: { pet: Pet; petName: string; userName: string; onBack: () => void }) {
  const [msgs, setMsgs]         = useState<Msg[]>([{ from: "pet", text: `Hi ${userName} — I'm glad you came by. How are you feeling today?` }]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const endRef                  = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMsgs(m => [...m, { from: "user", text: msg }]);
    setInput("");
    setShowPrompts(false);
    setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { from: "pet", text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
      setTyping(false);
    }, 1100 + Math.random() * 700);
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "66px 20px 12px", borderBottom: `1px solid ${BORDER}`, background: CARD }}>
        <BackBtn onPress={onBack} />
        <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", background: "#F0EAE0", flexShrink: 0 }}>
          <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF }}>{petName}</div>
          <div style={{ fontSize: 12, color: SAGE, fontWeight: 700 }}>● always here</div>
        </div>
      </div>
      <div style={{ background: "#FBF5DC", padding: "9px 20px", borderBottom: "1px solid rgba(184,160,80,0.20)" }}>
        <p style={{ fontSize: 11, color: "#7A6A30", lineHeight: 1.5, fontStyle: "italic", fontFamily: FF, margin: 0 }}>{"This companion can help you reflect on patterns, but it does not provide medical advice."}</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 8px", display: "flex", flexDirection: "column", gap: 12, scrollbarWidth: "none" }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: msg.from === "user" ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
            {msg.from === "pet" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "#F0EAE0", flexShrink: 0 }}>
                <ImageWithFallback src={pet.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            )}
            <div style={{ maxWidth: "72%", padding: "10px 14px", borderRadius: 18, borderBottomLeftRadius: msg.from === "pet" ? 4 : 18, borderBottomRightRadius: msg.from === "user" ? 4 : 18, background: msg.from === "pet" ? CARD : pet.color, color: msg.from === "pet" ? TXT : "#fff", fontSize: 14, fontWeight: 500, lineHeight: 1.55, fontFamily: FF, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "#F0EAE0", flexShrink: 0 }}>
              <ImageWithFallback src={pet.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ padding: "12px 16px", borderRadius: 18, borderBottomLeftRadius: 4, background: CARD }}>
              <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: MUTED, animation: `chatdot 1.2s ${i*0.2}s infinite` }} />)}</div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      {showPrompts && (
        <div style={{ padding: "6px 14px 4px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none", flexShrink: 0 }}>
          {QUICK_PROMPTS.map(qp => (
            <button key={qp.label} onClick={() => send(qp.label)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 13px", borderRadius: 22, background: CARD, border: `1.5px solid ${BORDER}`, cursor: "pointer", fontFamily: FF, fontSize: 12, fontWeight: 700, color: TXT, whiteSpace: "nowrap" as const, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <span>{qp.icon}</span>{qp.label}
            </button>
          ))}
        </div>
      )}
      <div style={{ padding: "8px 16px 40px", background: CARD, borderTop: `1px solid ${BORDER}`, display: "flex", gap: 10, alignItems: "center" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={`Talk to ${petName}…`} style={{ flex: 1, padding: "12px 16px", borderRadius: 24, background: BG, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none" }} />
        <button onClick={() => send()} disabled={!input.trim()} style={{ width: 44, height: 44, borderRadius: "50%", background: input.trim() ? pet.color : "#D8D4CC", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.18s" }}>
          <Send size={17} color="#fff" />
        </button>
      </div>
      <style>{`@keyframes chatdot{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

// ── Trend Detail ───────────────────────────────────────────────────────
function TrendScreen({ onBack, onStampAwarded }: { onBack: () => void; onStampAwarded: () => void }) {
  const [period, setPeriod]           = useState("7");
  const [showNums, setShowNums]       = useState(true);
  const [tirRewarded, setTirRewarded] = useState(false);
  const segments = TIR_DATA[period];
  const inRange  = segments.find(s => s.label === "In range")!.pct;
  const avgG     = AVG_G[period];

  useEffect(() => {
    if (inRange >= 50 && !tirRewarded) { setTirRewarded(true); setTimeout(onStampAwarded, 800); }
  }, [period]);

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 8px" }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Trend Detail</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: MUTED }}>Numbers</span>
          <div onClick={() => setShowNums(v => !v)} style={{ width: 42, height: 24, borderRadius: 12, cursor: "pointer", background: showNums ? SAGE : "#C8C4BC", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: showNums ? 20 : 2, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.22)" }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, padding: "0 16px 10px" }}>
        {["3","7","14","30","90"].map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{ flex: 1, padding: "8px 0", borderRadius: 12, background: period === p ? TXT : CARD, color: period === p ? "#fff" : MUTED, border: `1.5px solid ${period === p ? TXT : BORDER}`, fontFamily: FF, fontWeight: 800, fontSize: 12, cursor: "pointer", transition: "all 0.14s" }}>{p}d</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 36px", display: "flex", flexDirection: "column", gap: 12, scrollbarWidth: "none" }}>
        <div style={{ background: SAGE, borderRadius: 20, padding: "18px 22px", display: "flex", alignItems: "center", gap: 18 }}>
          <div>
            {showNums ? <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1, fontFamily: FF }}>7.2</div> : <div style={{ width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />}
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.82)", marginTop: 4 }}>mmol/L</div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", fontFamily: FF, marginBottom: 4 }}>{"↗ Rising gently"}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)" }}>Comfortable range</div>
          </div>
        </div>
        <div style={{ background: CARD, borderRadius: 20, padding: "18px 16px 12px" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: TXT, marginBottom: 12, fontFamily: FF }}>{"Today's pattern"}</div>
          <GlucoseChart />
          <div style={{ fontSize: 11, color: MUTED, fontStyle: "italic", marginTop: 4 }}>{"— — soft 30-min prediction"}</div>
        </div>
        <div style={{ background: CARD, borderRadius: 20, padding: "18px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: TXT, fontFamily: FF, marginBottom: 14 }}>Time in Range</div>
          <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
            <div style={{ width: 44, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", flexShrink: 0 }}>
              {segments.map(seg => <div key={seg.label} style={{ flex: seg.pct, background: seg.color, minHeight: 2 }} />)}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, justifyContent: "space-around" }}>
              {segments.map(seg => (
                <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 2, background: seg.color, flexShrink: 0 }} />
                  <span style={{ fontSize: seg.label === "In range" ? 15 : 12, fontWeight: seg.label === "In range" ? 900 : 500, color: TXT, fontFamily: FF }}>{showNums ? `${seg.pct}%` : "—"} {seg.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: BG, borderRadius: 12 }}>
            <div style={{ fontSize: 12, color: MUTED, fontFamily: FF }}>{inRange >= 50 ? `${inRange}% in range — a stamp was awarded` : `${inRange}% in range · keep going`}</div>
          </div>
        </div>
        <div style={{ background: CARD, borderRadius: 20, padding: "16px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF, marginBottom: 8 }}>Average glucose</div>
          {showNums ? <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}><span style={{ fontSize: 36, fontWeight: 900, color: TXT, fontFamily: FF }}>{avgG}</span><span style={{ fontSize: 14, color: MUTED }}>mmol/L</span></div> : <div style={{ width: 80, height: 36, borderRadius: 8, background: "#EDE8DE" }} />}
        </div>
        <div style={{ background: CARD, borderRadius: 20, padding: "16px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF, marginBottom: 8 }}>GMI estimate</div>
          {showNums ? <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}><span style={{ fontSize: 36, fontWeight: 900, color: TXT, fontFamily: FF }}>6.8%</span><span style={{ fontSize: 12, color: MUTED }}>est. HbA1c</span></div> : <div style={{ width: 60, height: 36, borderRadius: 8, background: "#EDE8DE" }} />}
          <p style={{ fontSize: 11, color: MUTED, margin: "8px 0 0", fontStyle: "italic", lineHeight: 1.5 }}>{"A rough estimate only — not a clinical value."}</p>
        </div>
      </div>
    </div>
  );
}

// ── Log ────────────────────────────────────────────────────────────────
function LogScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [sel, setSel]    = useState<string[]>([]);
  const [note, setNote]  = useState("");
  const [detail, setDet] = useState<Record<string, string>>({});
  const [photoMode, setPhotoMode] = useState(false);
  const [carbEst, setCarbEst]     = useState<number | null>(null);

  const cats = [
    { id: "meal",     label: "Meal",     ph: "What did you eat? Est. carbs?"  },
    { id: "insulin",  label: "Insulin",  ph: "Units & time?"                  },
    { id: "sensor",   label: "Sensor",   ph: "Change date, site, notes"       },
    { id: "unwell",   label: "Unwell",   ph: "How are you feeling?"           },
    { id: "high",     label: "High BG",  ph: "Approx value & possible cause?" },
    { id: "exercise", label: "Exercise", ph: "Type & duration"                },
    { id: "other",    label: "Other",    ph: "Anything else"                  },
  ];
  const toggle = (id: string) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const simulateScan = () => {
    setPhotoMode(false);
    const est = 28 + Math.floor(Math.random() * 30);
    setCarbEst(est);
    if (!sel.includes("meal")) setSel(s => [...s, "meal"]);
    setDet(d => ({ ...d, meal: `Photo scan: ~${est}g carbs` }));
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 14px" }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Record</h2>
        <div style={{ width: 34, height: 34 }}><ImageWithFallback src={strawbookIcon} alt="Log" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
      </div>
      {photoMode && (
        <div style={{ position: "absolute", inset: 0, zIndex: 250, background: "rgba(20,16,10,0.90)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ width: 220, height: 220, borderRadius: 28, border: "2.5px dashed rgba(255,255,255,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Camera size={52} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: FF }}>Frame your meal</span>
          </div>
          <button onClick={simulateScan} style={{ padding: "15px 44px", borderRadius: 20, background: ROSE, border: "none", color: "#fff", fontFamily: FF, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>Scan</button>
          <button onClick={() => setPhotoMode(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontFamily: FF, fontSize: 14, cursor: "pointer" }}>Cancel</button>
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 8px", scrollbarWidth: "none" }}>
        <button onClick={() => setPhotoMode(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: 18, background: "#FFF8EE", border: "1.5px solid rgba(196,145,122,0.30)", cursor: "pointer", marginBottom: 14, textAlign: "left" }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: ROSE + "22", display: "flex", alignItems: "center", justifyContent: "center" }}><Camera size={20} color={ROSE} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF }}>Scan food with camera</div>
            <div style={{ fontSize: 12, color: MUTED }}>Auto-estimates carbs from photo</div>
          </div>
        </button>
        {carbEst !== null && (
          <div style={{ padding: "12px 16px", borderRadius: 14, background: "#F0D08044", border: "1.5px solid rgba(184,160,80,0.35)", marginBottom: 14, fontSize: 13, color: TXT, fontFamily: FF, fontWeight: 700 }}>
            Estimated ~{carbEst}g carbs from your photo
          </div>
        )}
        <p style={{ fontSize: 14, color: MUTED, margin: "0 0 12px", lineHeight: 1.6, fontFamily: FF }}>What would you like to note today?</p>
        <div style={{ display: "flex", gap: 9, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
          {cats.map(cat => {
            const on = sel.includes(cat.id);
            return (
              <button key={cat.id} onClick={() => toggle(cat.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 14px", borderRadius: 14, background: on ? ROSE : CARD, border: `2px solid ${on ? ROSE : BORDER}`, cursor: "pointer", flexShrink: 0, transition: "all 0.14s" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: on ? "#fff" : TXT, fontFamily: FF, whiteSpace: "nowrap" }}>{cat.label}</span>
              </button>
            );
          })}
        </div>
        {cats.filter(c => sel.includes(c.id)).map(cat => (
          <div key={cat.id} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: MUTED, display: "block", marginBottom: 6, fontFamily: FF }}>{cat.label}</label>
            <input value={detail[cat.id] || ""} onChange={e => setDet(d => ({ ...d, [cat.id]: e.target.value }))} placeholder={cat.ph} style={{ width: "100%", boxSizing: "border-box" as const, padding: "12px 15px", borderRadius: 14, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none" }} />
          </div>
        ))}
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: MUTED, display: "block", marginBottom: 8, fontFamily: FF }}>Note (optional)</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={"Anything else on your mind…"} rows={3} style={{ width: "100%", boxSizing: "border-box" as const, padding: "13px 16px", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none", resize: "none" as const, lineHeight: 1.55 }} />
      </div>
      <div style={{ padding: "12px 20px 44px", display: "flex", gap: 12 }}>
        <button onClick={onBack} style={{ flex: 1, padding: "14px 0", borderRadius: 16, background: "transparent", border: `1.5px solid ${BORDER}`, fontFamily: FF, fontWeight: 700, fontSize: 15, color: MUTED, cursor: "pointer" }}>Skip</button>
        <button onClick={onSave} style={{ flex: 2, padding: "14px 0", borderRadius: 16, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer" }}>Save · +1 stamp</button>
      </div>
    </div>
  );
}

// ── Companion Space ────────────────────────────────────────────────────
function CompanionSpaceScreen({ onBack, onChat, onFriendChat }: { onBack: () => void; onChat: () => void; onFriendChat: (id: number) => void }) {
  const [tab, setTab]             = useState<"friends" | "global">("friends");
  const [resonated, setResonated] = useState<number[]>([]);
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <SHeader title="Companion Space" onBack={onBack} />
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{ display: "flex", borderRadius: 16, background: "#EDE8DE", padding: 4, gap: 4 }}>
          {(["friends", "global"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 0", borderRadius: 12, background: tab === t ? CARD : "transparent", color: tab === t ? TXT : MUTED, border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 14, boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
              {t === "friends" ? "Friends" : "Global"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 36px", scrollbarWidth: "none" }}>
        {tab === "friends" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 6px", lineHeight: 1.55 }}>{"Your companions here are real people — all staying anonymous."}</p>
            {FRIENDS.map(f => (
              <button key={f.id} onClick={() => onFriendChat(f.id)} style={{ background: CARD, borderRadius: 18, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, border: `1.5px solid ${BORDER}`, width: "100%", textAlign: "left", cursor: "pointer" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: f.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: FF }}>{f.initials}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: TXT, fontFamily: FF }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.last}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: MUTED }}>{f.time}</span>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: SAGE }} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 6px", lineHeight: 1.55 }}>{"Anonymous moments from others. No usernames, no counts."}</p>
            {GLOBAL_POSTS.map(post => (
              <div key={post.id} style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1.5px solid ${BORDER}` }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EDE8DE", overflow: "hidden", flexShrink: 0 }}>
                    <ImageWithFallback src={post.pet} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: TXT, fontFamily: FF }}>{post.region}</span>
                </div>
                <p style={{ fontSize: 14, color: TXT, lineHeight: 1.6, margin: "0 0 12px" }}>{post.text}</p>
                <button onClick={() => setResonated(r => r.includes(post.id) ? r.filter(x => x !== post.id) : [...r, post.id])} style={{ padding: "7px 16px", borderRadius: 12, background: resonated.includes(post.id) ? SAGE + "33" : "#EDE8DE", border: `1.5px solid ${resonated.includes(post.id) ? SAGE : "transparent"}`, cursor: "pointer", fontFamily: FF, fontSize: 13, fontWeight: 700, color: resonated.includes(post.id) ? SAGE : MUTED, transition: "all 0.15s" }}>
                  Resonate
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Friend Chat ────────────────────────────────────────────────────────
function FriendChatScreen({ friendId, pet, onBack }: { friendId: number; pet: Pet; onBack: () => void }) {
  const friend = FRIENDS.find(f => f.id === friendId) ?? FRIENDS[0];
  const [msgs, setMsgs] = useState(friend.msgs);
  const [input, setInput] = useState("");
  const [petHint, setPetHint] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const PET_HINTS = [
    "Your glucose has been steady — great chatting conditions ✨",
    "Remember to log your next meal when you're done here 🍱",
    "You've been in range for 4 hours — keep it up! 🌿",
    "Tap me if you want to talk later 🐾",
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMsgs(m => [...m, { from: "me" as const, text: txt }]);
    setInput("");
    // Simulate friend reply after a delay
    setTimeout(() => {
      const replies = ["That's so relatable 😄", "Yeah, totally!", "Haha right?? Same here!", "Let me know how it goes ✨", "Sounds good! Talk soon 🌸"];
      setMsgs(m => [...m, { from: "them" as const, text: replies[Math.floor(Math.random() * replies.length)] }]);
    }, 1200);
    // Occasionally show a pet hint
    if (Math.random() > 0.6) {
      setTimeout(() => {
        setPetHint(PET_HINTS[Math.floor(Math.random() * PET_HINTS.length)]);
        setTimeout(() => setPetHint(null), 3500);
      }, 2000);
    }
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: FF }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "62px 18px 12px", flexShrink: 0, background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <BackBtn onPress={onBack} />
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: friend.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{friend.initials}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: TXT }}>{friend.name}</div>
          <div style={{ fontSize: 11, color: SAGE, fontWeight: 700 }}>● Online</div>
        </div>
        {/* Pet spirit indicator */}
        <div style={{ width: 34, height: 34, opacity: 0.85 }}>
          <ImageWithFallback src={pet.image} alt="Your companion" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px 16px", scrollbarWidth: "none", display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
        {/* Pet hint bubble — floats over messages */}
        {petHint && (
          <div style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 20, display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: pet.color + "22", borderRadius: 14, border: `1.5px solid ${pet.color}44` }}>
            <div style={{ width: 24, height: 24, flexShrink: 0 }}>
              <ImageWithFallback src={pet.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: TXT, lineHeight: 1.5 }}>{petHint}</span>
          </div>
        )}

        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: m.from === "me" ? "row-reverse" : "row", alignItems: "flex-end", gap: 8 }}>
            {m.from === "them" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: friend.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: "#fff" }}>{friend.initials}</span>
              </div>
            )}
            <div style={{
              maxWidth: "68%", padding: "10px 14px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.from === "me" ? ROSE : CARD,
              border: m.from === "me" ? "none" : `1.5px solid ${BORDER}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}>
              <span style={{ fontSize: 14, color: m.from === "me" ? "#fff" : TXT, lineHeight: 1.5 }}>{m.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 38px", flexShrink: 0, background: CARD, borderTop: `1px solid ${BORDER}` }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Say something…"
          style={{ flex: 1, padding: "12px 16px", borderRadius: 22, background: BG, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none" }}
        />
        <button onClick={send} style={{ width: 42, height: 42, borderRadius: "50%", background: ROSE, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Send size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}

// ── Rewards ────────────────────────────────────────────────────────────
function RewardsScreen({ stamps, onBack }: { stamps: number; onBack: () => void }) {
  const TRIP_GOAL    = 50;
  const progress     = Math.min(stamps / TRIP_GOAL, 1);
  const tripUnlocked = stamps >= TRIP_GOAL;

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 14px" }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Stamp Journey</h2>
        <div style={{ width: 36, height: 36 }}><ImageWithFallback src={giftBoxIcon} alt="Stamp Journey" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 36px", scrollbarWidth: "none" }}>

        {/* Stamp hero + trip progress */}
        <div style={{ background: CARD, borderRadius: 22, padding: "20px 22px", marginBottom: 14, border: `1.5px solid ${BORDER}`, boxShadow: "0 4px 18px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 52, height: 52 }}><ImageWithFallback src={pawStampIcon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
            <div>
              <div style={{ fontSize: 38, fontWeight: 900, color: TXT, fontFamily: FF, lineHeight: 1 }}>{stamps}</div>
              <div style={{ fontSize: 13, color: MUTED, fontFamily: FF, marginTop: 2 }}>stamps collected</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: TXT, fontFamily: FF }}>Journey to next trip 🎈</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: ROSE, fontFamily: FF }}>{stamps}/{TRIP_GOAL}</span>
          </div>
          <div style={{ height: 10, borderRadius: 10, background: "#EDE8DE", overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: `${progress * 100}%`, borderRadius: 10, background: `linear-gradient(90deg, ${ROSE}, #E8A07A)`, transition: "width 0.4s" }} />
          </div>
          {tripUnlocked ? (
            <div style={{ borderRadius: 14, overflow: "hidden" }}>
              <div style={{ position: "relative", height: 96 }}>
                <ImageWithFallback src={postcardBeach} alt="Trip" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", fontFamily: FF }}>Trip unlocked! 🎈</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Your companion went on a trip and brought back a souvenir postcard!</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: MUTED, fontFamily: FF, lineHeight: 1.6 }}>
              {TRIP_GOAL - stamps} more stamps to unlock your next trip — your companion will bring back a souvenir or postcard!
            </div>
          )}
        </div>

        {/* How to earn */}
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: MUTED, marginBottom: 10, fontFamily: FF }}>How to earn stamps</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "📓", label: "Log a daily record",        desc: "Save a note or daily record",              bonus: "+1" },
            { icon: "🍱", label: "Log a meal",                desc: "Save a meal log in the kitchen",           bonus: "+1" },
            { icon: "📊", label: "View glucose trend",        desc: "Stay on the trend page for 5 seconds",     bonus: "+1" },
            { icon: "🎯", label: "Daily goal achieved",       desc: "50%+ time in range for the day",           bonus: "+2" },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}` }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{row.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF }}>{row.label}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{row.desc}</div>
              </div>
              <div style={{ background: ROSE + "22", borderRadius: 10, padding: "4px 10px" }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: ROSE, fontFamily: FF }}>{row.bonus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────
function Toast({ visible, msg }: { visible: boolean; msg: string }) {
  return (
    <div style={{ position: "absolute", bottom: 104, left: "50%", transform: "translateX(-50%)", background: TXT, color: "#fff", borderRadius: 24, padding: "12px 22px", fontFamily: FF, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" as const, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", zIndex: 300, opacity: visible ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }}>
      {msg}
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]     = useState<Screen>("welcome");
  const [prev, setPrev]         = useState<Screen>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pet, setPet]           = useState<Pet>(PETS[0]);
  const [petName, setPetName]   = useState("Your companion");
  const [userName, setUserName] = useState("friend");
  const [stamps, setStamps]     = useState(23);
  const [toast, setToast]       = useState({ visible: false, msg: "" });
  const [friendId, setFriendId] = useState(1);

  const go        = (s: Screen) => { setPrev(screen); setMenuOpen(false); setScreen(s); };
  const showToast = (msg: string) => { setToast({ visible: true, msg }); setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600); };
  const addStamp  = (msg: string) => { setStamps(n => n + 1); showToast(msg); };
  const handleSave      = () => { addStamp("+1 stamp · log saved"); go("home"); };
  const handleTirReward = () => { addStamp("+1 stamp · 50%+ time in range"); };

  return (
    <PhoneShell>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={go} pet={pet} />
      <Toast visible={toast.visible} msg={toast.msg} />

      {screen === "welcome"         && <WelcomeScreen onNext={() => go("pet-select")} />}
      {screen === "pet-select"      && <PetSelectScreen onNext={(p, pn, un) => { setPet(p); setPetName(pn); setUserName(un); go("cgm-pair"); }} />}
      {screen === "cgm-pair"        && <CGMPairScreen onNext={() => go("home")} />}
      {screen === "home"            && <HomeScreen pet={pet} petName={petName} stamps={stamps} onMenu={() => setMenuOpen(true)} onTrend={() => go("trend")} onLog={() => go("log")} onChat={() => go("chat")} onKitchen={() => go("kitchen-detail")} onBedroom={() => go("bedroom-detail")} />}
      {screen === "kitchen-detail"  && <KitchenDetailScreen pet={pet} petName={petName} onBack={() => go("home")} onFoodLog={() => go("food-log")} onActivity={() => go("activity")} />}
      {screen === "gym-detail"      && <GymDetailScreen pet={pet} petName={petName} onBack={() => go("home")} onActivity={() => go("activity")} />}
      {screen === "food-log"        && <FoodLogScreen onBack={() => go("kitchen-detail")} onSave={() => { addStamp("+1 stamp · meal logged"); go("kitchen-detail"); }} />}
      {screen === "bedroom-detail"  && <BedroomDetailScreen pet={pet} petName={petName} onBack={() => go("home")} onWardrobe={() => go("wardrobe")} onPostcards={() => go("postcards")} onJournal={() => go("journal")} onChat={() => go("chat")} />}
      {screen === "wardrobe"        && <WardrobeScreen pet={pet} stamps={stamps} onBack={() => go("bedroom-detail")} onStore={() => go("store")} />}
      {screen === "store"           && <StoreScreen stamps={stamps} onBack={() => go("home")} />}
      {screen === "activity"        && <ActivityScreen onBack={() => go(prev === "kitchen-detail" ? "kitchen-detail" : prev === "gym-detail" ? "gym-detail" : "home")} />}
      {screen === "postcards"       && <PostcardsScreen stamps={stamps} onBack={() => go("home")} />}
      {screen === "journal"         && <JournalScreen pet={pet} petName={petName} onBack={() => go("bedroom-detail")} />}
      {screen === "chat"            && <ChatScreen pet={pet} petName={petName} userName={userName} onBack={() => go("home")} />}
      {screen === "trend"           && <TrendScreen onBack={() => go("home")} onStampAwarded={handleTirReward} />}
      {screen === "log"             && <LogScreen onBack={() => go("home")} onSave={handleSave} />}
      {screen === "companion-space" && <CompanionSpaceScreen onBack={() => go("home")} onChat={() => go("chat")} onFriendChat={id => { setFriendId(id); go("friend-chat"); }} />}
      {screen === "friend-chat"     && <FriendChatScreen friendId={friendId} pet={pet} onBack={() => go("companion-space")} />}
      {screen === "rewards"         && <RewardsScreen stamps={stamps} onBack={() => go("home")} />}
    </PhoneShell>
  );
}
