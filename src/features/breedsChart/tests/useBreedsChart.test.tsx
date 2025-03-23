import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { renderHookWithProviders } from '../../../test-utils';
import useBreedsChart from '../hooks/useBreedsChart';
import { http, HttpResponse, delay } from 'msw'
import { setupServer, SetupServerApi } from 'msw/node'
import { BREAD_API, getFetchImageAPIUrl } from '../../../features/breedsChart/slices/utils';
import breedsData from './allBreeds.json'
import imagesData from './breedImages.json'
import { breedsChartSlice, fetchBreeds } from '../slices/BreedsChartSlice';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react';

let server: SetupServerApi;
const mockStore = configureStore({
  reducer: {
    breedsChart: breedsChartSlice.reducer
  },
  preloadedState: {
    breedsChart: {
      breeds: [{ name: "breed1", value: 10 }],
      isLoading: false,
      error: null
    }
  }
})

describe('useBreedsChart', () => {
  beforeAll(() => {
    const handlers = [
      http.get(BREAD_API, async () => {
        await delay(150)
        return HttpResponse.json(breedsData)
      }),
      http.get(getFetchImageAPIUrl('affenpinscher'), async () => {
          await delay(150)
          return HttpResponse.json(imagesData)
      }),
      http.get(getFetchImageAPIUrl('african'), async () => {
          await delay(150)
          return HttpResponse.json(imagesData)
        })
    ]

    server = setupServer(...handlers)
    server.listen()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('render the hook to check renderTitle', () => {
    const { result } = renderHookWithProviders(() => useBreedsChart(), { store: mockStore });
    const { renderTitle } = result.current;
    const title = renderTitle();
    const titleChildren = title.props.children

    expect(title.type).toBe('div');
    expect(title.props.className).toBe('breedsChart__title');
    expect(titleChildren.length).toBe(2)
    //Image from title
    expect(titleChildren[0].type).toBe('img')
    expect(titleChildren[0].props.width).toBe(35)
    expect(titleChildren[0].props.height).toBe(35)
    expect(titleChildren[0].props.src).toBe('/src/features/breedsChart/images/dogFingerprint.png')
    expect(titleChildren[0].props.alt).toBe('dog fingerprint')
    //text from title
    expect(titleChildren[1].type).toBe('h1')
    expect(titleChildren[1].props.children).toBe('Breeds Chart')
  });

  test('render the hook to check breedImagesPercent data', async () => {
    const { result } = renderHookWithProviders(() => useBreedsChart(), { store: mockStore });

    await act(async () =>
      mockStore.dispatch(fetchBreeds())
    )

    const { breedImagesPercent } = result.current;

    expect(breedImagesPercent).toEqual([
      { name: 'affenpinscher', value: 50 },
      { name: 'african', value: 50 }
    ])
  });
});