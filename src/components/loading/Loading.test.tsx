import { render, screen } from "@testing-library/react"
import Loading from './Loading';



describe('Loading Component', () => {
  it('renders without error', async () => {
    render(<Loading />);
    await screen.findByRole('img');
  });

  it('renders with invert prop', async () => {
    render(<Loading invert />);
    await screen.findByRole('img');
  });

  it('displays "Loading.." text by default', async () => {
    render(<Loading />);
    expect(await screen.findByText('Loading..')).toBeInTheDocument();
  });

  it('displays "Loading.." text with invert prop', async () => {
    render(<Loading invert />);
    expect(await screen.findByText('Loading..')).toBeInTheDocument();
  });

  it('renders with correct CSS classes', async () => {
    render(<Loading />);
    const loadingElement = await screen.findByRole('img');
    expect(loadingElement).toHaveClass('animate-spin');
    expect(loadingElement).not.toHaveClass('invert');
  });

  it('renders with correct CSS classes when invert prop is true', async () => {
    render(<Loading invert />);
    const loadingElement = await screen.findByRole('img');
    expect(loadingElement).toHaveClass('animate-spin');
    expect(loadingElement).toHaveClass('invert');
  });
});
