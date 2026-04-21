import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dice from './components/Dice';
import GamePage from './components/GamePage';
import CartDrawer from './components/CartDrawer';
import { useCart } from './context/CartContext';
import StorePage from './pages/StorePage';
import CheckoutPage from './pages/CheckoutPage';

const FALLBACK_GAMES = [
  {
    id: 1, name: 'Ember Siege', tagline: 'Forge your empire. Burn the rest.',
    description: 'A brutal castle siege game of cunning alliances and calculated betrayal.',
    players: '2–4', duration: '60–90 min', age: '14+', price: 49.99, emoji: '🏰',
    theme: { bg: '#0a0401', primary: '#dc2626', secondary: '#ea580c', accent: '#fbbf24', text: '#fef3c7', muted: 'rgba(254,243,199,0.5)', diceBase: '#7f1d1d', dotColor: '#fbbf24', glow: 'rgba(220,38,38,0.4)', cardBg: 'rgba(220,38,38,0.08)', border: 'rgba(251,191,36,0.2)' },
    features: [{ icon: '⚔️', title: 'Asymmetric Factions', desc: 'Five unique factions with completely different siege mechanics.' }, { icon: '🗺️', title: 'Modular Battlefields', desc: 'Interlocking terrain tiles create a new puzzle every session.' }, { icon: '🤝', title: 'Alliance & Betrayal', desc: 'Form pacts, share resources — then break them at the perfect moment.' }],
    steps: [{ n: 1, title: 'Choose Your Faction', desc: 'Pick one of five warlord factions.' }, { n: 2, title: 'Build Your Forces', desc: 'Draft siege engines and fortifications.' }, { n: 3, title: 'Storm the Walls', desc: 'Move and attack across the battlefield.' }, { n: 4, title: 'Claim the Throne', desc: 'First to hold the central fortress wins.' }],
    reviews: [{ author: 'Marcus T.', rating: 5, text: 'Best siege game I\'ve played.' }, { author: 'Sara K.', rating: 5, text: 'My group won\'t stop playing.' }, { author: 'Luis R.', rating: 4, text: 'Incredible depth.' }],
  },
  {
    id: 2, name: 'Frostfall', tagline: 'Survive the endless winter. Together — or alone.',
    description: 'An Arctic survival strategy game where the cold is as deadly as your rivals.',
    players: '1–4', duration: '45–75 min', age: '12+', price: 44.99, emoji: '❄️',
    theme: { bg: '#010712', primary: '#1d4ed8', secondary: '#0ea5e9', accent: '#bae6fd', text: '#e0f2fe', muted: 'rgba(224,242,254,0.5)', diceBase: '#1e3a5f', dotColor: '#bae6fd', glow: 'rgba(14,165,233,0.4)', cardBg: 'rgba(14,165,233,0.08)', border: 'rgba(186,230,253,0.2)' },
    features: [{ icon: '🏔️', title: 'Solo & Co-op', desc: 'Play alone or cooperate with up to 4 survivors.' }, { icon: '🌨️', title: 'Living Weather', desc: 'Dynamic storm cards change conditions each round.' }, { icon: '🔥', title: 'Resource Scarcity', desc: 'Food, wood, and warmth are never enough.' }],
    steps: [{ n: 1, title: 'Set Up Camp', desc: 'Place shelter tiles and starting resources.' }, { n: 2, title: 'Explore & Gather', desc: 'Send survivors to find food and wood.' }, { n: 3, title: 'Weather the Storm', desc: 'Draw storm cards and manage the cold tracker.' }, { n: 4, title: 'Reach the Beacon', desc: 'Collect signal parts before the final blizzard.' }],
    reviews: [{ author: 'Yuki M.', rating: 5, text: 'The solo mode is outstanding.' }, { author: 'Finn O.', rating: 5, text: 'Perfectly tense atmosphere.' }, { author: 'Priya S.', rating: 4, text: 'Great balance of accessible and deep.' }],
  },
  {
    id: 3, name: 'Verdant Rise', tagline: 'From seed to civilization.',
    description: 'A lush nature-civilization builder where you grow forests and guide your society.',
    players: '2–5', duration: '60–120 min', age: '10+', price: 54.99, emoji: '🌿',
    theme: { bg: '#010a02', primary: '#15803d', secondary: '#65a30d', accent: '#bef264', text: '#f0fdf4', muted: 'rgba(240,253,244,0.5)', diceBase: '#14532d', dotColor: '#bef264', glow: 'rgba(21,128,61,0.4)', cardBg: 'rgba(21,128,61,0.08)', border: 'rgba(190,242,100,0.2)' },
    features: [{ icon: '🌳', title: 'Living Ecosystem', desc: 'Plant forests that spread and generate resources.' }, { icon: '🏛️', title: 'Civilization Track', desc: 'Advance from stone tools to green architecture.' }, { icon: '🦋', title: 'Symbiosis Cards', desc: 'Inter-species cards create powerful chain reactions.' }],
    steps: [{ n: 1, title: 'Seed the Land', desc: 'Place starting forest tile and settlement markers.' }, { n: 2, title: 'Grow Your Ecosystem', desc: 'Play flora cards to expand your territory.' }, { n: 3, title: 'Advance Your Civ', desc: 'Spend nature tokens for new technologies.' }, { n: 4, title: 'Achieve Harmony', desc: 'Balance ecosystem and civ score to win.' }],
    reviews: [{ author: 'Amara L.', rating: 5, text: 'Most unique civ game ever played.' }, { author: 'Tom B.', rating: 5, text: 'My whole family plays it every Sunday.' }, { author: 'Chen W.', rating: 5, text: 'Elegant engine and stunning components.' }],
  },
  {
    id: 4, name: 'Void Drift', tagline: 'The galaxy is vast. So is your ambition.',
    description: 'A deep-space exploration and trading game where you pilot through unknown sectors.',
    players: '2–6', duration: '90–150 min', age: '14+', price: 64.99, emoji: '🚀',
    theme: { bg: '#01000c', primary: '#7c3aed', secondary: '#06b6d4', accent: '#c4b5fd', text: '#f5f3ff', muted: 'rgba(245,243,255,0.5)', diceBase: '#3b0764', dotColor: '#c4b5fd', glow: 'rgba(124,58,237,0.5)', cardBg: 'rgba(124,58,237,0.08)', border: 'rgba(196,181,253,0.2)' },
    features: [{ icon: '🌌', title: 'Procedural Galaxy', desc: 'Hex sector tiles drawn blind make every galaxy unique.' }, { icon: '👽', title: 'Alien Diplomacy', desc: 'Eight alien species with distinct agendas.' }, { icon: '📈', title: 'Dynamic Markets', desc: 'Resource prices shift based on all player actions.' }],
    steps: [{ n: 1, title: 'Launch Your Ship', desc: 'Choose Explorer, Merchant, or Corsair class.' }, { n: 2, title: 'Chart the Unknown', desc: 'Reveal hex sectors as you explore.' }, { n: 3, title: 'Trade & Negotiate', desc: 'Buy low, sell high, and outmaneuver rivals.' }, { n: 4, title: 'Dominate the Void', desc: 'Reach the Victory Point threshold first.' }],
    reviews: [{ author: 'Nadia V.', rating: 5, text: 'Best space game since Twilight Imperium.' }, { author: 'Jake T.', rating: 5, text: 'The market system is genius.' }, { author: 'Riya P.', rating: 4, text: 'The alien diplomacy creates amazing stories.' }],
  },
  {
    id: 5, name: 'Goldrush', tagline: 'Strike it rich. Or strike your rivals.',
    description: 'A cutthroat economic race to the richest claim in the West.',
    players: '2–5', duration: '45–90 min', age: '10+', price: 39.99, emoji: '⛏️',
    theme: { bg: '#080500', primary: '#b45309', secondary: '#d97706', accent: '#fde68a', text: '#fffbeb', muted: 'rgba(255,251,235,0.5)', diceBase: '#78350f', dotColor: '#fde68a', glow: 'rgba(180,83,9,0.4)', cardBg: 'rgba(217,119,6,0.08)', border: 'rgba(253,230,138,0.2)' },
    features: [{ icon: '🪙', title: 'Live Auctions', desc: 'Claim tokens go to the highest bidder — bluff and overbid.' }, { icon: '🤠', title: 'Outlaw Hire', desc: 'Hire desperados to raid opponents\' stagecoaches.' }, { icon: '📉', title: 'Gold Market Swings', desc: 'Gold value fluctuates — time your sales carefully.' }],
    steps: [{ n: 1, title: 'Stake Your Claim', desc: 'Bid for mining claims at auction.' }, { n: 2, title: 'Dig for Gold', desc: 'Play mining cards to extract ore.' }, { n: 3, title: 'Hit the Market', desc: 'Sell your haul when prices peak.' }, { n: 4, title: 'Cash Out & Win', desc: 'First to $10,000 in the bank wins.' }],
    reviews: [{ author: 'Devon C.', rating: 5, text: 'Perfect gateway game.' }, { author: 'Ingrid B.', rating: 5, text: 'The auction phase is absolute chaos.' }, { author: 'Omar F.', rating: 4, text: 'Fast, mean, and hilarious.' }],
  },
  {
    id: 6, name: 'Abyssal Tide', tagline: 'Rule the depths. Command the seas.',
    description: 'An epic naval warfare game set across uncharted oceans.',
    players: '2–4', duration: '60–100 min', age: '12+', price: 54.99, emoji: '⚓',
    theme: { bg: '#00060a', primary: '#0f766e', secondary: '#0891b2', accent: '#99f6e4', text: '#f0fdfa', muted: 'rgba(240,253,250,0.5)', diceBase: '#134e4a', dotColor: '#99f6e4', glow: 'rgba(15,118,110,0.4)', cardBg: 'rgba(8,145,178,0.08)', border: 'rgba(153,246,228,0.2)' },
    features: [{ icon: '⚓', title: 'Fleet Command', desc: 'Outfit frigates, galleons, and submarines with unique loadouts.' }, { icon: '🗺️', title: 'Uncharted Waters', desc: 'Hex ocean tiles hide monsters, winds, and treasures.' }, { icon: '💣', title: 'Broadside Combat', desc: 'Wind direction and firing arcs make every battle tactical.' }],
    steps: [{ n: 1, title: 'Assemble Your Fleet', desc: 'Draft ship cards and outfit them with cannons and crew.' }, { n: 2, title: 'Chart the Ocean', desc: 'Explore hex tiles to uncover sea lanes and dangers.' }, { n: 3, title: 'Engage in Battle', desc: 'Position ships to maximize firing arcs.' }, { n: 4, title: 'Control the Seas', desc: 'Dominate three sea lanes to claim victory.' }],
    reviews: [{ author: 'Clara M.', rating: 5, text: 'The wind mechanics make every battle feel real.' }, { author: 'Rafe D.', rating: 5, text: 'Most cinematic board game experience I\'ve had.' }, { author: 'Sonja H.', rating: 4, text: 'Gorgeous components — the ship minis are worth the price.' }],
  },
];

