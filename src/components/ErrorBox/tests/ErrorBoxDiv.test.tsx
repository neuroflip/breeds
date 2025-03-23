import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoxDiv from '../styled/ErrorBoxDiv';

describe('ErrorBoxDiv', () => {
  test('initial render', () => {
    render(<ErrorBoxDiv>error</ErrorBoxDiv>)

    const div = screen.getByText('error')

    expect(div).toBeInTheDocument()
    expect(div.tagName).toBe('DIV')
    expect(div).toHaveStyle(`
      font-weight: bolder;
      font-size: 1.2rem;`)
  });
});
