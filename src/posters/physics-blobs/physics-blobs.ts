import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, prefersReducedMotion } from '../../utilities/animation';
import { Blob, randomVec2, vec2, scale } from '../../utilities/physics';
import './physics-blobs.css';

const NUM_BLOBS = 12;

export function createPhysicsBlobs(
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
): Cleanup {
  const manager = new IntervalManager();

  container.classList.add('poster', 'physics-blobs');

  const canvas = document.createElement('canvas');
  canvas.classList.add('physics-blobs__canvas');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Size canvas to container
  const resize = () => {
    canvas.width = container.clientWidth || window.innerWidth;
    canvas.height = container.clientHeight || window.innerHeight;
  };
  resize();

  const observer = new ResizeObserver(resize);
  observer.observe(container);

  // Create blobs
  const blobs: Blob[] = [];
  for (let i = 0; i < NUM_BLOBS; i++) {
    const radius = 30 + Math.random() * 60;
    const pos = randomVec2(canvas.width, canvas.height);
    const vel = scale(vec2(Math.random() - 0.5, Math.random() - 0.5), 6);
    blobs.push(new Blob(radius, pos, vel));
  }

  // Static fallback: draw once
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    blobs.forEach((b) => b.draw(ctx));
    observer.disconnect();
    return () => manager.cleanup();
  }

  // Animation loop
  const stopLoop = manager.startAnimationLoop(() => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Physics step
    for (let i = 0; i < blobs.length; i++) {
      blobs[i].iterate(canvas.width, canvas.height);
      for (let j = i + 1; j < blobs.length; j++) {
        blobs[i].react(blobs[j]);
        blobs[j].react(blobs[i]);
      }
    }

    // Draw
    blobs.forEach((b) => b.draw(ctx));
  });

  manager.watchForRemoval(container);
  return () => {
    stopLoop();
    observer.disconnect();
    manager.cleanup();
  };
}
