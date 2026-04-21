import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FALLBACK_GAMES = [
  { id:1, name:'Ember Siege', tagline:'Forge your empire. Burn the rest.', players:'2–4', duration:'60–90 min', age:'14+', price:49.99, emoji:'🏰', theme:{ bg:'#0a0401', primary:'#dc2626', secondary:'#ea580c', accent:'#fbbf24', text:'#fef3c7', muted:'rgba(254,243,199,0.5)', glow:'rgba(220,38,38,0.4)', cardBg:'rgba(220,38,38,0.08)', border:'rgba(251,191,36,0.2)' } },
  { id:2, name:'Frostfall', tagline:'Survive the endless winter. Together — or alone.', players:'1–4', duration:'45–75 min', age:'12+', price:44.99, emoji:'❄️', theme:{ bg:'#010712', primary:'#1d4ed8', secondary:'#0ea5e9', accent:'#bae6fd', text:'#e0f2fe', muted:'rgba(224,242,254,0.5)', glow:'rgba(14,165,233,0.4)', cardBg:'rgba(14,165,233,0.08)', border:'rgba(186,230,253,0.2)' } },
  { id:3, name:'Verdant Rise', tagline:'From seed to civilization.', players:'2–5', duration:'60–120 min', age:'10+', price:54.99, emoji:'🌿', theme:{ bg:'#010a02', primary:'#15803d', secondary:'#65a30d', accent:'#bef264', text:'#f0fdf4', muted:'rgba(240,253,244,0.5)', glow:'rgba(21,128,61,0.4)', cardBg:'rgba(21,128,61,0.08)', border:'rgba(190,242,100,0.2)' } },
  { id:4, name:'Void Drift', tagline:'The galaxy is vast. So is your ambition.', players:'2–6', duration:'90–150 min', age:'14+', price:64.99, emoji:'🚀', theme:{ bg:'#01000c', primary:'#7c3aed', secondary:'#06b6d4', accent:'#c4b5fd', text:'#f5f3ff', muted:'rgba(245,243,255,0.5)', glow:'rgba(124,58,237,0.5)', cardBg:'rgba(124,58,237,0.08)', border:'rgba(196,181,253,0.2)' } },
  { id:5, name:'Goldrush', tagline:'Strike it rich. Or strike your rivals.', players:'2–5', duration:'45–90 min', age:'10+', price:39.99, emoji:'⛏️', theme:{ bg:'#080500', primary:'#b45309', secondary:'#d97706', accent:'#fde68a', text:'#fffbeb', muted:'rgba(255,251,235,0.5)', glow:'rgba(180,83,9,0.4)', cardBg:'rgba(217,119,6,0.08)', border:'rgba(253,230,138,0.2)' } },
  { id:6, name:'Abyssal Tide', tagline:'Rule the depths. Command the seas.', players:'2–4', duration:'60–100 min', age:'12+', price:54.99, emoji:'⚓', theme:{ bg:'#00060a', primary:'#0f766e', secondary:'#0891b2', accent:'#99f6e4', text:'#f0fdfa', muted:'rgba(240,253,250,0.5)', glow:'rgba(15,118,110,0.4)', cardBg:'rgba(8,145,178,0.08)', border:'rgba(153,246,228,0.2)' } },
];

function GameCard({ game }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(game);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: `linear-gradient(160deg, #0d0d18 0%, ${game.theme.primary}18 100%)`,
        border: `1px solid ${game.theme.border}`,
        boxShadow: `0 4px 30px ${game.theme.glow}22`,
      }}
    >
      {/* Card top */}
      <div
        className="flex items-center justify-center py-10"
        style={{
          background: `radial-gradient(ellipse at center, ${game.theme.primary}30 0%, transparent 70%)`,
        }}
      >
        <span
          className="text-7xl"
          style={{ filter: `drop-shadow(0 0 20px ${game.theme.glow})` }}
        >
          {game.emoji}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-6 pb-6 gap-3">
        <div>
          <h3
            className="text-xl font-bold tracking-wide mb-1"
            style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
          >
            {game.name}
          </h3>
          <p className="text-sm italic" style={{ color: game.theme.muted }}>
            {game.tagline}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-2 text-xs"
          style={{ color: game.theme.muted }}
        >
          <span
            className="px-2 py-1 rounded-lg"
            style={{ background: game.theme.cardBg, border: `1px solid ${game.theme.border}` }}
          >
            👥 {game.players}
          </span>
          <span
            className="px-2 py-1 rounded-lg"
            style={{ background: game.theme.cardBg, border: `1px solid ${game.theme.border}` }}
          >
            ⏱ {game.duration}
          </span>
          <span
            className="px-2 py-1 rounded-lg"
            style={{ background: game.theme.cardBg, border: `1px solid ${game.theme.border}` }}
          >
            🎂 {game.age}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <span
            className="text-2xl font-black"
            style={{ fontFamily: 'Cinzel, serif', color: game.theme.text }}
          >
            ${game.price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: added
                ? `${game.theme.secondary}33`
                : `linear-gradient(135deg, ${game.theme.primary}, ${game.theme.secondary})`,
              color: added ? game.theme.accent : game.theme.accent,
              fontFamily: 'Cinzel, serif',
              boxShadow: added ? 'none' : `0 4px 20px ${game.theme.glow}`,
              border: added ? `1px solid ${game.theme.border}` : 'none',
            }}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  const [games, setGames] = useState(FALLBACK_GAMES);
  const { count, setIsOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/games')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length === 6 && setGames(data))
      .catch(() => {});
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#080810', color: '#f0f0f0' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(8,8,16,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-75 transition-opacity"
        >
          <span className="text-2xl">🎲</span>
          <span
            className="text-lg font-black tracking-widest"
            style={{ fontFamily: 'Cinzel, serif', color: '#f8f4e8' }}
          >
            Another-Roll
          </span>
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-white/5"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span>🛒</span>
          <span className="text-sm text-white/70">Cart</span>
          {count > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: '#7c3aed', color: '#c4b5fd' }}
            >
              {count}
            </span>
          )}
        </button>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <p
          className="text-sm uppercase tracking-[0.3em] mb-4 text-white/40"
        >
          The Collection
        </p>
        <h1
          className="text-5xl md:text-6xl font-black tracking-wide mb-4"
          style={{ fontFamily: 'Cinzel, serif', color: '#f8f4e8' }}
        >
          Our Games
        </h1>
        <p className="text-white/40 max-w-md mx-auto leading-relaxed">
          Six worlds. One dice. Pick your obsession — or let fate decide.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
        >
          ← Roll the dice to discover a game
        </button>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-8 text-xs text-white/20 tracking-widest uppercase"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        Another-Roll © {new Date().getFullYear()} · Roll Your Next Obsession
      </footer>
    </div>
  );
}
