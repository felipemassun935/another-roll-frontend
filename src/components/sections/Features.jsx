import { useEffect, useRef } from 'react';

export default function Features({ game }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="reveal py-24 px-6 max-w-5xl mx-auto"
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-wide"
        style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
      >
        What Makes It Special
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {game.features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{
              background: game.theme.cardBg,
              border: `1px solid ${game.theme.border}`,
            }}
          >
            <span className="text-4xl">{f.icon}</span>
            <h3
              className="text-xl font-semibold"
              style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
            >
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: game.theme.muted }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
