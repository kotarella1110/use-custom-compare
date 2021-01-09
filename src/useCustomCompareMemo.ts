import { useMemo, DependencyList } from 'react';
import { checkDeps, useCustomCompareMemoize } from './useCustomCompareMemoize';
import { DepsAreEqual } from './types';

function useCustomCompareMemo<T, TDependencyList extends DependencyList>(
  factory: () => T,
  deps: [...TDependencyList],
  depsAreEqual: DepsAreEqual<TDependencyList>,
): T {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(deps, depsAreEqual, 'useCustomCompareMemo');
  }

  return useMemo(factory, useCustomCompareMemoize(deps, depsAreEqual));
}

export default useCustomCompareMemo;
