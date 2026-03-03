import type { Speaker } from '../types/speaker';
import { getRandomNumber } from './random';

/** Split a string into chunks of `chunkSize` characters per word, padded */
export function stringToLettersArray(str: string, chunkSize = 5): string[][] {
  const letters: string[][] = [];
  const words = str.split(' ');

  words.forEach((word) => {
    for (let i = 0; i < word.length; i += chunkSize) {
      const chunk = word.slice(i, i + chunkSize).split('');
      while (chunk.length < chunkSize) {
        chunk.push('');
      }
      letters.push(chunk);
    }
  });

  return letters;
}

/** Wrap a string in a random HTML tag */
export function wrapInRandomElement(str: string, tags: readonly string[]): string {
  const tag = tags[getRandomNumber(tags.length)];
  return `<${tag}>${str}</${tag}>`;
}

/** Format date and time for German locale display */
export function formatDateAndTime(
  date: string,
  time: string,
): { formattedDate: string; formattedTime: string } {
  if (!date || !time) {
    return { formattedDate: '', formattedTime: '' };
  }

  const dateTime = new Date(`${date}T${time}`);

  const formattedDate = dateTime.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const formattedTime = dateTime.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return { formattedDate, formattedTime };
}

/** Convert speaker data to an array of display strings */
export function speakerToStrings(speaker: Speaker): string[] {
  const { formattedDate, formattedTime } = formatDateAndTime(speaker.date, speaker.time);
  const caption = speaker.caption.en || speaker.caption.de;

  return [
    `Jitsi bitsi spider #${speaker.editionNumber}`,
    `A talk by ${speaker.name}`,
    caption,
    'click to join',
    formattedDate,
    formattedTime,
    `the lecture will be in ${speaker.caption.en ? 'English' : 'German'}`,
  ].filter(Boolean);
}

/** Generate screen texts for the flicker poster from speaker data */
export function generateScreenTexts(speaker: Speaker): string[] {
  const { formattedDate, formattedTime } = formatDateAndTime(speaker.date, speaker.time);
  const caption = speaker.caption.en || speaker.caption.de;
  const captionWords = caption.split(' ');

  // Chunk caption into groups of ~3 words
  const captionChunks: string[] = [];
  for (let i = 0; i < captionWords.length; i += 3) {
    captionChunks.push(captionWords.slice(i, i + 3).join(' '));
  }

  // Build alternating pattern: info, name, info, name...
  const infoLines = [
    `jitsi bitsi spider #${speaker.editionNumber}`,
    formattedDate || 'date tba',
    formattedTime || 'time tba',
    ...captionChunks,
    'E n t e r',
  ];

  const screens: string[] = [];
  for (const line of infoLines) {
    screens.push(line);
    screens.push(speaker.name);
  }
  return screens;
}
