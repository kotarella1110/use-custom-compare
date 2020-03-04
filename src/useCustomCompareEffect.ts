import { useEffect, EffectCallback, DependencyList } from 'react';
import { checkDeps, useCustomCompareMemoize } from './useCustomCompareMemoize';
import { DepsAreEqual } from './types';

function useCustomCompareEffect(
  effect: EffectCallback,
  deps: DependencyList,
  depsAreEqual: DepsAreEqual,
) {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(deps, depsAreEqual, 'useCustomCompareEffect');
  }

  useEffect(effect, useCustomCompareMemoize(deps, depsAreEqual));
}

export default useCustomCompareEffect;
