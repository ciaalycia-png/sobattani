import { writable } from 'svelte/store';
import { supabase } from './supabase';

export const user = writable(null);
export const authReady = writable(false);

export function initAuth() {
  supabase.auth.getSession().then(({ data }) => {
    user.set(data.session?.user ?? null);
    authReady.set(true);
  });
  const { data } = supabase.auth.onAuthStateChange((_e, session) => user.set(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}
