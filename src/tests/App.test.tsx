import { waitFor, screen } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import App from '../App'
import { setupServer, SetupServerApi } from 'msw/node'
import { configureStore } from '@reduxjs/toolkit'
import { breedsChartSlice } from '../features/breedsChart/slices/BreedsChartSlice'
import { delay, http, HttpResponse } from 'msw'
import { BREAD_API, getFetchImageAPIUrl } from '../features/breedsChart/slices/utils'
import { renderWithProviders } from '../test-utils'
import breedsData from './allBreeds.json'
import imagesData from './breedImages.json'

vi.mock('../features/breedsChart/TotalsCard')
vi.mock('../features/breedsChart/BreedsChartCard')
vi.mock('../components/LoadingSpinner/LoadingSpinner')
const mockDispatch = vi.fn()
vi.mock('../store/store',  () => {
  return {
    useAppDispatch: vi.fn(() => { console.log('Dispatch 2!!! dentro'); mockDispatch() }),
    useAppSelector: vi.fn(() => vi.fn())
  }
});

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

describe('App and lazy loading', () => {
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
        })]

    server = setupServer(...handlers)
    server.listen()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('initial render', async () => {
    renderWithProviders(<App />, { store: mockStore });
    
    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })

  test('renders lazy content', async () => {
    renderWithProviders(<App />, { store: mockStore });
    
    expect(await screen.findByText(/LoadingSpinner/i)).toBeInTheDocument()
  })
  
  test('renders a component correct after lazy load', async () => {    
    renderWithProviders(<App />, { store: mockStore });

    expect(await screen.findByText(/TotalsCard/i)).toBeInTheDocument()
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
})

