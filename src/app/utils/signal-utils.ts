import { signal, effect, Signal } from '@angular/core';

/**
 * Creates a debounced signal that updates after a specified delay
 * @param initialValue - Initial value for the signal
 * @param delay - Debounce delay in milliseconds
 * @returns Object with value signal (for writing) and debounced signal (for reading)
 */
export function debouncedSignal<T>(initialValue: T, delay: number) {
  const value = signal(initialValue);
  const debounced = signal(initialValue);

  effect((onCleanup) => {
    const currentValue = value();
    const timeoutId = setTimeout(() => {
      debounced.set(currentValue);
    }, delay);

    onCleanup(() => clearTimeout(timeoutId));
  });

  return {
    value,
    debounced: debounced.asReadonly() as Signal<T>
  };
}
