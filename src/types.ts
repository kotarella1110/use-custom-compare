import { DependencyList } from 'react';

export type DepsAreEqual<TDependencyList extends DependencyList> = (
  prevDeps: TDependencyList,
  nextDeps: TDependencyList,
) => boolean;
