import { render } from '@testing-library/react';
import Segment from '../..';

describe('Segment', (): void => {
  it('should render its children', (): void => {
    const { getByText } = render(
      <Segment writeKey="test-write-key">Hello world</Segment>,
    );
    getByText('Hello world');
  });
});
