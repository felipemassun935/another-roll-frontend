import { useRef, useState, useCallback } from 'react';

const SIZE = 160;
const HALF = SIZE / 2;

// dots[face] = array of [x%, y%] grid positions
const DOTS = {
  1: [[50, 50]],
  2: [[75, 25], [25, 75]],
  3: [[75, 25], [50, 50], [25, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
};

// Container rotation that brings each face to the front
const FACE_TARGET = {
  1: { x: 0,    y: 0   },
  2: { x: 0,    y: -90 },
  3: { x: -90,  y: 0   },
  4: { x: 90,   y: 0   },
  5: { x: 0,    y: 90  },
  6: { x: 0,    y: 180 },
};

function DotLayout({ face, dotColor }) {
  return (
    <div className="relative w-full h-full">
      {DOTS[face].map(([px, py], i) => (
        <span
          key={i}
          className="dot absolute"
          style={{
            left: `calc(${px}% - 9px)`,
            top: `calc(${py}% - 9px)`,
            backgroundColor: dotColor,
            boxShadow: `0 0 8px ${dotColor}`,
          }}
        />
      ))}
    </div>
  );
}

function Face({ face, faceClass, faceStyle, dotColor }) {
  return (
    <div
      className={`dice-face ${faceClass}`}
      style={{ width: SIZE, height: SIZE, ...faceStyle }}
    >
      <DotLayout face={face} dotColor={dotColor} />
    </div>
  );
}

export default function Dice({ onRoll, isRolling, setIsRolling, game }) {
  // Start at a nice angled view
  const [rot, setRot] = useState({ x: -18, y: 28 });
  const isIdle = !game;

  const faceStyle = {
    background: game
      ? `linear-gradient(135deg, ${game.theme.diceBase}cc 0%, ${game.theme.diceBase} 100%)`
      : 'linear-gradient(135deg, #e8e0cc 0%, #cfc5a8 100%)',
    border: game
      ? `2px solid ${game.theme.accent}44`
      : '2px solid rgba(0,0,0,0.12)',
    boxShadow: game
      ? `inset -4px -4px 12px rgba(0,0,0,0.35), inset 4px 4px 12px rgba(255,255,255,0.08)`
      : `inset -4px -4px 12px rgba(0,0,0,0.18), inset 4px 4px 12px rgba(255,255,255,0.35)`,
  };

  const dotColor = game ? game.theme.dotColor : '#1a1a1a';

  const handleClick = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    const face = Math.floor(Math.random() * 6) + 1;
    const target = FACE_TARGET[face];

    // Compute new cumulative rotation that:
    // (a) adds ≥4 full spins from current position
    // (b) visually lands on the target face
    const spins = 4 + Math.floor(Math.random() * 2);
    const minX = rot.x + spins * 360;
    const minY = rot.y + spins * 360;

    const newX =
      Math.ceil((minX - target.x) / 360) * 360 + target.x;
    const newY =
      Math.ceil((minY - target.y) / 360) * 360 + target.y;

    setRot({ x: newX, y: newY });

    setTimeout(() => {
      setIsRolling(false);
      onRoll(face);
    }, 1400);
  }, [isRolling, rot, onRoll, setIsRolling]);

  const cubeTransform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;

  return (
    <div
      className={`dice-float ${isRolling ? '' : ''}`}
      style={{ display: 'inline-block' }}
    >
      <div
        className="dice-scene"
        style={{
          width: SIZE,
          height: SIZE,
          '--dice-glow': game?.theme.glow ?? 'rgba(255,255,255,0.2)',
        }}
        onClick={handleClick}
        role="button"
        aria-label="Roll the dice"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div
          className={`dice-cube ${isRolling ? 'is-rolling' : ''}`}
          style={{ transform: cubeTransform }}
        >
          {[1, 2, 3, 4, 5, 6].map((f) => (
            <Face
              key={f}
              face={f}
              faceClass={`face-${f}`}
              faceStyle={faceStyle}
              dotColor={dotColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
