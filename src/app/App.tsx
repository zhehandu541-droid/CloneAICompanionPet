import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ChevronLeft, ChevronUp, ChevronDown, Send, X, Search, Camera, Lock, Syringe, Zap, Utensils, Activity, Moon, TrendingUp, Sparkles, Wind, ShoppingBag, HeartPulse, Smile, RefreshCw, BookOpen, ArrowUpRight } from "lucide-react";

// ── localStorage helpers ────────────────────────────────────────────────
function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function saveLS<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}
const LS_KEYS = {
  stamps:   "tend_stamps",
  numbers:  "tend_numbers_visible",
  regions:  "tend_unlocked_regions",
  quickLogs:"tend_quick_logs",
  wardrobe: "tend_wardrobe_equipped_v3",
  siteChange: "tend_last_site_change",
  ownedClothing: "tend_owned_clothing",
  ownedFurniture: "tend_owned_furniture",
  chatHistory: "tend_chat_history",
} as const;
const SITE_CHANGE_REMINDER_DAYS = 10;
const DEFAULT_STAMPS = 23;
const DEFAULT_UNLOCKED_REGIONS = [1, 2, 3, 4];

// ── Room / scene images ───────────────────────────────────────────────
import houseBgImg  from "@/imports/xie3xR5ZNm3ImSSbLXJrA-1.png";
import kitchenWindow  from "@/imports/PhoneShell-3/3cb948f1213e956ba32bf4ececfbd3541a24bf08.png";
import kitchenSink    from "@/imports/PhoneShell-3/df0c972304727053f2ec9b2f7d552690109d7fdc.png";
import kitchenStove   from "@/imports/PhoneShell-3/96c1d0ac96479420a9e52e761403c777dad1e851.png";
import kitchenTable   from "@/imports/PhoneShell-3/2dfa2ba61469cd15e7b865fc71cb2b8eafe02f4f.png";
import kitchenBasket  from "@/imports/PhoneShell-3/e7570e02db179d3d873471f16019788c1760a2e8.png";
import kitchenBurger  from "@/imports/PhoneShell-3/c3d023433712c0f31dfb614313aa22bbedcda16c.png"; void kitchenBurger;
import kitchenIcon    from "@/imports/PhoneShell-3/a85220379f09fd3800d29f7cec2ab869b4c58214.png";
import kitchenStool   from "@/imports/kitchen_stool.png";
import kitchenPlant   from "@/imports/kitchen_plant.png";
import kitchenPotRack from "@/imports/kitchen_potrack.png";

// ── Postcard destination scenes ───────────────────────────────────────
import postcardBeach   from "@/imports/__2026-07-14_16.14.13.png";
import postcardMeadow  from "@/imports/__2026-07-14_16.14.06.png";
import postcardForest  from "@/imports/__2026-07-14_16.31.00.png";
import postcardChurch  from "@/imports/__2026-07-14_16.31.17.png";
import countryMossgrove       from "@/imports/country_mossgrove.jpg";
import countrySunscarEmpire   from "@/imports/country_sunscar_empire.jpg";
import countryAureliaVale     from "@/imports/country_aurelia_vale.jpg";
import countrySnowbellNorth   from "@/imports/country_snowbell_north.jpg";
import communityIcon   from "@/imports/communityIcon.png";
import communityBubbles from "@/imports/communityBubbles.png";

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
import bedroomRug        from "@/imports/bedroom_rug.png";
import bedroomSlippers   from "@/imports/bedroom_slippers.png";
import bedroomLights     from "@/imports/bedroom_lights.png";
import bedroomNightstand2 from "@/imports/bedroom_nightstand.png"; void bedroomNightstand2;

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
import gymShoesCluster from "@/imports/gym_shoes_cluster.png";
import gymRackNew      from "@/imports/gym_rack_new.png";

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
  | "wardrobe" | "store" | "activity" | "postcards" | "journal" | "pet-bag"
  | "chat" | "trend" | "log" | "companion-space" | "friend-chat" | "settings";

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
  { id: 1, name: "Yuki", initials: "Y", color: "#E8A8B0", last: "Good night from Osaka!",       time: "2m",  msgs: [
    { from: "them" as const, text: "Hey! How was your glucose today?" },
    { from: "them" as const, text: "Mine was all over the place after lunch" },
    { from: "me"   as const, text: "Not bad! Stayed in range most of the morning" },
    { from: "them" as const, text: "Good night from Osaka!" },
  ]},
  { id: 2, name: "Hana", initials: "H", color: "#A8C8A0", last: "Having matcha today, so cosy",  time: "1h",  msgs: [
    { from: "me"   as const, text: "How's it going in Tokyo?" },
    { from: "them" as const, text: "Rainy today but cosy indoors" },
    { from: "them" as const, text: "Having matcha today, so cosy" },
  ]},
  { id: 3, name: "Ren",  initials: "R", color: "#A0B8D0", last: "Anyone heading to Shibuya this weekend?", time: "3h", msgs: [
    { from: "them" as const, text: "Anyone heading to Shibuya this weekend?" },
    { from: "me"   as const, text: "Maybe! What's going on?" },
    { from: "them" as const, text: "There's a little market on Sunday" },
  ]},
];

const GLOBAL_POSTS = [
  { id: 1, region: "Sakura Village",  pet: goldenRetriever, text: "Sensor change day. Taking it slowly." },
  { id: 2, region: "Misty Highlands", pet: fox,             text: "Had fewer alerts last night and finally slept well." },
  { id: 3, region: "Clover Fields",   pet: bear,             text: "Anyone else get tired of explaining CGM alarms to people?" },
  { id: 4, region: "Snowpeak Town",   pet: penguin,          text: "Made a comfort meal after a long day." },
  { id: 5, region: "Lantern Bay",     pet: fluffyCat,        text: "First week with a CGM. Still getting used to seeing the numbers, but it helps." },
  { id: 6, region: "Clover Cove",     pet: hedgehog,         text: "Rainy Sunday, reading with tea. My companion is curled up next to me." },
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
  { id: 1, name: "Lavender Lake",       top: "72%", left: "24%", scene: postcardMeadow, date: "Jul 2",  postcard: "Cherry petals drifted into my tea all afternoon." },
  { id: 2, name: "Saint Aurelia Chapel", top: "16%", left: "72%", scene: postcardChurch, date: "Jul 6",  postcard: "Sunlight through the old glass felt like a quiet blessing." },
  { id: 3, name: "Solmere Coast",       top: "78%", left: "64%", scene: postcardBeach,  date: "Jul 11", postcard: "Stood in the shallows and watched the sun sink into the sea." },
  { id: 4, name: "Moonveil Falls",      top: "42%", left: "50%", scene: postcardForest, date: "Jul 15", postcard: "Found a glowing spring deep in the woods — quiet and a little strange." },
  { id: 5, name: "Mossgrove",       top: "30%", left: "30%", scene: countryMossgrove,     date: "", postcard: "" },
  { id: 6, name: "Sunscar Empire",  top: "60%", left: "12%", scene: countrySunscarEmpire, date: "", postcard: "" },
  { id: 7, name: "Aurelia Vale",    top: "50%", left: "80%", scene: countryAureliaVale,   date: "", postcard: "" },
  { id: 8, name: "Snowbell North",  top: "10%", left: "40%", scene: countrySnowbellNorth, date: "", postcard: "" },
];

const REWARD_MILESTONES = [
  { stamps: 5,  name: "First Steps",   item: "Cosy Scarf"        },
  { stamps: 10, name: "Steady Days",   item: "Sakura Postcard"   },
  { stamps: 20, name: "Kind Patterns", item: "Lantern Town Map"  },
  { stamps: 35, name: "Quiet Courage", item: "Star Rug"          },
  { stamps: 50, name: "All Seasons",   item: "Maple Heights Trip" },
];

// Per-100g carb reference, like a lightweight food-database lookup (e.g. Boohee/
// 薄荷健康-style) — the user picks a food, adjusts the grams actually eaten, and
// the carbs are computed from that, instead of one fixed number per dish.
// defaultGrams is just a sensible starting point for the grams stepper.
const FOOD_CARBS = [
  { name: "Curry rice",        carbsPer100g: 20, defaultGrams: 260, image: curryImg   },
  { name: "Ramen noodles",     carbsPer100g: 14, defaultGrams: 300, image: noodlesImg },
  { name: "Cake slice",        carbsPer100g: 45, defaultGrams: 100, image: cakeImg    },
  { name: "Matcha soft serve", carbsPer100g: 24, defaultGrams: 120, image: matchaImg  },
  { name: "Crab plate",        carbsPer100g: 4,  defaultGrams: 200, image: crabImg    },
  { name: "Pizza (1 slice)",   carbsPer100g: 25, defaultGrams: 120, image: pizzaImg   },
  { name: "Burger",            carbsPer100g: 22, defaultGrams: 160, image: burgerIcon },
];

// ── Glucose color helper ───────────────────────────────────────────────
function glucoseColor(val: number): string {
  if (val < 3.9 || val > 13.9) return "#E5484D"; // red — low / very high
  if (val > 10.0) return "#F2A93B";               // yellow/amber — high
  return "#43A047";                                // green — in range
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

// Interactive furniture — a transparent tap target laid over the illustration.
// No permanent label is ever rendered. The area carries only a very subtle warm
// glow so it reads as "alive" without pasting text on top of the art. A label
// tooltip appears ONLY on real desktop mouse hover (never on touch, never by
// default) — tapping/clicking always fires onClick directly, with no
// hover/press step required first.
function FurnitureHotspot({ onClick, label, style, baseTransform = "", labelOffset, children, ariaLabel }: {
  onClick: () => void; label: string; style: React.CSSProperties; baseTransform?: string;
  labelOffset?: React.CSSProperties; children: React.ReactNode; ariaLabel?: string;
}) {
  const [pressed, setPressed]       = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  // brief "look here" pulse on room entry, then settle to near-invisible idle glow
  const [attracting, setAttracting] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setAttracting(false), 2000);
    return () => window.clearTimeout(t);
  }, []);
  const press   = () => setPressed(true);
  const release = () => setPressed(false);
  const tooltipVisible = mouseHover || pressed;

  return (
    <button
      onClick={onClick}
      onMouseDown={press}
      onMouseUp={release}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => { setMouseHover(false); release(); }}
      onTouchStart={press}
      onTouchEnd={release}
      onTouchCancel={release}
      aria-label={ariaLabel ?? label}
      style={{
        position: "absolute", background: "none", border: "none", cursor: "pointer", padding: 0,
        transition: "transform 0.2s ease",
        transform: `${baseTransform} ${pressed ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)"}`.trim(),
        ...style,
      }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        filter: pressed
          ? "drop-shadow(0 0 10px rgba(255,205,130,0.55)) drop-shadow(0 6px 12px rgba(0,0,0,0.18))"
          : "drop-shadow(0 2px 6px rgba(0,0,0,0.10))",
        transition: "filter 0.2s ease",
      }}>
        {children}
        {/* near-invisible at rest; brief pulse for 2s on room entry; brightens on press */}
        <div style={{
          position: "absolute", inset: -7, borderRadius: 18,
          background: "transparent",
          boxShadow: pressed ? "0 0 0 2px rgba(255,214,150,0.70)" : "0 0 0 1px rgba(255,214,150,0.16)",
          animation: attracting && !pressed ? "hotspotPulse 1s ease-in-out 2" : "none",
          transition: attracting ? "none" : "box-shadow 0.2s ease",
          pointerEvents: "none",
        }} />
      </div>
      {/* tooltip — appears on desktop hover or on tap/press, fades on release */}
      <div style={{
        ...ROOM_BTN, position: "absolute", left: "50%", bottom: "100%", marginBottom: 6,
        transform: "translate(-50%, 0px)",
        opacity: tooltipVisible ? 1 : 0,
        transition: "opacity 0.25s ease",
        pointerEvents: "none", zIndex: 20,
        ...labelOffset,
      }}>
        {label}
      </div>
    </button>
  );
}

