import { useEffect, useRef } from 'react';

export default function HowToPlay({ game }) {
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
      className="reveal py-24 px-6 max-w-4xl mx-auto"
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-wide"
        style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
      >
        How to Play
      </h2>

      <div className="flex flex-col gap-6">
        {game.steps.map((step) => (
          <div key={step.n} className="flex items-start gap-6">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                background: game.theme.primary,
                color: game.theme.accent,
                fontFamily: 'Cinzel, serif',
                boxShadow: `0 0 20px ${game.theme.glow}`,
              }}
            >
              {step.n}
            </div>
            <div className="pt-2">
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: game.theme.text, fontFamily: 'Cinzel, serif' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: game.theme.muted }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
