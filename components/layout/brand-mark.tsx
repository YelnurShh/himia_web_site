function MoleculeShape() {
  return <>
    <path d="M24 23L17 18M32 23L39 18M28 33V39" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="13" cy="15" r="5" fill="white" />
    <circle cx="43" cy="15" r="5" fill="white" />
    <circle cx="28" cy="44" r="5" fill="white" />
    <circle cx="28" cy="27" r="7" fill="#73E1DF" />
  </>;
}

export function BrandMark() {
  return <svg className="brand-mark" viewBox="0 0 56 56" fill="none" aria-hidden="true" focusable="false">
    <rect width="56" height="56" rx="17" fill="#315FD5" />
    <MoleculeShape />
  </svg>;
}

export function MoleculeGlyph() {
  return <svg viewBox="0 0 56 56" fill="none" aria-hidden="true" focusable="false">
    <MoleculeShape />
  </svg>;
}
