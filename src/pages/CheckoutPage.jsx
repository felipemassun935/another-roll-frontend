import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const INPUT_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#f0f0f0',
  padding: '12px 16px',
  width: '100%',
  outline: 'none',
  fontSize: '14px',
  transition: 'border-color 0.2s',
};

function Field({ label, type = 'text', placeholder, span, value, onChange }) {
  return (
    <div className={span === 2 ? 'col-span-2' : ''}>
      <label className="block text-xs text-white/40 mb-2 tracking-wide uppercase">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={INPUT_STYLE}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart, setIsOpen } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: '',
    shipping: 'standard', cardNumber: '', expiry: '', cvv: '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#080810', color: '#f0f0f0' }}
      >
        <div className="fade-in-up max-w-md">
          <div className="text-7xl mb-8">🎲</div>
          <h1
            className="text-4xl font-black mb-4 tracking-wide"
            style={{ fontFamily: 'Cinzel, serif', color: '#c4b5fd' }}
          >
            Order Placed!
          </h1>
          <p className="text-white/50 leading-relaxed mb-10">
            Your games are on their way. Check your inbox for a confirmation email. Time to clear the table!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-10 py-4 rounded-2xl font-bold tracking-wider text-sm transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              color: '#e0e0ff',
              fontFamily: 'Cinzel, serif',
              boxShadow: '0 8px 30px rgba(124,58,237,0.35)',
            }}
          >
            Roll Again
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#080810', color: '#f0f0f0' }}
      >
        <p className="text-white/30 mb-6">Your cart is empty.</p>
        <button onClick={() => navigate('/store')} className="underline text-white/50">
          Go to store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080810', color: '#f0f0f0' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(8,8,16,0.9)',
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
          onClick={() => { setIsOpen(true); }}
          className="text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          ← Edit cart
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div>
            <h1
              className="text-3xl font-black tracking-wide mb-1"
              style={{ fontFamily: 'Cinzel, serif', color: '#f8f4e8' }}
            >
              Checkout
            </h1>
            <p className="text-sm text-white/30">All fields required</p>
          </div>

          {/* Contact */}
          <fieldset>
            <legend
              className="text-xs uppercase tracking-widest text-white/40 mb-5 pb-2 w-full"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              Contact
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name" placeholder="Jane Smith" span={2} value={form.name} onChange={set('name')} />
              <Field label="Email" type="email" placeholder="jane@example.com" span={2} value={form.email} onChange={set('email')} />
            </div>
          </fieldset>

          {/* Shipping address */}
          <fieldset>
            <legend
              className="text-xs uppercase tracking-widest text-white/40 mb-5 pb-2 w-full"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              Shipping Address
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Address" placeholder="123 Main St" span={2} value={form.address} onChange={set('address')} />
              <Field label="City" placeholder="Buenos Aires" value={form.city} onChange={set('city')} />
              <Field label="ZIP / Postal Code" placeholder="1001" value={form.zip} onChange={set('zip')} />
              <Field label="Country" placeholder="Argentina" span={2} value={form.country} onChange={set('country')} />
            </div>
          </fieldset>

          {/* Shipping method */}
          <fieldset>
            <legend
              className="text-xs uppercase tracking-widest text-white/40 mb-5 pb-2 w-full"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              Shipping Method
            </legend>
            <div className="flex flex-col gap-3">
              {[
                { id: 'standard', label: 'Standard Shipping', sub: '5–10 business days', price: 'Free' },
                { id: 'express', label: 'Express Shipping', sub: '2–3 business days', price: '$9.99' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: form.shipping === opt.id ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${form.shipping === opt.id ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={opt.id}
                    checked={form.shipping === opt.id}
                    onChange={set('shipping')}
                    className="accent-violet-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/80">{opt.label}</p>
                    <p className="text-xs text-white/30">{opt.sub}</p>
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: form.shipping === opt.id ? '#c4b5fd' : '#ffffff60' }}
                  >
                    {opt.price}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset>
            <legend
              className="text-xs uppercase tracking-widest text-white/40 mb-5 pb-2 w-full"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              Payment
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Card Number" placeholder="1234 5678 9012 3456" span={2} value={form.cardNumber} onChange={set('cardNumber')} />
              <Field label="Expiry Date" placeholder="MM / YY" value={form.expiry} onChange={set('expiry')} />
              <Field label="CVV" placeholder="123" value={form.cvv} onChange={set('cvv')} />
            </div>
          </fieldset>

          <button
            type="submit"
            className="py-5 rounded-2xl font-bold tracking-wider text-base transition-all hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              color: '#e0e0ff',
              fontFamily: 'Cinzel, serif',
              boxShadow: '0 8px 40px rgba(124,58,237,0.4)',
            }}
          >
            Place Order · ${(total + (form.shipping === 'express' ? 9.99 : 0)).toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <div
            className="rounded-2xl p-6 flex flex-col gap-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h2
              className="text-base font-bold tracking-wide"
              style={{ fontFamily: 'Cinzel, serif', color: '#f0f0f0' }}
            >
              Order Summary
            </h2>

            <div className="flex flex-col gap-3">
              {items.map(({ game, quantity }) => (
                <div key={game.id} className="flex items-center gap-3">
                  <span className="text-2xl">{game.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: game.theme.accent }}
                    >
                      {game.name}
                    </p>
                    <p className="text-xs text-white/30">Qty {quantity}</p>
                  </div>
                  <p className="text-sm text-white/70 flex-shrink-0">
                    ${(game.price * quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-2 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex justify-between text-sm text-white/40">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/40">
                <span>Shipping</span>
                <span>{form.shipping === 'express' ? '$9.99' : 'Free'}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white/90 mt-1">
                <span>Total</span>
                <span style={{ fontFamily: 'Cinzel, serif' }}>
                  ${(total + (form.shipping === 'express' ? 9.99 : 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
