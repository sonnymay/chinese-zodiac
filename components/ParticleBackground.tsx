'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'ember' | 'lantern' | 'petal';
  angle: number;
  spin: number;
  life: number;
  maxLife: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function randomColor(): string {
      const colors = [
        'rgba(201,168,76,',   // gold
        'rgba(220,50,50,',    // red
        'rgba(255,200,80,',   // amber
        'rgba(180,100,30,',   // dark gold
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function spawnParticle(): Particle {
      const type = Math.random() < 0.07 ? 'lantern' : Math.random() < 0.3 ? 'petal' : 'ember';
      return {
        x: Math.random() * (canvas?.width ?? 1200),
        y: (canvas?.height ?? 800) + 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.5 + 0.3),
        size: type === 'lantern' ? Math.random() * 6 + 4
              : type === 'petal'  ? Math.random() * 4 + 2
              : Math.random() * 2 + 1,
        opacity: type === 'lantern' ? 0.55 : 0.4,
        color: randomColor(),
        type,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        life: 0,
        maxLife: type === 'lantern' ? Math.random() * 400 + 300
               : Math.random() * 200 + 100,
      };
    }

    function drawLantern(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
      grd.addColorStop(0, p.color + (p.opacity * 1.2) + ')');
      grd.addColorStop(0.5, p.color + (p.opacity * 0.7) + ')');
      grd.addColorStop(1, p.color + '0)');

      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.2, p.size * 1.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lantern glow halo
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color + '0.6)';
      ctx.fillStyle = p.color + (p.opacity * 0.9) + ')';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.6, p.size * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawPetal(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawEmber(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = p.opacity;

      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grd.addColorStop(0, p.color + p.opacity + ')');
      grd.addColorStop(1, p.color + '0)');

      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = p.color + (Math.min(1, p.opacity * 1.5)) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles (throttled)
      if (Math.random() < 0.25) particles.push(spawnParticle());

      // Cap particle count
      while (particles.length > 80) particles.shift();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.3;
        p.y += p.vy;
        p.angle += p.spin;
        p.life++;

        // Fade in / out
        if (p.life < 20) {
          p.opacity = (p.type === 'lantern' ? 0.55 : 0.4) * (p.life / 20);
        } else if (p.life > p.maxLife * 0.8) {
          p.opacity *= 0.97;
        }

        if (p.life >= p.maxLife || p.y < -40 || p.opacity < 0.01) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'lantern') drawLantern(p);
        else if (p.type === 'petal') drawPetal(p);
        else drawEmber(p);
      }

      animId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