function DiceLanding({ games }) {
  const [rolledFace, setRolledFace] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const currentGame = rolledFace ? games.find((g) => g.id === rolledFace) ?? null : null;

  const handleRoll = (face) => setRolledFace(face);

  const handleReroll = () => {
    setRolledFace(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bgColor = currentGame ? currentGame.theme.bg : '#08080f';

  return (
    <div
      className="page-bg min-h-screen"
      style={{ backgroundColor: bgColor, color: currentGame?.theme.text ?? '#f0f0f0' }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: `${bgColor}cc`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${currentGame?.theme.border ?? 'rgba(255,255,255,0.06)'}`,
        }}
      >
        <button
          onClick={handleReroll}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl">🎲</span>
          <span
            className="text-lg font-black tracking-widest"
            style={{
              fontFamily: 'Cinzel, serif',
              color: currentGame?.theme.accent ?? '#f0f0f0',
            }}
          >
            Another-Roll
          </span>
        </button>

        <div className="flex items-center gap-3">
          {currentGame && (
            <button
              onClick={handleReroll}
              className="text-sm px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                background: currentGame.theme.cardBg,
                border: `1px solid ${currentGame.theme.border}`,
                color: currentGame.theme.accent,
              }}
            >
              Roll Again
            </button>
          )}
          <HeaderActions theme={currentGame?.theme} />
        </div>
      </header>

      {/* Main content */}
      {!currentGame ? (
        /* ── Landing ── */
        <main className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative">
          {/* Background star-like particles */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  background: '#fff',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                }}
              />
            ))}
          </div>

          <div className="text-center mb-12 relative z-10">
            <h1
              className="text-5xl md:text-6xl font-black tracking-widest mb-4"
              style={{ fontFamily: 'Cinzel, serif', color: '#f8f4e8' }}
            >
              Another-Roll
            </h1>
            <p className="text-lg text-white/40 tracking-widest uppercase text-sm">
              Your next obsession is one roll away
            </p>
          </div>

          <div className="relative z-10">
            <Dice
              game={null}
              onRoll={handleRoll}
              isRolling={isRolling}
              setIsRolling={setIsRolling}
            />
          </div>

          <p
            className="mt-10 text-white/30 text-sm tracking-widest uppercase animate-pulse relative z-10"
          >
            Click to roll
          </p>

          <div
            className="mt-16 text-center text-white/20 text-xs tracking-widest uppercase relative z-10"
          >
            6 unique games · One roll decides
          </div>
        </main>
      ) : (
        /* ── Game Page ── */
        <main className="pt-20">
          <GamePage
            key={currentGame.id}
            game={currentGame}
            isRolling={isRolling}
            setIsRolling={setIsRolling}
            onRoll={handleRoll}
            onReroll={handleReroll}
          />
        </main>
      )}
    </div>
  );
}

function HeaderActions({ theme }) {
  const navigate = useNavigate();
  const { count, setIsOpen } = useCart();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate('/store')}
        className="text-sm px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
        style={{
          background: theme ? theme.cardBg : 'rgba(255,255,255,0.06)',
          border: `1px solid ${theme ? theme.border : 'rgba(255,255,255,0.1)'}`,
          color: theme ? theme.accent : '#e0e0e0',
        }}
      >
        Store
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: theme ? theme.cardBg : 'rgba(255,255,255,0.06)',
          border: `1px solid ${theme ? theme.border : 'rgba(255,255,255,0.1)'}`,
          color: theme ? theme.muted : 'rgba(255,255,255,0.5)',
        }}
      >
        🛒
        {count > 0 && (
          <span
            className="px-1.5 py-0.5 rounded-full text-xs font-bold"
            style={{ background: '#7c3aed', color: '#c4b5fd' }}
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
}

export default function App() {
  const [games, setGames] = useState(FALLBACK_GAMES);

  useEffect(() => {
    fetch('/api/games')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length === 6 && setGames(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<DiceLanding games={games} />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}
