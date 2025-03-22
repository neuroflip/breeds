import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResponsivePieChart from '../ResponsivePieChart';

const mockData = [
  { name: 'Breed1', value: 30 },
  { name: 'Breed2', value: 20 },
  { name: 'Breed3', value: 50 },
];

vi.mock('recharts', async () => {
  const actual = await vi.importActual<typeof import('recharts')>('recharts');
  return {
    ...actual,
    ResponsiveContainer: vi.fn(({ children }) => <div data-testid="ResponsiveContainer">{children}</div>),
  };
});

vi.mock('recharts', async () => {
  const actual = await vi.importActual<typeof import('recharts')>('recharts');

  return {
    ...actual,
    PieChart: vi.fn(({ children }) => <div data-testid="PieChart">{children}</div>),
    Pie: vi.fn(() => { return <div data-testid="Pie">{ mockData.map(() => <div data-testid="Cell" />) } </div> }),
    Legend: vi.fn(() => <div data-testid="Legend" />),
    ResponsiveContainer: vi.fn(({ children }) => <div data-testid="ResponsiveContainer">{children}</div>),
    Tooltip: vi.fn(() => <div data-testid="Tooltip" />)
  }
});

describe('ResponsivePieChart', () => {
  test('renders the chart correctly', () => {
    render(<ResponsivePieChart data={ mockData } />);

    expect(screen.getByTestId('ResponsiveContainer')).toBeInTheDocument();
    expect(screen.getByTestId('PieChart')).toBeInTheDocument();
    expect(screen.getByTestId('Pie')).toBeInTheDocument();
    expect(screen.getByTestId('Legend')).toBeInTheDocument();
    expect(screen.getByTestId('Tooltip')).toBeInTheDocument();
    expect(screen.getAllByTestId('Cell').length).toBe(mockData.length);
  });
});