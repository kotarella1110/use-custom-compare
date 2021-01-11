import { renderHook } from '@testing-library/react-hooks';
import { dequal } from 'dequal';
import { useCustomCompareMemo } from '../src';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('useCustomCompareMemo', () => {
  it('should output a warning message to console with an empty array deps', () => {
    renderHook(() =>
      useCustomCompareMemo(
        () => {},
        [],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareMemo should not be used with no dependencies. Use React.useMemo instead.',
    );
  });

  it('should output a warning message to console with an array deps of only primitive values', () => {
    renderHook(() =>
      useCustomCompareMemo(
        () => {},
        [true, 1, 'string'],
        () => true,
      ),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareMemo should not be used with dependencies that are all primitive values. Use React.useMemo instead.',
    );
  });

  it('should output a warning message to console with a depsAreEqual of primitive value', () => {
    renderHook(() =>
      // @ts-ignore
      useCustomCompareMemo(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareMemo should be used with depsEqual callback for comparing deps list',
    );
  });

  it('should not output a warning message to console in production mode', () => {
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
    renderHook(() =>
      // @ts-ignore
      useCustomCompareMemo(() => {}, [1, { a: 'b' }, true], 1),
    );
    expect(console.warn).not.toBeCalled();

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
