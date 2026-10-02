import { writable, derived } from 'svelte/store';
import { products } from './data';

const KEY = 'sobattani-cart';
export const cart = writable({});

export function initCart() {
  try { cart.set(JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
  cart.subscribe((v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} });
}

export const add = (id) => cart.update((c) => ({ ...c, [id]: Math.min((c[id] || 0) + 1, 99) }));
export const setQty = (id, q) => cart.update((c) => { const n = { ...c }; if (!(q > 0)) delete n[id]; else n[id] = Math.min(Math.floor(q), 99); return n; });
export const clear = () => cart.set({});

export const count = derived(cart, (c) => Object.values(c).reduce((a, b) => a + b, 0));
export const lines = derived(cart, (c) => products.filter((p) => c[p.id]).map((p) => ({ ...p, qty: c[p.id] })));
export const total = derived(lines, (l) => l.reduce((a, p) => a + p.price * p.qty, 0));
