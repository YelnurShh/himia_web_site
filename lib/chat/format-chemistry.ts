const subscripts: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋',
};
const superscripts: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼',
};
const symbols = new Set(`H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og`.split(' '));

function raised(value: string, map: Record<string, string>) {
  return [...value].map(character => map[character] || character).join('');
}

function plainFormula(value: string) {
  if (!/\d/.test(value)) return value;
  const parts = value.match(/[A-Z][a-z]?|\d+|[()]/g);
  if (!parts || parts.join('') !== value || !parts.some(part => symbols.has(part))) return value;
  if (parts.some(part => /^[A-Z]/.test(part) && !symbols.has(part))) return value;
  return parts.map(part => /^\d+$/.test(part) ? raised(part, subscripts) : part).join('');
}

function braced(value: string, start: number) {
  if (value[start] !== '{') return null;
  let depth = 0;
  for (let index = start; index < value.length; index++) {
    if (value[index] === '{') depth++;
    if (value[index] === '}' && --depth === 0) return { content: value.slice(start + 1, index), end: index + 1 };
  }
  return null;
}

function plainFractions(value: string): string {
  let result = '';
  let index = 0;
  while (index < value.length) {
    const command = /^\\(?:dfrac|tfrac|frac)\s*/.exec(value.slice(index));
    if (command) {
      const numerator = braced(value, index + command[0].length);
      const gap = numerator ? /^\s*/.exec(value.slice(numerator.end))?.[0].length || 0 : 0;
      const denominator = numerator ? braced(value, numerator.end + gap) : null;
      if (numerator && denominator) {
        result += `${plainFractions(numerator.content)}/${plainFractions(denominator.content)}`;
        index = denominator.end;
        continue;
      }
    }
    result += value[index];
    index++;
  }
  return result;
}

/** Keep chat text readable even when the model returns common LaTeX or plain ASCII formulas. */
export function formatChemistryText(value: string) {
  return plainFractions(value)
    .replace(/\\(?:rightleftharpoons|rightleftarrows)/g, '⇌')
    .replace(/\\(?:leftrightarrow|longleftrightarrow)/g, '↔')
    .replace(/\\(?:rightarrow|longrightarrow|to)/g, '→')
    .replace(/\\(?:leftarrow|longleftarrow)/g, '←')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\circ/g, '°')
    .replace(/\\(?:quad|qquad|,|;|!)/g, ' ')
    .replace(/\\begin\{[^{}]+\}|\\end\{[^{}]+\}/g, '')
    .replace(/\\(?:mathrm|text|mathbf|mathit|operatorname|ce)\s*\{/g, '{')
    .replace(/\\sqrt\s*\{/g, '√{')
    .replace(/\\\(|\\\)|\\\[|\\\]/g, '')
    .replace(/\\\\/g, '\n')
    .replace(/_\{([^{}]+)\}|_([0-9+-]+)/g, (_match, braced: string | undefined, simple: string | undefined) => raised(braced || simple || '', subscripts))
    .replace(/\^\{([^{}]+)\}|\^([0-9+\-=]+)/g, (_match, braced: string | undefined, simple: string | undefined) => raised(braced || simple || '', superscripts))
    .replace(/<->/g, '↔').replace(/->/g, '→')
    .replace(/(?<![A-Za-z])([A-Z][a-z]?)(\d+)([+-])(?![A-Za-z0-9])/g, (match, symbol: string, charge: string, sign: string) => symbols.has(symbol) ? symbol + raised(charge + sign, superscripts) : match)
    .replace(/(?<![A-Za-z])[A-Z][A-Za-z0-9()]*/g, plainFormula)
    .replace(/(?<=[A-Za-z₀-₉)])([+-])(?![A-Za-z0-9])/g, (_match, sign: string) => raised(sign, superscripts))
    .replace(/\\([A-Za-z]+)/g, '$1')
    .replace(/[{}$]/g, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/\n[ \t]+/g, '\n');
}
