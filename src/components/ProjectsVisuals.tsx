import type { ReactNode } from "react";

/**
 * Landscape placeholder mockups for the Projects section, drawn until real
 * screenshots are added (set `image` on the project in the config).
 *
 * All four share one 16:9 stage (1200 × 675) so they scale perfectly with
 * their container and read as one family of product shots. Monochrome only:
 * the single gradient is a barely-there white glow, matching the
 * Experience placeholders.
 */

const w = (o: number) => `rgba(255,255,255,${o})`;

function Stage({ id, children }: { id: string; children: ReactNode }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx="38%" cy="-5%" r="85%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-grid`}
          width="75"
          height="75"
          patternUnits="userSpaceOnUse"
        >
          <path d="M75 0H0V75" fill="none" stroke={w(0.028)} />
        </pattern>
      </defs>
      <rect width="1200" height="675" fill="#0a0a0a" />
      <rect width="1200" height="675" fill={`url(#${id}-grid)`} />
      <rect width="1200" height="675" fill={`url(#${id}-glow)`} />
      {children}
    </>
  );
}

/** Softly rounded panel used by most of the mockups. */
function Panel({
  x,
  y,
  width,
  height,
  r = 20,
  fill = 0.03,
  stroke = 0.09,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  r?: number;
  fill?: number;
  stroke?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={r}
      fill={w(fill)}
      stroke={w(stroke)}
    />
  );
}

/** A line of "text" inside a mockup. */
function Line({
  x,
  y,
  width,
  height = 7,
  opacity = 0.16,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  opacity?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={height / 2}
      fill={w(opacity)}
    />
  );
}

/** ── 01 · RideSync ─────────────────────────────────────────────────────
 * A live group ride: map canvas, one bold route, riders as small avatars,
 * and the two surfaces the app is known for (live panel + ride summary).
 */
export function RideSyncMockup({ label }: { label: string }) {
  const riders = [
    { x: 322, y: 452, initials: "AR", me: false },
    { x: 498, y: 328, initials: "KV", me: true },
    { x: 604, y: 372, initials: "SM", me: false },
    { x: 702, y: 300, initials: "JD", me: false },
  ];

  return (
    <svg
      viewBox="0 0 1200 675"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <Stage id="ridesync">
        {/* City grid: quiet streets under the ride */}
        <g stroke={w(0.055)} strokeWidth="1.5" fill="none">
          <path d="M0 170 C 210 140, 350 300, 590 284 S 940 200, 1200 250" />
          <path d="M0 430 C 250 480, 430 380, 690 436 S 1000 528, 1200 470" />
          <path d="M330 0 C 352 160, 250 300, 372 470 S 430 640, 412 675" />
          <path d="M900 0 C 872 150, 960 270, 918 430 S 860 610, 892 675" />
        </g>

        {/* The ride itself */}
        <path
          d="M322 452 C 372 392, 442 430, 498 328 S 610 326, 702 300"
          fill="none"
          stroke={w(0.85)}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="322" cy="452" r="11" fill="#0a0a0a" stroke={w(0.45)} strokeWidth="2" />
        <circle cx="322" cy="452" r="4" fill={w(0.55)} />
        <circle cx="702" cy="300" r="7" fill="#fff" />

        {/* Riders */}
        {riders.map((r) => (
          <g key={r.initials}>
            <circle
              cx={r.x}
              cy={r.y}
              r="17"
              fill={r.me ? "#fff" : "#131313"}
              stroke={r.me ? w(0.9) : w(0.28)}
              strokeWidth="1.5"
            />
            <text
              x={r.x}
              y={r.y + 4}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={r.me ? "#0a0a0a" : w(0.62)}
            >
              {r.initials}
            </text>
          </g>
        ))}

        {/* Live ride panel */}
        <Panel x={56} y={56} width={318} height={196} />
        <text x="84" y="94" fontSize="11" fontWeight="600" fill={w(0.36)} letterSpacing="1.6">
          RIDE IN PROGRESS
        </text>
        <text x="84" y="132" fontSize="26" fontWeight="700" fill={w(0.94)} letterSpacing="-0.6">
          Sunday Ghat Loop
        </text>
        <circle cx="92" cy="163" r="3" fill={w(0.4)} />
        <circle cx="92" cy="193" r="3" fill={w(0.4)} />
        <circle cx="92" cy="223" r="3" fill={w(0.4)} />
        <Line x={104} y={160} width={120} opacity={0.3} />
        <Line x={104} y={190} width={92} opacity={0.22} />
        <Line x={104} y={220} width={138} opacity={0.22} />

        {/* Ride summary card */}
        <Panel x={684} y={452} width={460} height={168} r={22} fill={0.04} stroke={0.11} />
        <text x="716" y="490" fontSize="12" fontWeight="600" fill={w(0.34)} letterSpacing="1.4">
          RIDE SUMMARY
        </text>
        {[
          { x: 716, value: "42.6", unit: "KM" },
          { x: 856, value: "1:12", unit: "TIME" },
          { x: 986, value: "48", unit: "KM/H" },
        ].map((s) => (
          <g key={s.unit}>
            <text x={s.x} y="540" fontSize="30" fontWeight="700" fill={w(0.9)} letterSpacing="-1">
              {s.value}
            </text>
            <text x={s.x} y="568" fontSize="10" fontWeight="600" fill={w(0.3)} letterSpacing="1.4">
              {s.unit}
            </text>
          </g>
        ))}
        <line x1="716" y1="590" x2="842" y2="590" stroke={w(0.06)} />
        <Line x={716} y={596} width={110} opacity={0.12} />
        <Line x={892} y={596} width={72} opacity={0.12} />

        {/* Small floating "share" chip */}
        <Panel x={1000} y={96} width={144} height={44} r={22} fill={0.05} stroke={0.12} />
        <circle cx="1026" cy="118" r="5" fill={w(0.55)} />
        <Line x={1040} y={114} width={72} height={8} opacity={0.4} />
      </Stage>
    </svg>
  );
}

