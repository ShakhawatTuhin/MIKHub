import { writable } from 'svelte/store';

export const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/** Turn a backend-relative upload path into a full URL. */
export const img = (url) => (url && url.startsWith('/uploads/') ? API + url : url || null);

export async function api(path, { method = 'GET', body, form } = {}) {
  const opts = { method, credentials: 'include', headers: {} };
  if (form) opts.body = form;
  else if (body !== undefined) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(API + '/api' + path, opts);
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || (data.errors || []).join(', ') || `Request failed (${res.status})`);
  return data;
}

/** Site-wide editable content (form links, pictures, text). Empty until loaded -> components keep their defaults. */
export const settings = writable({});
export const loadSettings = () => api('/settings').then((s) => settings.set(s)).catch(() => {});
loadSettings();
