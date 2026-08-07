"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  key: string;
  serviceSlug: string;
  serviceTitle: string;
  platform: string;
  quantity: number;
  priceUSD: number;
  priceEUR: number;
  username: string;
  addedAt: number;
}

interface CartApi {
  hydrated: boolean;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "key" | "addedAt">) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const STORAGE_KEY = "mff_cart";

const CartContext = createContext<CartApi | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCart(cart);
  }, [cart, hydrated]);

  const addToCart = useCallback((item: Omit<CartItem, "key" | "addedAt">) => {
    const key = `${item.serviceSlug}:${item.quantity}:${item.username.trim().toLowerCase()}`;
    setCart((prev) => {
      const without = prev.filter((i) => i.key !== key);
      return [{ ...item, key, addedAt: Date.now() }, ...without].slice(0, 20);
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      hydrated,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      itemCount: cart.length,
    }),
    [hydrated, cart, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
