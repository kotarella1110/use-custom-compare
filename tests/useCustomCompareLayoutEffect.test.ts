import { renderHook } from '@testing-library/react';
import { dequal } from 'dequal';
import { useCustomCompareLayoutEffect } from '../src';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('useCustomCompareLayoutEffect', () => {
  it('should output a warning message to console with an empty array deps', () => {
    renderHook(() =>
      useCustomCompareLayoutEffect(
        () => {},
        [],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareLayoutEffect should not be used with no dependencies. Use React.useLayoutEffect instead.',
    );
  });

  it('should output a warning message to console with an array deps of only primitive values', () => {
    renderHook(() =>
      useCustomCompareLayoutEffect(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareLayoutEffect should not be used with dependencies that are all primitive values. Use React.useLayoutEffect instead.',
    );
  });

  it('should output a warning message to console with a depsAreEqual of primitive value', () => {
    renderHook(() =>
      // @ts-ignore
      useCustomCompareLayoutEffect(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareLayoutEffect should be used with depsEqual callback for comparing deps list',
    );
  });

  it('should not output a warning message to console in production mode', () => {
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    renderHook(() =>
      useCustomCompareLayoutEffect(
        () => {},
        [],
        () => true,
      ),
    );
    renderHook(() =>
      useCustomCompareLayoutEffect(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    renderHook(() =>
      // @ts-ignore
      useCustomCompareLayoutEffect(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).not.toBeCalled();

    process.env.NODE_ENV = env;
  });

  it('should handle changing deps as expected', () => {
    let deps = [1, { a: 'b' }, true];
    const effect = jest.fn();
    const { rerender } = renderHook(() =>
      useCustomCompareLayoutEffect(effect, deps, dequal),
    );

    expect(effect).toHaveBeenCalledTimes(1);
    effect.mockClear();

    // no change
    rerender();
    expect(effect).toHaveBeenCalledTimes(0);
    effect.mockClear();

    // no change (new object with same properties)
    deps = [1, { a: 'b' }, true];
    rerender();
    expect(effect).toHaveBeenCalledTimes(0);
    effect.mockClear();

    // change (new primitive value)
    deps = [2, { a: 'b' }, true];
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
    effect.mockClear();

    // no change
    rerender();
    expect(effect).toHaveBeenCalledTimes(0);
    effect.mockClear();

    // change (new primitive value)
    deps = [1, { a: 'b' }, false];
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
    effect.mockClear();

    // change (new properties on object)
    deps = [1, { a: 'c' }, false];
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
    effect.mockClear();
  });
});
