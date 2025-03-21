import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { BreedsData } from '../../slices/types';
import { colorPalette } from './colorPalette';

import type { Totals } from '../../slices/selectors';

type BreedsPieChartProps  = {
  data: Totals
}

const getLabel = function(entry: BreedsData) {
  return `${ entry.value }%`;
}

const ResponsivePieChart = ({ data }: BreedsPieChartProps) => {
  const topTenBreeds = data.topTenBreeds;

  return (<>
    <p>Total Breeds: { data.totalBreeds }</p>
    <p>Total Images: { data.totalImages }</p>
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie data={ topTenBreeds } cx="50%" cy="50%" labelLine={true}
          label={ getLabel } outerRadius={ 80 }
          dataKey="value" nameKey="name">
            { topTenBreeds.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
          )) }
        </Pie>
        <title>Breeds by image percentage</title>
        <Legend />
        <Tooltip />
      </PieChart>
  </ResponsiveContainer>
  </>)
}

export default ResponsivePieChart