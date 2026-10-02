import { writable } from 'svelte/store';

const KEY = 'sobattani-a11y';
export const defaults = { scale: 100, contrast: false, dyslexia: false, spacing: false, links: false, motion: false };

function load() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...defaults }; }
}

export const a11y = writable({ ...defaults });

export function initA11y() {
  a11y.set(load());
  a11y.subscribe((v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} });
}
