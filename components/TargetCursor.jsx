'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TargetCursor = ({ targetSelector = '.cursor-target' }) => {
  const cursorRef = useRef(null);
  const outerCircleRef = useRef(null);
  const bladesRef = useRef([]);
  const centerBoxRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.style.cursor = 'none';

    const spinCursor = gsap.to(cursor, { rotation: '+=360', duration: 2, repeat: -1, ease: 'linear' });
    const spinCenterBox = gsap.to(centerBoxRef.current, { rotation: '+=360', duration: 3, repeat: -1, ease: 'linear' });

    const moveCursor = e => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power3.out' });
    };
    window.addEventListener('mousemove', moveCursor);

    const hoverTargets = document.querySelectorAll(targetSelector);
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        const rect = target.getBoundingClientRect();
        const padding = 10;
        const size = Math.max(rect.width, rect.height) + padding * 2;

        // Lingkaran luar meluas + berubah warna emas
        gsap.to(outerCircleRef.current, { 
          width: size, 
          height: size, 
          duration: 0.3, 
          ease: 'power3.out',
          borderColor: '#FFD700'
        });

        // Shuriken blades sedikit memanjang + berubah warna emas
        bladesRef.current.forEach(blade => {
          gsap.to(blade, {
            width: size / 1.8,
            duration: 0.3,
            ease: 'power3.out',
            backgroundColor: '#FFD700'
          });
        });

        // Kotak putus-putus ikut muter + berubah warna emas
        gsap.to(centerBoxRef.current, {
          rotation: '+=45',
          duration: 0.3,
          ease: 'power3.out',
          borderColor: '#FFD700'
        });

        // Shuriken “nendang” → muter lebih cepat saat hover
        gsap.to(cursor, { rotation: '+=30', duration: 0.3, ease: 'power3.out' });
      });

      target.addEventListener('mouseleave', () => {
        // Kembali ke warna default putih
        gsap.to(outerCircleRef.current, { width: 80, height: 80, duration: 0.3, ease: 'power3.out', borderColor: '#ffffff' });
        bladesRef.current.forEach(blade => gsap.to(blade, { width: 50, duration: 0.3, ease: 'power3.out', backgroundColor: '#ffffff' }));
        gsap.to(centerBoxRef.current, { rotation: '+=0', duration: 0.3, ease: 'power3.out', borderColor: '#ffffff' });
      });
    });

    return () => {
      spinCursor.kill();
      spinCenterBox.kill();
      window.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = '';
    };
  }, [targetSelector]);

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-9999" style={{ willChange: 'transform' }}>
      {/* Lingkaran luar */}
      <div
        ref={outerCircleRef}
        style={{
          width: '70px',
          height: '70px',
          border: '2px solid #f3cb51',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxSizing: 'border-box'
        }}
      />

      {/* Shuriken blades */}
      {[0, 90, 180, 270].map((deg, i) => (
        <div
          key={i}
          ref={el => (bladesRef.current[i] = el)}
          style={{
            width: '50px',
            height: '6px',
            backgroundColor: '#000000',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${deg}deg)`,
            transformOrigin: '50% 50%'
          }}
        />
      ))}

      {/* Kotak putus-putus di tengah */}
      <div
        ref={centerBoxRef}
        style={{
          width: '20px',
          height: '20px',
          border: '2px dashed #ffffff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default TargetCursor;
