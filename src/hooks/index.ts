/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect, useRef } from 'react';

type Initializer<T> = T extends any ? (T | (() => T)) : never

export function useLocalStorage<T>(
  key: string,
  defaultValue: Initializer<T>,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const prevKeyRef = useRef(key);
  const serializer = JSON.stringify;
  const deserializer = JSON.parse;

  const [state, setState] = useState<T>(() => {
    const localStorageValue = window.localStorage.getItem(key);

    if (localStorageValue !== null) {
      return deserializer(localStorageValue);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (prevKeyRef.current !== key) {
      window.localStorage.removeItem(prevKeyRef.current);
    }

    window.localStorage.setItem(key, serializer(state));
  }
    , [key, state, serializer]);


  return [state, setState];
}

