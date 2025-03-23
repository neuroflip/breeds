import { Suspense, lazy, useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import './styles/App.css'
import { useAppDispatch } from './store/hooks';
import { fetchBreeds } from './features/breedsChart/slices/BreedsChartSlice';

const BreedsChartCard = lazy(() => import('./features/breedsChart/BreedsChartCard'));
const TotalsCard = lazy(() => import('./features/breedsChart/TotalsCard'));

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchBreeds())
  }, [dispatch])

  return <main>
    <Suspense fallback={ <LoadingSpinner /> }>
      <BreedsChartCard />    
    </Suspense>
    <Suspense fallback={ <LoadingSpinner /> }>
      <TotalsCard />
    </Suspense>
    
  </main>
}

export default App
