import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BreedsChart from '../BreedsChartCard';

vi.mock('../components/ResponsivePieChart/ResponsivePieChart')
vi.mock('../../../components/Card/Card')
vi.mock('../hooks/useBreedsChart', () => ({
  __esModule: true,
  default: () => Promise.resolve({
    renderTitle: vi.fn(),
    breedImagesPercent: [{
      name: "breed1",
      value: 100
    }]    
  })
}));

describe('BreedsChart', () => {
  test('initial render', () => {
    render(<BreedsChart />);

    expect(screen.getByTestId('Card')).toBeInTheDocument()
    expect(screen.getByText('ResponsivePieChart')).toBeInTheDocument()
  });
});