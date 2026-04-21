import { useEffect, useRef } from 'react';
import Dice from './Dice';
import Features from './sections/Features';
import HowToPlay from './sections/HowToPlay';
import Reviews from './sections/Reviews';
import BuySection from './sections/BuySection';

export default function GamePage({ game, isRolling, setIsRolling, onRoll, onReroll }) {
  const contentRef = useRef(null);

  // Scroll hint after roll animation completes
  useEffect(() => {
    if (!game || isRolling) return;
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(t);
  }, [game?.id]);

  return (
    <div className="fade-in">
      {/* Hero — dice + game identity */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${game.theme.primary}30 0%, transparent 70%)`,
        }}
      >
        {/* Game name above dice */}
        <div className="text-center mb-10">
          <p
            className="text-sm uppercase tracking-[0.3em] mb-3 font-semibold"
            style={{ color: game.theme.secondary }}
          >
            You rolled
          </p>
          <h1
            className="text-5xl md:text-7xl font-black tracking-wide leading-none mb-4"
            style={{
              color: game.theme.accent,
              fontFamily: 'Cinzel, serif',
              textShadow: `0 0 40px ${game.theme.glow}`,
            }}
          >
            {game.name}
          </h1>
          <p
            className="text-lg md:text-xl italic"
            style={{ color: game.theme.muted }}
          >
            {game.tagline}
          </p>
        </div>

        {/* Dice */}
        <Dice
          game={game}
          onRoll={onRoll}
          isRolling={isRolling}
          setIsRolling={setIsRolling}
        />

        {/* Quick stats */}
        {!isRolling && (
          <div
            className="flex gap-6 mt-10 text-sm fade-in"
            style={{ color: game.theme.muted }}
          >
            <span>👥 {game.players} players</span>
            <span>⏱ {game.duration}</span>
            <span>🎂 Ages {game.age}</span>
          </div>
        )}

        {/* Scroll indicator */}
        {!isRolling && (
          <div className="absolute bottom-10 flex flex-col items-center gap-2 bounce-arrow fade-in">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: game.theme.muted }}
            >
              Scroll to explore
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: game.theme.secondary }}
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}
      </section>

      {/* Content sections */}
      <div ref={contentRef}>
        <Features game={game} />

        {/* Divider */}
        <div
          className="max-w-xl mx-auto h-px opacity-20"
          style={{ background: game.theme.accent }}
        />

        <HowToPlay game={game} />

        <div
          className="max-w-xl mx-auto h-px opacity-20"
          style={{ background: game.theme.accent }}
        />

        <Reviews game={game} />

        <BuySection game={game} onReroll={onReroll} />
      </div>
    </div>
  );
}
