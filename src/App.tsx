import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import tarLogo from "@/imports/TAR_Logo.jpg";

/* ─── CONSTANTS ─────────────────────────────────────────────────────────── */

const C = {
  bg: "#06101E",
  surface: "#0D1A2D",
  border: "#1A2D45",
  teal: "#3D8A8F",
  bright: "#4AABAF",
  text: "#DCE8F2",
  muted: "#6B85A0",
  silver: "#8BA5C0",
};

const FONT = {
  serif: "'Fraunces', serif",
  sans: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const TICKER = [
  { label: "S&P 500",    value: "5,892.47",  change: "+0.43%",  up: true  },
  { label: "NASDAQ",     value: "18,742.13", change: "+0.67%",  up: true  },
  { label: "DOW JONES",  value: "43,521.08", change: "−0.12%",  up: false },
  { label: "10Y YIELD",  value: "4.28%",     change: "+0.03",   up: true  },
  { label: "WTI CRUDE",  value: "$78.24",    change: "−1.23%",  up: false },
  { label: "GOLD",       value: "$2,641",    change: "+0.81%",  up: true  },
  { label: "BTC/USD",    value: "$64,821",   change: "+2.14%",  up: true  },
  { label: "EUR/USD",    value: "1.0842",    change: "−0.09%",  up: false },
  { label: "VIX",        value: "14.82",     change: "−3.21%",  up: false },
  { label: "FED RATE",   value: "4.50%",     change: "0.00",    up: true  },
  { label: "SILVER",     value: "$31.48",    change: "+1.12%",  up: true  },
  { label: "GDP Q2",     value: "2.8%",      change: "+0.2pp",  up: true  },
];

const MARKET_DATA = [
  { month: "Mar", sp500: 5234, nasdaq: 17432 },
  { month: "Apr", sp500: 5035, nasdaq: 15643 },
  { month: "May", sp500: 5308, nasdaq: 16812 },
  { month: "Jun", sp500: 5460, nasdaq: 17314 },
  { month: "Jul", sp500: 5522, nasdaq: 17780 },
  { month: "Aug", sp500: 5648, nasdaq: 18124 },
  { month: "Sep", sp500: 5892, nasdaq: 18742 },
];

const SECTOR_DATA = [
  { sector: "Tech",      ytd: 28.4 },
  { sector: "Finance",   ytd: 18.7 },
  { sector: "Consumer",  ytd: 14.2 },
  { sector: "Health",    ytd: 9.3  },
  { sector: "Energy",    ytd: 12.1 },
  { sector: "Realty",    ytd: 6.8  },
  { sector: "Utilities", ytd: -2.4 },
];

const INFLATION_DATA = [
  { month: "Oct '25", cpi: 2.9, core: 3.2 },
  { month: "Dec '25", cpi: 2.5, core: 2.9 },
  { month: "Feb '26", cpi: 2.6, core: 2.8 },
  { month: "Apr '26", cpi: 2.3, core: 2.6 },
  { month: "Jun '26", cpi: 2.2, core: 2.5 },
  { month: "Aug '26", cpi: 2.3, core: 2.5 },
  { month: "Sep '26", cpi: 2.1, core: 2.3 },
];

const KEY_STATS = [
  { label: "GDP Growth",    value: "2.8%",  sub: "Q2 2026 Ann.",   up: true  },
  { label: "CPI Inflation", value: "2.1%",  sub: "Y/Y Aug 2026",   up: false },
  { label: "Unemployment",  value: "3.9%",  sub: "Aug 2026",        up: false },
  { label: "Fed Funds Rate",value: "4.50%", sub: "Target Range",    up: false },
  { label: "10-Yr Yield",   value: "4.28%", sub: "US Treasury",     up: true  },
];

const FEATURED = {
  category: "MACRO ANALYSIS",
  headline: "Federal Reserve's Pivot Strategy Is Reshaping the Global Capital Landscape",
  excerpt:
    "As the Fed signals an end to its most aggressive tightening cycle in four decades, institutional capital flows are repositioning across asset classes at a pace not seen since the post-GFC recovery. Our analysis dissects the second-order effects on emerging markets, sovereign debt pricing, and corporate credit spreads.",
  author: "Dr. Sarah Okonkwo",
  role: "Chief Economist",
  date: "September 1, 2026",
  readTime: "12 min read",
  tags: ["Monetary Policy", "Capital Markets", "Fed"],
};

const BRIEFING = [
  {
    category: "TECHNOLOGY",
    headline: "AI Semiconductor Demand Triggers a $400B Supply Chain Realignment",
    date: "Sep 1, 2026",
    readTime: "8 min",
  },
  {
    category: "GEOPOLITICS",
    headline: "Middle East Energy Corridors and Their Pricing Power in 2026",
    date: "Aug 31, 2026",
    readTime: "10 min",
  },
  {
    category: "MARKETS",
    headline: "Yield Curve Normalization: What Bond Markets Are Telling Us",
    date: "Aug 31, 2026",
    readTime: "6 min",
  },
];

const REPORTS = [
  {
    category: "ECONOMY",
    headline: "The Hidden Cost of Dollar Strength on Emerging Market Debt",
    excerpt:
      "A strong USD continues to pressure EM sovereign borrowers with dollar-denominated obligations, creating a cascade of refinancing risks across frontier economies.",
    author: "Marcus Osei",
    date: "Aug 30",
    readTime: "9 min",
  },
  {
    category: "TECHNOLOGY",
    headline: "Quantum Computing's $1.2T Enterprise Impact by 2032",
    excerpt:
      "Beyond the hype, our structural analysis maps concrete timelines for quantum advantage across financial modeling, drug discovery, and logistics optimization.",
    author: "Priya Nair",
    date: "Aug 29",
    readTime: "14 min",
  },
  {
    category: "ENERGY",
    headline: "The Second Wave of Energy Transition: Where Capital Is Actually Going",
    excerpt:
      "Grid infrastructure, not solar panels, now commands the largest share of clean energy investment — a fundamental shift with far-reaching implications for utilities.",
    author: "Elena Hartmann",
    date: "Aug 28",
    readTime: "11 min",
  },
  {
    category: "MARKETS",
    headline: "Private Credit's $2T Expansion and the Systemic Questions Nobody Is Answering",
    excerpt:
      "The rapid institutionalization of private credit markets has outpaced regulatory frameworks, creating opacity that systemic risk analysts are only beginning to map.",
    author: "James Okafor",
    date: "Aug 27",
    readTime: "13 min",
  },
  {
    category: "GEOPOLITICS",
    headline: "Post-WTO Trade Architectures: Regional Blocs and Their Economic Weight",
    excerpt:
      "With multilateral trade rules under sustained pressure, bilateral and regional agreements are rewriting the geometry of global commerce and supply-chain strategy.",
    author: "Ama Boateng",
    date: "Aug 26",
    readTime: "10 min",
  },
  {
    category: "RESEARCH",
    headline: "Behavioral Finance in the Age of Algorithmic Markets",
    excerpt:
      "Traditional behavioral finance models struggle to account for feedback loops created by algorithmic trading at scale. A new generation of frameworks is emerging.",
    author: "Dr. Kofi Mensah",
    date: "Aug 25",
    readTime: "16 min",
  },
];

const CATEGORIES = [
  { name: "Markets",     count: 284 },
  { name: "Economy",     count: 197 },
  { name: "Technology",  count: 163 },
  { name: "Geopolitics", count: 142 },
  { name: "Energy",      count: 98  },
  { name: "Research",    count: 211 },
  { name: "Opinion",     count: 76  },
  { name: "Data",        count: 134 },
];

const CAT_COLOR: Record<string, string> = {
  "MACRO ANALYSIS": "#4AABAF",
  ECONOMY:          "#4AABAF",
  TECHNOLOGY:       "#7B9FBF",
  ENERGY:           "#C4A855",
  MARKETS:          "#6B9FBA",
  GEOPOLITICS:      "#A87BB5",
  RESEARCH:         "#5B9E7B",
  OPINION:          "#BF7E7E",
  DATA:             "#7EABBF",
};

const NAV_LINKS = ["Markets", "Economy", "Technology", "Research", "Data", "Opinion"];

/* ─── SMALL COMPONENTS ──────────────────────────────────────────────────── */

function CatTag({ cat }: { cat: string }) {
  return (
    <span
      className="text-[10px] font-medium tracking-widest uppercase"
      style={{ fontFamily: FONT.mono, color: CAT_COLOR[cat] ?? C.bright }}
    >
      {cat}
    </span>
  );
}

function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="border px-3 py-2 text-[11px]"
      style={{ background: C.surface, borderColor: C.border, fontFamily: FONT.mono }}
    >
      <p className="mb-1" style={{ color: C.muted }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}:{" "}
          {typeof p.value === "number" && p.value > 100
            ? p.value.toLocaleString()
            : `${p.value}${p.dataKey === "cpi" || p.dataKey === "core" ? "%" : ""}`}
        </p>
      ))}
    </div>
  );
}

