import { Suspense, lazy, useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './styles/App.css'
import { useAppDispatch } from './store/hooks';
import { fetchBreeds, breedsChartSlice } from './features/breedsChart/slices/BreedsChartSlice';

const BreedsChartCard = lazy(() => import('./features/breedsChart/BreedsChartCard'));
const TotalsCard = lazy(() => import('./features/breedsChart/TotalsCard'));

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(breedsChartSlice.actions.initBreeds())
      dispatch(fetchBreeds())
  }, [dispatch])

  return <main>
    <ErrorBoundary>
      <Suspense fallback={ <LoadingSpinner /> }>
        <BreedsChartCard />    
      </Suspense>
      <Suspense fallback={ <LoadingSpinner /> }>
        <TotalsCard />
      </Suspense>
    </ErrorBoundary>
  </main>
}

export default App
