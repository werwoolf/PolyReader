export const throttle = (fn: (...arg0: Array<any>) => any, delay: number) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: any) => {
    args[0].persist()
    if (timeout) return;

    timeout = setTimeout(() => {
      clearTimeout(timeout)
      timeout = undefined;

      fn(...args);
    }, delay);

  }
}
