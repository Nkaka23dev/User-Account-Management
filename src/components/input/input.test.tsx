import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  test('renders label element with given props', () => {
    const label = 'Username';
    const labelWithRequired = `${label} *`;

    render(
      <Input
        label={label}
        placeholder="Enter your username"
        type="text"
        error={null}
      />
    );

    const labelElement = screen.getByLabelText(labelWithRequired);
    expect(labelElement).toBeInTheDocument();
  });
});
