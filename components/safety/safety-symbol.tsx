export type SafetySymbolName =
  | 'no-taste' | 'no-sink' | 'no-return' | 'no-mix' | 'no-open-bottle' | 'no-sniff'
  | 'warning' | 'harmful' | 'corrosive' | 'toxic' | 'oxidizer' | 'explosive' | 'radiation' | 'flammable' | 'electric'
  | 'test-tube' | 'beaker' | 'flask' | 'cylinder' | 'dropper' | 'funnel' | 'rack' | 'mortar' | 'stand' | 'burette' | 'tongs' | 'dish'
  | 'spatula' | 'test-tube-holder' | 'reagent-bottle' | 'glass-rod' | 'crucible' | 'spot-plate' | 'separatory-funnel' | 'distilling-flask' | 'gas-generator' | 'round-flask';

type Props = { name: SafetySymbolName; variant: 'prohibition' | 'warning' | 'equipment'; size?: number };

function Drawing({ name }: { name: SafetySymbolName }) {
  switch (name) {
    case 'no-taste': return <><path d="M23 16l15 10m-17-9 5-7 18 12-5 7M34 33c0 3-3 5-3 7a3 3 0 0 0 6 0c0-2-3-4-3-7ZM22 48c6-5 12-5 18-2" /></>;
    case 'no-sink': return <><path d="M14 39h36l-4 9H18l-4-9ZM39 39V22c0-6 10-6 10 0v4h-7M30 22l12 8" /><path d="M30 31c0 3-3 5-3 7a3 3 0 0 0 6 0c0-2-3-4-3-7Z" /></>;
    case 'no-return': return <><path d="M14 30v19h15V30h-3v-5h-9v5h-3ZM38 22v27h12V22h-3v-5h-6v5h-3ZM22 16c8-6 15-5 20 0m0 0-5-1m5 1-2-5" /></>;
    case 'no-mix': return <><path d="M15 30v19h13V30h-3v-5h-7v5h-3ZM39 30v19h12V30h-3v-5h-6v5h-3ZM28 20c4 0 6 2 9 5m-3-1 3 1-1-4M22 15l6 5" /></>;
    case 'no-open-bottle': return <><path d="M20 28v21h26V28h-5v-5H25v5h-5ZM24 19h18v-5H24v5ZM32 9c-3-3-8-3-10 1" /></>;
    case 'no-sniff': return <><path d="M18 44h17V31H18v13Zm3-17h11v4H21v-4ZM39 28c-3 3-3 7 1 9m5-13c-5 4-5 10 0 14M36 45c6 3 12 2 16-1" /></>;
    case 'warning': return <><path d="M32 19v18" strokeWidth="5" /><circle cx="32" cy="45" r="2.5" fill="currentColor" stroke="none" /></>;
    case 'harmful': return <path d="M24 24l16 18m0-18L24 42" strokeWidth="7" />;
    case 'corrosive': return <><path d="M15 19l15 5-2 5-15-5 2-5Zm20-1 15 5-2 5-15-5 2-5ZM13 45h15m7 0h17M23 30l-2 5m21-5-2 5" /><path d="M18 41c5-4 9-4 14 0m5-1 9 2" /></>;
    case 'toxic': return <><circle cx="32" cy="29" r="10" /><circle cx="28" cy="28" r="2.4" fill="currentColor" stroke="none" /><circle cx="36" cy="28" r="2.4" fill="currentColor" stroke="none" /><path d="M29 35h6M18 44l28 7m0-7-28 7" strokeWidth="4" /></>;
    case 'oxidizer': return <><circle cx="32" cy="44" r="7" /><path d="M27 34c-5-6 0-8 3-15 1 6 8 7 8 14 0 4-3 7-6 7-3 0-5-2-5-6Z" /></>;
    case 'explosive': return <><path d="M28 36l-6 6 2-10-8-2 10-2-1-9 7 7 7-8-2 10 11 2-11 4 5 8-9-5-4 11-1-12Z" fill="currentColor" stroke="none" /></>;
    case 'radiation': return <><circle cx="32" cy="34" r="4" fill="currentColor" stroke="none" /><path d="M28 27l-5-10c-5 3-8 7-9 13l12 1m12-4 5-10c5 3 8 7 9 13l-12 1m-12 7-5 12c6 3 12 3 18 0l-5-12" fill="currentColor" stroke="none" /></>;
    case 'flammable': return <path d="M33 16c1 8-5 10-3 17 3-1 5-4 5-7 8 8 9 14 5 20-2 4-6 6-10 6-8 0-13-6-12-13 1-8 8-13 15-23Z" />;
    case 'electric': return <path d="M35 16 23 35h10l-4 16 13-22H31l4-13Z" fill="currentColor" stroke="none" />;
    case 'test-tube': return <path d="M24 13v33a8 8 0 0 0 16 0V13M22 13h20M24 38h16" />;
    case 'beaker': return <><path d="M18 14h28m-25 0-2 34h26l-2-34M20 36h24M26 27h7" /><path d="M19 36h26v12H19z" fill="currentColor" opacity=".12" stroke="none" /></>;
    case 'flask': return <><path d="M27 12h10m-9 0v18L17 48h30L36 30V12M22 40h20" /><path d="M22 40h20l5 8H17z" fill="currentColor" opacity=".12" stroke="none" /></>;
    case 'cylinder': return <><path d="M24 12h16v36H24zM21 48h22M30 20h8m-8 7h8m-8 7h8m-8 7h8" /><path d="M24 38h16v10H24z" fill="currentColor" opacity=".12" stroke="none" /></>;
    case 'dropper': return <><path d="M19 14c3-3 6-2 8 0l3 4-7 7-4-4c-2-2-2-5 0-7Zm10 10 16 16m-18-17 16 16M45 40l4 6-6-2" /></>;
    case 'funnel': return <path d="M12 16h40L36 34v15h-8V34L12 16Z" />;
    case 'rack': return <><path d="M12 18h40v7H12zm4 26h32v5H16zM19 25v19m9-19v19m9-19v19m9-19v19M18 15h4m8 0h4m8 0h4" /></>;
    case 'mortar': return <><path d="M12 30h40c-1 11-7 17-20 17S13 41 12 30Zm6 19h28M38 29l9-17 5 3-10 15" /></>;
    case 'stand': return <><path d="M32 12v38M18 50h28M32 24h18m-4-3v9M32 38h15m-4-3v8" /></>;
    case 'burette': return <><path d="M28 10h8v31h-8zM32 41v11m-9-7h18m-6 0v5M30 17h5m-5 7h5m-5 7h5" /></>;
    case 'tongs': return <><path d="M18 13c5 12 10 20 14 32m14-32C41 25 36 33 32 45M17 14l5-3m20 0 5 3M29 43l3 6 3-6" /></>;
    case 'dish': return <><path d="M12 31h40c-3 12-10 17-20 17S15 43 12 31Zm3-3c9 4 25 4 34 0M18 50h28" /></>;
    case 'spatula': return <path d="M15 46 45 20m-3-4 7 2-4 8-6-4m-24 24-3 5 6-2" />;
    case 'test-tube-holder': return <><path d="M13 20h14v18H13zM27 25h24M27 33h24M48 25v8M17 38v12m6-12v12" /></>;
    case 'reagent-bottle': return <><path d="M21 21h22v28H21zM25 15h14v6H25zM23 30h18v12H23z" /><path d="M23 30h18v12H23z" fill="currentColor" opacity=".12" stroke="none" /></>;
    case 'glass-rod': return <path d="M14 47 49 17m-38 32 3 2 38-32-3-2-38 32Z" />;
    case 'crucible': return <><path d="M20 26h24l-3 20H23l-3-20ZM17 25h30m-27-4h24M26 46h12" /></>;
    case 'spot-plate': return <><path d="M12 17h40v31H12z" />{[22,32,42].map(x=>[26,38].map(y=><circle key={`${x}-${y}`} cx={x} cy={y} r="4" />))}</>;
    case 'separatory-funnel': return <><path d="M24 14h16v8c0 10-2 18-8 23-6-5-8-13-8-23v-8ZM21 14h22M32 45v8m-7-4h14m-5 0v4" /></>;
    case 'distilling-flask': return <><path d="M25 12h14M28 12v20c-7 3-10 8-10 13a14 14 0 0 0 28 0c0-5-3-10-10-13V12M37 27l13 5h6M21 43h22" /></>;
    case 'gas-generator': return <><path d="M25 12h14m-9 0v12c-7 3-9 8-9 12v11h22V36c0-4-2-9-9-12V12M21 39h22M42 31h11v7h-9m-12-14v24" /></>;
    case 'round-flask': return <><path d="M26 11h12m-9 0v15a15 15 0 1 0 6 0V11M21 39h22" /><path d="M19 39h26a15 15 0 0 1-26 0Z" fill="currentColor" opacity=".12" stroke="none" /></>;
  }
}

export function SafetySymbol({ name, variant, size = 72 }: Props) {
  return <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    {variant === 'prohibition' && <circle cx="32" cy="32" r="28" fill="#fff" stroke="#D9474B" strokeWidth="5" />}
    {variant === 'warning' && <path d="M32 4 60 55H4L32 4Z" fill="#FFF2D6" stroke="#B67418" strokeWidth="3.5" strokeLinejoin="round" />}
    {variant === 'equipment' && <rect x="4" y="4" width="56" height="56" rx="16" fill="#EAF5FA" />}
    <g stroke={variant === 'equipment' ? '#397A98' : '#253047'} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><Drawing name={name} /></g>
    {variant === 'prohibition' && <path d="M12 12 52 52" stroke="#D9474B" strokeWidth="5" strokeLinecap="round" />}
  </svg>;
}
