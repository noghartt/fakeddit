export interface DataLoaders {
  UserLoader?: ReturnType<typeof import('../user/UserLoader').getLoader>;
}

const loaders: {
  [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {};

const registerLoader = <Name extends keyof DataLoaders>(
  key: Name,
  getLoader: typeof loaders[Name],
) => {
  loaders[key] = getLoader;
};

const getAllDataLoaders = (): DataLoaders =>
  Object.entries(loaders).reduce(
    (obj, [loaderKey, loaderFn]) => ({
      ...obj,
      [loaderKey]: loaderFn(),
    }),
    {},
  );

export { registerLoader, getAllDataLoaders };
