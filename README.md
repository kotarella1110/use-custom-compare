<div align="center">

<h1>use-custom-compare</h1>

It's React's useEffect/useMemo/useCallback hooks, except using custom comparison on the inputs, not reference equality

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Actions Status](https://github.com/kotarella1110/use-custom-compare/workflows/CI/badge.svg)](https://github.com/kotarella1110/use-custom-compare/actions?query=workflow%3ACI)
[![NPM Version](https://img.shields.io/npm/v/use-custom-compare?style=flat-square)](https://www.npmjs.com/package/use-custom-compare)
[![Downloads Month](https://img.shields.io/npm/dm/use-custom-compare?style=flat-square)](https://www.npmjs.com/package/use-custom-compare)
[![Downloads Total](https://img.shields.io/npm/dt/use-custom-compare?style=flat-square)](https://www.npmjs.com/package/use-custom-compare)
[![Dependencies Status](https://david-dm.org/kotarella1110/use-custom-compare.svg?style=flat-square)](https://david-dm.org/kotarella1110/use-custom-compare)
[![Semantic Release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg?style=flat-square)](CONTRIBUTING.md)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

</div>

## Installation

```
npm install use-custom-compare

# or

yarn add use-custom-compare
```

## Usage

### useCustomCompareEffect

```js
import React from "react";
import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";

function App({ options }) {
  useCustomCompareEffect(
    () => {
      // do something significant here
      return () => {
        // return to clean up that significant thing
      };
    },
    [options],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  );

  return <div>{/* render significant thing */}</div>;
}
```

### useCustomCompareMemo

```js
import React from "react";
import { useCustomCompareMemo } from "use-custom-compare";
import isEqual from "lodash/isEqual";

function App({ options }) {
  const memoized = useCustomCompareMemo(
    () => {
      // do something significant here
    },
    [options],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  );

  return <div>{/* render significant thing */}</div>;
}
```

### useCustomCompareCallback

```js
import React from "react";
import { useCustomCompareCallback } from "use-custom-compare";
import isEqual from "lodash/isEqual";

function App({ options }) {
  const memoized = useCustomCompareCallback(
    () => {
      // do something significant here
    },
    [options],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  );

  return <div>{/* render significant thing */}</div>;
}
```

## TypeScript

This custom compare hooks is type-safe because it is built with TypeScript, which requires the use of TypeScript 4.0 or higher.

```tsx
import React from "react";
import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";

function App() {
  useCustomCompareEffect(
    () => {},
    [1, { a: "b" }, true],
    (
      prevDeps, // type: readonly [number, { a: string }, boolean]
      nextDeps // type: readonly [number, { a: string }, boolean]
    ) => isEqual(prevDeps, nextDeps)
  );

  return <div />;
}
```

## ESLint

`exhaustive-deps` in [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) can be configured to validate dependencies.
If you want to apply that rule to this custom compare hooks as well, use the [`additionalHooks` option](https://www.npmjs.com/package/eslint-plugin-react-hooks#advanced-configuration).

```js
{
  "rules": {
    // ...
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks:
          "(useCustomCompareEffect|useCustomCompareLayoutEffect|useCustomCompareMemo|useCustomCompareCallback)"
      }
    ]
  }
}
```

## Note

In the following cases, use React's useEffect/useMemo/useCallback hooks instead of this custom compare hooks!

- no dependencies
- dependencies are all primitive values

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
