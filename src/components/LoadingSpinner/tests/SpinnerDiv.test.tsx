import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpinnerDiv from '../styled/SpinnerDiv';

describe('SpinnerDiv', () => {
  test('initial render', () => {
    render(<SpinnerDiv>test</SpinnerDiv>)

    const div = screen.getByText('test')

    expect(div).toBeInTheDocument()
    expect(div.tagName).toBe('DIV')
    expect(div).toHaveStyle(`
      width: 48px;
      height: 48px;
      border: 5px solid transparent;
      border-bottom-color: rgb(68, 68, 68);
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      margin: 60px auto;`)
  });
});
