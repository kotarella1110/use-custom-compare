import { renderHook } from '@testing-library/react-hooks';
import { dequal } from 'dequal';
import { useCustomCompareEffect } from '../src';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('useCustomCompareEffect', () => {
  it('should throw an error with an empty array deps', () => {
    const { result } = renderHook(() =>
      useCustomCompareEffect(
        () => {},
        [],
        () => true,
      ),
    );
    expect(result.error.message).toBe(
      'useCustomCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    );
  });

  it('should throw an error with an array deps of only primitive values', () => {
    const { result } = renderHook(() =>
      useCustomCompareEffect(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    expect(result.error.message).toBe(
      'useCustomCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  });

  it('should throw an error with a depsAreEqual of primitive value', () => {
    const { result } = renderHook(() =>
      // @ts-ignore
      useCustomCompareEffect(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(result.error.message).toBe(
      'useCustomCompareEffect should be used with depsEqual callback for comparing deps list',
    );
  });

  it('should not throw an error in production mode', () => {
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
