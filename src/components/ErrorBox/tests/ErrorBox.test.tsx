import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBox from '../ErrorBox';

const inputErrorMessage = "Something went wrong"
const defaultErrorMessage = "Please, retry again later"

describe('Error Box', () => {
  test('initial render', () => {
    render(<ErrorBox errorMessage={ inputErrorMessage } />);

    const errorBoxElement = screen.getByRole('alert');
    const inputErrorMessageElement = screen.getByText(inputErrorMessage);
    const standardErrorMessageElement = screen.getByText(defaultErrorMessage);

    expect(errorBoxElement).toBeInTheDocument();
    expect(inputErrorMessageElement).toBeInTheDocument();
    expect(standardErrorMessageElement).toBeInTheDocument();
    expect(errorBoxElement.className).toBe('errorBox');
    expect(errorBoxElement.getAttribute('role')).toBe('alert');
  });
});