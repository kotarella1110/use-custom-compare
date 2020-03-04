import { renderHook } from '@testing-library/react-hooks';
import dequal from 'dequal';
import { useCustomCompareMemo } from '../src';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('useCustomCompareMemo', () => {
  it('should throw an error with an empty array deps', () => {
    const { result } = renderHook(() =>
      useCustomCompareMemo(
        () => {},
        [],
        () => true,
      ),
    );
    expect(result.error.message).toBe(
      'useCustomCompareMemo should not be used with no dependencies. Use React.useMemo instead.',
    );
  });

  it('should throw an error with an array deps of only primitive values', () => {
    const { result } = renderHook(() =>
      useCustomCompareMemo(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    expect(result.error.message).toBe(
      'useCustomCompareMemo should not be used with dependencies that are all primitive values. Use React.useMemo instead.',
    );
  });

  it('should throw an error with a depsAreEqual of primitive value', () => {
    const { result } = renderHook(() =>
      // @ts-ignore
      useCustomCompareMemo(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(result.error.message).toBe(
      'useCustomCompareMemo should be used with depsEqual callback for comparing deps list',
    );
  });

  it('should not throw an error in production mode', () => {
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    renderHook(() =>
      useCustomCompareMemo(
        () => {},
        [],
        () => true,
      ),
    );
    renderHook(() =>
      useCustomCompareMemo(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );

    process.env.NODE_ENV = env;
  });

  it('should handle changing deps as expected', () => {
    let deps = [1, { a: 'b' }, true];
    const factory = jest.fn();
    const { rerender } = renderHook(() =>
      useCustomCompareMemo(factory, deps, dequal),
    );

    expect(factory).toHaveBeenCalledTimes(1);
    factory.mockClear();

    // no change
    rerender();
    expect(factory).toHaveBeenCalledTimes(0);
    factory.mockClear();

    // no change (new object with same properties)
    deps = [1, { a: 'b' }, true];
    rerender();
    expect(factory).toHaveBeenCalledTimes(0);
    factory.mockClear();

    // change (new primitive value)
    deps = [2, { a: 'b' }, true];
    rerender();
    expect(factory).toHaveBeenCalledTimes(1);
    factory.mockClear();

    // no change
    rerender();
    expect(factory).toHaveBeenCalledTimes(0);
    factory.mockClear();

    // change (new primitive value)
    deps = [1, { a: 'b' }, false];
    rerender();
    expect(factory).toHaveBeenCalledTimes(1);
    factory.mockClear();

    // change (new properties on object)
    deps = [1, { a: 'c' }, false];
    rerender();
    expect(factory).toHaveBeenCalledTimes(1);
    factory.mockClear();
  });
});
