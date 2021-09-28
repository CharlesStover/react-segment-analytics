# <Segment />

[![version](https://img.shields.io/npm/v/segment-react.svg)](https://www.npmjs.com/package/segment-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/segment-react.svg)](https://www.npmjs.com/package/segment-react)
[![downloads](https://img.shields.io/npm/dt/segment-react.svg)](https://www.npmjs.com/package/segment-react)
[![GitHub Action: Push](https://github.com/CharlesStover/segment-react/actions/workflows/push.yml/badge.svg)](https://github.com/CharlesStover/segment-react/actions/workflows/push.yml)

React integration for Segment

## Install

- `npm install segment-react` or
- `yarn add segment-react`

## Use

```javascript
import { render } from 'react-dom';
import Segment from 'segment-react';
import { App } from './components';

render(
  <Segment writeKey="my-write-key">
    <App />
  </Segment>,
  document.getElementById('root'),
);
```

## Exports

### `Segment`

```javascript
import Segment from 'segment-react';
```

#### Props

##### `writeKey`

Type: `string` (required)

##### `eventPrefix`

Type: `string` (optional)

By providing an event prefix, all events emit by the `useTrack` hook will be
prefixed with the provided value. This is useful when you have multiple projects
within a single organization and want to compare events across projects by
joining them on shared properties, such as user ID.

##### `traits`

Type: `Traits` (optional)

The `traits` prop defines traits associated with the user during identification.
Be sure to provide the `id` trait to make the user onymous.

```typescript
import type { Traits } from 'segment-react';
```

## Contributing

- `yarn set version latest`
- `yarn up * @*/*`
- If you use VIM, run `yarn sdks vim`.
- If you use Visual Studio Code, run `yarn sdks vscode`.