/* ─── TICKER ────────────────────────────────────────────────────────────── */

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ticker-wrap border-b" style={{ background: C.surface, borderColor: C.border }}>
      <div className="ticker-track py-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 px-5 whitespace-nowrap text-[11px]"
            style={{ fontFamily: FONT.mono }}
          >
            <span style={{ color: C.muted }}>{item.label}</span>
            <span className="font-medium" style={{ color: C.text }}>{item.value}</span>
            <span className={item.up ? "text-emerald-400" : "text-red-400"}>{item.change}</span>
            <span className="ml-3 text-[10px]" style={{ color: C.border }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── NAVIGATION ────────────────────────────────────────────────────────── */

function Nav({ active, setActive }: { active: string; setActive: (v: string) => void }) {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "#06101Ef0", borderColor: C.border, backdropFilter: "blur(16px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2 shrink-0"
            style={{ borderColor: C.teal }}
          >
            <img src={tarLogo} alt="The Analysis Report logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-sm leading-none" style={{ fontFamily: FONT.serif, color: C.text }}>
              The Analysis Report
            </div>
            <div
              className="text-[9px] tracking-widest uppercase mt-0.5"
              style={{ fontFamily: FONT.mono, color: C.bright }}
            >
              where data finds meaning
            </div>
          </div>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className="px-3 py-1.5 text-xs tracking-wide transition-colors"
              style={{
                fontFamily: FONT.sans,
                color: active === link ? C.bright : C.silver,
                borderBottom: `1px solid ${active === link ? C.bright : "transparent"}`,
              }}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="hidden md:flex items-center gap-1.5 text-[10px] tracking-widest uppercase"
            style={{ fontFamily: FONT.mono, color: C.muted }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
          <button
            className="px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase transition-opacity hover:opacity-85"
            style={{ background: C.teal, color: "#fff", fontFamily: FONT.mono }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <>
      {/* Edition bar */}
      <div className="border-b" style={{ borderColor: C.border }}>
        <div
          className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between"
        >
          <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT.mono, color: C.muted }}>
            Monday, September 1, 2026 — Edition No. 847
          </span>
          <span className="hidden sm:block text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
            US Market Session Open
          </span>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 border-b"
        style={{ borderColor: C.border }}
      >
        {/* Featured */}
        <div
          className="lg:col-span-3 py-10 lg:pr-8 lg:border-r"
          style={{ borderColor: C.border }}
        >
          <CatTag cat={FEATURED.category} />
          <h1
            className="mt-3 mb-5 leading-tight"
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(1.65rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#F0F5FA",
              lineHeight: 1.18,
            }}
          >
            {FEATURED.headline}
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: C.silver }}>
            {FEATURED.excerpt}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: C.teal, color: "#fff", fontFamily: FONT.serif }}
            >
              SO
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: C.text }}>{FEATURED.author}</div>
              <div className="text-[10px] mt-0.5" style={{ fontFamily: FONT.mono, color: C.muted }}>
                {FEATURED.role} · {FEATURED.date} · {FEATURED.readTime}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {FEATURED.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] tracking-wide border"
                style={{ borderColor: C.border, color: C.muted, fontFamily: FONT.mono }}
              >
                {t}
              </span>
            ))}
          </div>

          <button className="text-sm font-medium transition-all hover:tracking-wide" style={{ color: C.bright }}>
            Read Full Analysis →
          </button>
        </div>

        {/* Briefing sidebar */}
        <div className="lg:col-span-2 py-10 lg:pl-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: C.border }} />
            <span className="text-[10px] tracking-widest uppercase whitespace-nowrap" style={{ fontFamily: FONT.mono, color: C.muted }}>
              Today&apos;s Brief
            </span>
            <div className="h-px flex-1" style={{ background: C.border }} />
          </div>
          <div className="divide-y divide-[#1A2D45]">
            {BRIEFING.map((art, i) => (
              <div key={i} className="py-5 group cursor-pointer">
                <CatTag cat={art.category} />
                <h3
                  className="mt-2 mb-2 text-[15px] font-semibold leading-snug group-hover:text-[#4AABAF] transition-colors"
                  style={{ fontFamily: FONT.serif, color: "#E8F0F8" }}
                >
                  {art.headline}
                </h3>
                <div className="flex items-center gap-2 text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
                  <span>{art.date}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── KEY STATS STRIP ───────────────────────────────────────────────────── */

function StatsStrip() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#1A2D45] border-b"
      style={{ borderColor: C.border }}
    >
      {KEY_STATS.map((s, i) => (
        <div key={i} className="px-4 md:px-5 py-5">
          <div className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT.mono, color: C.muted }}>
            {s.label}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold" style={{ fontFamily: FONT.serif, color: "#F0F5FA" }}>
              {s.value}
            </span>
            <span className={`text-xs mb-0.5 ${s.up ? "text-emerald-400" : "text-red-400"}`}>
              {s.up ? "▲" : "▼"}
            </span>
          </div>
          <div className="text-[10px] mt-0.5" style={{ fontFamily: FONT.mono, color: C.muted }}>
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── REPORTS GRID ──────────────────────────────────────────────────────── */

function ReportsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 mb-14">
      <div
        className="flex items-center justify-between pb-4 mb-0 border-b"
        style={{ borderColor: C.border }}
      >
        <h2 className="text-xl font-bold" style={{ fontFamily: FONT.serif, color: "#F0F5FA" }}>
          Latest Analysis
        </h2>
        <button className="text-xs tracking-widest uppercase" style={{ fontFamily: FONT.mono, color: C.bright }}>
          View All →
        </button>
      </div>

      {/* Gap-px grid trick: grid bg shows through gaps as borders */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border-x border-b"
        style={{ background: C.border, borderColor: C.border }}
      >
        {REPORTS.map((r, i) => (
          <div
            key={i}
            className="p-6 group cursor-pointer transition-colors"
            style={{ background: C.bg }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.surface)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.bg)}
          >
            <CatTag cat={r.category} />
            <h3
              className="mt-2 mb-3 text-base font-semibold leading-snug transition-colors group-hover:text-[#4AABAF]"
              style={{ fontFamily: FONT.serif, color: "#E8F0F8" }}
            >
              {r.headline}
            </h3>
            <p className="text-xs leading-relaxed mb-5" style={{ color: C.muted }}>
              {r.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
                {r.author}
              </span>
              <span className="text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
                {r.date} · {r.readTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── DATA DASHBOARD ────────────────────────────────────────────────────── */

function DataDashboard() {
  return (
    <div
      className="border-y"
      style={{ background: "#080E1C", borderColor: C.border }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b" style={{ borderColor: C.border }}>
          <h2 className="text-xl font-bold" style={{ fontFamily: FONT.serif, color: "#F0F5FA" }}>
            Market Intelligence
          </h2>
          <span
            className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2 py-1 border"
            style={{ fontFamily: FONT.mono, color: C.bright, borderColor: C.teal }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
          <span className="text-[11px] ml-auto" style={{ fontFamily: FONT.mono, color: C.muted }}>
            Last updated: Sep 1, 2026 · 10:42 AM EST
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* Equity trends */}
          <div className="lg:col-span-3 border p-5" style={{ borderColor: C.border, background: C.surface }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-sm font-medium" style={{ color: C.text }}>Equity Market Trends</div>
                <div className="text-[10px] mt-0.5" style={{ fontFamily: FONT.mono, color: C.muted }}>
                  S&P 500 vs NASDAQ — YTD 2026
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px]" style={{ fontFamily: FONT.mono }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 inline-block" style={{ background: C.teal }} />
                  <span style={{ color: C.muted }}>S&P 500</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 inline-block" style={{ background: "#7B9FBF" }} />
                  <span style={{ color: C.muted }}>NASDAQ</span>
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MARKET_DATA} margin={{ top: 4, right: 4, bottom: 0, left: 8 }}>
                <defs>
                  <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="nqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7B9FBF" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#7B9FBF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 6" stroke={C.border} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: C.muted, fontSize: 10, fontFamily: FONT.mono }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: C.muted, fontSize: 10, fontFamily: FONT.mono }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => v.toLocaleString()}
                  domain={["auto", "auto"]}
                />
                <Tooltip content={<ChartTip />} />
                <Area
                  type="monotone"
                  dataKey="sp500"
                  name="S&P 500"
                  stroke={C.teal}
                  strokeWidth={2}
                  fill="url(#spGrad)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="nasdaq"
                  name="NASDAQ"
                  stroke="#7B9FBF"
                  strokeWidth={2}
                  fill="url(#nqGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sector returns */}
          <div className="lg:col-span-2 border p-5" style={{ borderColor: C.border, background: C.surface }}>
            <div className="mb-5">
              <div className="text-sm font-medium" style={{ color: C.text }}>YTD Sector Returns</div>
              <div className="text-[10px] mt-0.5" style={{ fontFamily: FONT.mono, color: C.muted }}>
                % through September 1, 2026
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={SECTOR_DATA}
                layout="vertical"
                margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="2 6" stroke={C.border} horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: C.muted, fontSize: 10, fontFamily: FONT.mono }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="sector"
                  tick={{ fill: C.silver, fontSize: 10, fontFamily: FONT.mono }}
                  axisLine={false}
                  tickLine={false}
                  width={58}
                />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="ytd" name="YTD Return" radius={[0, 2, 2, 0]}>
                  {SECTOR_DATA.map((entry, idx) => (
                    <Cell key={idx} fill={entry.ytd < 0 ? "#BF7E7E" : C.teal} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inflation chart */}
        <div className="border p-5" style={{ borderColor: C.border, background: C.surface }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-sm font-medium" style={{ color: C.text }}>Inflation Trajectory</div>
              <div className="text-[10px] mt-0.5" style={{ fontFamily: FONT.mono, color: C.muted }}>
                CPI vs Core CPI — 12-Month Rolling (%)
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px]" style={{ fontFamily: FONT.mono }}>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 inline-block" style={{ background: C.bright }} />
                <span style={{ color: C.muted }}>CPI</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-px inline-block border-t-2 border-dashed" style={{ borderColor: "#C4A855" }} />
                <span style={{ color: C.muted }}>Core CPI</span>
              </span>
              <span
                className="px-2 py-0.5 text-[9px]"
                style={{ background: C.border, color: C.muted }}
              >
                Fed Target: 2.0%
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={INFLATION_DATA} margin={{ top: 4, right: 4, bottom: 0, left: 8 }}>
              <defs>
                <linearGradient id="cpiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.bright} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={C.bright} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="coreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C4A855" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#C4A855" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 6" stroke={C.border} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: C.muted, fontSize: 10, fontFamily: FONT.mono }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: C.muted, fontSize: 10, fontFamily: FONT.mono }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
                domain={[1.5, 3.5]}
              />
              <Tooltip content={<ChartTip />} />
              <Area
                type="monotone"
                dataKey="cpi"
                name="CPI"
                stroke={C.bright}
                strokeWidth={2}
                fill="url(#cpiGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="core"
                name="Core CPI"
                stroke="#C4A855"
                strokeWidth={2}
                strokeDasharray="5 3"
                fill="url(#coreGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ─── CATEGORIES ────────────────────────────────────────────────────────── */

function CategoryBrowser() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 mb-14">
      <div className="flex items-center justify-between pb-4 mb-0 border-b" style={{ borderColor: C.border }}>
        <h2 className="text-xl font-bold" style={{ fontFamily: FONT.serif, color: "#F0F5FA" }}>
          Browse by Topic
        </h2>
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px border-x border-b"
        style={{ background: C.border, borderColor: C.border }}
      >
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            className="p-5 text-left transition-colors"
            style={{ background: hovered === i ? C.surface : C.bg }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="text-base font-bold mb-1 transition-colors"
              style={{ fontFamily: FONT.serif, color: hovered === i ? C.bright : C.text }}
            >
              {cat.name}
            </div>
            <div className="text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
              {cat.count} reports
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── NEWSLETTER ────────────────────────────────────────────────────────── */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="border-y py-16" style={{ background: C.surface, borderColor: C.border }}>
      <div className="max-w-xl mx-auto px-4 md:px-6 text-center">
        <div
          className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-6 border-2"
          style={{ borderColor: C.teal }}
        >
          <img src={tarLogo} alt="TAR" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: FONT.serif, color: "#F0F5FA" }}>
          Daily Intelligence Brief
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: C.silver }}>
          Every morning at 6AM EST — one essential analysis, three data points, and the macro signal you need. Read by 47,000 professionals.
        </p>

        {done ? (
          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: C.bright, fontFamily: FONT.mono }}>
            <span>✓</span>
            <span>Subscribed. First brief arrives tomorrow at 6AM EST.</span>
          </div>
        ) : (
          <div className="flex max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && email && setDone(true)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm outline-none border-y border-l"
              style={{
                background: C.bg,
                borderColor: C.border,
                color: C.text,
                fontFamily: FONT.mono,
              }}
            />
            <button
              onClick={() => email && setDone(true)}
              className="px-5 py-3 text-[11px] font-medium tracking-widest uppercase transition-opacity hover:opacity-85"
              style={{ background: C.teal, color: "#fff", fontFamily: FONT.mono }}
            >
              Subscribe
            </button>
          </div>
        )}
        <p className="mt-4 text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </div>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────── */

function Footer() {
  const cols = [
    { heading: "Analysis",  links: ["Markets", "Economy", "Technology", "Energy", "Geopolitics"] },
    { heading: "Research",  links: ["Methodology", "Data Sources", "Reports Archive", "White Papers"] },
    { heading: "Company",   links: ["About", "Editorial Standards", "Careers", "Advertise", "Contact"] },
  ];

  return (
    <footer className="border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 shrink-0"
                style={{ borderColor: C.teal }}
              >
                <img src={tarLogo} alt="The Analysis Report" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: FONT.serif, color: C.text }}>
                  The Analysis Report
                </div>
                <div className="text-[9px] tracking-widest uppercase mt-0.5" style={{ fontFamily: FONT.mono, color: C.bright }}>
                  where data finds meaning
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
              Independent analysis at the intersection of economics, markets, and technology. Trusted by analysts, investors, and policymakers since 2019.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <div
                className="text-[10px] tracking-widest uppercase mb-4 font-medium"
                style={{ fontFamily: FONT.mono, color: C.bright }}
              >
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs transition-colors hover:text-[#4AABAF]"
                      style={{ color: C.muted }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: C.border }}>
          <span className="text-[10px]" style={{ fontFamily: FONT.mono, color: C.muted }}>
            © 2026 The Analysis Report. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] transition-colors hover:text-[#4AABAF]"
                style={{ fontFamily: FONT.mono, color: C.muted }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ───────────────────────────────────────────────────────────────── */

export default function App() {
  const [activeNav, setActiveNav] = useState("Markets");

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: FONT.sans }}>
      <Ticker />
      <Nav active={activeNav} setActive={setActiveNav} />
      <Hero />
      <StatsStrip />
      <ReportsGrid />
      <DataDashboard />
      <CategoryBrowser />
      <Newsletter />
      <Footer />
    </div>
  );
}