// A lightweight, single-line system-notification-style hint — not a button, not a
// card. Shown only the first time a room is opened in this browser (localStorage-
// gated), fades in, then either auto-dismisses after ~3s or is tapped away early.
function RoomHint({ storageKey, text }: { storageKey: string; text: string }) {
  const [render, setRender]   = useState(() => !loadLS(storageKey, false));
  const [visible, setVisible] = useState(false);

  const dismiss = () => {
    setVisible(false);
    saveLS(storageKey, true);
    window.setTimeout(() => setRender(false), 300);
  };

  useEffect(() => {
    if (!render) return;
    const fadeIn = window.setTimeout(() => setVisible(true), 150);
    return () => { window.clearTimeout(fadeIn); };
  }, [render]);

  if (!render) return null;
  return (
    <div
      style={{
        position: "absolute", top: 12, left: 12, right: 12, zIndex: 30,
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(253,250,246,0.96)", borderRadius: 16,
        padding: "12px 12px 12px 16px", boxShadow: "0 6px 20px rgba(61,43,31,0.18)",
        opacity: visible ? 1 : 0, transform: `translateY(${visible ? "0px" : "-6px"})`,
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F5E9D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Sparkles size={14} color="#B8860B" strokeWidth={2.2} />
      </div>
      <span style={{
        fontSize: 12, fontWeight: 600, color: "#5C4326", fontFamily: FF, lineHeight: 1.42,
        flex: 1,
      }}>{text}</span>
      <button onClick={dismiss} style={{
        flexShrink: 0, background: "#5C4326", border: "none", borderRadius: 12,
        padding: "6px 12px", cursor: "pointer", fontFamily: FF, fontWeight: 800,
        fontSize: 11, color: "#FDFAF6",
      }}>
        Got it
      </button>
    </div>
  );
}

// Renders the companion with whatever accessory is currently equipped from the
// Wardrobe layered on top — so "wearing" something in the Wardrobe is reflected
// wherever the pet appears around the house, not just on the dress-up stage.
function PetWithAccessory({ pet, petName, equippedClothing }: { pet: Pet; petName: string; equippedClothing: number | null }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      {equippedClothing !== null && CLOTHING_ITEMS[equippedClothing] && (
        <div style={{ position: "absolute", top: "-16%", left: "50%", transform: "translateX(-50%)", width: "58%", height: "58%", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))", pointerEvents: "none" }}>
          <ImageWithFallback src={CLOTHING_ITEMS[equippedClothing].img} alt={CLOTHING_ITEMS[equippedClothing].name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
}

// ── Phone shell ────────────────────────────────────────────────────────
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#C8C4B8", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0", fontFamily: FF }}>
      <div style={{ width: 393, height: 852, borderRadius: 54, background: BG, boxShadow: "0 50px 100px rgba(0,0,0,0.40), 0 0 0 2px rgba(255,255,255,0.20), inset 0 0 0 1px rgba(0,0,0,0.06)", overflow: "hidden", position: "relative", flexShrink: 0, fontFamily: FF }}>
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#0a0a0a", borderRadius: 20, zIndex: 200, pointerEvents: "none" }} />
        {children}
        <style>{`@keyframes hotspotPulse { 0%, 100% { box-shadow: 0 0 0 1px rgba(255,214,150,0.16); } 50% { box-shadow: 0 0 0 5px rgba(255,214,150,0.45); } }`}</style>
      </div>
    </div>
  );
}

// ── Welcome ────────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div style={{
      height: "100%", overflow: "hidden", position: "relative",
      background: "radial-gradient(ellipse at 25% 22%, rgba(255,200,210,0.55) 0%, transparent 55%), radial-gradient(ellipse at 78% 14%, rgba(180,230,210,0.50) 0%, transparent 50%), radial-gradient(ellipse at 58% 58%, rgba(255,218,185,0.45) 0%, transparent 50%), radial-gradient(ellipse at 8% 66%, rgba(200,205,240,0.42) 0%, transparent 48%), radial-gradient(ellipse at 50% 98%, rgba(255,205,190,0.35) 0%, transparent 55%), #F0EBE3",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(115deg, transparent, transparent 18px, rgba(255,255,255,0.10) 18px, rgba(255,255,255,0.10) 19px)", pointerEvents: "none" }} />

      {/* Top research notice — one plain sentence, secondary in weight, never overlaps the pet below it */}
      <div style={{ position: "absolute", top: 68, left: 16, right: 16, zIndex: 50, background: "rgba(255,255,255,0.50)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.60)", borderRadius: 16, padding: "10px 14px" }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 400, lineHeight: 1.45, color: "#746761", textAlign: "left", fontFamily: FF }}>
          Tend explores how low-pressure gamification can support engagement with continuous glucose monitoring (CGM) data. This AI-powered research prototype uses simulated data for trend interpretation and lightweight logging, and does not provide diagnosis or insulin-dosing advice.
        </p>
      </div>

      {/* Main visual group — pet, title, statement, button — centred as one unit, nudged down slightly for balance */}
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 6px", textAlign: "center", transform: "translateY(48px)" }}>
        <div style={{ width: 230, height: 230, flexShrink: 0, filter: "drop-shadow(0 16px 40px rgba(61,43,31,0.28))" }}>
          <ImageWithFallback src={redPandaCoffee} alt="Tend mascot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#4B352D", letterSpacing: "-0.5px", margin: "18px 0 0", fontFamily: FF }}>Tend</h1>

        <p style={{ fontSize: 16, fontWeight: 500, color: "#6B554A", lineHeight: 1.65, letterSpacing: "0.1px", margin: "10px 0 0", fontFamily: "'Fredoka', sans-serif" }}>
          A low-pressure gamified CGM companion for<br />young people with Type 1 Diabetes.
        </p>

        <button onClick={onNext} style={{ width: "78%", padding: "17px 0", borderRadius: 18, background: ROSE, color: "#fff", border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 16, boxShadow: "0 8px 24px rgba(196,145,122,0.35)", margin: "104px auto 0", flexShrink: 0 }}>Enter Prototype</button>
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
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", paddingTop: 74, overflow: "hidden" }}>
      <div style={{ padding: "0 24px 18px", flexShrink: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: TXT, margin: 0, fontFamily: FF, lineHeight: 1.25 }}>Choose your companion</h1>
        <p style={{ fontSize: 12.5, color: MUTED, margin: "6px 0 0", fontFamily: FF }}>Pick the one that feels right for you.</p>
      </div>
      <div style={{ flex: 1, padding: "0 20px", overflowY: "auto", minHeight: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 4 }}>
          {PETS.map((pet, i) => {
            const on = sel === i;
            return (
              <button key={pet.id} onClick={() => setSel(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 6px 11px", borderRadius: 18, background: on ? CARD : "#EAE5DB", border: `2px solid ${on ? ROSE : "transparent"}`, cursor: "pointer", boxShadow: on ? "0 4px 18px rgba(196,145,122,0.22)" : "none", transition: "all 0.14s" }}>
                <div style={{ width: 64, height: 64 }}><ImageWithFallback src={pet.image} alt={pet.trait} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                <span style={{ fontSize: 10, fontWeight: 700, color: on ? TXT : MUTED, marginTop: 5, textAlign: "center", lineHeight: 1.25, fontFamily: FF }}>{pet.trait}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 28, paddingBottom: 12 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: MUTED, display: "block", marginBottom: 7, fontFamily: FF }}>Name them (optional)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={petName} onChange={e => setPetName(e.target.value)} placeholder="Your companion" style={{ ...inp, flex: 1, padding: "14px 16px" }} />
              <button onClick={surpriseMe} style={{ padding: "0 14px", borderRadius: 16, background: ROSE + "22", border: `1.5px solid ${ROSE}66`, cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 12, color: ROSE, whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                Surprise me!
              </button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: MUTED, display: "block", marginBottom: 7, fontFamily: FF }}>What should I call you?</label>
            <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="friend" style={{ ...inp, width: "100%", padding: "14px 16px" }} />
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 24px 34px 24px", flexShrink: 0, background: BG, boxShadow: "0 -8px 16px rgba(61,43,31,0.05)" }}>
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
function HomeScreen({ pet, petName, stamps, numbersVisible, equippedClothing, onMenu, onTrend, onLog, onChat, onKitchen, onBedroom }: {
  pet: Pet; petName: string; stamps: number; numbersVisible: boolean; equippedClothing: number | null;
  onMenu: () => void; onTrend: () => void; onLog: () => void;
  onChat: () => void; onKitchen: () => void; onBedroom: () => void;
}) {
  const glucoseVal = 7.2;
  const gColor = glucoseColor(glucoseVal);
  const inRange = glucoseVal >= 3.9 && glucoseVal <= 10.0;
  const cardBg     = inRange ? "#EEF4EA" : gColor + "14";
  const valueColor = inRange ? "#4F7E58" : gColor;
  const dotColor   = inRange ? "#5F9B68" : gColor;
  const trendColor = inRange ? "#4A6350" : MUTED;
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "62px 18px 8px", flexShrink: 0 }}>
        <button onClick={onMenu} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: "2px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4.5 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2.5, background: TXT, borderRadius: 2 }} />)}
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: FF }}>Menu</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: CARD, borderRadius: 22, padding: "6px 11px 6px 8px", boxShadow: "0 2px 8px rgba(0,0,0,0.09)", border: `1px solid ${BORDER}` }}>
          <div style={{ width: 22, height: 22 }}><ImageWithFallback src={pawStampIcon} alt="stamps" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          <span style={{ fontSize: 14, fontWeight: 900, color: TXT, fontFamily: FF }}>{stamps}</span>
          <span style={{ fontSize: 10, color: MUTED, fontFamily: FF }}>stamps</span>
        </div>
      </div>

      <div style={{ position: "relative", margin: "0 14px 12px", background: cardBg, borderRadius: 16, border: `1.5px solid ${BORDER}`, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", flexShrink: 0, overflow: "hidden", padding: "12px 14px 11px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          {/* Left: value + range status — stacked, tight */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
            {numbersVisible ? (
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: valueColor, fontFamily: FF, lineHeight: 1 }}>{glucoseVal}</span>
                <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>mmol/L</span>
              </div>
            ) : (
              <div style={{ width: 44, height: 20, borderRadius: 8, background: dotColor, boxShadow: `0 0 0 4px ${dotColor}22` }} />
            )}
            <div style={{ fontSize: 10.5, fontWeight: 500, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>In range · looking stable</div>
          </div>

          {/* Right: "Rising gently" + arrow, enlarged, with "View trend" link beneath */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: valueColor, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
              Rising gently <ArrowUpRight size={17} color={valueColor} strokeWidth={3} />
            </div>
            <button onClick={onTrend} style={{ display: "flex", alignItems: "center", gap: 2, background: "none", border: "none", padding: "2px", cursor: "pointer", fontFamily: FF, flexShrink: 0 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: TXT }}>View trend</span>
              <ChevronLeft size={11} color={TXT} style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative", margin: "0 6px", borderRadius: 22, overflow: "hidden", background: "#EDE8DE", minHeight: 0 }}>
        <ImageWithFallback src={houseBgImg} alt="Your house" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center bottom", display: "block" }} />
        <div style={{ position: "absolute", bottom: "0%", left: "50%", transform: "translateX(-50%)", width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,250,240,0.55) 0%, rgba(255,250,240,0.0) 72%)", zIndex: 4, pointerEvents: "none" }} />
        <FurnitureHotspot
          onClick={onChat}
          label="Talk with your companion"
          ariaLabel="Talk with your companion"
          style={{ bottom: "1%", left: "50%", width: 142, height: 142, zIndex: 5 }}
          baseTransform="translateX(-50%)"
        >
          <PetWithAccessory pet={pet} petName={petName} equippedClothing={equippedClothing} />
        </FurnitureHotspot>
        <button onClick={onBedroom} style={{ position: "absolute", bottom: "6%", left: "8%", width: "24%", height: "40%", background: "transparent", border: "none", cursor: "pointer", zIndex: 4 }} aria-label="Bedroom" />
        <button onClick={onKitchen} style={{ position: "absolute", bottom: "10%", right: "4%", width: "32%", height: "36%", background: "transparent", border: "none", cursor: "pointer", zIndex: 4 }} aria-label="Kitchen" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "6px 14px 30px", flexShrink: 0 }}>
        {([
          { label: "Chat",   sub: `Talk with ${petName}`, src: pet.image,       cb: onChat  },
          { label: "Trend",  sub: "Understand patterns",  src: trendArrowIcon,  cb: onTrend },
          { label: "Record", sub: "Add a quick note",     src: strawbookIcon,   cb: onLog   },
        ] as const).map(tile => (
          <button key={tile.label} onClick={tile.cb} style={{ background: CARD, border: `1.5px solid ${BORDER}`, borderRadius: 20, padding: "13px 8px 11px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F0EAE0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ImageWithFallback src={tile.src} alt={tile.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 900, color: TXT, fontFamily: FF }}>{tile.label}</div>
            <div style={{ fontSize: 10, color: MUTED, fontFamily: FF, textAlign: "center", lineHeight: 1.25 }}>{tile.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Menu Drawer ────────────────────────────────────────────────────────
function MenuDrawer({ open, onClose, onNavigate, pet }: { open: boolean; onClose: () => void; onNavigate: (s: Screen) => void; pet: Pet }) {
  const groups: { section: string; items: { image?: string; icon?: React.ReactNode; label: string; dest: Screen }[] }[] = [
    { section: "Spaces", items: [
      { image: diningIcon,   label: "Kitchen",  dest: "kitchen-detail" },
      { image: docGymIcon,   label: "Gym",      dest: "gym-detail"     },
      { image: bedIcon,      label: "Bedroom",  dest: "bedroom-detail" },
    ]},
    { section: "Connect & Collect", items: [
      { image: balloonIcon,  label: "Postcard World", dest: "postcards"       },
      { image: communityIcon, label: "Community", dest: "companion-space" },
      { image: pawStampIcon, label: "Store",          dest: "store"           },
      { image: clothingBackpack, label: "Pet Bag", dest: "pet-bag" },
    ]},
    { section: "System", items: [
      { image: gearIcon,     label: "Settings", dest: "settings" },
    ]},
  ];
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 150, background: "rgba(61,43,31,0.35)", backdropFilter: "blur(2px)" }} />}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "62%", background: "#F8F4EC", zIndex: 160, borderRadius: "0 24px 24px 0", boxShadow: "4px 0 40px rgba(0,0,0,0.22)", transform: open ? "translateX(0)" : "translateX(-102%)", transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column", paddingTop: 68, overflowY: "auto" }}>
        <div style={{ padding: "0 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 19, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0 }}>Tend</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={MUTED} /></button>
        </div>
        {groups.map((group, gi) => (
          <div key={group.section} style={{ marginBottom: gi < groups.length - 1 ? 6 : 12 }}>
            <div style={{ padding: "8px 22px 4px", fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: 0.6, textTransform: "uppercase", fontFamily: FF }}>{group.section}</div>
            {group.items.map(item => (
              <button key={item.label} onClick={() => { onClose(); onNavigate(item.dest); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 22px", background: "none", border: "none", cursor: "pointer", fontFamily: FF }}>
                <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 9, background: BG, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {item.icon ? item.icon : <ImageWithFallback src={item.image!} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

// ── Kitchen ────────────────────────────────────────────────────────────
function KitchenDetailScreen({ pet, petName, equippedClothing, onBack, onFoodLog, onActivity, onChat }: { pet: Pet; petName: string; equippedClothing: number | null; onBack: () => void; onFoodLog: () => void; onActivity: () => void; onChat: () => void }) {
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
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#C8B898", marginTop: 14, borderRadius: "18px 18px 0 0", boxShadow: "inset 0 6px 18px rgba(61,43,31,0.10)" }}>
        <RoomHint storageKey="tend_hint_kitchen_v6" text="Tap objects in the room to log meals or chat with your companion." />

        {/* Wall — linear-gradient(174.833deg, #F5E8D5, #EAD AC5) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "54.99%", background: "linear-gradient(174.833deg, rgb(245,232,213) 3.67%, rgb(234,218,197) 96.33%)", zIndex: 0 }} />

        {/* Wall texture stripes x=66,165,264,330 */}
        {[66, 165, 264, 330].map(x => (
          <div key={x} style={{ position: "absolute", top: 0, left: x, width: 1, height: "55%", background: "rgba(200,170,130,0.22)", zIndex: 1 }} />
        ))}

        {/* Soft wall vignette to reduce "floating asset" feel */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "55%", background: "radial-gradient(ellipse at 50% 0%, transparent 55%, rgba(120,90,60,0.08) 100%)", zIndex: 1, pointerEvents: "none" }} />

        {/* Hanging pot rack — moved down so it overlaps the upper cabinet a bit */}
        <div style={{ position: "absolute", top: "9%", left: 14, width: 148, height: 155, zIndex: 4, filter: "drop-shadow(1px 4px 8px rgba(0,0,0,0.14))" }}>
          <ImageWithFallback src={kitchenPotRack} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

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

        {/* Sink + upper cabinet — moved down a bit and scaled down further */}
        <div style={{ position: "absolute", top: "25%", left: -30, width: 250, height: 259, overflow: "hidden", zIndex: 3 }}>
          <ImageWithFallback src={kitchenSink} alt="Sink" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Vegetable basket — moved onto the floor, tucked in the empty bottom-left corner */}
        <div style={{ position: "absolute", left: 12, bottom: 10, width: 88, height: 88, zIndex: 6 }}>
          <ImageWithFallback src={kitchenBasket} alt="Vegetables" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Potted plant — moved up so it no longer overlaps the basket below it */}
        <div style={{ position: "absolute", left: -6, bottom: 102, width: 74, height: 82, zIndex: 7, filter: "drop-shadow(1px 3px 6px rgba(0,0,0,0.16))" }}>
          <ImageWithFallback src={kitchenPlant} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* Stove — shifted further right */}
        <div style={{ position: "absolute", top: "45.8%", left: 222, width: 151, height: 151, zIndex: 4 }}>
          <ImageWithFallback src={kitchenStove} alt="Stove" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
        </div>

        {/* Small stool — moved up, tucked under the table */}
        <div style={{ position: "absolute", left: 104, bottom: 26, width: 70, height: 58, zIndex: 4, filter: "drop-shadow(1px 3px 6px rgba(0,0,0,0.15))" }}>
          <ImageWithFallback src={kitchenStool} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* Dining table with the roast chicken — tap it to open Meal Log, no pill button pasted on top */}
        <FurnitureHotspot
          onClick={onFoodLog}
          label="Meal Log"
          ariaLabel="Open meal log"
          style={{ top: "59%", left: 20, width: 250, height: 197, zIndex: 5 }}
          labelOffset={{ left: 70, bottom: "auto", top: 60 }}
        >
          <div style={{ width: 250, height: 197, overflow: "hidden" }}>
            <ImageWithFallback src={kitchenTable} alt="Dining table" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
          </div>
        </FurnitureHotspot>

        {/* Pet — the room's main character; tap to chat, glows and lifts instead of showing a floating bubble */}
        <FurnitureHotspot
          onClick={onChat}
          label="Chat"
          ariaLabel={`Talk with ${petName}`}
          style={{ left: 250, bottom: 58, width: 132, height: 132, zIndex: 8 }}
        >
          <PetWithAccessory pet={pet} petName={petName} equippedClothing={equippedClothing} />
        </FurnitureHotspot>
      </div>
    </div>
  );
}

// ── Gym ────────────────────────────────────────────────────────────────
function GymDetailScreen({ pet, petName, equippedClothing, onBack, onActivity, onChat }: { pet: Pet; petName: string; equippedClothing: number | null; onBack: () => void; onActivity: () => void; onChat: () => void }) {
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
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#C0CEC8", marginTop: 14, borderRadius: "18px 18px 0 0", boxShadow: "inset 0 6px 18px rgba(61,43,31,0.10)" }}>
        <RoomHint storageKey="tend_hint_gym_v6" text="Tap the activity board or objects to check movement and recovery." />

        {/* Wall — shrunk so the floor reads as the larger, more grounded portion of the room */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", background: "linear-gradient(174.74deg, #E4EFEB 0%, #D0E4DE 100%)", zIndex: 0 }} />

        {/* Wall texture stripes — x=59,138,216,295 of 393px */}
        {[59, 138, 216, 295].map(x => (
          <div key={x} style={{ position: "absolute", top: 0, left: x, width: 1, height: "46%", background: "rgba(180,210,200,0.3)", zIndex: 1 }} />
        ))}

        {/* Soft wall vignette */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", background: "radial-gradient(ellipse at 50% 0%, transparent 55%, rgba(60,90,80,0.08) 100%)", zIndex: 1, pointerEvents: "none" }} />

        {/* Floor — enlarged to match the shrunk wall */}
        <div style={{ position: "absolute", top: "42%", left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, #D8C8A8, #C8B898)", zIndex: 0 }} />

        {/* Floor plank stripes — x=39,118,197,275,354 of 393px */}
        {[39, 118, 197, 275, 354].map(x => (
          <div key={x} style={{ position: "absolute", top: "42%", bottom: 0, left: x, width: 1, background: "rgba(160,130,90,0.25)", zIndex: 1 }} />
        ))}

        {/* "Small Steps Count Too" — corner decoration, out of the way of the main view */}
        <div style={{ position: "absolute", top: "3%", left: 10, width: 70, zIndex: 3, opacity: 0.92, filter: "drop-shadow(1px 3px 8px rgba(0,0,0,0.18))" }}>
          <ImageWithFallback src={docGymSticker} alt="Small steps count too" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>

        {/* "Checks In" board — tap it to log Today's Activity, no pill button pasted below it */}
        <FurnitureHotspot
          onClick={onActivity}
          label="Today's Activity"
          ariaLabel="Log today's activity"
          style={{ top: "10%", width: 202, height: 202, zIndex: 3, left: "62%" }}
          baseTransform="translateX(-50%)"
        >
          <ImageWithFallback src={docGymBoard} alt="Checks In board" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </FurnitureHotspot>

        {/* Towel/gear shelf — new richer piece, moved to the left and enlarged */}
        <div style={{ position: "absolute", top: "27%", left: 4, width: 148, height: 188, zIndex: 4 }}>
          <ImageWithFallback src={gymRackNew} alt="Towel shelf" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* Dumbbell rack — the original piece, back on the right */}
        <div style={{ position: "absolute", top: "35%", left: 194, width: 175, height: 175, zIndex: 4, mixBlendMode: "multiply" as const }}>
          <ImageWithFallback src={docGymRack} alt="Dumbbell rack" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Treadmill */}
        <div style={{ position: "absolute", top: "50%", left: -35, width: 253, height: 270, overflow: "hidden", zIndex: 4 }}>
          <ImageWithFallback src={docGymTreadmill} alt="Treadmill" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Pet — feet planted on the treadmill belt, holding the water bottle; tap to chat */}
        <FurnitureHotspot
          onClick={onChat}
          label="Chat"
          ariaLabel={`Talk with ${petName}`}
          style={{ top: "60%", left: 58, width: 188, height: 158, zIndex: 5 }}
        >
          <PetWithAccessory pet={pet} petName={petName} equippedClothing={equippedClothing} />
          <div style={{ position: "absolute", left: 46, top: 63, width: 96, height: 82, pointerEvents: "none" }}>
            <ImageWithFallback src={docGymBottle} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </FurnitureHotspot>

        {/* Yoga mat — top:61.3%, left:204.5, 198×259 */}
        <div style={{ position: "absolute", top: "61.3%", left: 204, width: 198, height: 259, zIndex: 4 }}>
          <ImageWithFallback src={docGymYogaMat} alt="Yoga mat" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>

        {/* Sneakers + resistance band + bottle — floor decoration filling the empty corner near the door */}
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 118, height: 103, zIndex: 5, filter: "drop-shadow(1px 3px 6px rgba(0,0,0,0.15))" }}>
          <ImageWithFallback src={gymShoesCluster} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

// ── Food Log ───────────────────────────────────────────────────────────
function FoodLogScreen({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  const [foodSearch, setFoodSearch] = useState("");
  const [photoMode, setPhotoMode]   = useState(false);
  const [carbEst, setCarbEst]       = useState<number | null>(null);
  const [logged, setLogged]         = useState<{ name: string; carbs: number; grams: number }[]>([]);
  const [weighing, setWeighing]     = useState<typeof FOOD_CARBS[number] | null>(null);
  const [grams, setGrams]           = useState(100);

  // Dose estimator inputs — adjustable so this stays a reflection tool, not a
  // fixed number. Uses the carb-ratio formula: dose = carbs/CIR + correction,
  // correction = (current − target) / ISF, ISF = CIR × 4.5 ÷ 18.
  const [cir, setCir]             = useState(10);   // grams of carb per 1 unit
  const [currentBG, setCurrentBG] = useState(8.5);  // mmol/L
  const [targetBG, setTargetBG]   = useState(7);    // mmol/L

  const filtered = FOOD_CARBS.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));

  const simulateScan = () => {
    setPhotoMode(false);
    setCarbEst(28 + Math.floor(Math.random() * 30));
  };

  const openWeighing = (f: typeof FOOD_CARBS[number]) => {
    setWeighing(f);
    setGrams(f.defaultGrams);
  };
  const confirmWeighing = () => {
    if (!weighing) return;
    const carbs = Math.round(weighing.carbsPer100g * grams / 100);
    setLogged(l => [...l, { name: weighing.name, carbs, grams }]);
    setWeighing(null);
  };

  const stepBtn: React.CSSProperties = { width: 38, height: 30, borderRadius: 10, background: "#F0EDE6", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
  const miniStepBtn: React.CSSProperties = { width: 24, height: 20, borderRadius: 7, background: "#F0EDE6", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

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
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.42)", fontFamily: FF, fontStyle: "italic" }}>Prototype simulation — no real camera analysis</span>
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
                <span style={{ fontSize: 13, fontWeight: 700, color: TXT, fontFamily: FF }}>{l.name} <span style={{ color: MUTED, fontWeight: 600 }}>· {l.grams}g</span></span>
                <span style={{ fontSize: 13, fontWeight: 900, color: SAGE, fontFamily: FF }}>{l.carbs}g carbs</span>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUTED, textAlign: "right", marginTop: 4, fontFamily: FF }}>
              Total: <strong style={{ color: TXT }}>{logged.reduce((s, l) => s + l.carbs, 0)}g</strong> carbs
            </div>
          </div>
        )}

        {logged.length > 0 && (() => {
          const totalCarbs = logged.reduce((s, l) => s + l.carbs, 0);
          const isf = Math.round((cir * 4.5 / 18) * 10) / 10;
          const carbDose = totalCarbs / cir;
          const correction = (currentBG - targetBG) / isf;
          const totalDose = Math.max(0, carbDose + correction);
          const rows: { label: string; value: number; unit: string; set: React.Dispatch<React.SetStateAction<number>>; step: number; min: number; max: number }[] = [
            { label: "Carb ratio (CIR)", value: cir,       unit: "g/u",    set: setCir,       step: 1,   min: 1, max: 30 },
            { label: "Current glucose",  value: currentBG, unit: "mmol/L", set: setCurrentBG, step: 0.1, min: 2, max: 20 },
            { label: "Target glucose",   value: targetBG,  unit: "mmol/L", set: setTargetBG,  step: 0.1, min: 2, max: 12 },
          ];
          return (
            <div style={{ background: "#FFF3E4", borderRadius: 16, padding: "14px 16px", border: "1.5px solid rgba(196,145,122,0.30)", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Syringe size={15} color={ROSE} strokeWidth={2.2} />
                <span style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF }}>Estimated dose</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                {rows.map(row => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: MUTED, fontFamily: FF }}>{row.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => row.set(v => Math.max(row.min, Math.round((v - row.step) * 10) / 10))} style={miniStepBtn}><ChevronDown size={12} color={TXT} strokeWidth={2.4} /></button>
                      <span style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF, width: 40, textAlign: "center" as const }}>{row.step < 1 ? row.value.toFixed(1) : row.value}</span>
                      <button onClick={() => row.set(v => Math.min(row.max, Math.round((v + row.step) * 10) / 10))} style={miniStepBtn}><ChevronUp size={12} color={TXT} strokeWidth={2.4} /></button>
                      <span style={{ fontSize: 10, color: MUTED, width: 42, fontFamily: FF }}>{row.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: FF, lineHeight: 1.6, marginBottom: 8 }}>
                {totalCarbs}g ÷ {cir} = {carbDose.toFixed(1)}u carb dose · correction {correction >= 0 ? "+" : ""}{correction.toFixed(1)}u (ISF {isf})
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: TXT, fontFamily: FF }}>Estimated total</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: ROSE, fontFamily: FF }}>{totalDose.toFixed(1)}u</span>
              </div>
              <div style={{ fontSize: 10, color: "#9A8030", fontFamily: FF, marginTop: 8, lineHeight: 1.5, fontStyle: "italic" as const }}>
                Simulated estimate for prototype reflection only — not medical dosing advice. Always follow your care team's plan.
              </div>
            </div>
          );
        })()}

        <div style={{ fontSize: 13, fontWeight: 800, color: TXT, marginBottom: 4, fontFamily: FF }}>Carb reference</div>
        <div style={{ fontSize: 10.5, color: MUTED, fontFamily: FF, marginBottom: 10, lineHeight: 1.4 }}>Estimated values for prototype reflection — not verified nutritional data. Tap a food to set how many grams you had.</div>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={15} color={MUTED} style={{ position: "absolute", top: "50%", left: 14, transform: "translateY(-50%)" }} />
          <input value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder="Search food…" style={{ width: "100%", boxSizing: "border-box" as const, padding: "12px 14px 12px 38px", borderRadius: 14, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(foodSearch ? filtered : FOOD_CARBS).map(f => (
            <button key={f.name} onClick={() => openWeighing(f)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 14, background: CARD, border: `1.5px solid ${BORDER}`, cursor: "pointer", textAlign: "left", width: "100%" }}>
              <div style={{ width: 40, height: 40, flexShrink: 0 }}><ImageWithFallback src={f.image} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: TXT, fontFamily: FF }}>{f.name}</span>
              <div style={{ background: "#F0D08088", borderRadius: 8, padding: "4px 10px" }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#7A6A30", fontFamily: FF }}>{f.carbsPer100g}g/100g</span>
              </div>
              <span style={{ fontSize: 11, color: MUTED }}>+ Add</span>
            </button>
          ))}
        </div>
      </div>

      {weighing && (
        <div style={{ position: "absolute", inset: 0, zIndex: 260, background: "rgba(20,16,10,0.55)", display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: CARD, borderRadius: "24px 24px 0 0", padding: "20px 20px 28px", boxSizing: "border-box" as const }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, flexShrink: 0 }}><ImageWithFallback src={weighing.image} alt={weighing.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: TXT, fontFamily: FF }}>{weighing.name}</div>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>{weighing.carbsPer100g}g carbs / 100g</div>
              </div>
              <button onClick={() => setWeighing(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={MUTED} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 14 }}>
              <button onClick={() => setGrams(g => Math.max(0, g - 10))} style={stepBtn}><ChevronDown size={16} color={TXT} strokeWidth={2.4} /></button>
              <div style={{ textAlign: "center" as const }}>
                <input
                  type="number" value={grams}
                  onChange={e => setGrams(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  style={{ width: 80, textAlign: "center" as const, fontSize: 28, fontWeight: 900, color: TXT, border: "none", background: "transparent", fontFamily: FF, outline: "none" }}
                />
                <div style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>grams</div>
              </div>
              <button onClick={() => setGrams(g => g + 10)} style={stepBtn}><ChevronUp size={16} color={TXT} strokeWidth={2.4} /></button>
            </div>
            <div style={{ textAlign: "center" as const, marginBottom: 18, fontSize: 13, color: TXT, fontFamily: FF, fontWeight: 700 }}>
              ≈ {Math.round(weighing.carbsPer100g * grams / 100)}g carbs
            </div>
            <button onClick={confirmWeighing} style={{ width: "100%", padding: "14px 0", borderRadius: 16, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer" }}>Add to log</button>
          </div>
        </div>
      )}

      <div style={{ padding: "10px 16px 40px", flexShrink: 0 }}>
        <button onClick={onSave} style={{ width: "100%", padding: "14px 0", borderRadius: 16, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer" }}>Save meal log</button>
      </div>
    </div>
  );
}

// ── Bedroom Detail ─────────────────────────────────────────────────────
function BedroomDetailScreen({ pet, petName, equippedClothing, onBack, onWardrobe, onPostcards, onJournal, onChat }: {
  pet: Pet; petName: string; equippedClothing: number | null;
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
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#B49678", marginTop: 14, borderRadius: "18px 18px 0 0", boxShadow: "inset 0 6px 18px rgba(61,43,31,0.10)" }}>
        <RoomHint storageKey="tend_hint_bedroom_v6" text="Tap glowing objects to explore your journal, wardrobe, and postcards." />

        {/* Wall */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "57%", background: "linear-gradient(170.826deg, #F7EFE6 6%, #EDE4D8 94%)", zIndex: 0 }} />
        {/* Floor — warmed up */}
        <div style={{ position: "absolute", top: "57%", left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, #D8BC98, #B49678)", zIndex: 0 }} />
        {/* Baseboard */}
        <div style={{ position: "absolute", top: "57%", left: 0, right: 0, height: 5, background: "#A07850", zIndex: 2 }} />

        {/* Wall picture frames — small, intentionally asymmetric pair, tucked in the empty gap between the postcard tile and the flowers */}
        <div style={{ position: "absolute", top: "4%", left: 122, width: 30, height: 40, zIndex: 3, background: "#FDFAF6", border: "3px solid #C89060", borderRadius: 3, boxShadow: "0 3px 8px rgba(0,0,0,0.18)", padding: 2 }}>
          <ImageWithFallback src={storePhotoFrame} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", top: "9.5%", left: 160, width: 22, height: 30, zIndex: 3, background: "#FDFAF6", border: "3px solid #C89060", borderRadius: 3, boxShadow: "0 3px 8px rgba(0,0,0,0.18)", padding: 2 }}>
          <ImageWithFallback src={storePhotoFrame} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>


        {/* ── The postcard tile on the wall — tap to open the Postcard Journal ── */}
        <FurnitureHotspot
          onClick={onPostcards}
          label="Postcard Journal"
          style={{ top: "10%", left: 16, width: 120, height: 126, zIndex: 3 }}
        >
          <div style={{ width: "100%", background: "#FEF5EB", borderRadius: "8px 8px 0 0", border: "3.5px solid #C89060", padding: 6, overflow: "hidden" }}>
            <ImageWithFallback src={ps2Balloon} alt="Postcards" style={{ width: "100%", height: 89, objectFit: "cover", borderRadius: 3, display: "block" }} />
          </div>
        </FurnitureHotspot>

        {/* Flowers — moved down and enlarged to fill the bare wall space */}
        <div style={{ position: "absolute", top: "14%", left: 190, width: 114, zIndex: 3, pointerEvents: "none", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.16))" }}>
          <ImageWithFallback src={ps2Flowers} alt="" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>

        {/* Star garland — moved up, still draped toward the flowers below */}
        <div style={{ position: "absolute", top: "5%", left: 188, width: 200, height: 130, zIndex: 4, pointerEvents: "none" }}>
          <ImageWithFallback src={bedroomLights} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* ── WARDROBE — the cabinet itself is the button now, no separate hit-zone to drift out of alignment ── */}
        <FurnitureHotspot
          onClick={onWardrobe}
          label="Wardrobe"
          ariaLabel="Open wardrobe"
          style={{ top: "26%", left: 10, width: 172, height: 301, zIndex: 4 }}
          labelOffset={{ bottom: "18%" }}
        >
          <ImageWithFallback src={ps2Wardrobe} alt="Wardrobe" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </FurnitureHotspot>

        {/* BED — moved further left, slightly tucked behind the wardrobe's edge (bed has pointer-events off so wardrobe stays tappable) */}
        <div style={{
          position: "absolute", top: "38%", left: 169,
          width: 226, height: 237, zIndex: 5, pointerEvents: "none",
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.22))", overflow: "hidden",
        }}>
          <ImageWithFallback src={ps2Bed} alt="Bed" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Round rug — moved under the pet, at the foot of the bed */}
        <div style={{ position: "absolute", top: "66%", left: 198, width: 194, height: 176, zIndex: 4, opacity: 0.95 }}>
          <ImageWithFallback src={bedroomRug} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* Bunny slippers — moved left, resting on the rug beside the pet */}
        <div style={{ position: "absolute", bottom: 6, left: 300, width: 52, height: 48, zIndex: 6, filter: "drop-shadow(1px 3px 6px rgba(0,0,0,0.16))" }}>
          <ImageWithFallback src={bedroomSlippers} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* Table — decorative surface under the journal book */}
        <div style={{ position: "absolute", top: "68%", left: -17, width: 167, height: 157, zIndex: 6, pointerEvents: "none", overflow: "clip" }}>
          <ImageWithFallback src={ps2Table} alt="Table" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* ── JOURNAL — the book itself is the button now, no pill label pasted underneath ── */}
        <FurnitureHotspot
          onClick={onJournal}
          label="Journal"
          ariaLabel="Open journal"
          style={{ top: "calc(68% + 103px)", left: 60, width: 76, height: 63, zIndex: 7 }}
        >
          <ImageWithFallback src={ps2JournalBook} alt="Journal" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </FurnitureHotspot>

        {/* Pet — centered over the bed's foot on the rug, enlarged; tap to chat */}
        <FurnitureHotspot
          onClick={onChat}
          label="Chat"
          ariaLabel={`Talk with ${petName}`}
          style={{ top: "66%", left: 233, width: 140, height: 122, zIndex: 8 }}
        >
          <PetWithAccessory pet={pet} petName={petName} equippedClothing={equippedClothing} />
        </FurnitureHotspot>
      </div>
    </div>
  );
}

