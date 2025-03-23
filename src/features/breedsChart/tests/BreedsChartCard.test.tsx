import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BreedsChartCard from '../BreedsChartCard';

vi.mock('../components/ResponsivePieChart/ResponsivePieChart')
vi.mock('../../../components/Card/Card')
vi.mock('../hooks/useBreedsChartCard', () => ({
  __esModule: true,
  default: () => Promise.resolve({
    renderTitle: vi.fn(),
    breedImagesPercent: [{
      name: "breed1",
      value: 100
    }]    
  })
}));

describe('BreedsChartCard', () => {
  test('initial render', () => {
    const { container } = render(<BreedsChartCard />);

    expect(screen.getByTestId('Card')).toBeInTheDocument()
    expect(screen.getByText('ResponsivePieChart')).toBeInTheDocument()

    //snapshot
    expect(container).toMatchSnapshot()
  });
});