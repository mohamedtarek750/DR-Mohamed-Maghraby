'use client';

import { useEffect, useRef } from 'react';

type Node = {
  /** Scattered origin — where the point sits before anything is understood. */
  cx: number;
  cy: number;
  /** Resolved position on a calm lattice. */
  ox: number;
  oy: number;
  /** Drift phase, so the field breathes instead of sitting still. */
  phase: number;
  speed: number;
  r: number;
};

/**
 * The site's one recurring visual idea: scattered points that settle into an
 * ordered lattice as the page is read. It is drawn on a canvas so the cost is
 * a single composited layer, it pauses when scrolled out of view, and it
 * renders a still, already-ordered frame when reduced motion is requested.
 */
export default function ThoughtField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = false;
    let order = reduced ? 1 : 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fewer points on small screens: the effect should never cost scroll.
      const density = width < 640 ? 13000 : width < 1100 ? 11000 : 9500;
      const count = Math.max(18, Math.min(72, Math.round((width * height) / density)));

      const cols = Math.ceil(Math.sqrt(count * (width / Math.max(height, 1))));
      const rows = Math.ceil(count / Math.max(cols, 1));

      nodes = Array.from({ length: count }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Lattice with a small deterministic waver, so "order" still feels human.
        const ox = ((col + 0.5) / cols) * width + Math.sin(row * 1.7) * 9;
        const oy = ((row + 0.5) / Math.max(rows, 1)) * height + Math.cos(col * 1.3) * 9;
        return {
          cx: Math.random() * width,
          cy: Math.random() * height,
          ox,
          oy,
          phase: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.25,
          r: 1 + Math.random() * 1.4,
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time / 1000;
      const points = nodes.map((n) => {
        const drift = reduced ? 0 : 1;
        const x =
          n.cx + (n.ox - n.cx) * order + Math.sin(t * n.speed + n.phase) * 7 * drift;
        const y =
          n.cy + (n.oy - n.cy) * order + Math.cos(t * n.speed * 0.8 + n.phase) * 7 * drift;
        return { x, y, r: n.r };
      });

      // Threads between neighbours. They strengthen as the field resolves,
      // which is the whole point: connection follows understanding.
      const reach = Math.min(width, height) * (0.18 + order * 0.08);
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > reach) continue;
          const alpha = (1 - dist / reach) * (0.1 + order * 0.16);
          ctx.strokeStyle = `rgba(117, 132, 106, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      for (const p of points) {
        ctx.fillStyle = `rgba(58, 69, 53, ${(0.2 + order * 0.24).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onScroll = () => {
      if (reduced) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // Resolve over the first ~55% of the page, then hold.
      order = Math.max(0, Math.min(1, progress / 0.55));
    };

    const loop = (time: number) => {
      draw(time);
      if (running) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    build();
    onScroll();

    if (reduced) {
      draw(0);
    } else {
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { rootMargin: '120px' },
      );
      io.observe(canvas);

      const ro = new ResizeObserver(() => {
        build();
        draw(performance.now());
      });
      ro.observe(canvas);

      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        stop();
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('scroll', onScroll);
      };
    }

    const ro = new ResizeObserver(() => {
      build();
      draw(0);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
