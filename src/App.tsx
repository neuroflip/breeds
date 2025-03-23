import { Suspense, lazy } from 'react'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import './styles/App.css'

const BreedsChartCard = lazy(() => import('./features/breedsChart/BreedsChartCard'));
const TotalsCard = lazy(() => import('./features/breedsChart/TotalsCard'));

function App() {
  return <>
    <Suspense fallback={ <LoadingSpinner /> }>
      <BreedsChartCard />    
    </Suspense>
    <Suspense fallback={ <LoadingSpinner /> }>
      <TotalsCard />
    </Suspense>
    
  </>
}

export default App
