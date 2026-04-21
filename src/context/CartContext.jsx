import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((game) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.game.id === game.id);
      if (existing) {
        return prev.map((i) =>
          i.game.id === game.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { game, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((gameId) => {
    setItems((prev) => prev.filter((i) => i.game.id !== gameId));
  }, []);

  const updateQuantity = useCallback(
    (gameId, qty) => {
      if (qty <= 0) { removeFromCart(gameId); return; }
      setItems((prev) =>
        prev.map((i) => (i.game.id === gameId ? { ...i, quantity: qty } : i))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.game.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
