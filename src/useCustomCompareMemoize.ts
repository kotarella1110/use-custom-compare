import { useRef, DependencyList } from 'react';
import { DepsAreEqual } from './types';

function isPrimitive(val: any) {
  return val == null || /^[sbn]/.test(typeof val);
}

export function checkDeps(
  deps: React.DependencyList,
  depsAreEqual: DepsAreEqual,
  name: string,
) {
  const reactHookName = `React.${name.replace(/CustomCompare/, '')}`;

  if (!(deps instanceof Array) || deps.length === 0) {
    throw new Error(
      `${name} should not be used with no dependencies. Use ${reactHookName} instead.`,
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      `${name} should not be used with dependencies that are all primitive values. Use ${reactHookName} instead.`,
    );
  }
  if (typeof depsAreEqual !== 'function') {
    throw new Error(
      `${name} should be used with depsEqual callback for comparing deps list`,
    );
  }
}

export function useCustomCompareMemoize(
  deps: DependencyList,
  depsAreEqual: DepsAreEqual,
) {
  const ref = useRef<DependencyList>([]);

  if (!ref.current || !depsAreEqual(deps, ref.current)) {
    ref.current = deps;
  }

  return ref.current;
}
