export interface Vec2 {
  x: number;
  y: number;
}

export function vec2(x: number, y: number): Vec2 {
  return { x, y };
}

export function add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function scale(v: Vec2, s: number): Vec2 {
  return { x: v.x * s, y: v.y * s };
}

export function length(v: Vec2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: Vec2, len = 1): Vec2 {
  const l = length(v);
  if (l === 0) return { x: 0, y: 0 };
  return { x: (v.x / l) * len, y: (v.y / l) * len };
}

export function distance(a: Vec2, b: Vec2): number {
  return length(sub(a, b));
}

export function angle(v: Vec2): number {
  return (Math.atan2(v.y, v.x) * 180) / Math.PI;
}

export function fromAngle(deg: number, len: number): Vec2 {
  const rad = (deg * Math.PI) / 180;
  return { x: Math.cos(rad) * len, y: Math.sin(rad) * len };
}

export function randomVec2(maxX: number, maxY: number): Vec2 {
  return { x: Math.random() * maxX, y: Math.random() * maxY };
}

/** Draw a smooth closed path through points using Catmull-Rom splines */
function drawSmoothClosedPath(ctx: CanvasRenderingContext2D, points: Vec2[]): void {
  const n = points.length;
  if (n < 3) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }

  ctx.closePath();
}

export class Blob {
  radius: number;
  point: Vec2;
  vector: Vec2;
  maxVec: number;
  numSegments: number;
  boundOffset: number[];
  boundOffsetBuff: number[];
  sidePoints: Vec2[];

  constructor(radius: number, position: Vec2, velocity: Vec2) {
    this.radius = radius;
    this.point = position;
    this.vector = velocity;
    this.maxVec = 15;
    this.numSegments = Math.floor(3 + Math.random() * 3);

    this.boundOffset = [];
    this.boundOffsetBuff = [];
    this.sidePoints = [];

    for (let i = 0; i < this.numSegments; i++) {
      this.boundOffset.push(this.radius);
      this.boundOffsetBuff.push(this.radius);
      this.sidePoints.push(vec2(0, 0));
    }
  }

  /** Update position, wrap at boundaries */
  iterate(w: number, h: number): void {
    this.checkBorders(w, h);
    this.updateShape();
    this.point = add(this.point, this.vector);
  }

  private checkBorders(w: number, h: number): void {
    if (this.point.x < -this.radius) this.point.x = w + this.radius;
    if (this.point.x > w + this.radius) this.point.x = -this.radius;
    if (this.point.y < -this.radius) this.point.y = h + this.radius;
    if (this.point.y > h + this.radius) this.point.y = -this.radius;
  }

  private updateShape(): void {
    for (let i = 0; i < this.numSegments; i++) {
      this.boundOffset[i] += (this.boundOffsetBuff[i] - this.boundOffset[i]) * 0.05;
    }
  }

  /** React to another blob (collision/deformation) */
  react(other: Blob): void {
    const dist = distance(this.point, other.point);
    const overlap = this.radius + other.radius - dist;
    if (overlap <= 0) return;

    const diff = sub(this.point, other.point);
    const pushVec = normalize(diff, overlap * 0.015);
    this.vector = add(this.vector, pushVec);

    // Clamp velocity
    const vel = length(this.vector);
    if (vel > this.maxVec) {
      this.vector = normalize(this.vector, this.maxVec);
    }

    // Deform shape
    const ang = angle(diff);
    for (let i = 0; i < this.numSegments; i++) {
      const segAngle = (360 / this.numSegments) * i;
      const angleDiff = Math.abs(segAngle - ((ang + 360) % 360));
      const proximity = Math.min(angleDiff, 360 - angleDiff) / 180;
      this.boundOffsetBuff[i] = this.radius * (1 - proximity * (overlap / this.radius) * 0.5);
    }
  }

  /** Render the blob on a canvas context */
  draw(ctx: CanvasRenderingContext2D): void {
    // Calculate segment points around the blob center
    for (let i = 0; i < this.numSegments; i++) {
      const ang = (360 / this.numSegments) * i;
      const offset = fromAngle(ang, this.boundOffset[i]);
      this.sidePoints[i] = add(this.point, offset);
    }

    // Draw smooth path
    const brightness = Math.floor(Math.random() * 10);
    ctx.fillStyle = `hsl(0, 0%, ${brightness}%)`;
    drawSmoothClosedPath(ctx, this.sidePoints);
    ctx.fill();
  }
}
