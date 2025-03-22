import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  test('initial render', () => {
    render(<LoadingSpinner />);

    const loadingSpinnerElement = screen.getByRole('progressbar');

    expect(loadingSpinnerElement).toBeInTheDocument();
    expect(loadingSpinnerElement.className).toBe('loadingSpinner');
    expect(loadingSpinnerElement.getAttribute('aria-busy')).toBeTruthy();
    expect(loadingSpinnerElement.getAttribute('aria-live')).toBe('polite');
  });
});