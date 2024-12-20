import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import GlobalErrorBoundary from './GlobalErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('GlobalErrorBoundary', () => {
  const originalConsoleError = console.error;
  
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <GlobalErrorBoundary>
        <div>Test content</div>
      </GlobalErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <GlobalErrorBoundary>
        <ErrorComponent />
      </GlobalErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('allows user to retry after error', async () => {
    const { user } = render(
      <GlobalErrorBoundary>
        <ErrorComponent />
      </GlobalErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    await user.click(retryButton);

    // After retry, the error UI should still be shown because the error still exists
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
}); 