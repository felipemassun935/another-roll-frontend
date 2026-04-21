import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function QtyControl({ value, onInc, onDec }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDec}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-colors hover:bg-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', color: '#e0e0e0' }}
      >
        −
      </button>
      <span className="w-5 text-center text-sm text-white/80">{value}</span>
      <button
        onClick={onInc}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-colors hover:bg-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', color: '#e0e0e0' }}
      >
        +
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, total, count } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: 'min(420px, 95vw)',
          background: '#0e0e16',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🛒</span>
            <span
              className="text-lg font-bold tracking-wide"
              style={{ fontFamily: 'Cinzel, serif', color: '#f0f0f0' }}
            >
              Your Cart
            </span>
            {count > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: '#7c3aed', color: '#c4b5fd' }}
              >
                {count}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-20">
              <span className="text-5xl opacity-30">🎲</span>
              <p className="text-white/30 text-sm">Your cart is empty.</p>
              <button
                onClick={() => { setIsOpen(false); navigate('/store'); }}
                className="text-sm underline underline-offset-4 text-white/50 hover:text-white/80 transition-colors"
              >
                Browse the store
              </button>
            </div>
          ) : (
            items.map(({ game, quantity }) => (
              <div
                key={game.id}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{
                  background: `${game.theme.cardBg}`,
                  border: `1px solid ${game.theme.border}`,
                }}
              >
                <span className="text-3xl flex-shrink-0">{game.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm truncate"
                    style={{ color: game.theme.accent, fontFamily: 'Cinzel, serif' }}
                  >
                    {game.name}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">
                    ${game.price.toFixed(2)} ea.
                  </p>
                  <div className="mt-2">
                    <QtyControl
                      value={quantity}
                      onInc={() => updateQuantity(game.id, quantity + 1)}
                      onDec={() => updateQuantity(game.id, quantity - 1)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <p className="text-sm font-bold text-white/80">
                    ${(game.price * quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(game.id)}
                    className="text-white/20 hover:text-red-400 transition-colors text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-6 flex flex-col gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Subtotal</span>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Cinzel, serif', color: '#f0f0f0' }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-white/30">Shipping calculated at checkout</p>

            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl font-bold tracking-wider text-sm transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                color: '#e0e0ff',
                fontFamily: 'Cinzel, serif',
                boxShadow: '0 8px 30px rgba(124,58,237,0.35)',
              }}
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => { setIsOpen(false); navigate('/store'); }}
              className="w-full py-3 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
