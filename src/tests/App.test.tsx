import { act, render, screen, waitFor} from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import App from '../App'

vi.mock('../features/breedsChart/TotalsCard')
vi.mock('../features/breedsChart/BreedsChartCard')
vi.mock('../components/LoadingSpinner/LoadingSpinner')

describe('App and lazy loading', () => {
  test('renders lazy content', async () => {
    render(<App />)
    
    expect(await screen.findByText(/LoadingSpinner/i)).toBeInTheDocument()
  })
  
  test('renders a component correct after lazy load', async () => {    
    render(<App />)

    expect(await screen.findByText(/TotalsCard/i)).toBeInTheDocument()
  })
})

