import { cleanup } from "@testing-library/react"
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Protected from './Protected';

test('renders the children component when signed in', () => {
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <Protected isSignedIn={true}>
        <div data-testid="child-component">Child Component</div>
      </Protected>
    </MemoryRouter>
  );
  expect(screen.getByTestId('child-component')).toBeInTheDocument();
});
test('renders the children component when not signed in but accessing public route', () => {
  render(
    <MemoryRouter initialEntries={['/public']}>
      <Protected isSignedIn={false}>
        <div data-testid="child-component">Child Component</div>
      </Protected>
    </MemoryRouter>
  );

  expect(screen.getByTestId('child-component')).toBeInTheDocument();
});

cleanup();

export default test;
