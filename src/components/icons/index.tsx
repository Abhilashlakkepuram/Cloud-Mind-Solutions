import { createIcon } from "./Icon";

export { Icon, createIcon } from "./Icon";
export type { IconName, IconProps } from "./Icon";
export { icons } from "./registry";

/**
 * Named icons used across the site.
 *
 * These are Lucide glyphs from ./registry, normalised to 24px / 1.5 stroke.
 * The names below are kept stable so call sites read semantically rather than
 * by glyph — swapping which Lucide icon backs a name is a one-line change here
 * and needs no edits elsewhere.
 */

/* --- Service practices -------------------------------------------------- */
export const IconAI = createIcon("brain-circuit");
export const IconCloud = createIcon("cloud-cog");
export const IconShield = createIcon("shield-check");
export const IconCode = createIcon("code-xml");
export const IconPulse = createIcon("server-cog");

/* --- Sectors ------------------------------------------------------------ */
export const IconHealthcare = createIcon("stethoscope");
export const IconFinance = createIcon("landmark");
export const IconLegal = createIcon("gavel");
export const IconRetail = createIcon("shopping-cart");
export const IconManufacturing = createIcon("factory");

/* --- Navigation & controls ---------------------------------------------- */
export const IconArrowRight = createIcon("arrow-right");
export const IconArrowLeft = createIcon("arrow-left");
export const IconArrowUpRight = createIcon("external-link");
export const IconChevronDown = createIcon("chevron-down");
export const IconPlus = createIcon("plus");
export const IconMinus = createIcon("minus");
export const IconMenu = createIcon("menu");
export const IconClose = createIcon("x");
export const IconSearch = createIcon("search");
export const IconFilter = createIcon("filter");

/* --- Status ------------------------------------------------------------- */
export const IconCheck = createIcon("check");
export const IconCheckCircle = createIcon("circle-check");
export const IconCross = createIcon("circle-x");
export const IconAlert = createIcon("circle-alert");
export const IconHelp = createIcon("circle-help");

/**
 * The bullet used throughout body lists. `check` reads as "we do this", which
 * is what nearly every list on the site is asserting.
 */
export const IconNodePath = createIcon("check");
/** Neutral bullet for lists that describe rather than affirm. */
export const IconBullet = createIcon("circle-minus");

/* --- Contact ------------------------------------------------------------ */
export const IconPin = createIcon("map-pin");
export const IconMail = createIcon("mail");
export const IconPhone = createIcon("phone");
export const IconClock = createIcon("clock");
export const IconCalendar = createIcon("calendar-check");
export const IconMessage = createIcon("message-square-text");

/* --- Process, delivery & proof ------------------------------------------ */
export const IconSearchCheck = createIcon("search-check");
export const IconRoute = createIcon("route");
export const IconWorkflow = createIcon("workflow");
export const IconRepeat = createIcon("repeat");
export const IconGauge = createIcon("gauge");
export const IconRadar = createIcon("radar");
export const IconSiren = createIcon("siren");
export const IconFileCheck = createIcon("file-check");
export const IconFileText = createIcon("file-text");
export const IconClipboardList = createIcon("clipboard-list");
export const IconScrollText = createIcon("scroll-text");
export const IconFolderGit = createIcon("folder-git-2");
export const IconHandshake = createIcon("handshake");
export const IconScale = createIcon("scale");
export const IconUsers = createIcon("users-round");
export const IconUser = createIcon("user-round");
export const IconBriefcase = createIcon("briefcase");
export const IconGraduation = createIcon("graduation-cap");
export const IconHeartPulse = createIcon("heart-pulse");
export const IconLaptop = createIcon("laptop");
export const IconHeadset = createIcon("headset");
export const IconServer = createIcon("server");
export const IconNetwork = createIcon("network");
export const IconDatabaseBackup = createIcon("database-backup");
export const IconFlask = createIcon("flask-conical");
export const IconTestTube = createIcon("test-tube-diagonal");
export const IconSparkles = createIcon("sparkles");
export const IconRocket = createIcon("rocket");
export const IconTrendingDown = createIcon("trending-down");
export const IconChartLine = createIcon("chart-line");
export const IconBadgeDollar = createIcon("badge-dollar-sign");
export const IconFingerprint = createIcon("fingerprint");
export const IconScanEye = createIcon("scan-eye");
export const IconBug = createIcon("bug");
export const IconTerminal = createIcon("square-terminal");
export const IconLifeBuoy = createIcon("life-buoy");
export const IconQuote = createIcon("quote");
export const IconBookOpen = createIcon("book-open");
export const IconTag = createIcon("tag");
export const IconPenLine = createIcon("pen-line");
export const IconMegaphone = createIcon("megaphone");
export const IconSignpost = createIcon("signpost");
export const IconWrench = createIcon("wrench");
export const IconRefresh = createIcon("refresh-cw");

/** Practice slug → icon, used by the nav, service cards and hub. */
export const serviceIcons = {
  "ai-consulting": IconAI,
  "cloud-infrastructure": IconCloud,
  cybersecurity: IconShield,
  "software-consulting": IconCode,
  "managed-it": IconPulse,
} as const;

/** Sector slug → icon, used on /industries and the home teaser. */
export const industryIcons = {
  healthcare: IconHealthcare,
  finance: IconFinance,
  legal: IconLegal,
  retail: IconRetail,
  manufacturing: IconManufacturing,
} as const;
