import { useRef, DependencyList } from 'react';
import { DepsAreEqual } from './types';

function isPrimitive(val: any) {
  return val == null || /^[sbn]/.test(typeof val);
}

export function checkDeps<TDependencyList extends DependencyList>(
  deps: readonly [...TDependencyList],
  depsAreEqual: DepsAreEqual<TDependencyList>,
  name: string,
) {
  const reactHookName = `React.${name.replace(/CustomCompare/, '')}`;

  if (!(deps instanceof Array) || deps.length === 0) {
    console.warn(
      `${name} should not be used with no dependencies. Use ${reactHookName} instead.`,
    );
  }
  if (deps.every(isPrimitive)) {
    console.warn(
      `${name} should not be used with dependencies that are all primitive values. Use ${reactHookName} instead.`,
    );
  }
  if (typeof depsAreEqual !== 'function') {
    console.warn(
      `${name} should be used with depsEqual callback for comparing deps list`,
    );
  }
}

export function useCustomCompareMemoize<TDependencyList extends DependencyList>(
  deps: readonly [...TDependencyList],
  depsAreEqual: DepsAreEqual<readonly [...TDependencyList]>,
) {
  const ref = useRef<readonly [...TDependencyList] | undefined>(undefined);

  if (!ref.current || !depsAreEqual(ref.current, deps)) {
    ref.current = deps;
  }

  return ref.current;
}
