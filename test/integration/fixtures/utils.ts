export const mapOrUndefined = <T>(arr: T[], cb: (element: T) => T): T[] | undefined => {
  let output = undefined;
  let len = arr.length;
  let i = 0;
  for (; i < len; i++) {
    const element = arr[i];
    const processed = cb(element);
    if (processed !== element) {
      output = [...arr];
      output[i] = processed;
      break;
    }
  }
  if (output) {
    for (; i < len; i++) {
      const element = arr[i];
      output[i] = cb(element);
    }
  }
  return output;
};
