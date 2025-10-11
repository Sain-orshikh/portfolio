'use client';
import React, { useEffect, useRef } from 'react';

const CursorGradient: React.FC = () => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth animation using lerp (linear interpolation)
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Smooth follow effect with lerp - increased to 0.3 for faster response
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.3);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.3);

      if (gradientRef.current) {
        gradientRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="pointer-events-none fixed -top-[500px] -left-[500px] z-0 h-[1000px] w-[1000px] opacity-0 transition-opacity duration-300 lg:opacity-100"
      style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.04) 40%, transparent 60%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGradient;
