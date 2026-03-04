import type { Speaker } from '../types/speaker';
import type { Token } from '../types/layers';
import { formatDateAndTime } from '../utilities/text-transforms';
import { getRandomInt } from '../utilities/random';

/** Valid field names for extraction */
type Field = 'name' | 'caption' | 'date' | 'bio' | 'meta' | 'image' | 'link';

const FIELD_EXTRACTORS: Record<Field, (speaker: Speaker) => Token[]> = {
  name: (s) => {
    if (!s.name) return [];
    return [{ text: s.name, type: 'name' }];
  },
  caption: (s) => {
    const text = s.caption.de || s.caption.en;
    if (!text) return [];
    return [{ text, type: 'caption' }];
  },
  date: (s) => {
    const { formattedDate, formattedTime } = formatDateAndTime(s.date, s.time);
    if (!formattedDate) return [];
    return [{ text: `${formattedDate} ${formattedTime}`.trim(), type: 'date' }];
  },
  bio: (s) => {
    const text = s.bio?.de?.text || s.bio?.en?.text;
    if (!text) return [];
    return [{ text, type: 'bio' }];
  },
  meta: (s) => {
    const tokens: Token[] = [];
    tokens.push({ text: `jitsi bitsi spider #${s.editionNumber}`, type: 'meta' });
    if (s.link) tokens.push({ text: s.link, type: 'meta' });
    return tokens;
  },
  image: (s) => {
    if (!s.image) return [];
    return [{ text: s.image, type: 'image' }];
  },
  link: (s) => {
    if (!s.link) return [];
    return [{ text: s.link, type: 'link' }];
  },
};

const ALL_FIELDS: Field[] = ['name', 'caption', 'date', 'bio', 'meta', 'image', 'link'];

/**
 * Extract speaker data into typed tokens.
 *
 * extract(speaker, 'all')           → tokens from every field
 * extract(speaker, ['name'])        → name token only
 * extract(speaker, ['name', 'bio']) → name + bio tokens
 */
export function extract(speaker: Speaker, fields: 'all' | Field[]): Token[] {
  const selected = fields === 'all' ? ALL_FIELDS : fields;
  return selected.flatMap((field) => {
    const extractor = FIELD_EXTRACTORS[field];
    return extractor ? extractor(speaker) : [];
  });
}

/**
 * Split tokens into smaller tokens by strategy, preserving type.
 *
 * tokenize(tokens, 'letter')      → one token per character
 * tokenize(tokens, 'word')        → one token per whitespace-separated word
 * tokenize(tokens, 'whole')       → pass-through (no splitting)
 * tokenize(tokens, { chunk: 5 })  → one token per N characters
 */
export function tokenize(
  tokens: Token[],
  strategy: 'letter' | 'word' | 'whole' | { chunk: number },
): Token[] {
  if (strategy === 'whole') return tokens;

  return tokens.flatMap((token) => {
    if (strategy === 'letter') {
      return token.text
        .replace(/\s/g, '')
        .split('')
        .map((ch) => ({ text: ch, type: token.type }));
    }

    if (strategy === 'word') {
      return token.text
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ text: word, type: token.type }));
    }

    // { chunk: N }
    const size = strategy.chunk;
    const chars = token.text.replace(/\s/g, '');
    const chunks: Token[] = [];
    for (let i = 0; i < chars.length; i += size) {
      chunks.push({ text: chars.slice(i, i + size), type: token.type });
    }
    return chunks;
  });
}

/**
 * Reorder or combine token arrays.
 *
 * sequence(a, 'alternate', { with: b }) → a[0], b[0], a[1], b[1], ...
 * sequence(tokens, 'repeat', { times: 3 }) → tokens × 3
 * sequence(tokens, 'shuffle') → random order
 */
export function sequence(
  tokens: Token[],
  mode: 'alternate' | 'repeat' | 'shuffle',
  options?: { with?: Token[]; times?: number },
): Token[] {
  if (mode === 'repeat') {
    const times = options?.times ?? 2;
    const result: Token[] = [];
    for (let i = 0; i < times; i++) result.push(...tokens);
    return result;
  }

  if (mode === 'shuffle') {
    const copy = [...tokens];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // alternate
  const other = options?.with ?? [];
  const result: Token[] = [];
  const maxLen = Math.max(tokens.length, other.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < tokens.length) result.push(tokens[i]);
    if (i < other.length) result.push(other[i]);
  }
  return result;
}
