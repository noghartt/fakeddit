type Counters = Record<string, 0>;

export const getCounter = (key: string): number => {
  if (key in global.__COUNTERS__) {
    global.__COUNTERS__[key]++;

    return global.__COUNTERS__[key];
  }

  global.__COUNTERS__[key] = 0;

  return global.__COUNTERS__[key];
};

export const restartCounters = (): void => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce(
    (prev, curr) => ({ ...prev, [curr]: 0 }),
    {},
  );
};
