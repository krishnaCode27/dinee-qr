import React, { useEffect, useRef } from "react";

export default function AuroraParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Particle count: 35 for mobile (smooth 60fps), 55 for desktop
    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 52;

    const particles = [];
    const colors = [
      "rgba(212, 175, 55, ",   // Classic Gold
      "rgba(245, 229, 184, ",  // Light Champagne
      "rgba(229, 195, 101, ",  // Warm Gold
      "rgba(255, 255, 255, "   // Soft Shimmer White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.2,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward with gentle drift
        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulse opacity for twinkling effect
        const currentAlpha = Math.max(
          0.1,
          p.baseAlpha + Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.25
        );

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${currentAlpha})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        ctx.shadowBlur = p.radius * 2.5;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aurora-particles-canvas"
      aria-hidden="true"
    />
  );
}
