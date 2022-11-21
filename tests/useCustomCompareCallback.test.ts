import { renderHook } from '@testing-library/react';
import { dequal } from 'dequal';
import { useCustomCompareCallback } from '../src';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('useCustomCompareCallback', () => {
  it('should output a warning message to console with an empty array deps', () => {
    renderHook(() =>
      useCustomCompareCallback(
        () => {},
        [],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareCallback should not be used with no dependencies. Use React.useCallback instead.',
    );
  });

  it('should output a warning message to console with an array deps of only primitive values', () => {
    renderHook(() =>
      useCustomCompareCallback(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareCallback should not be used with dependencies that are all primitive values. Use React.useCallback instead.',
    );
  });

  it('should output a warning message to console with a depsAreEqual of primitive value', () => {
    renderHook(() =>
      // @ts-ignore
      useCustomCompareCallback(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareCallback should be used with depsEqual callback for comparing deps list',
    );
  });

  it('should not output a warning message to console in production mode', () => {
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    renderHook(() =>
      useCustomCompareCallback(
        () => {},
        [],
        () => true,
      ),
    );
    renderHook(() =>
      useCustomCompareCallback(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    renderHook(() =>
      // @ts-ignore
      useCustomCompareEffect(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).not.toBeCalled();

    process.env.NODE_ENV = env;
  });

  it('should handle changing deps as expected', () => {
    let deps = [1, { a: 'b' }, true];
    let prevCallback;
    let callback = () => {};
    const { rerender, result } = renderHook(() =>
      useCustomCompareCallback(callback, deps, dequal),
    );

    expect(result.current).toBe(callback);

    // no change
    prevCallback = result.current;
    callback = () => {};
    rerender();
    expect(result.current).toBe(prevCallback);

    // no change (new object with same properties)
    deps = [1, { a: 'b' }, true];
    prevCallback = result.current;
    callback = () => {};
    rerender();
    expect(result.current).toBe(prevCallback);

    // change (new primitive value)
    deps = [2, { a: 'b' }, true];
    prevCallback = result.current;
    callback = () => {};
    rerender();
    expect(result.current).not.toBe(prevCallback);

    // no change
    prevCallback = result.current;
    callback = () => {};
    rerender();
    expect(result.current).toBe(prevCallback);

    // change (new primitive value)
    prevCallback = result.current;
    callback = () => {};
    deps = [1, { a: 'b' }, false];
    rerender();
    expect(result.current).not.toBe(prevCallback);

    // change (new properties on object)
    prevCallback = result.current;
    callback = () => {};
    deps = [1, { a: 'c' }, false];
    rerender();
    expect(result.current).not.toBe(prevCallback);
  });
});
