import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

// Initialize theme store with the default theme (dark)
const storedTheme = browser ? localStorage.getItem('theme') as Theme : null;
export const theme = writable<Theme>(storedTheme || 'dark');

// Subscribe to theme changes and update localStorage and body class
if (browser) {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    if (document.body) {
      document.body.className = value === 'light' ? 'light-theme' : '';
    }
  });
}