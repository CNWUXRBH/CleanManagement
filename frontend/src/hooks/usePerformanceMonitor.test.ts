import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePerformanceMonitor } from './usePerformanceMonitor';
import { markPerformance, measurePerformance } from '../utils/performance';

vi.mock('../utils/performance', () => ({
  markPerformance: vi.fn(),
  measurePerformance: vi.fn(),
}));

describe('usePerformanceMonitor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tracks renders when enabled', () => {
    const { rerender } = renderHook(() =>
      usePerformanceMonitor({
        componentName: 'TestComponent',
        trackRenders: true,
      })
    );

    expect(markPerformance).toHaveBeenCalledWith('TestComponent-render-1');

    rerender();
    expect(markPerformance).toHaveBeenCalledWith('TestComponent-render-2');
  });

  it('does not track renders when disabled', () => {
    const { rerender } = renderHook(() =>
      usePerformanceMonitor({
        componentName: 'TestComponent',
        trackRenders: false,
      })
    );

    expect(markPerformance).not.toHaveBeenCalled();
    rerender();
    expect(markPerformance).not.toHaveBeenCalled();
  });

  it('tracks prop changes when enabled', () => {
    const { result } = renderHook(() =>
      usePerformanceMonitor({
        componentName: 'TestComponent',
        trackProps: true,
      })
    );

    const props = { test: 'value' };
    result.current.trackPropChanges(props);
    expect(markPerformance).toHaveBeenCalledWith('TestComponent-props-change');

    // Same props should not trigger tracking
    result.current.trackPropChanges(props);
    expect(markPerformance).toHaveBeenCalledTimes(1);

    // Different props should trigger tracking
    result.current.trackPropChanges({ test: 'new value' });
    expect(markPerformance).toHaveBeenCalledTimes(2);
  });

  it('tracks effects when enabled', () => {
    const { result } = renderHook(() =>
      usePerformanceMonitor({
        componentName: 'TestComponent',
        trackEffects: true,
      })
    );

    const effectCallback = vi.fn();
    const wrappedEffect = result.current.trackEffect('testEffect', effectCallback);
    wrappedEffect();

    expect(markPerformance).toHaveBeenCalledWith('TestComponent-testEffect-start');
    expect(markPerformance).toHaveBeenCalledWith('TestComponent-testEffect-end');
    expect(measurePerformance).toHaveBeenCalledWith(
      'TestComponent-testEffect-duration',
      'TestComponent-testEffect-start',
      'TestComponent-testEffect-end'
    );
    expect(effectCallback).toHaveBeenCalled();
  });

  it('maintains render count', () => {
    const { result, rerender } = renderHook(() =>
      usePerformanceMonitor({
        componentName: 'TestComponent',
        trackRenders: true,
      })
    );

    expect(result.current.renderCount).toBe(1);
    rerender();
    expect(result.current.renderCount).toBe(2);
    rerender();
    expect(result.current.renderCount).toBe(3);
  });
}); 