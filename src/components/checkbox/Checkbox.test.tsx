import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  it('renders the checkbox with the provided label', () => {
    const label = 'Test Label';
    render(<Checkbox label={label} />);
    
    const checkboxElement = screen.getByLabelText(label);
    expect(checkboxElement).toBeInTheDocument();
  });
});
