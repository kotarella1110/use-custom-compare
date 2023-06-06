import { renderHook } from '@testing-library/react';
import { dequal } from 'dequal';
import {
  checkDeps,
  useCustomCompareMemoize,
} from '../src/useCustomCompareMemoize';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('checkDeps', () => {
  it('should output a warning message to console with an empty array deps', () => {
    checkDeps([], () => true, 'useCustomCompareEffect');
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    );
  });

  it('should output a warning message to console with an array deps of only primitive values', () => {
    checkDeps([true, 1, 'string'], () => true, 'useCustomCompareEffect');
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  });

  it('should output a warning message to console with a depsAreEqual of primitive value', () => {
    // @ts-ignore
    checkDeps([1, { a: 'b' }, true], 1, 'useCustomCompareEffect');
    expect(console.warn).toHaveBeenCalledWith(
      'useCustomCompareEffect should be used with depsEqual callback for comparing deps list',
    );
  });
});

describe('useCustomCompareMemoize', () => {
  it('should handle changing deps as expected', () => {
    let deps = [1, { a: 'b' }, true];

    const { rerender, result } = renderHook(() =>
      useCustomCompareMemoize(deps, dequal),
    );

    expect(result.current).toEqual([1, { a: 'b' }, true]);

    // no change
    rerender();
    expect(result.current).toEqual([1, { a: 'b' }, true]);

    // no change (new object with same properties)
    deps = [1, { a: 'b' }, true];
    rerender();
    expect(result.current).toEqual([1, { a: 'b' }, true]);

    // change (new primitive value)
    deps = [2, { a: 'b' }, true];
    rerender();
    expect(result.current).toEqual([2, { a: 'b' }, true]);

    // no change
    rerender();
    expect(result.current).toEqual([2, { a: 'b' }, true]);

    // change (new primitive value)
    deps = [1, { a: 'b' }, false];
    rerender();
    expect(result.current).toEqual([1, { a: 'b' }, false]);

    // change (new properties on object)
    deps = [1, { a: 'c' }, false];
    rerender();
    expect(result.current).toEqual([1, { a: 'c' }, false]);
  });

  // https://github.com/kotarella1110/use-custom-compare/issues/713
  it('should compare previous deps correctly when comparing with current deps', () => {
    const referenceComparison = jest.fn();
    const valueComparison = jest.fn();
    let deps = [{}];

    const { rerender } = renderHook(() =>
      useCustomCompareMemoize(deps, (prevDeps, nextDeps) => {
        if (prevDeps[0] === nextDeps[0]) {
          referenceComparison();
          return true;
        }
        valueComparison();
        return dequal(prevDeps[0], nextDeps[0]);
      }),
    );

    expect(referenceComparison).toBeCalledTimes(0);
    expect(valueComparison).toBeCalledTimes(0);

    rerender();
    expect(referenceComparison).toBeCalledTimes(1);
    expect(valueComparison).toBeCalledTimes(0);

    // change (update reference)
    deps = [{}];
    rerender();
    expect(referenceComparison).toBeCalledTimes(1);
    expect(valueComparison).toBeCalledTimes(1);

    rerender();
    expect(referenceComparison).toBeCalledTimes(2);
    expect(valueComparison).toBeCalledTimes(1);

    rerender();
    expect(referenceComparison).toBeCalledTimes(3);
    expect(valueComparison).toBeCalledTimes(1);
  });
});
