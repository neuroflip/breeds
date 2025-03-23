import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import Totals from '../TotalsCard';
import { setupServer, SetupServerApi } from 'msw/node';
import { BREAD_API, getFetchImageAPIUrl } from '../slices/utils';
import { delay, http, HttpResponse } from 'msw';
import breedsData from './allBreeds.json'
import imagesData from './breedImages.json'
import { configureStore } from '@reduxjs/toolkit';
import { breedsChartSlice, fetchBreeds } from '../slices/BreedsChartSlice';
import { renderWithProviders } from '../../../test-utils';

vi.mock('../../../components/Card/Card')
let server: SetupServerApi;
const mockStore = configureStore({
  reducer: {
    breedsChart: breedsChartSlice.reducer
  }
})

describe('Totals', () => {
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
  
  test('initial render', () => {
    renderWithProviders(<Totals />, { store: mockStore });

    expect(screen.getByTestId('Card')).toBeInTheDocument();
    expect(screen.getByText('Total Breeds: 0')).toBeInTheDocument();
    expect(screen.getByText('Total Images: 0')).toBeInTheDocument();
  });

  test('after dispatch and load data', async () => {
    renderWithProviders(<Totals />, { store: mockStore });
    
    await act(async () =>
      mockStore.dispatch(fetchBreeds())
    )

    expect(screen.getByText('Total Breeds: 2')).toBeInTheDocument();
    expect(screen.getByText('Total Images: 18')).toBeInTheDocument();
  });
});