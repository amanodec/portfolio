export const printColours = { vermilion: '#c5482f', cobalt: '#3457b1' } as const;
export type PrintColour = keyof typeof printColours;
export type PrintLayout = { titleX: number; titleY: number; cardX: number; cardY: number; cardWidth: number; titleFont: number; aspectRatio: number; rotation: number; edition: number; colour: PrintColour };

/** All content is local and fixed; only finite geometry and an allowlisted colour enter the SVG. */
export function createCompositionPrint(layout: PrintLayout) {
  const n = (value: number, fallback = 0) => Number.isFinite(value) ? Math.round(value * 100) / 100 : fallback;
  const accent = printColours[layout.colour] ?? printColours.vermilion;
  const sceneHeight = Math.round(1400 / Math.max(.2, n(layout.aspectRatio, 1.6)));
  const height = sceneHeight + 130;
  const tx = n(layout.titleX * 1400), ty = 70 + n(layout.titleY * sceneHeight);
  const cx = n(layout.cardX * 1400), cy = 70 + n(layout.cardY * sceneHeight);
  const width = n(layout.cardWidth * 1400, 360);
  const scale = width / 300;
  const font = Math.min(300, Math.max(42, n(layout.titleFont * 1400, 100)));
  const edition = String(Math.max(1, Math.floor(n(layout.edition, 1)))).padStart(3, '0');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="${height}" viewBox="0 0 1400 ${height}" role="img" aria-labelledby="print-title print-desc">
<title id="print-title">Room for possibility, composition ${edition}</title><desc id="print-desc">An interactive print composed by you in Aman Sharma’s interaction lab.</desc>
<rect width="1400" height="${height}" fill="#efede6"/>
<path d="M45 65H1355M45 ${height - 65}H1355" stroke="#cdc7b9"/>
<g font-family="monospace" font-size="10" fill="#6b6558" letter-spacing="1"><text x="48" y="44">AN OPEN COMPOSITION / ${edition}</text><text x="1352" y="44" text-anchor="end">YOUR INSTINCT. MY CODE.</text></g>
<g transform="translate(${tx} ${ty})" font-family="Arial, Helvetica, sans-serif" font-size="${font}" letter-spacing="${-font * .075}" fill="#262725"><text y="${font * .82}">Make room</text><text y="${font * 1.94}" fill="${accent}" font-family="Georgia, serif" font-style="italic" font-size="${font * 1.28}">for play.</text></g>
<g transform="translate(${cx} ${cy}) rotate(${n(layout.rotation)} ${width / 2} ${width * 2 / 3}) scale(${scale})">
<rect x="9" y="13" width="300" height="400" fill="#59503b" opacity=".09"/><rect width="300" height="400" fill="#fbf8ef" stroke="#d2cbbb"/>
<g font-family="monospace" font-size="7" fill="#262725"><text x="24" y="27">FORM &amp; FEELING</text><text x="276" y="27" text-anchor="end">№ 01</text></g>
<g transform="translate(30 23)" fill="none" stroke="${accent}" stroke-width="23"><ellipse cx="120" cy="130" rx="63" ry="91" transform="rotate(-32 120 130)"/><ellipse cx="120" cy="130" rx="63" ry="91" transform="rotate(32 120 130)"/><circle cx="120" cy="130" r="7" fill="${accent}" stroke="none"/></g>
<g font-family="Arial, sans-serif" font-size="35" letter-spacing="-2" fill="#262725"><text x="24" y="313">Room for</text><text x="24" y="347" font-family="Georgia, serif" font-style="italic" fill="${accent}">possibility.</text></g>
<text x="24" y="380" font-family="monospace" font-size="6" fill="#625e55">AN OBJECT WITHOUT A FIXED ANSWER</text></g>
<g font-family="monospace" font-size="10" fill="#6b6558"><text x="48" y="${height - 33}">COMPOSED BY YOU / BUILT BY AMAN SHARMA</text><text x="1352" y="${height - 33}" text-anchor="end">A LITTLE STRUCTURE. A LOT OF POSSIBILITY.</text></g></svg>`;
}
