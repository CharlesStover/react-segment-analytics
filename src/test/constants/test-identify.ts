import type { Context, Options } from '@segment/analytics-next';
import type { Callback } from '@segment/analytics-next/dist/pkg/core/arguments-resolver';

const TEST_IDENTIFY: jest.Mock<
  Promise<Context>,
  [
    object | string | null | undefined,
    Callback | object | null | undefined,
    Callback | Options | undefined,
    Callback | undefined,
  ]
> = jest.fn<
  Promise<Context>,
  [
    object | string | null | undefined,
    Callback | object | null | undefined,
    Callback | Options | undefined,
    Callback | undefined,
  ]
>();

export default TEST_IDENTIFY;
