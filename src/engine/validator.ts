export interface ValidationResult {
  passed: boolean;
  feedback: string;
}

// Collects all CSS declaration blocks that match the given selector.
// Handles multiple blocks for the same selector and strips comments first.
function getBlocksForSelector(css: string, selector: string): string[] {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const sel = selector.toLowerCase();
  const blocks: string[] = [];

  let searchFrom = 0;
  while (searchFrom < stripped.length) {
    const pos = stripped.toLowerCase().indexOf(sel, searchFrom);
    if (pos === -1) break;

    // Confirm the match is a standalone selector, not a substring of another name
    const charBefore = pos > 0 ? stripped[pos - 1] : '\n';
    const charAfter = stripped[pos + sel.length];
    const validBefore = pos === 0 || /[\s,{}]/.test(charBefore);
    const validAfter = /[\s,{:>+~(]/.test(charAfter) || charAfter === undefined;

    if (!validBefore || !validAfter) {
      searchFrom = pos + 1;
      continue;
    }

    // Find the opening brace
    const openBrace = stripped.indexOf('{', pos + sel.length);
    if (openBrace === -1) break;

    // Walk forward to find the matching closing brace
    let depth = 1;
    let i = openBrace + 1;
    while (i < stripped.length && depth > 0) {
      if (stripped[i] === '{') depth++;
      if (stripped[i] === '}') depth--;
      i++;
    }

    blocks.push(stripped.substring(openBrace + 1, i - 1).toLowerCase());
    searchFrom = i;
  }

  return blocks;
}

function checkProperties(
  searchArea: string,
  expectedCSS: Record<string, string>
): string[] {
  return Object.entries(expectedCSS)
    .filter(([prop, value]) => {
      const propKey = prop.toLowerCase();
      const valueKey = value.toLowerCase();

      // Find where this property declaration begins
      let propIdx = searchArea.indexOf(propKey + ':');
      if (propIdx === -1) propIdx = searchArea.indexOf(propKey + ' :');
      if (propIdx === -1) return true; // property absent → missing

      // Scope the value check to just this declaration (up to the next ; or })
      const colonIdx = searchArea.indexOf(':', propIdx) + 1;
      const semicolonIdx = searchArea.indexOf(';', colonIdx);
      const closeBraceIdx = searchArea.indexOf('}', colonIdx);
      const endIdx =
        semicolonIdx === -1
          ? closeBraceIdx
          : closeBraceIdx === -1
          ? semicolonIdx
          : Math.min(semicolonIdx, closeBraceIdx);
      const declValue =
        endIdx === -1 ? searchArea.slice(colonIdx) : searchArea.slice(colonIdx, endIdx);

      return !declValue.includes(valueKey); // missing if value absent from this declaration
    })
    .map(([p, v]) => `${p}: ${v}`);
}

export function validateCSS(
  userCSS: string,
  expectedCSS: Record<string, string>,
  targetSelector?: string
): ValidationResult {
  if (!expectedCSS || typeof expectedCSS !== 'object') {
    return { passed: false, feedback: 'Lesson configuration error: missing expectedCSS.' };
  }

  if (targetSelector) {
    const blocks = getBlocksForSelector(userCSS, targetSelector);

    if (blocks.length === 0) {
      // Check if the property exists, but on a different element
      const cssLower = userCSS.toLowerCase();
      const hasPropElsewhere = Object.keys(expectedCSS).some((prop) =>
        cssLower.includes(prop.toLowerCase() + ':')
      );
      const hint = hasPropElsewhere
        ? `Make sure to add that to ${targetSelector}, not a different element.`
        : `Not quite — try adding to ${targetSelector}: ${Object.entries(expectedCSS)
            .map(([p, v]) => `${p}: ${v}`)
            .join(', ')}`;
      return { passed: false, feedback: hint };
    }

    // Check all matching blocks together (user might split declarations)
    const combined = blocks.join('\n');
    const missing = checkProperties(combined, expectedCSS);

    if (missing.length === 0) {
      return { passed: true, feedback: 'Looks correct! The expected CSS is in place.' };
    }

    return {
      passed: false,
      feedback: `Not quite — try adding to ${targetSelector}: ${missing.join(', ')}`,
    };
  }

  // No targetSelector — search the entire CSS string
  const normalized = userCSS.toLowerCase().replace(/\s+/g, ' ').trim();
  const missing = checkProperties(normalized, expectedCSS);

  if (missing.length === 0) {
    return { passed: true, feedback: 'Looks correct! The expected CSS is in place.' };
  }

  return {
    passed: false,
    feedback: `Not quite — try including: ${missing.join(', ')}`,
  };
}
