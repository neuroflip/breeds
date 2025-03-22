import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { BreedsData } from '../../slices/types';
import { colorPalette } from './colorPalette';

type BreedsPieChartProps  = {
  data: BreedsData[]
}

const getLabel = function(entry: BreedsData) {
  return `${ entry.value }%`;
}

const generatePieCells = (topTenBreeds: BreedsData[]) => {
  return topTenBreeds.map((_entry, index) => (
    <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
  ))
}

const ResponsivePieChart = ({ data }: BreedsPieChartProps) => {

  return (<>
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie data={ data } cx="50%" cy="50%" labelLine={true}
          label={ getLabel } outerRadius={ 80 }
          dataKey="value" nameKey="name">
            { generatePieCells(data) }
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
  </ResponsiveContainer>
  </>)
}

export default ResponsivePieChart