/** ── 02 · Yathri ───────────────────────────────────────────────────────
 * The phone in the foreground; the travel diary and mode split beside it.
 */
export function YathriMockup({ label }: { label: string }) {
  const modes = [
    { y: 402, width: 168, opacity: 0.72 },
    { y: 436, width: 116, opacity: 0.34 },
    { y: 470, width: 82, opacity: 0.2 },
  ];

  return (
    <svg
      viewBox="0 0 1200 675"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <Stage id="yathri">
        {/* Phone */}
        <rect x="96" y="46" width="252" height="583" rx="42" fill="#0d0d0d" stroke={w(0.2)} strokeWidth="2" />
        <rect x="186" y="62" width="72" height="9" rx="4.5" fill={w(0.1)} />
        <text x="124" y="112" fontSize="20" fontWeight="700" fill={w(0.94)} letterSpacing="-0.4">
          Yathri
        </text>
        <circle cx="316" cy="106" r="9" fill={w(0.12)} />

        {/* Trip map */}
        <rect x="120" y="134" width="204" height="242" rx="20" fill={w(0.035)} />
        <g stroke={w(0.055)} strokeWidth="1.2">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h${i}`} x1="120" y1={172 + i * 46} x2="324" y2={172 + i * 46} />
          ))}
          {[0, 1, 2].map((i) => (
            <line key={`v${i}`} x1={166 + i * 56} y1="134" x2={166 + i * 56} y2="376" />
          ))}
        </g>
        <path
          d="M150 344 C 168 292, 214 306, 226 258 S 272 208, 292 168"
          fill="none"
          stroke={w(0.8)}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="150" cy="344" r="6" fill="#0a0a0a" stroke={w(0.5)} strokeWidth="2" />
        <circle cx="292" cy="168" r="6" fill="#fff" />
        <Panel x={136} y={150} width={110} height={30} r={15} fill={0.06} stroke={0.12} />
        <text x="150" y="170" fontSize="10" fontWeight="600" fill={w(0.6)}>
          Auto-detected
        </text>

        {/* Detected trips */}
        <text x="120" y="412" fontSize="10" fontWeight="600" fill={w(0.3)} letterSpacing="1.4">
          TODAY
        </text>
        {[0, 1].map((i) => (
          <g key={i}>
            <Panel x={120} y={426 + i * 82} width={204} height={66} r={16} fill={0.03} stroke={0.08} />
            <circle cx="144" cy={459 + i * 82} r="11" fill={w(0.08)} />
            <Line x={164} y={450 + i * 82} width={i === 0 ? 96 : 74} opacity={0.4} />
            <Line x={164} y={466 + i * 82} width={i === 0 ? 58 : 92} opacity={0.15} />
          </g>
        ))}

        {/* Mode split */}
        <Panel x={420} y={96} width={420} height={216} r={22} fill={0.03} stroke={0.09} />
        <text x="452" y="136" fontSize="16" fontWeight="700" fill={w(0.86)}>
          Transport modes
        </text>
        <Line x={452} y={152} width={160} opacity={0.14} />
        {modes.map((m, i) => (
          <g key={i}>
            <rect x="452" y={m.y} width={m.width} height="8" rx="4" fill={w(m.opacity)} />
            <Line x={452 + m.width + 16} y={m.y + 1} width={34} opacity={0.12} />
          </g>
        ))}

        {/* Insights */}
        <Panel x={420} y={334} width={420} height={196} r={22} fill={0.03} stroke={0.09} />
        <text x="452" y="374" fontSize="16" fontWeight="700" fill={w(0.86)}>
          Mobility insights
        </text>
        <Line x={452} y={390} width={132} opacity={0.14} />
        {[34, 52, 42, 66, 48, 74, 58].map((h, i) => (
          <rect
            key={i}
            x={452 + i * 40}
            y={500 - h}
            width="20"
            height={h}
            rx="4"
            fill={w(i === 3 ? 0.62 : 0.16)}
          />
        ))}
        <line x1="452" y1="510" x2="730" y2="510" stroke={w(0.06)} />

        {/* Privacy card */}
        <Panel x={872} y={96} width={272} height={434} r={22} fill={0.04} stroke={0.1} />
        <circle cx="908" cy="136" r="12" fill="none" stroke={w(0.4)} strokeWidth="1.5" />
        <path d="M903 136h10M908 131v10" stroke={w(0.4)} strokeWidth="1.2" />
        <text x="932" y="141" fontSize="14" fontWeight="600" fill={w(0.78)}>
          On-device
        </text>
        <Line x={904} y={170} width={196} opacity={0.16} />
        <Line x={904} y={190} width={168} opacity={0.12} />
        <Line x={904} y={210} width={182} opacity={0.12} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1="904" y1={264 + i * 74} x2="1112" y2={264 + i * 74} stroke={w(0.06)} />
            <Line x={904} y={252 + i * 74} width={92} opacity={0.34} />
            <Line x={904} y={272 + i * 74} width={142 - i * 16} opacity={0.1} />
          </g>
        ))}
      </Stage>
    </svg>
  );
}

/** ── 03 · Brick Management System ──────────────────────────────────────
 * A desktop dashboard: production, inventory and sales in one view.
 */
export function BrickMockup({ label }: { label: string }) {
  const bars = [38, 54, 44, 68, 58, 82, 66, 94, 72];

  return (
    <svg
      viewBox="0 0 1200 675"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <Stage id="brick">
        {/* Window */}
        <rect x="56" y="48" width="1088" height="579" rx="20" fill="#0b0b0b" stroke={w(0.14)} />
        {[84, 104, 124].map((cx) => (
          <circle key={cx} cx={cx} cy="76" r="5" fill={w(0.15)} />
        ))}
        <rect x="470" y="66" width="260" height="20" rx="10" fill={w(0.045)} />
        <text x="600" y="80" textAnchor="middle" fontSize="10" fontWeight="500" fill={w(0.4)}>
          Brick Management System
        </text>
        <line x1="56" y1="100" x2="1144" y2="100" stroke={w(0.07)} />

        {/* Sidebar */}
        <line x1="252" y1="100" x2="252" y2="627" stroke={w(0.07)} />
        <text x="88" y="142" fontSize="15" fontWeight="700" fill={w(0.9)}>
          Brick Co.
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            {i === 0 && (
              <rect x="80" y={166 + i * 42 - 12} width="152" height="30" rx="9" fill={w(0.05)} />
            )}
            <circle cx="94" cy={166 + i * 42} r="4" fill={w(i === 0 ? 0.6 : 0.18)} />
            <Line x={110} y={166 + i * 42 - 3.5} width={i === 0 ? 66 : 52 + (i % 2) * 14} opacity={i === 0 ? 0.5 : 0.14} />
          </g>
        ))}

        {/* Heading */}
        <text x="288" y="146" fontSize="21" fontWeight="700" fill={w(0.92)} letterSpacing="-0.5">
          Production overview
        </text>
        <Line x={288} y={162} width={214} opacity={0.14} />

        {/* Stat tiles */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Panel x={288 + i * 268} y={194} width={248} height={112} r={14} />
            <Line x={308 + i * 268} y={216} width={72} opacity={0.16} />
            <text
              x={308 + i * 268}
              y="272"
              fontSize="30"
              fontWeight="700"
              fill={w(0.88)}
              letterSpacing="-1"
            >
              {["12,480", "3,160", "₹4.2L"][i]}
            </text>
            <Line x={308 + i * 268} y={286} width={54} opacity={0.12} />
          </g>
        ))}

        {/* Chart */}
        <Panel x={288} y={330} width={508} height={160} r={14} />
        <Line x={308} y={350} width={96} opacity={0.2} />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={312 + i * 50}
            y={470 - h}
            width="26"
            height={h}
            rx="4"
            fill={w(i === 7 ? 0.66 : 0.16)}
          />
        ))}

        {/* Inventory dial */}
        <Panel x={816} y={330} width={296} height={160} r={14} />
        <circle cx="900" cy="410" r="42" fill="none" stroke={w(0.1)} strokeWidth="10" />
        <circle
          cx="900"
          cy="410"
          r="42"
          fill="none"
          stroke={w(0.66)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="176 264"
          transform="rotate(-90 900 410)"
        />
        <Line x={972} y={390} width={104} opacity={0.24} />
        <Line x={972} y={410} width={78} opacity={0.12} />
        <Line x={972} y={430} width={92} opacity={0.12} />

        {/* Orders table */}
        <Panel x={288} y={514} width={824} height={98} r={14} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {i > 0 && <line x1="288" y1={546 + i * 26} x2="1112" y2={546 + i * 26} stroke={w(0.06)} />}
            <Line x={308} y={538 + i * 26} width={150 - i * 18} opacity={0.4} />
            <Line x={520} y={538 + i * 26} width={84} opacity={0.14} />
            <Line x={700} y={538 + i * 26} width={62} opacity={0.14} />
            <rect x="1036" y={535 + i * 26} width="58" height="14" rx="7" fill={w(0.08)} />
          </g>
        ))}
      </Stage>
    </svg>
  );
}

/** ── 04 · DNA research ─────────────────────────────────────────────────
 * An academic artifact rather than a product: an abstract sheet, a double
 * helix figure and a results table.
 */
export function ResearchMockup({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 1200 675"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <Stage id="research">
        {/* Sheet */}
        <rect x="96" y="52" width="748" height="571" rx="16" fill="#0b0b0b" stroke={w(0.12)} />
        <text x="140" y="102" fontSize="10" fontWeight="600" fill={w(0.32)} letterSpacing="2">
          RESEARCH PAPER · 2024
        </text>
        <text x="140" y="152" fontSize="27" fontWeight="700" fill={w(0.92)} letterSpacing="-0.7">
          DNA Sequence Storage
        </text>
        <text x="140" y="186" fontSize="27" fontWeight="700" fill={w(0.92)} letterSpacing="-0.7">
          Quality Assessment
        </text>
        <line x1="140" y1="212" x2="796" y2="212" stroke={w(0.08)} />

        {/* Abstract */}
        <text x="140" y="246" fontSize="11" fontWeight="600" fill={w(0.3)} letterSpacing="1.6">
          ABSTRACT
        </text>
        {[0, 1, 2, 3].map((i) => (
          <Line key={i} x={140} y={266 + i * 20} width={i === 3 ? 380 : 656} opacity={i === 0 ? 0.2 : 0.13} />
        ))}

        <text x="140" y="374" fontSize="11" fontWeight="600" fill={w(0.3)} letterSpacing="1.6">
          METHOD
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="143" cy={396 + i * 19} r="2.5" fill={w(0.35)} />
            <Line x={156} y={393 + i * 19} width={i === 0 ? 560 : 480 - i * 40} opacity={0.13} />
          </g>
        ))}

        {/* Helix figure */}
        <Panel x={140} y={462} width={300} height={130} r={12} fill={0.02} stroke={0.08} />
        <g stroke={w(0.22)} strokeWidth="1.4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={i} x1={176 + i * 30} y1={492} x2={176 + i * 30} y2={562} stroke={w(0.1)} />
          ))}
        </g>
        <path
          d="M176 492 C 206 492, 236 527, 266 527 S 326 492, 356 492"
          fill="none"
          stroke={w(0.7)}
          strokeWidth="2.5"
        />
        <path
          d="M176 562 C 206 562, 236 527, 266 527 S 326 562, 356 562"
          fill="none"
          stroke={w(0.4)}
          strokeWidth="2.5"
        />

        {/* Results table */}
        <Panel x={460} y={462} width={336} height={130} r={12} fill={0.02} stroke={0.08} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {i > 0 && <line x1="460" y1={502 + i * 28} x2="796" y2={502 + i * 28} stroke={w(0.06)} />}
            <Line x={480} y={492 + i * 28} width={110 - i * 14} opacity={0.34} />
            <Line x={650} y={492 + i * 28} width={34} opacity={0.16} />
            <Line x={716} y={492 + i * 28} width={44} opacity={0.16} />
          </g>
        ))}

        {/* Side column: key figures */}
        <Panel x={892} y={52} width={252} height={571} r={16} fill={0.03} stroke={0.09} />
        <text x="924" y="102" fontSize="10" fontWeight="600" fill={w(0.3)} letterSpacing="1.6">
          MODEL PERFORMANCE
        </text>
        {[
          { value: "0.94", unit: "ACCURACY" },
          { value: "12", unit: "FEATURES" },
          { value: "3", unit: "SEQUENCE SETS" },
        ].map((s, i) => (
          <g key={s.unit}>
            <text
              x="924"
              y={162 + i * 86}
              fontSize="34"
              fontWeight="700"
              fill={w(0.88)}
              letterSpacing="-1"
            >
              {s.value}
            </text>
            <text x="924" y={184 + i * 86} fontSize="10" fontWeight="600" fill={w(0.28)} letterSpacing="1.4">
              {s.unit}
            </text>
            <line x1="924" y1={206 + i * 86} x2="1112" y2={206 + i * 86} stroke={w(0.06)} />
          </g>
        ))}
        <text x="924" y="430" fontSize="10" fontWeight="600" fill={w(0.3)} letterSpacing="1.6">
          EXPLAINABILITY
        </text>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x="924"
            y={448 + i * 22}
            width={188 - i * 42}
            height="6"
            rx="3"
            fill={w(i === 0 ? 0.5 : 0.14)}
          />
        ))}
        <Panel x={924} y={536} width={188} height={52} r={10} fill={0.05} stroke={0.12} />
        <text x="944" y="568" fontSize="11" fontWeight="600" fill={w(0.55)}>
          Presentation ↗
        </text>
      </Stage>
    </svg>
  );
}
