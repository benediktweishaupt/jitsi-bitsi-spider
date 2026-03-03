import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { Blob, randomVec2, vec2, scale } from '../../utilities/physics';
import './physics-blobs.css';

const DEFAULT_BLOB_COUNT = 12;
const DEFAULT_RADIUS_RANGE: [number, number] = [60, 120];

function createBlobs(count: number, radiusRange: [number, number], w: number, h: number, moving: boolean): Blob[] {
  const minDim = Math.min(w, h);
  const blobs: Blob[] = [];
  for (let i = 0; i < count; i++) {
    const radius = (Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0]) * (minDim / 800);
    const pos = randomVec2(w, h);
    const vel = moving ? scale(vec2(Math.random() - 0.5, Math.random() - 0.5), 6) : vec2(0, 0);
    blobs.push(new Blob(radius, pos, vel));
  }
  return blobs;
}

export const createPhysicsBlobs = definePoster({
  name: 'physics-blobs',

  build({ container, speaker }: PosterContext) {
    // Speaker name behind the canvas
    const nameParts = speaker.name.split(/\s+/);
    const nameEl = document.createElement('div');
    nameEl.classList.add('physics-blobs__name');
    nameParts.forEach((part) => {
      const line = document.createElement('div');
      line.textContent = part;
      nameEl.appendChild(line);
    });
    container.appendChild(nameEl);

    const canvas = document.createElement('canvas');
    canvas.classList.add('physics-blobs__canvas');
    container.appendChild(canvas);
  },

  staticFallback({ container, config }: PosterContext) {
    const canvas = container.querySelector('.physics-blobs__canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.clientWidth || 800;
    canvas.height = container.clientHeight || 800;

    const count = config.counts?.blobs ?? DEFAULT_BLOB_COUNT;
    const radiusRange = config.ranges?.blobRadius ?? DEFAULT_RADIUS_RANGE;
    const blobs = createBlobs(count, radiusRange, canvas.width, canvas.height, false);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    blobs.forEach((b) => b.draw(ctx));
  },

  animate({ container, config }: PosterContext, manager) {
    const canvas = container.querySelector('.physics-blobs__canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth || 800;
      canvas.height = container.clientHeight || 800;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const count = config.counts?.blobs ?? DEFAULT_BLOB_COUNT;
    const radiusRange = config.ranges?.blobRadius ?? DEFAULT_RADIUS_RANGE;
    const blobs = createBlobs(count, radiusRange, canvas.width, canvas.height, true);

    const stopLoop = manager.startAnimationLoop(() => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < blobs.length; i++) {
        blobs[i].iterate(canvas.width, canvas.height);
        for (let j = i + 1; j < blobs.length; j++) {
          blobs[i].react(blobs[j]);
          blobs[j].react(blobs[i]);
        }
      }

      blobs.forEach((b) => b.draw(ctx));
    });

    return () => {
      stopLoop();
      observer.disconnect();
    };
  },
});
