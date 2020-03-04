import { useCallback, DependencyList } from 'react';
import { checkDeps, useCustomCompareMemoize } from './useCustomCompareMemoize';
import { DepsAreEqual } from './types';

function useCustomCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  depsEqual: DepsAreEqual,
): T {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(deps, depsEqual, 'useCustomCompareCallback');
  }

  return useCallback(callback, useCustomCompareMemoize(deps, depsEqual));
}

export default useCustomCompareCallback;
