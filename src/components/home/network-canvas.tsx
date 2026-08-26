"use client";

import { useEffect, useRef } from "react";

// AI-style animated background: drifting nodes connected by edges that fade
// with distance, like a neural network. Theme-aware (reads --foreground),
// DPR-aware, pauses when off-screen, and renders a single static frame when
// the user prefers reduced motion.

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const LINK_DISTANCE = 150; // px — max edge length
const CURSOR_DISTANCE = 180; // px — cursor links reach a bit further
const MAX_SPEED = 0.25; // px per frame — slow drift

export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    const cursor = { x: -9999, y: -9999 };

    // Theme color: --foreground is an "H S% L%" triplet (see globals.css).
    let ink = "240 10% 5%";
    const readTheme = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
      if (value) ink = value;
    };
    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const seed = () => {
      // Node density scales with area so phones stay light.
      const count = Math.min(
        110,
        Math.max(40, Math.round((width * height) / 16000))
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 * MAX_SPEED,
        vy: (Math.random() - 0.5) * 2 * MAX_SPEED,
        r: 1 + Math.random() * 1.4,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Move and wrap nodes around the edges.
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      // Edges between nearby nodes; alpha falls off with distance.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `hsl(${ink} / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Links from nodes to the cursor, slightly brighter.
        const cdx = a.x - cursor.x;
        const cdy = a.y - cursor.y;
        const cdist = Math.hypot(cdx, cdy);
        if (cdist < CURSOR_DISTANCE) {
          const alpha = (1 - cdist / CURSOR_DISTANCE) * 0.5;
          ctx.strokeStyle = `hsl(${ink} / ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(cursor.x, cursor.y);
          ctx.stroke();
        }

        // Node dot.
        ctx.fillStyle = `hsl(${ink} / 0.5)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cleanupVisibility: (() => void) | undefined;
    if (prefersReduced) {
      draw(); // one static frame, no animation loop
    } else {
      const loop = () => {
        if (running) draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // Pause when the hero scrolls out of view.
      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          running = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      visibilityObserver.observe(canvas);

      cleanupVisibility = () => visibilityObserver.disconnect();
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      cursor.x = -9999;
      cursor.y = -9999;
    };
    // Listen on the parent section so text selection above the canvas
    // (pointer-events-none) still drives the cursor links.
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      cleanupVisibility?.();
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
