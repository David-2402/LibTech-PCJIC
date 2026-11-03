import { useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

// Igual que useState, pero el valor se guarda y se recupera de localStorage.
// Uso:  const [theme, setTheme] = useLocalStorage('theme', 'light');
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readJSON(key, initialValue));

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue];
}
