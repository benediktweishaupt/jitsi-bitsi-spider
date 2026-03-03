export const PALETTES = {
  monochrome: ['black', 'white'] as const,

  primary: ['red', 'blue', 'green', 'black', 'white'] as const,

  warm: [
    '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6',
    '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857',
    'red', 'yellow',
  ] as const,

  /** Generate a random red-tinted color (RGB 155-255, 0, 0) */
  redTint(): string {
    return `rgb(${Math.floor(Math.random() * 100 + 155)},0,0)`;
  },
} as const;
