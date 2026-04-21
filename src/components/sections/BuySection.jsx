import { useEffect, useRef } from 'react';

export default function BuySection({ game, onReroll }) {
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
      className="reveal py-24 px-6 text-center"
      style={{
        background: `linear-gradient(to bottom, transparent, ${game.theme.primary}22)`,
      }}
    >
      <div className="max-w-lg mx-auto">
        <span className="text-6xl mb-6 block">{game.emoji}</span>
        <h2
          className="text-4xl md:text-5xl font-black mb-3 tracking-wide"
          style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
        >
          {game.name}
        </h2>
        <p className="text-lg mb-2" style={{ color: game.theme.muted }}>
          {game.players} players · {game.duration} · Ages {game.age}
        </p>
        <p
          className="text-5xl font-bold mb-10"
          style={{ color: game.theme.text, fontFamily: 'Cinzel, serif' }}
        >
          ${game.price.toFixed(2)}
        </p>

        <button
          className="px-12 py-5 rounded-2xl text-xl font-bold tracking-wider mb-6 w-full max-w-xs transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${game.theme.primary}, ${game.theme.secondary})`,
            color: game.theme.accent,
            fontFamily: 'Cinzel, serif',
            boxShadow: `0 8px 40px ${game.theme.glow}`,
          }}
        >
          Add to Cart
        </button>

        <div className="mt-8">
          <button
            onClick={onReroll}
            className="text-sm underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: game.theme.text }}
          >
            Roll again — discover another game
          </button>
        </div>
      </div>
    </section>
  );
}
