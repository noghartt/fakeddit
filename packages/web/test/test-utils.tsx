import { render, RenderOptions } from '@testing-library/react';

import { Providers } from '../src/Providers';

const WrapperProviders = ({ children }: { children: JSX.Element }) => (
  <Providers>{children}</Providers>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { ...options, wrapper: WrapperProviders });

export * from '@testing-library/react';
export { customRender as render };
export { WithProviders } from './WithProviders';
