import { waitFor, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import App from '../App'
import { configureStore } from '@reduxjs/toolkit'
import { breedsChartSlice } from '../features/breedsChart/slices/BreedsChartSlice'
import { renderWithProviders } from '../test-utils'

vi.mock('../features/breedsChart/TotalsCard')
vi.mock('../features/breedsChart/BreedsChartCard')
vi.mock('../components/LoadingSpinner/LoadingSpinner')
vi.mock('../components/ErrorBoundary/ErrorBoundary')

const mockDispatch = vi.fn()
vi.mock('../store/store',  () => {
  return {
    useAppDispatch: vi.fn(() => { console.log('Dispatch 2!!! dentro'); mockDispatch() }),
    useAppSelector: vi.fn(() => vi.fn())
  }
});

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
  test('initial render', async () => {
    renderWithProviders(<App />, { store: mockStore });
    
    waitFor(async () => {
      expect(await screen.findByRole('main')).toBeInTheDocument()
      expect(await screen.findByText('ErrorBoundary')).toBeInTheDocument()
    })
  })


  test('renders lazy content', async () => {
    renderWithProviders(<App />, { store: mockStore });    

    waitFor(async () => {
      const spinners = await screen.findAllByText('LoadingSpinner')

      expect(spinners.length).toBe(2)
    })
  })
  
  test('renders a component correct after lazy load', async () => {    
    renderWithProviders(<App />, { store: mockStore });

    waitFor(async () => {
      expect(await screen.findByText('BreedsChartCard')).toBeInTheDocument()
      expect(await screen.findByText('TotalsCard')).toBeInTheDocument()
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
})

