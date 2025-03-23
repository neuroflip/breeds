import React, { PropsWithChildren } from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import type { AppStore, AppState } from './store/types'
import { setupStore } from './store/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<AppState>
  store?: AppStore
}

const renderWithProviders = (ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const {
    store = setupStore(),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{ children }</Provider>)

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

const renderHookWithProviders = (render: RenderType, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const {
    store = setupStore(),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{ children }</Provider>
  );

  return {
    store:extendedRenderOptions.store,
    ...renderHook(render, { wrapper: Wrapper, ...renderOptions }),
  };
};

type RenderType = () => {
  renderTitle: () => React.JSX.Element;
  breedImagesPercent: {
      name: string;
      value: number;
  }[];
}

export { renderWithProviders, renderHookWithProviders }