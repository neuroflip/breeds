import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BreedsData } from '../slices/types';

type BreedsPieChartProps  = { 
  data: Array<BreedsData>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#338042', '#FF3342', '#FF80AA', '#FFEE42', '#333333', '#335511'];

const renderLabel = function(entry: BreedsData) {
  return `${ entry.name }: ${ entry.value }%`;
}

const BreedsPieChart = ({ data }: BreedsPieChartProps) => {
  return (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie data={ data } cx="50%" cy="50%" labelLine={true}
          label={ renderLabel } outerRadius={ 80 } 
          fill="#8884d8" dataKey="value" nameKey="name">

          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>    
      </PieChart>
    </ResponsiveContainer>
  </div>)
}

export default BreedsPieChart