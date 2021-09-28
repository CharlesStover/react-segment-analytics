# React Segment Analytics

[![version](https://img.shields.io/npm/v/react-segment-analytics.svg)](https://www.npmjs.com/package/react-segment-analytics)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-segment-analytics.svg)](https://www.npmjs.com/package/react-segment-analytics)
[![downloads](https://img.shields.io/npm/dt/react-segment-analytics.svg)](https://www.npmjs.com/package/react-segment-analytics)
[![GitHub Action: Push](https://github.com/CharlesStover/react-segment-analytics/actions/workflows/push.yml/badge.svg)](https://github.com/CharlesStover/react-segment-analytics/actions/workflows/push.yml)

React integration for Segment Analytics

## Install

- `npm install react-segment-analytics` or
- `yarn add react-segment-analytics`

## Use

```javascript
import { render } from 'react-dom';
import Segment from 'react-segment-analytics';
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
import Segment from 'react-segment-analytics';
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
import type { Traits } from 'react-segment-analytics';
```

## Contributing

- `yarn set version latest`
- `yarn up * @*/*`
- If you use VIM, run `yarn sdks vim`.
- If you use Visual Studio Code, run `yarn sdks vscode`.
