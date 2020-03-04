import { DependencyList } from 'react';

export type DepsAreEqual = (
  prevDeps: DependencyList,
  nextDeps: DependencyList,
) => boolean;
