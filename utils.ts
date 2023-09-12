export function debounce(
  func: Function,
  delay: number,
  options?: DebounceOptions
): Function {
  let timer: any | undefined;
  let lastCall: Date | undefined;

  const debounced = (...args: any) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    lastCall = new Date();
    timer = setTimeout(
      () => {
        func(...args);
      },
      delay,
      options
    );
  };

  return debounced;
}

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}
