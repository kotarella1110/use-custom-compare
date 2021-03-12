import { useCallback, DependencyList } from 'react';
import { checkDeps, useCustomCompareMemoize } from './useCustomCompareMemoize';
import { DepsAreEqual } from './types';

function useCustomCompareCallback<
  T extends (...args: any[]) => any,
  TDependencyList extends DependencyList
>(
  callback: T,
  deps: readonly [...TDependencyList],
  depsEqual: DepsAreEqual<readonly [...TDependencyList]>,
): T {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(deps, depsEqual, 'useCustomCompareCallback');
  }

  return useCallback(callback, useCustomCompareMemoize(deps, depsEqual));
}

export default useCustomCompareCallback;
