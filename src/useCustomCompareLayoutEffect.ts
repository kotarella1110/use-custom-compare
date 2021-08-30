import { useLayoutEffect, EffectCallback, DependencyList } from 'react';
import { checkDeps, useCustomCompareMemoize } from './useCustomCompareMemoize';
import { DepsAreEqual } from './types';

function useCustomCompareEffect<TDependencyList extends DependencyList>(
  effect: EffectCallback,
  deps: readonly [...TDependencyList],
  depsAreEqual: DepsAreEqual<readonly [...TDependencyList]>,
) {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(deps, depsAreEqual, 'useCustomCompareLayoutEffect');
  }

  useLayoutEffect(effect, useCustomCompareMemoize(deps, depsAreEqual));
}

export default useCustomCompareEffect;
