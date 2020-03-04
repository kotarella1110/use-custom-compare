<h1 align="center">use-custom-compare</h1>

<p align="center">It's React's useEffect/useMemo/useCallback hooks, except using custom comparison on the inputs, not reference equality</p>

<p align="center">
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square">
  </a>
  <a href="https://github.com/kotarella1110/use-custom-compare/actions?query=workflow%3ACI">
    <img alt="Actions Status" src="https://github.com/kotarella1110/use-custom-compare/workflows/CI/badge.svg">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="Semantic Release" src="https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
  </a>
  <a href="#contributors-">
    <img alt="All Contributors" src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square">
  </a>
  <a href="CONTRIBUTING.md">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg?style=flat-square">
  </a>
</p>

## Installation

```
npm install react-use-custom-compare

# or

yarn add react-use-custom-compare
```

## Usage

### useCustomCompareEffect

```js
import React from 'react';
import { useCustomCompareEffect } from 'use-custom-compare';
import isEqual from 'lodash/isEqual';

function App({ options }) {
  useCustomCompareEffect(
    () => {
      // do something significant here
      return () => {
        // return to clean up that significant thing
      };
    },
    [options],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps),
  );

  return <div>{/* render significant thing */}</div>;
}
```

### useCustomCompareCallback

```js
import React from 'react';
import { useCustomCompareCallback } from 'use-custom-compare';
import isEqual from 'lodash/isEqual';

function App({ options }) {
  const memoized = useCustomCompareCallback(
    () => {
      // do something significant here
    },
    [options],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps),
  );

  return <div>{/* render significant thing */}</div>;
}
```

### useCustomCompareMemo

```js
import React from 'react';
import { useCustomCompareMemo } from 'use-custom-compare';
import isEqual from 'lodash/isEqual';

function App({ options }) {
  const memoized = useCustomCompareMemo(
    () => {
      // do something significant here
    },
    [options],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps),
  );

  return <div>{/* render significant thing */}</div>;
}
```

## Contributing

Contributions are always welcome! Please read the [contributing](./CONTRIBUTING.md) first.

## Inspiration

- [`use-deep-compare-effect`](https://github.com/kentcdodds/use-deep-compare-effect) 🐋 It's react's useEffect hook, except using deep comparison on the inputs, not reference equality.
- [`use-deep-compare`](https://github.com/sandiiarov/use-deep-compare) It's react's useEffect/useMemo/useCallback hooks, except using deep comparison on the inputs.
- [`use-custom-compare-effect`](https://github.com/sanjagh/use-custom-compare-effect) useEffect hook which takes a comparison function instead of compare using reference equality.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://qiita.com/kotarella1110"><img src="https://avatars1.githubusercontent.com/u/12913947?v=4" width="100px;" alt=""/><br /><sub><b>Kotaro Sugawara</b></sub></a><br /><a href="https://github.com/kotarella1110/use-custom-compare/commits?author=kotarella1110" title="Code">💻</a> <a href="https://github.com/kotarella1110/use-custom-compare/commits?author=kotarella1110" title="Documentation">📖</a> <a href="#ideas-kotarella1110" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kotarella1110" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kotarella1110/use-custom-compare/commits?author=kotarella1110" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](./LICENSE) © [Kotaro Sugawara](https://twitter.com/kotarella1110)