// ── Wardrobe ───────────────────────────────────────────────────────────
function WardrobeScreen({ pet, stamps, ownedClothing, equipped, onEquip, onBack, onStore }: {
  pet: Pet; stamps: number; ownedClothing: number[]; equipped: number | null; onEquip: (i: number | null) => void;
  onBack: () => void; onStore: () => void;
}) {
  void stamps;
  const [selected, setSelected] = useState<number | null>(null);
  const dressed = equipped;

  const selItem = selected !== null && selected >= 0 ? CLOTHING_ITEMS[selected] : null;

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: FF }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "62px 20px 10px", flexShrink: 0 }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Dress Up</h2>
        <button onClick={onStore} style={{ display: "flex", alignItems: "center", gap: 5, background: ROSE + "1A", borderRadius: 14, padding: "6px 12px", border: `1.5px solid ${ROSE}44`, cursor: "pointer" }}>
          <ShoppingBag size={13} color={ROSE} strokeWidth={2.2} />
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
          {/* "No outfit" tile — always available so an equipped item can be taken off again */}
          <button onClick={() => setSelected(s => s === -1 ? null : -1)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            padding: "12px 6px 10px", borderRadius: 16, cursor: "pointer",
            background: selected === -1 ? pet.color + "22" : CARD,
            border: `2px solid ${selected === -1 ? pet.color : "transparent"}`,
          }}>
            <div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={22} color={MUTED} strokeWidth={2} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 800, color: selected === -1 ? pet.color : TXT, textAlign: "center", lineHeight: 1.2, fontFamily: FF }}>No outfit</span>
            {selected === -1 && <span style={{ fontSize: 9, color: pet.color, fontWeight: 900 }}>selected ✓</span>}
          </button>
          {CLOTHING_ITEMS.map((item, i) => {
            const unlocked = ownedClothing.includes(i);
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
                  <div style={{ position: "absolute", top: 7, right: 7 }}><Lock size={11} color={MUTED} strokeWidth={2.4} /></div>
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
        {selected === -1 ? (
          <button onClick={() => { onEquip(null); setSelected(null); }} style={{ width: "100%", padding: "14px 0", borderRadius: 18, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer", boxShadow: "0 6px 20px rgba(196,145,122,0.35)" }}>
            Take it off
          </button>
        ) : selItem ? (
          <button onClick={() => { onEquip(selected); setSelected(null); }} style={{ width: "100%", padding: "14px 0", borderRadius: 18, background: ROSE, border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: "pointer", boxShadow: "0 6px 20px rgba(196,145,122,0.35)" }}>
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

        <div style={{ background: "rgba(61,43,31,0.06)", borderRadius: 12, padding: "8px 12px", fontSize: 10.5, color: MUTED, fontFamily: FF, lineHeight: 1.4 }}>
          Simulated activity &amp; sleep data — for prototype reflection only, not from a real device.
        </div>

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
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 900, color: TXT, fontFamily: FF }}><Moon size={15} color={TXT} strokeWidth={2.2} /> Sleep Quality</div>
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
  { img: clothingStarBandana,   name: "Star Bandana",   cost: 8,  unlocked: false },
  { img: clothingPawCollar,     name: "Paw Collar",     cost: 10, unlocked: false },
  { img: clothingBellCollar,    name: "Bell Collar",    cost: 12, unlocked: false },
  { img: clothingStrawHat,      name: "Straw Hat",      cost: 14, unlocked: true  },
  { img: clothingBeret,         name: "Beret",          cost: 16, unlocked: false },
  { img: clothingBucketHat,     name: "Bucket Hat",     cost: 18, unlocked: false },
  { img: clothingRainCape,      name: "Rain Cape",      cost: 20, unlocked: false },
  { img: clothingBackpack,      name: "Cute Backpack",  cost: 22, unlocked: false },
  { img: clothingStarGlasses,   name: "Star Glasses",   cost: 23, unlocked: false },
  { img: clothingGreenBow,      name: "Green Bow Tie",  cost: 26, unlocked: false },
  { img: clothingPinkBow,       name: "Pink Bow",       cost: 28, unlocked: false },
  { img: clothingMessengerBag,  name: "Messenger Bag",  cost: 30, unlocked: false },
  { img: clothingSunglasses,    name: "Sunglasses",     cost: 35, unlocked: false },
  { img: clothingPoncho,        name: "Cream Poncho",   cost: 38, unlocked: false },
  { img: clothingPlaidBow,      name: "Plaid Bow",      cost: 40, unlocked: false },
  { img: clothingCanvasBag,     name: "Canvas Bag",     cost: 42, unlocked: false },
  { img: clothingPearlNecklace, name: "Pearl Necklace", cost: 45, unlocked: false },
  { img: clothingFlowerCrown,   name: "Flower Crown",   cost: 50, unlocked: false },
];
// Indices owned by default before any purchase — preserves the existing "only the
// Straw Hat starts unlocked" behavior now that ownership is a real, buyable state.
const DEFAULT_OWNED_CLOTHING = CLOTHING_ITEMS.reduce<number[]>((acc, item, i) => item.unlocked ? [...acc, i] : acc, []);

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

function StoreItemGrid({ items, stamps, owned, onBuy }: {
  items: { img: string; name: string; cost: number }[];
  stamps: number;
  owned: number[];
  onBuy: (i: number) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {items.map((item, i) => {
        const bought   = owned.includes(i);
        const unlocked = bought || item.cost <= stamps;
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
                <Lock size={12} color="#fff" strokeWidth={2.4} />
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

function StoreScreen({ stamps, ownedClothing, ownedFurniture, onBuyClothing, onBuyFurniture, onBack }: {
  stamps: number; ownedClothing: number[]; ownedFurniture: number[];
  onBuyClothing: (i: number) => void; onBuyFurniture: (i: number) => void; onBack: () => void;
}) {
  const [tab, setTab]            = useState<"furniture" | "clothing">("furniture");
  const [showHowTo, setShowHowTo] = useState(false);

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
          <StoreItemGrid items={STORE_ITEMS} stamps={stamps} owned={ownedFurniture} onBuy={onBuyFurniture} />
        ) : (
          <StoreItemGrid items={CLOTHING_ITEMS} stamps={stamps} owned={ownedClothing} onBuy={onBuyClothing} />
        )}

        {/* De-emphasized rules disclosure */}
        <button onClick={() => setShowHowTo(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", padding: "14px 2px 4px", fontFamily: FF, width: "100%", textAlign: "left" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, textDecoration: "underline" }}>How do I earn stamps?</span>
        </button>
        {showHowTo && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {[
              { label: "Save a Quick Log entry", bonus: "+1" },
              { label: "Save a meal log",         bonus: "+1" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: "#EDE8DE" }}>
                <span style={{ fontSize: 11.5, color: MUTED, fontFamily: FF }}>{row.label}</span>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: ROSE, fontFamily: FF }}>{row.bonus}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Postcards ──────────────────────────────────────────────────────────
function PostcardsScreen({ stamps, pet, petName, unlockedIds, onSendTrip, onBack }: { stamps: number; pet: Pet; petName: string; unlockedIds: number[]; onSendTrip: () => string | null; onBack: () => void }) {
  const [selected, setSelected] = useState<typeof MAP_REGIONS[number] | null>(null);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  const unlocked = MAP_REGIONS.filter(r => unlockedIds.includes(r.id));
  const locked   = MAP_REGIONS.filter(r => !unlockedIds.includes(r.id));
  const tapeColors = [ROSE, SAGE];
  const TRIP_GOAL    = 50;
  const tripProgress = Math.min(stamps / TRIP_GOAL, 1);
  const tripReady     = stamps >= TRIP_GOAL && locked.length > 0;
  const allDiscovered = locked.length === 0;

  const handleSendTrip = () => {
    const name = onSendTrip();
    if (name) setJustUnlocked(name);
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <SHeader
        title="Postcard Journal"
        onBack={onBack}
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: CARD, border: `1.5px solid ${BORDER}`, borderRadius: 999, padding: "6px 12px", flexShrink: 0 }}>
            <div style={{ width: 16, height: 16 }}><ImageWithFallback src={pawStampIcon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
            <span style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF }}>{stamps}</span>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 32px" }}>
        {/* Luminara world banner */}
        <div style={{ margin: "10px 2px 18px" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: TXT, fontFamily: FF, lineHeight: 1.2 }}>Luminara</div>
          <div style={{ fontSize: 12, color: MUTED, fontFamily: FF, fontStyle: "italic", marginTop: 1 }}>The Land of Gentle Light</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: ROSE, fontFamily: FF, marginTop: 6 }}>{unlocked.length} postcards found</div>
        </div>

        {/* Next trip progress — folded in from the old Stamp Journey page */}
        <div style={{ background: CARD, borderRadius: 18, padding: "14px 18px", marginBottom: 22, border: `1px solid ${BORDER}`, boxShadow: "0 4px 14px rgba(61,43,31,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, flexShrink: 0 }}><ImageWithFallback src={giftBoxIcon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: TXT, fontFamily: FF }}>Journey to next trip</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: ROSE, fontFamily: FF }}>{stamps}/{TRIP_GOAL}</span>
          </div>
          <div style={{ height: 8, borderRadius: 8, background: "#EDE8DE", overflow: "hidden", marginBottom: (justUnlocked || tripReady || allDiscovered) ? 10 : 0 }}>
            <div style={{ height: "100%", width: `${tripProgress * 100}%`, borderRadius: 8, background: `linear-gradient(90deg, ${ROSE}, #E8A07A)`, transition: "width 0.4s" }} />
          </div>
          {justUnlocked ? (
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <div style={{ position: "relative", height: 84 }}>
                <ImageWithFallback src={postcardBeach} alt="Trip" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 3 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#fff", fontFamily: FF }}>Welcome back!</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.85)", textAlign: "center", padding: "0 10px" }}>{petName} went on a little trip and brought back a postcard from {justUnlocked}!</div>
                </div>
              </div>
            </div>
          ) : allDiscovered ? (
            <div style={{ fontSize: 11, color: MUTED, fontFamily: FF, marginTop: 8, lineHeight: 1.5 }}>
              {petName} has visited every region of Luminara so far. More journeys are on the way.
            </div>
          ) : tripReady ? (
            <button onClick={handleSendTrip} style={{ width: "100%", padding: "11px 0", borderRadius: 12, background: ROSE, border: "none", color: "#fff", fontSize: 13, fontWeight: 800, fontFamily: FF, cursor: "pointer" }}>
              Send companion on a little trip
            </button>
          ) : (
            <div style={{ fontSize: 11, color: MUTED, fontFamily: FF, marginTop: 8, lineHeight: 1.5 }}>
              Your companion is slowly getting ready. {TRIP_GOAL - stamps} more stamps to go.
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 26 }}>
          {unlocked.map((region, i) => (
            <button key={region.id} onClick={() => setSelected(region)} style={{
              position: "relative", background: "#FBF6EC", border: "3px solid #FBF6EC", borderRadius: 10,
              padding: "8px 8px 12px", cursor: "pointer", textAlign: "left",
              transform: `rotate(${i % 2 === 0 ? -3 : 2.5}deg)`,
              boxShadow: "0 6px 16px rgba(61,43,31,0.14)",
            }}>
              {/* washi tape */}
              <div style={{
                position: "absolute", top: -10, left: "50%", width: 46, height: 18,
                transform: "translateX(-50%) rotate(-6deg)",
                background: tapeColors[i % 2], opacity: 0.55, borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
              }} />
              <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", height: 108 }}>
                <ImageWithFallback src={region.scene} alt={region.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.82) sepia(0.10) contrast(0.97)" }} />
                <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 18px rgba(61,43,31,0.14)" }} />
                {/* pet sticker badge */}
                <div style={{
                  position: "absolute", bottom: -8, right: -8, width: 40, height: 40, borderRadius: "50%",
                  background: "#fff", border: `2px solid ${CARD}`, boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                  padding: 3, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: TXT, fontFamily: FF, marginTop: 10 }}>
                {region.name}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, fontFamily: FF, marginTop: 2 }}>
                {region.date}
              </div>
              <div style={{ fontSize: 9.5, color: MUTED, fontFamily: FF, opacity: 0.7, fontStyle: "italic", marginTop: 3 }}>
                Tap to view journal entry
              </div>
            </button>
          ))}
        </div>

        {/* Future journeys */}
        {locked.length > 0 && (
        <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: FF, margin: "6px 2px 12px" }}>
          Future Journeys
        </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {locked.map(region => (
            <div key={region.id} style={{
              position: "relative", display: "flex", alignItems: "center", gap: 12,
              border: `1.5px dashed ${BORDER}`, borderRadius: 14, padding: "12px 14px",
              overflow: "hidden",
            }}>
              <ImageWithFallback src={region.scene} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(253,250,246,0.85) 0%, rgba(253,250,246,0.55) 55%, rgba(253,250,246,0.22) 100%)" }} />
              <div style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", background: "rgba(253,250,246,0.95)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Lock size={16} color={MUTED} strokeWidth={2.2} />
              </div>
              <div style={{ position: "relative", flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: TXT, fontFamily: FF, textShadow: "0 1px 3px rgba(253,250,246,0.6)" }}>{region.name}</div>
                <div style={{ fontSize: 11.5, color: MUTED, fontFamily: FF, opacity: 0.9, textShadow: "0 1px 3px rgba(253,250,246,0.6)" }}>Collect more stamps to unlock</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div style={{ position: "absolute", inset: 0, zIndex: 250, background: "rgba(61,43,31,0.45)", display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: CARD, borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 40px rgba(0,0,0,0.22)", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 12px" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: FF, marginTop: 2 }}>{selected.date}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "#EDE8DE", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={MUTED} /></button>
            </div>
            {/* Scenic postcard image */}
            <div style={{ position: "relative", height: 164, margin: "0 16px", borderRadius: 16, overflow: "hidden", marginBottom: 14, border: "3px solid #FBF6EC", boxShadow: "0 2px 10px rgba(61,43,31,0.12)" }}>
              <ImageWithFallback src={selected.scene} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.82) sepia(0.10) contrast(0.97)" }} />
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
  const [tab, setTab] = useState<"notes" | "basal" | "bolus" | "food" | "glucose">("notes");
  const [shareToast, setShareToast] = useState(false);
  const noteEntries = loadLS<QuickLogEntry[]>(LS_KEYS.quickLogs, []).slice().sort((a, b) => b.timestamp - a.timestamp);

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
    { date: "Jul 14", time: "08:00", meal: "Toast + scrambled egg", complete: true  },
    { date: "Jul 14", time: "13:00", meal: "Curry rice (medium)",   complete: true  },
    { date: "Jul 14", time: "19:25", meal: "Hot pot dinner",        complete: true  },
    { date: "Jul 13", time: "08:05", meal: "Oatmeal + banana",      complete: true  },
    { date: "Jul 13", time: "15:30", meal: "Afternoon snack",       complete: false },
    { date: "Jul 13", time: "19:10", meal: "Ramen noodles",         complete: true  },
    { date: "Jul 12", time: "12:45", meal: "Crab rice plate",       complete: true  },
    { date: "Jul 12", time: "17:00", meal: "Tea + biscuits",        complete: false },
    { date: "Jul 12", time: "20:00", meal: "Fancy birthday dinner", complete: true  },
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
    { key: "notes",   label: "Notes",   Icon: BookOpen },
    { key: "basal",   label: "Basal",   Icon: Syringe  },
    { key: "bolus",   label: "Bolus",   Icon: Zap      },
    { key: "food",    label: "Food",    Icon: Utensils },
    { key: "glucose", label: "Glucose", Icon: Activity },
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
          Report link copied — share with doctor or family
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
              <t.Icon size={14} color={tab === t.key ? TXT : MUTED} strokeWidth={2.2} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px", scrollbarWidth: "none" as const }}>

        {tab !== "notes" && (
          <div style={{ background: "rgba(61,43,31,0.06)", borderRadius: 12, padding: "8px 12px", fontSize: 10.5, color: MUTED, fontFamily: FF, lineHeight: 1.4, marginBottom: 12 }}>
            Simulated {tab} data — for prototype reflection only, not a real medical record.
          </div>
        )}

        {/* ── NOTES TAB — your real saved Quick Log entries, read straight from this device ── */}
        {tab === "notes" && (
          noteEntries.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" as const }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: TXT, fontFamily: FF, marginBottom: 6 }}>No notes yet</div>
              <p style={{ fontSize: 12, color: MUTED, fontFamily: FF, lineHeight: 1.6, margin: 0 }}>Save a Quick Log entry and it'll show up here, in your own words.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
              {noteEntries.map((entry, i) => {
                const d = new Date(entry.timestamp);
                const dateStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
                const timeStr = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
                return (
                  <div key={i} style={{ background: CARD, borderRadius: 16, padding: "12px 14px", border: `1.5px solid ${BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: MUTED, fontFamily: FF }}>{dateStr} · {timeStr}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: (entry.note || entry.doseUnits !== undefined) ? 8 : 0 }}>
                      {entryTags(entry).map(tag => (
                        <span key={tag} style={{ fontSize: 10.5, fontWeight: 800, color: ROSE, background: ROSE + "18", borderRadius: 10, padding: "3px 9px", fontFamily: FF }}>{tag}</span>
                      ))}
                      {entry.doseUnits !== undefined && (
                        <span style={{ fontSize: 10.5, fontWeight: 800, color: SAGE, background: SAGE + "18", borderRadius: 10, padding: "3px 9px", fontFamily: FF }}>{entry.doseUnits.toFixed(1)}u</span>
                      )}
                    </div>
                    {entry.note && (
                      <p style={{ fontSize: 12.5, color: TXT, fontFamily: FF, lineHeight: 1.55, margin: 0 }}>{entry.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

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
            <Camera size={18} color="#7A6030" strokeWidth={2} style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: "#7A6030", fontFamily: FF, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
              Food log is photo-based and may be <strong>incomplete</strong>. Major meals are usually captured; everyday snacks or simple meals might be missing.
            </p>
          </div>
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
            {foodLog.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderBottom: i < foodLog.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? CARD : "#FAF6F0" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: r.complete ? "#EDE8DE" : "#F5F0EA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1.5px solid ${BORDER}` }}>
                  {r.complete ? <Camera size={16} color={MUTED} strokeWidth={2} /> : <span style={{ fontSize: 14, color: MUTED }}>·</span>}
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
              Simulated CGM data for this prototype — no real device connected.
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
            {tab === "basal" && "Your basal covers the dawn rise well. Let's keep watching that 6–9 am window."}
            {tab === "bolus" && "Bolus timing looks good! The Jul 13 lunch spike is worth chatting about when you're ready."}
            {tab === "food" && "Big meals are captured — that's what matters most for pattern-spotting. Nice work logging!"}
            {tab === "glucose" && "Two-thirds in range is genuinely great. The post-dinner highs are a useful clue."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Chat ───────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: "Explain my recent trend",  Icon: TrendingUp },
  { label: "I feel a bit anxious",     Icon: Wind       },
  { label: "Help me reflect on today", Icon: Sparkles   },
];

const ANXIOUS_REPLIES = [
  "That feeling is allowed to be here. You don't need to fix anything right now — just take a slow breath with me. I'm not going anywhere.",
  "It makes sense to feel that way sometimes. You're not behind, and you don't have to have it all figured out today. I'm right here with you.",
  "Anxious moments don't need to be solved immediately — sometimes they just need company. I'm glad you said something instead of sitting with it alone.",
];

// A slightly more "informed-sounding" trend reflection, built from the same mock
// 7-day TIR/average data the Trend Detail screen shows — so the companion's
// explanation lines up with what's actually on screen. This is still a scripted,
// rule-based summary of simulated numbers, not a real analysis of live CGM data,
// and it deliberately avoids anything that reads as medical guidance.
function explainTrend(): string {
  const segs = TIR_DATA["7"];
  const inRange = segs.find(s => s.label === "In range")!.pct;
  const high = segs.find(s => s.label === "High")!.pct + segs.find(s => s.label === "Very high")!.pct;
  const avg = AVG_G["7"];
  const shape = inRange >= 60
    ? "a fairly steady rhythm, with most readings settling back into range"
    : "a bit more up-and-down than usual, with some stretches running higher after meals";
  return `Looking at your last 7 days of simulated readings: you were in range about ${inRange}% of the time, with an average around ${avg} mmol/L. The overall shape has been ${shape} — often there's a gentle rise after meals and a softer patch overnight, sometimes called the "dawn phenomenon." About ${high}% of readings ran on the higher side, which is worth a gentle look rather than worry. This is a reflection on prototype data, not a diagnosis — for anything about your real numbers, your care team is the right place to ask.`;
}

// Picks a warm, non-medical reply. Trend/anxious prompts get a targeted response;
// everything else falls back to the general reply pool.
// Used as an offline fallback when the real /api/chat call fails or isn't
// available (e.g. running `vite dev` locally without `vercel dev`, or no
// OPENAI_API_KEY configured yet) — so chat still works either way.
function pickReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("trend") || t.includes("pattern")) return explainTrend();
  if (t.includes("anxious") || t.includes("anxiety") || t.includes("worried") || t.includes("stressed")) return ANXIOUS_REPLIES[Math.floor(Math.random() * ANXIOUS_REPLIES.length)];
  return REPLIES[Math.floor(Math.random() * REPLIES.length)];
}

// Brief, factual summary of the same simulated 7-day data shown on the Trend
// Detail screen, sent to the real AI as context so its replies about "my
// trend" line up with what's on screen — it's still clearly labeled simulated.
function chatContext(): string {
  const segs = TIR_DATA["7"];
  const inRange = segs.find(s => s.label === "In range")!.pct;
  const high = segs.find(s => s.label === "High")!.pct + segs.find(s => s.label === "Very high")!.pct;
  return `7-day simulated glucose summary: average ${AVG_G["7"]} mmol/L, ${inRange}% of readings in range, ${high}% ran high. This is prototype data, not a real device feed.`;
}

function ChatScreen({ pet, petName, userName, onBack, initialPrompt, onConsumeInitialPrompt }: { pet: Pet; petName: string; userName: string; onBack: () => void; initialPrompt?: string | null; onConsumeInitialPrompt?: () => void }) {
  // Chat "remembers" — conversation is saved to this device so it's still here
  // next time you open Chat, instead of resetting every visit.
  const [msgs, setMsgs] = useState<Msg[]>(() => loadLS<Msg[]>(LS_KEYS.chatHistory, [
    { from: "pet", text: `Hi ${userName} — I'm glad you came by. How are you feeling today?` },
  ]));
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [showPrompts, setShowPrompts] = useState(() => msgs.length <= 1);
  const endRef                  = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { saveLS(LS_KEYS.chatHistory, msgs); }, [msgs]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const priorMsgs = msgs;
    setMsgs(m => [...m, { from: "user", text: msg }]);
    setInput("");
    setShowPrompts(false);
    setTyping(true);

    // DIAGNOSTIC MODE — scripted fallback temporarily disabled on purpose so
    // real /api/chat failures are visible instead of silently masked by
    // pickReply(). Restore the pickReply() fallback in both branches below
    // once /api/chat is confirmed to reliably return real text.
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, history: priorMsgs, context: chatContext() }),
    })
      .then(async r => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(`api/chat ${r.status}: ${data?.error ?? "unknown error"}`);
        return data as { reply?: string; source?: string };
      })
      .then(data => {
        setMsgs(m => [...m, { from: "pet", text: data.reply ?? "" }]);
      })
      .catch(err => {
        setMsgs(m => [...m, { from: "pet", text: `[/api/chat failed: ${err instanceof Error ? err.message : "unknown error"}]` }]);
      })
      .finally(() => setTyping(false));
  };

  useEffect(() => {
    if (initialPrompt) {
      send(initialPrompt);
      onConsumeInitialPrompt?.();
    }
    // run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <qp.Icon size={13} color={TXT} strokeWidth={2.2} />{qp.label}
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
function TrendScreen({ numbersVisible: showNums, onToggleNumbers: setShowNums, onBack, onAskCompanion }: { numbersVisible: boolean; onToggleNumbers: (fn: (v: boolean) => boolean) => void; onBack: () => void; onAskCompanion: () => void }) {
  const [period, setPeriod]           = useState("7");
  const segments = TIR_DATA[period];
  const inRange  = segments.find(s => s.label === "In range")!.pct;
  const avgG     = AVG_G[period];

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
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontStyle: "italic", marginTop: 3 }}>Simulated CGM data — no device connected</div>
          </div>
        </div>
        <button onClick={onAskCompanion} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "12px 0", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}`, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <Sparkles size={14} color={ROSE} strokeWidth={2.2} />
          <span style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF }}>Ask companion to explain this pattern</span>
        </button>
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
            <div style={{ fontSize: 12, color: MUTED, fontFamily: FF }}>{inRange >= 50 ? `${inRange}% in range — a gentle, steady pattern` : `${inRange}% in range · patterns can shift day to day`}</div>
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

// ── Log (Quick Log) ───────────────────────────────────────────────────
type QuickLogTag = "Ate" | "Injected" | "Exercised" | "Unwell" | "Mood" | "Site Change";
type QuickLogEntry = { tags: QuickLogTag[]; note: string; timestamp: number; doseUnits?: number };
// Reads a saved entry's tags defensively — earlier prototype builds saved a single
// `tag` string instead of a `tags` array, so old browsers' localStorage may still
// have that shape. This keeps the Journal from breaking on legacy entries.
function entryTags(e: { tags?: QuickLogTag[]; tag?: QuickLogTag }): QuickLogTag[] {
  if (Array.isArray(e.tags)) return e.tags;
  if (e.tag) return [e.tag];
  return [];
}
const QUICK_LOG_TAGS: { id: QuickLogTag; Icon: typeof Utensils }[] = [
  { id: "Ate",         Icon: Utensils   },
  { id: "Injected",    Icon: Syringe    },
  { id: "Exercised",   Icon: Activity   },
  { id: "Unwell",      Icon: HeartPulse },
  { id: "Mood",        Icon: Smile      },
  { id: "Site Change", Icon: RefreshCw  },
];

// Quick-pick phrases per tag, so most logs need zero typing.
// Note: "Site Change" has no picks — it doesn't need a body-part choice, just the
// date-based marker card rendered separately below. "Injected" also gets a real
// numeric dose slider instead of/alongside these phrase picks.
const QUICK_LOG_PICKS: Record<QuickLogTag, string[]> = {
  Ate:          ["Breakfast", "Lunch", "Dinner", "Snack"],
  Injected:     ["Rapid / mealtime", "Long-acting", "Correction dose"],
  Exercised:    ["Walk", "Run", "Yoga", "Strength"],
  Unwell:       ["Feeling low", "Feeling high", "Dizzy", "Tired"],
  Mood:         ["Calm", "Happy", "Anxious", "Overwhelmed"],
  "Site Change":[],
};
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function LogScreen({ onBack, onSaved }: { onBack: () => void; onSaved: () => void }) {
  const [sel, setSel]   = useState<QuickLogTag[]>([]);
  const [note, setNote] = useState("");
  const [photoMode, setPhotoMode] = useState(false);
  const [carbEst, setCarbEst] = useState<number | null>(null);
  const [doseUnits, setDoseUnits] = useState(4);
  const [lastSiteChange, setLastSiteChange] = useState<number | null>(() => loadLS<number | null>(LS_KEYS.siteChange, null));

  const daysSinceSiteChange = lastSiteChange !== null ? Math.floor((Date.now() - lastSiteChange) / MS_PER_DAY) : null;
  const siteChangeDue = daysSinceSiteChange !== null && daysSinceSiteChange >= SITE_CHANGE_REMINDER_DAYS;

  const toggleTag = (id: QuickLogTag) => {
    setSel(s => s.includes(id) ? s.filter(t => t !== id) : [...s, id]);
  };

  const togglePick = (label: string) => {
    setNote(n => {
      const parts = n.split(",").map(s => s.trim()).filter(Boolean);
      return parts.includes(label) ? parts.filter(p => p !== label).join(", ") : [...parts, label].join(", ");
    });
  };

  const simulateScan = () => {
    setPhotoMode(false);
    const est = 28 + Math.floor(Math.random() * 30);
    setCarbEst(est);
    setSel(s => s.includes("Ate") ? s : [...s, "Ate"]);
    setNote(n => {
      const parts = n.split(",").map(s => s.trim()).filter(Boolean).filter(p => !p.startsWith("Photo scan"));
      return [...parts, `Photo scan: ~${est}g carbs`].join(", ");
    });
  };

  const handleSave = () => {
    if (sel.length === 0) return;
    const entry: QuickLogEntry = {
      tags: sel, note: note.trim(), timestamp: Date.now(),
      ...(sel.includes("Injected") ? { doseUnits } : {}),
    };
    if (sel.includes("Site Change")) {
      saveLS(LS_KEYS.siteChange, entry.timestamp);
      setLastSiteChange(entry.timestamp);
    }
    const existing = loadLS<QuickLogEntry[]>(LS_KEYS.quickLogs, []);
    saveLS(LS_KEYS.quickLogs, [...existing, entry]);
    onSaved();
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "66px 20px 14px" }}>
        <BackBtn onPress={onBack} />
        <h2 style={{ fontSize: 18, fontWeight: 900, color: TXT, fontFamily: FF, margin: 0, flex: 1 }}>Quick Log</h2>
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
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.42)", fontFamily: FF, fontStyle: "italic" }}>Prototype simulation — no real camera analysis</span>
        </div>
      )}

      <>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 8px", scrollbarWidth: "none" }}>
          {siteChangeDue && (
              <button onClick={() => setSel(s => s.includes("Site Change") ? s : [...s, "Site Change"])} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", borderRadius: 16, background: "#FFF3E4", border: "1.5px solid rgba(196,145,122,0.35)", cursor: "pointer", marginBottom: 16, textAlign: "left" }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: ROSE + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><RefreshCw size={17} color={ROSE} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF }}>It's been {daysSinceSiteChange} days since your last site change</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>Might be time for a fresh one — tap to log it</div>
                </div>
              </button>
            )}
            <p style={{ fontSize: 14, color: MUTED, margin: "0 0 14px", lineHeight: 1.6, fontFamily: FF }}>What would you like to note today? You can pick more than one.</p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 9, marginBottom: 14 }}>
              {QUICK_LOG_TAGS.map(({ id, Icon }) => {
                const on = sel.includes(id);
                return (
                  <button key={id} onClick={() => toggleTag(id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 16px", borderRadius: 14, background: on ? ROSE : CARD, border: `2px solid ${on ? ROSE : BORDER}`, cursor: "pointer", transition: "all 0.14s" }}>
                    <Icon size={14} color={on ? "#fff" : TXT} strokeWidth={2.2} />
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: on ? "#fff" : TXT, fontFamily: FF, whiteSpace: "nowrap" as const }}>{id}</span>
                  </button>
                );
              })}
            </div>

            {sel.includes("Injected") && (() => {
              // Work in integer tenths internally (0–200 = 0.0–20.0u) so the two steppers
              // can't drift into floating-point artifacts like 3.4000000000000004.
              const totalTenths = Math.round(doseUnits * 10);
              const whole  = Math.floor(totalTenths / 10);
              const tenths = totalTenths % 10;
              const adjustWhole  = (delta: number) => setDoseUnits(d => Math.min(200, Math.max(0, Math.round(d * 10) + delta * 10)) / 10);
              const adjustTenths = (delta: number) => setDoseUnits(d => Math.min(200, Math.max(0, Math.round(d * 10) + delta)) / 10);
              const stepBtn: React.CSSProperties = { width: 34, height: 26, borderRadius: 9, background: "#F0EDE6", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
              return (
                <div style={{ padding: "14px 16px", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}`, marginBottom: 12 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: TXT, fontFamily: FF, marginBottom: 10 }}>Dose</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <button onClick={() => adjustWhole(1)} style={stepBtn}><ChevronUp size={15} color={TXT} strokeWidth={2.4} /></button>
                      <div style={{ fontSize: 28, fontWeight: 900, color: ROSE, fontFamily: FF, width: 38, textAlign: "center" as const }}>{whole}</div>
                      <button onClick={() => adjustWhole(-1)} style={stepBtn}><ChevronDown size={15} color={TXT} strokeWidth={2.4} /></button>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: ROSE, fontFamily: FF }}>.</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <button onClick={() => adjustTenths(1)} style={stepBtn}><ChevronUp size={15} color={TXT} strokeWidth={2.4} /></button>
                      <div style={{ fontSize: 28, fontWeight: 900, color: ROSE, fontFamily: FF, width: 30, textAlign: "center" as const }}>{tenths}</div>
                      <button onClick={() => adjustTenths(-1)} style={stepBtn}><ChevronDown size={15} color={TXT} strokeWidth={2.4} /></button>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: MUTED, fontFamily: FF, marginLeft: 4 }}>units</span>
                  </div>
                </div>
              );
            })()}

            {sel.includes("Ate") && (
              <button onClick={() => setPhotoMode(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 18, background: "#FFF8EE", border: "1.5px solid rgba(196,145,122,0.30)", cursor: "pointer", marginBottom: 12, textAlign: "left" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: ROSE + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Camera size={19} color={ROSE} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: TXT, fontFamily: FF }}>Scan food with camera</div>
                  <div style={{ fontSize: 11.5, color: MUTED }}>Auto-estimates carbs from a photo</div>
                </div>
              </button>
            )}
            {carbEst !== null && sel.includes("Ate") && (
              <div style={{ padding: "10px 14px", borderRadius: 12, background: "#F0D08044", border: "1.5px solid rgba(184,160,80,0.35)", marginBottom: 12, fontSize: 12.5, color: TXT, fontFamily: FF, fontWeight: 700 }}>
                Estimated ~{carbEst}g carbs from your photo
              </div>
            )}
            {sel.includes("Site Change") && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 14, background: "#EEF4EA", border: `1.5px solid ${SAGE}44`, marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: SAGE + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><RefreshCw size={16} color={SAGE} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: TXT, fontFamily: FF }}>
                    Marked for {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2, lineHeight: 1.5 }}>
                    {lastSiteChange !== null
                      ? `Last changed ${daysSinceSiteChange === 0 ? "today" : `${daysSinceSiteChange} day${daysSinceSiteChange === 1 ? "" : "s"} ago`}. We'll gently remind you again after ${SITE_CHANGE_REMINDER_DAYS} days.`
                      : `We'll gently remind you again after ${SITE_CHANGE_REMINDER_DAYS} days.`}
                  </div>
                </div>
              </div>
            )}

            {sel.filter(tag => tag !== "Site Change").length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {sel.filter(tag => tag !== "Site Change").map(tag => (
                  <div key={tag} style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, alignItems: "center" }}>
                    {sel.length > 1 && <span style={{ fontSize: 10.5, fontWeight: 800, color: MUTED, fontFamily: FF, width: "100%" }}>{tag}</span>}
                    {QUICK_LOG_PICKS[tag].map(label => {
                      const on = note.split(",").map(s => s.trim()).includes(label);
                      return (
                        <button key={label} onClick={() => togglePick(label)} style={{ padding: "8px 13px", borderRadius: 20, background: on ? TXT : "#FBF6EC", border: `1.5px solid ${on ? TXT : BORDER}`, cursor: "pointer" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: on ? "#fff" : TXT, fontFamily: FF, whiteSpace: "nowrap" as const }}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: MUTED, display: "block", marginBottom: 8, fontFamily: FF }}>Note (optional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={"Tap a chip above, or write your own…"} rows={3} style={{ width: "100%", boxSizing: "border-box" as const, padding: "13px 16px", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none", resize: "none" as const, lineHeight: 1.55 }} />
          </div>
          <div style={{ padding: "12px 20px 44px", display: "flex", gap: 12 }}>
            <button onClick={onBack} style={{ flex: 1, padding: "14px 0", borderRadius: 16, background: CARD, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontWeight: 800, fontSize: 15, color: TXT, cursor: "pointer" }}>Skip</button>
            <button onClick={handleSave} disabled={sel.length === 0} style={{ flex: 1, padding: "14px 0", borderRadius: 16, background: sel.length > 0 ? ROSE : "#D8D4CC", border: "none", fontFamily: FF, fontWeight: 800, fontSize: 15, color: "#fff", cursor: sel.length > 0 ? "pointer" : "default" }}>Save</button>
          </div>
        </>
    </div>
  );
}

// ── Companion Space ────────────────────────────────────────────────────
function CompanionSpaceScreen({ pet, petName, onBack, onChat, onFriendChat }: { pet: Pet; petName: string; onBack: () => void; onChat: () => void; onFriendChat: (id: number) => void }) {
  void onChat;
  const [tab, setTab]             = useState<"friends" | "global">("friends");
  const [reactions, setReactions] = useState<Record<number, string | null>>({});
  const [showSafety, setShowSafety] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [draft, setDraft]         = useState("");
  const [myPosts, setMyPosts]     = useState<{ id: number; region: string; pet: string; text: string }[]>([]);
  const TAGS = ["low days", "food ideas", "exercise", "just venting", "new to CGM"];
  const REACTIONS = ["I relate", "Sending support", "Same here"];
  const allPosts = [...myPosts, ...GLOBAL_POSTS];

  const submitPost = () => {
    const txt = draft.trim();
    if (!txt) return;
    setMyPosts(p => [{ id: Date.now(), region: "You", pet: pet.image, text: txt }, ...p]);
    setDraft("");
    setComposeOpen(false);
    setTab("global");
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <SHeader title="Community" onBack={onBack} />

      <div style={{ padding: "0 16px 10px" }}>
        {/* Share-a-moment prompt */}
        <div style={{ position: "relative", background: CARD, borderRadius: 18, padding: "14px 16px", border: `1.5px solid ${BORDER}`, marginBottom: 12, boxShadow: "0 3px 12px rgba(61,43,31,0.06)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -14, right: -10, width: 62, height: 60, opacity: 0.9, pointerEvents: "none" }}>
            <ImageWithFallback src={communityBubbles} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: TXT, fontFamily: FF, marginBottom: 8, maxWidth: "78%" }}>How are you feeling today?</div>
          <button onClick={() => setComposeOpen(true)} style={{ width: "100%", padding: "10px 0", borderRadius: 14, background: ROSE, border: "none", cursor: "pointer", fontFamily: FF, fontWeight: 800, fontSize: 13, color: "#fff" }}>
            Share a small update
          </button>
        </div>

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
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 6px", lineHeight: 1.55 }}>{"A quiet, anonymous space to share small moments with others."}</p>
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

            {/* Gentle reminder card */}
            <div style={{ background: SAGE + "1A", borderRadius: 16, padding: "12px 16px", border: `1.5px solid ${SAGE}33` }}>
              <p style={{ fontSize: 12, color: TXT, fontFamily: FF, lineHeight: 1.5, margin: 0 }}>Everyone here is figuring things out too. Be gentle with each other.</p>
            </div>

            {/* Topic tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TAGS.map(tag => (
                <span key={tag} style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, background: CARD, border: `1.5px solid ${BORDER}`, borderRadius: 999, padding: "6px 13px" }}>#{tag}</span>
              ))}
            </div>

            {allPosts.map(post => (
              <div key={post.id} style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1.5px solid ${post.region === "You" ? ROSE + "55" : BORDER}` }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EDE8DE", overflow: "hidden", flexShrink: 0 }}>
                    <ImageWithFallback src={post.pet} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: TXT, fontFamily: FF }}>{post.region}</span>
                </div>
                <p style={{ fontSize: 14, color: TXT, lineHeight: 1.6, margin: "0 0 12px" }}>{post.text}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {REACTIONS.map(r => {
                    const picked = reactions[post.id] === r;
                    return (
                      <button key={r} onClick={() => setReactions(s => ({ ...s, [post.id]: picked ? null : r }))} style={{ padding: "6px 12px", borderRadius: 12, background: picked ? SAGE + "33" : "#EDE8DE", border: `1.5px solid ${picked ? SAGE : "transparent"}`, cursor: "pointer", fontFamily: FF, fontSize: 11.5, fontWeight: 700, color: picked ? SAGE : MUTED, transition: "all 0.15s" }}>
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Community safety entry point */}
            <button onClick={() => setShowSafety(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "6px 2px", fontFamily: FF }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: MUTED, textDecoration: "underline" }}>Community guidelines & safety</span>
            </button>
            {showSafety && (
              <div style={{ background: "#EDE8DE", borderRadius: 14, padding: "12px 16px" }}>
                <p style={{ fontSize: 12, color: MUTED, fontFamily: FF, lineHeight: 1.6, margin: 0 }}>
                  This space is anonymous and for support, not diagnosis. Please don't share identifying details, and reach out to a clinician for medical decisions. You can report or block anything that feels unsafe.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compose a moment — mirrors the familiar "new post" pattern from other apps */}
      {composeOpen && (
        <div style={{ position: "absolute", inset: 0, zIndex: 250, background: "rgba(61,43,31,0.45)", display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: CARD, borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 40px rgba(0,0,0,0.22)", padding: "20px 22px 30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#EDE8DE", overflow: "hidden", flexShrink: 0 }}>
                  <ImageWithFallback src={pet.image} alt={petName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 900, color: TXT, fontFamily: FF }}>Share a small update</span>
              </div>
              <button onClick={() => setComposeOpen(false)} style={{ background: "#EDE8DE", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={15} color={MUTED} /></button>
            </div>
            <textarea
              autoFocus
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="How are you feeling today? Anonymous to everyone but you."
              style={{ width: "100%", minHeight: 90, boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "#EDE8DE", border: `1.5px solid ${BORDER}`, fontFamily: FF, fontSize: 14, color: TXT, outline: "none", resize: "none" }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 12 }}>
              {TAGS.map(tag => (
                <button key={tag} onClick={() => setDraft(d => d ? `${d} #${tag}` : `#${tag}`)} style={{ fontSize: 11, fontWeight: 700, color: MUTED, background: "#EDE8DE", border: `1.5px solid ${BORDER}`, borderRadius: 999, padding: "5px 11px", cursor: "pointer", fontFamily: FF }}>#{tag}</button>
              ))}
            </div>
            <button onClick={submitPost} disabled={!draft.trim()} style={{ width: "100%", marginTop: 16, padding: "13px 0", borderRadius: 14, background: draft.trim() ? ROSE : "#EDE8DE", border: "none", cursor: draft.trim() ? "pointer" : "default", fontFamily: FF, fontWeight: 800, fontSize: 14, color: draft.trim() ? "#fff" : MUTED }}>
              Post to Global
            </button>
          </div>
        </div>
      )}
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
    "Your glucose has been steady — great chatting conditions.",
    "Remember to log your next meal when you're done here.",
    "You've been in range for 4 hours — keep it up!",
    "Tap me if you want to talk later.",
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
      const replies = ["That's so relatable!", "Yeah, totally!", "Haha right?? Same here!", "Let me know how it goes!", "Sounds good! Talk soon."];
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

// ── Pet Bag ────────────────────────────────────────────────────────────
function PetBagScreen({ ownedClothing, ownedFurniture, onBack }: { ownedClothing: number[]; ownedFurniture: number[]; onBack: () => void }) {
  const clothingItems  = ownedClothing.map(i => CLOTHING_ITEMS[i]);
  const furnitureItems = ownedFurniture.map(i => STORE_ITEMS[i]);

  const Section = ({ title, items }: { title: string; items: { img: string; name: string }[] }) => (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em", color: MUTED, marginBottom: 10 }}>{title}</div>
      {items.length === 0 ? (
        <div style={{ background: CARD, borderRadius: 16, padding: "16px", border: `1.5px solid ${BORDER}`, fontSize: 12.5, color: MUTED, fontFamily: FF, lineHeight: 1.5 }}>
          Nothing here yet — visit the Store to spend stamps on something for your companion.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 16, border: `1.5px solid ${BORDER}`, padding: "12px 6px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ width: 48, height: 48 }}><ImageWithFallback src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <span style={{ fontSize: 10, fontWeight: 800, color: TXT, textAlign: "center" as const, lineHeight: 1.2, fontFamily: FF }}>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <SHeader title="Pet Bag" onBack={onBack} right={<div style={{ width: 22, height: 22 }}><ImageWithFallback src={clothingBackpack} alt="Pet Bag" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>} />
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 36px", scrollbarWidth: "none" as const }}>
        <Section title={`Clothing (${clothingItems.length})`} items={clothingItems} />
        <Section title={`Furniture (${furnitureItems.length})`} items={furnitureItems} />
      </div>
    </div>
  );
}

// ── Rewards ────────────────────────────────────────────────────────────
// ── Settings ───────────────────────────────────────────────────────────
function SettingsScreen({ petName, userName, onBack, onReset }: { petName: string; userName: string; onBack: () => void; onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const rows = [
    { label: "Account",          value: userName },
    { label: "Companion name",   value: petName },
    { label: "CGM device",       value: "Not paired" },
    { label: "Notifications",    value: "On" },
    { label: "Units",            value: "mmol/L" },
  ];
  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <SHeader title="Settings" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 36px", display: "flex", flexDirection: "column", gap: 12, scrollbarWidth: "none" as const }}>
        <div style={{ background: CARD, borderRadius: 18, border: `1.5px solid ${BORDER}`, overflow: "hidden" }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: FF }}>{r.label}</span>
              <span style={{ fontSize: 13, color: MUTED, fontFamily: FF }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#FFF8EC", borderRadius: 14, padding: "12px 16px", border: "1.5px solid #E8C87A44" }}>
          <p style={{ fontSize: 12, color: "#7A6030", fontFamily: FF, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            More settings — like editing your name, switching CGM devices, or notification preferences — are on the way.
          </p>
        </div>

        <div style={{ background: CARD, borderRadius: 18, border: `1.5px solid ${BORDER}`, padding: "16px 18px", marginTop: 8 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: TXT, fontFamily: FF, marginBottom: 4 }}>Demo data</div>
          <p style={{ fontSize: 11.5, color: MUTED, fontFamily: FF, margin: "0 0 12px", lineHeight: 1.5 }}>
            This is a prototype — no real data is stored anywhere but this device. Resetting clears saved logs, your stamp count, wardrobe choice, and unlocked postcards.
          </p>
          {confirming ? (
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirming(false)} style={{ flex: 1, padding: "11px 0", borderRadius: 14, background: BG, border: `1.5px solid ${BORDER}`, fontFamily: FF, fontWeight: 800, fontSize: 13, color: TXT, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { onReset(); setConfirming(false); }} style={{ flex: 1, padding: "11px 0", borderRadius: 14, background: "#C4917A", border: "none", fontFamily: FF, fontWeight: 800, fontSize: 13, color: "#fff", cursor: "pointer" }}>Confirm reset</button>
            </div>
          ) : (
            <button onClick={() => setConfirming(true)} style={{ width: "100%", padding: "12px 0", borderRadius: 14, background: "none", border: `1.5px solid ${ROSE}`, fontFamily: FF, fontWeight: 800, fontSize: 13, color: ROSE, cursor: "pointer" }}>Reset demo data</button>
          )}
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
  const [bedroomOrigin, setBedroomOrigin] = useState<Screen>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pet, setPet]           = useState<Pet>(PETS[0]);
  const [petName, setPetName]   = useState("your companion");
  const [userName, setUserName] = useState("friend");
  const [stamps, setStamps]     = useState<number>(() => loadLS(LS_KEYS.stamps, DEFAULT_STAMPS));
  const [toast, setToast]       = useState({ visible: false, msg: "" });
  const [friendId, setFriendId] = useState(1);
  const [numbersVisible, setNumbersVisible] = useState<boolean>(() => loadLS(LS_KEYS.numbers, true));
  const [unlockedIds, setUnlockedIds] = useState<number[]>(() => loadLS(LS_KEYS.regions, DEFAULT_UNLOCKED_REGIONS));
  const [pendingChatPrompt, setPendingChatPrompt] = useState<string | null>(null);
  const [ownedClothing, setOwnedClothing]   = useState<number[]>(() => loadLS(LS_KEYS.ownedClothing, DEFAULT_OWNED_CLOTHING));
  const [ownedFurniture, setOwnedFurniture] = useState<number[]>(() => loadLS(LS_KEYS.ownedFurniture, []));
  const [equippedClothing, setEquippedClothing] = useState<number | null>(() => loadLS<number | null>(LS_KEYS.wardrobe, null));

  useEffect(() => { saveLS(LS_KEYS.stamps, stamps); }, [stamps]);
  useEffect(() => { saveLS(LS_KEYS.numbers, numbersVisible); }, [numbersVisible]);
  useEffect(() => { saveLS(LS_KEYS.regions, unlockedIds); }, [unlockedIds]);
  useEffect(() => { saveLS(LS_KEYS.ownedClothing, ownedClothing); }, [ownedClothing]);
  useEffect(() => { saveLS(LS_KEYS.ownedFurniture, ownedFurniture); }, [ownedFurniture]);
  useEffect(() => { saveLS(LS_KEYS.wardrobe, equippedClothing); }, [equippedClothing]);

  const go        = (s: Screen) => {
    if (s === "bedroom-detail" && screen !== "wardrobe" && screen !== "journal" && screen !== "chat") {
      setBedroomOrigin(screen);
    }
    setPrev(screen); setMenuOpen(false); setScreen(s);
  };
  const showToast = (msg: string) => { setToast({ visible: true, msg }); setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600); };
  const addStamp  = (msg: string) => { setStamps(n => n + 1); showToast(msg); };
  const handleQuickLogSaved = () => { addStamp("Saved gently. +1 stamp."); go("home"); };
  const handleSendTrip = (): string | null => {
    const next = MAP_REGIONS.filter(r => !unlockedIds.includes(r.id)).sort((a, b) => a.id - b.id)[0];
    if (!next) return null;
    setUnlockedIds(ids => [...ids, next.id]);
    return next.name;
  };
  const handleAskCompanion = () => { setPendingChatPrompt("Explain my recent trend"); go("chat"); };
  const handleBuyClothing = (i: number) => {
    const item = CLOTHING_ITEMS[i];
    if (ownedClothing.includes(i) || stamps < item.cost) return;
    setStamps(s => s - item.cost);
    setOwnedClothing(o => [...o, i]);
    showToast(`${item.name} added to your pet bag`);
  };
  const handleBuyFurniture = (i: number) => {
    const item = STORE_ITEMS[i];
    if (ownedFurniture.includes(i) || stamps < item.cost) return;
    setStamps(s => s - item.cost);
    setOwnedFurniture(o => [...o, i]);
    showToast(`${item.name} added to your pet bag`);
  };
  const handleResetDemo = () => {
    setStamps(DEFAULT_STAMPS);
    setUnlockedIds(DEFAULT_UNLOCKED_REGIONS);
    setOwnedClothing(DEFAULT_OWNED_CLOTHING);
    setOwnedFurniture([]);
    setEquippedClothing(null);
    localStorage.removeItem(LS_KEYS.quickLogs);
    localStorage.removeItem(LS_KEYS.siteChange);
    localStorage.removeItem(LS_KEYS.chatHistory);
    ["tend_hint_kitchen_v4", "tend_hint_gym_v4", "tend_hint_bedroom_v4", "tend_hint_kitchen_v5", "tend_hint_gym_v5", "tend_hint_bedroom_v5", "tend_hint_kitchen_v6", "tend_hint_gym_v6", "tend_hint_bedroom_v6"].forEach(k => localStorage.removeItem(k));
    showToast("Demo data reset");
  };

  return (
    <PhoneShell>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={go} pet={pet} />
      <Toast visible={toast.visible} msg={toast.msg} />

      {screen === "welcome"         && <WelcomeScreen onNext={() => go("pet-select")} />}
      {screen === "pet-select"      && <PetSelectScreen onNext={(p, pn, un) => { setPet(p); setPetName(pn); setUserName(un); go("cgm-pair"); }} />}
      {screen === "cgm-pair"        && <CGMPairScreen onNext={() => go("home")} />}
      {screen === "home"            && <HomeScreen pet={pet} petName={petName} stamps={stamps} numbersVisible={numbersVisible} equippedClothing={equippedClothing} onMenu={() => setMenuOpen(true)} onTrend={() => go("trend")} onLog={() => go("log")} onChat={() => go("chat")} onKitchen={() => go("kitchen-detail")} onBedroom={() => go("bedroom-detail")} />}
      {screen === "kitchen-detail"  && <KitchenDetailScreen pet={pet} petName={petName} equippedClothing={equippedClothing} onBack={() => go("home")} onFoodLog={() => go("food-log")} onActivity={() => go("activity")} onChat={() => go("chat")} />}
      {screen === "gym-detail"      && <GymDetailScreen pet={pet} petName={petName} equippedClothing={equippedClothing} onBack={() => go("home")} onActivity={() => go("activity")} onChat={() => go("chat")} />}
      {screen === "food-log"        && <FoodLogScreen onBack={() => go("kitchen-detail")} onSave={() => { addStamp("+1 stamp · meal logged"); go("kitchen-detail"); }} />}
      {screen === "bedroom-detail"  && <BedroomDetailScreen pet={pet} petName={petName} equippedClothing={equippedClothing} onBack={() => go(bedroomOrigin)} onWardrobe={() => go("wardrobe")} onPostcards={() => go("postcards")} onJournal={() => go("journal")} onChat={() => go("chat")} />}
      {screen === "wardrobe"        && <WardrobeScreen pet={pet} stamps={stamps} ownedClothing={ownedClothing} equipped={equippedClothing} onEquip={setEquippedClothing} onBack={() => go("bedroom-detail")} onStore={() => go("store")} />}
      {screen === "store"           && <StoreScreen stamps={stamps} ownedClothing={ownedClothing} ownedFurniture={ownedFurniture} onBuyClothing={handleBuyClothing} onBuyFurniture={handleBuyFurniture} onBack={() => go("home")} />}
      {screen === "pet-bag"         && <PetBagScreen ownedClothing={ownedClothing} ownedFurniture={ownedFurniture} onBack={() => go("home")} />}
      {screen === "activity"        && <ActivityScreen onBack={() => go(prev === "kitchen-detail" ? "kitchen-detail" : prev === "gym-detail" ? "gym-detail" : "home")} />}
      {screen === "postcards"       && <PostcardsScreen stamps={stamps} pet={pet} petName={petName} unlockedIds={unlockedIds} onSendTrip={handleSendTrip} onBack={() => go("home")} />}
      {screen === "journal"         && <JournalScreen pet={pet} petName={petName} onBack={() => go("bedroom-detail")} />}
      {screen === "chat"            && <ChatScreen pet={pet} petName={petName} userName={userName} onBack={() => go(prev)} initialPrompt={pendingChatPrompt} onConsumeInitialPrompt={() => setPendingChatPrompt(null)} />}
      {screen === "trend"           && <TrendScreen numbersVisible={numbersVisible} onToggleNumbers={setNumbersVisible} onBack={() => go("home")} onAskCompanion={handleAskCompanion} />}
      {screen === "log"             && <LogScreen onBack={() => go("home")} onSaved={handleQuickLogSaved} />}
      {screen === "companion-space" && <CompanionSpaceScreen pet={pet} petName={petName} onBack={() => go("home")} onChat={() => go("chat")} onFriendChat={id => { setFriendId(id); go("friend-chat"); }} />}
      {screen === "friend-chat"     && <FriendChatScreen friendId={friendId} pet={pet} onBack={() => go("companion-space")} />}
      {screen === "settings"        && <SettingsScreen petName={petName} userName={userName} onBack={() => go("home")} onReset={handleResetDemo} />}
    </PhoneShell>
  );
}
