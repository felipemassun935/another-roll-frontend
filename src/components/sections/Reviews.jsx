import { useEffect, useRef } from 'react';

function Stars({ n }) {
  return (
    <span className="stars text-sm">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
  );
}

export default function Reviews({ game }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.1 }
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
        className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-wide"
        style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
      >
        Players Love It
      </h2>
      <p className="text-center mb-16" style={{ color: game.theme.muted }}>
        Real reviews from our community
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {game.reviews.map((r, i) => (
          <div
            key={i}
            className="rounded-2xl p-7 flex flex-col gap-4"
            style={{
              background: game.theme.cardBg,
              border: `1px solid ${game.theme.border}`,
            }}
          >
            <Stars n={r.rating} />
            <p
              className="text-sm leading-relaxed italic flex-1"
              style={{ color: game.theme.text }}
            >
              "{r.text}"
            </p>
            <p className="text-xs font-semibold" style={{ color: game.theme.muted }}>
              — {r.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
