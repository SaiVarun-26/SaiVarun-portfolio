/**
 * Placeholder visuals for the Experience section, used until real
 * screenshots are added (set `image` on the experience in the config).
 *
 * Both are 16:10 SVGs, so they scale perfectly with their container.
 * The only gradient on the page lives here, inside the placeholder.
 */

const w = (o: number) => `rgba(255,255,255,${o})`;

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="30%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="#0a0a0a" />
      <rect width="800" height="500" fill={`url(#${id})`} />
    </>
  );
}

/** Desktop dashboard mockup for ContractIQ. */
export function DashboardMockup({ label }: { label: string }) {
  const bars = [46, 62, 38, 74, 56, 88, 64, 96, 70, 82];
  return (
    <svg
      viewBox="0 0 800 500"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <Backdrop id="dash-glow" />

      {/* Window chrome */}
      <line x1="0" y1="40" x2="800" y2="40" stroke={w(0.06)} />
      {[24, 42, 60].map((cx) => (
        <circle key={cx} cx={cx} cy="20" r="5" fill={w(0.15)} />
      ))}
      <rect x="300" y="10" width="200" height="20" rx="10" fill={w(0.05)} />
      <text
        x="400"
        y="24"
        textAnchor="middle"
        fontSize="10"
        fontWeight="500"
        fill={w(0.45)}
      >
        ContractIQ
      </text>

      {/* Sidebar */}
      <line x1="160" y1="40" x2="160" y2="500" stroke={w(0.06)} />
      <text x="24" y="78" fontSize="15" fontWeight="700" fill={w(0.92)}>
        ContractIQ
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="24"
          y={112 + i * 34}
          width={i === 0 ? 112 : 86 - (i % 2) * 16}
          height="9"
          rx="4.5"
          fill={w(i === 0 ? 0.5 : 0.12)}
        />
      ))}

      {/* Heading */}
      <rect x="190" y="66" width="150" height="13" rx="6.5" fill={w(0.8)} />
      <rect x="190" y="88" width="230" height="7" rx="3.5" fill={w(0.14)} />

      {/* Stat tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={190 + i * 196}
            y="116"
            width="180"
            height="84"
            rx="12"
            fill={w(0.025)}
            stroke={w(0.09)}
          />
          <rect x={206 + i * 196} y="134" width="64" height="6" rx="3" fill={w(0.18)} />
          <rect x={206 + i * 196} y="154" width={72 - i * 8} height="16" rx="8" fill={w(0.72)} />
          <rect x={206 + i * 196} y="180" width="44" height="6" rx="3" fill={w(0.14)} />
        </g>
      ))}

      {/* Bar chart tile */}
      <rect x="190" y="218" width="388" height="136" rx="12" fill={w(0.025)} stroke={w(0.09)} />
      <rect x="206" y="234" width="80" height="7" rx="3.5" fill={w(0.2)} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={208 + i * 36}
          y={338 - h}
          width="22"
          height={h}
          rx="4"
          fill={w(i === 7 ? 0.75 : 0.2)}
        />
      ))}

      {/* Donut tile */}
      <rect x="590" y="218" width="180" height="136" rx="12" fill={w(0.025)} stroke={w(0.09)} />
      <circle cx="680" cy="294" r="38" fill="none" stroke={w(0.12)} strokeWidth="9" />
      <circle
        cx="680"
        cy="294"
        r="38"
        fill="none"
        stroke={w(0.75)}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="150 240"
        transform="rotate(-90 680 294)"
      />

      {/* Table */}
      <rect x="190" y="372" width="580" height="108" rx="12" fill={w(0.025)} stroke={w(0.09)} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          {i > 0 && (
            <line x1="190" y1={398 + i * 28 - 14} x2="770" y2={398 + i * 28 - 14} stroke={w(0.06)} />
          )}
          <rect x="208" y={392 + i * 28} width={120 - i * 14} height="7" rx="3.5" fill={w(0.42)} />
          <rect x="420" y={392 + i * 28} width="70" height="7" rx="3.5" fill={w(0.16)} />
          <rect x="560" y={392 + i * 28} width="50" height="7" rx="3.5" fill={w(0.16)} />
          <rect x="700" y={390 + i * 28} width="48" height="11" rx="5.5" fill={w(0.1)} />
        </g>
      ))}
    </svg>
  );
}

/** Phone mockup for Yathri, centred in a 16:10 canvas. */
export function PhoneMockup({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <Backdrop id="phone-glow" />

      {/* Device */}
      <rect x="314" y="28" width="172" height="444" rx="30" fill="#0d0d0d" stroke={w(0.2)} strokeWidth="2" />
      <rect x="378" y="40" width="44" height="7" rx="3.5" fill={w(0.1)} />

      {/* App header */}
      <text x="332" y="76" fontSize="13" fontWeight="700" fill={w(0.92)}>
        Yathri
      </text>
      <circle cx="466" cy="72" r="7" fill={w(0.12)} />

      {/* Map */}
      <clipPath id="phone-map">
        <rect x="330" y="92" width="140" height="224" rx="16" />
      </clipPath>
      <rect x="330" y="92" width="140" height="224" rx="16" fill={w(0.035)} />
      <g clipPath="url(#phone-map)" stroke={w(0.06)}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`h${i}`} x1="330" y1={112 + i * 34} x2="470" y2={112 + i * 34} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`v${i}`} x1={354 + i * 38} y1="92" x2={354 + i * 38} y2="316" />
        ))}
        <path
          d="M352 292 C 360 250, 398 258, 402 224 S 438 186, 446 134"
          fill="none"
          stroke={w(0.78)}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <circle cx="352" cy="292" r="5" fill={w(0.3)} />
      <circle cx="352" cy="292" r="2.5" fill="#fff" />
      <circle cx="446" cy="134" r="6" fill="#fff" />

      {/* Trip sheet */}
      <rect x="330" y="328" width="140" height="124" rx="14" fill={w(0.04)} stroke={w(0.09)} />
      <rect x="344" y="344" width="64" height="8" rx="4" fill={w(0.7)} />
      <rect x="344" y="362" width="96" height="6" rx="3" fill={w(0.16)} />
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx="352" cy={392 + i * 28} r="8" fill={w(0.1)} />
          <rect x="368" y={386 + i * 28} width={72 - i * 18} height="6" rx="3" fill={w(0.34)} />
          <rect x="368" y={398 + i * 28} width="40" height="5" rx="2.5" fill={w(0.12)} />
        </g>
      ))}
    </svg>
  );
}
