import { renderHook } from '@testing-library/react-hooks';
import { dequal } from 'dequal';
import { useCustomCompareEffect } from '../src';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('useCustomCompareEffect', () => {
  it('should output a warning message to console with an empty array deps', () => {
    renderHook(() =>
      useCustomCompareEffect(
        () => {},
        [],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    );
  });

  it('should output a warning message to console with an array deps of only primitive values', () => {
    renderHook(() =>
      useCustomCompareEffect(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  });

  it('should output a warning message to console with a depsAreEqual of primitive value', () => {
    renderHook(() =>
      // @ts-ignore
      useCustomCompareEffect(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareEffect should be used with depsEqual callback for comparing deps list',
    );
  });

  it('should not output a warning message to console in production mode', () => {
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    renderHook(() =>
      useCustomCompareEffect(
        () => {},
        [],
        () => true,
      ),
    );
    renderHook(() =>
      useCustomCompareEffect(
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
    const effect = jest.fn();
    const { rerender } = renderHook(() =>
      useCustomCompareEffect(effect, deps, dequal),
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
