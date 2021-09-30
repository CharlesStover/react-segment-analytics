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

##### `writeKey`

Type: `string` (required)

### Hooks

#### `useSegmentPage`

```javascript
import { useEffect } from 'react';
import { useSegmentPage } from 'react-segment-analytics';

function Home() {
  const page = useSegmentPage();

  useEffect(() => {
    page('Home');
  }, [page]);

  return (
    <main>
      <h1>Home</h1>
      {/* ... */}
    </main>
  );
}
```

The `useSegmentPage` hook returns a function that, when called, denotes a page
change event. The `page` function accepts an optional page category (`string`),
optional page name (`string`), and optional page properties
(`Record<string, unknown>`) as its first, second, and third parameters
respectively. The page function returns a Promise that monitors the network
request to Segment.

#### `useSegmentTrack`

```javascript
import { useSegmentTrack } from 'react-segment-analytics';

function MyButton() {
  const track = useSegmentTrack();

  const handleClick = () => {
    track('Button click');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

The `useSegmentTrack` hook returns a function that, when called, emits an event
to Segment. The track function accepts a required event name (`string`) and
optional event properties (`Record<string, unknown>`) as its first and second
parameters respectively. The track function returns a Promise that monitors the
the network request to Segment.

## Contributing

- `yarn set version latest`
- `yarn up * @*/*`
- If you use VIM, run `yarn sdks vim`.
- If you use Visual Studio Code, run `yarn sdks vscode`.
