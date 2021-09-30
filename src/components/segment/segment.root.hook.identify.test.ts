import { renderHook } from '@testing-library/react-hooks';
import ANALYTICS_WINDOW from '../../constants/analytics-window';
import type Traits from '../../types/traits';
import init from '../../utils/init';
import useIdentify from './segment.root.hook.identify';

const EMPTY = 0;
const FIRST_ITEM = 0;
const SECOND_ITEM = 1;
const THIRD_ITEM = 2;

const findIdentifyAnalytics = (
  entry: readonly [string, ...unknown[]],
): entry is
  | ['identify', string, Traits, ...unknown[]]
  | ['identify', Traits, ...unknown[]] => entry[FIRST_ITEM] === 'identify';

const hasUserId = (
  identifyAnalytics:
    | ['identify', string, Traits, ...unknown[]]
    | ['identify', Traits, ...unknown[]],
): identifyAnalytics is ['identify', string, Traits, ...unknown[]] =>
  typeof identifyAnalytics[SECOND_ITEM] === 'string';

const initSegmentAnalytics = (): void => {
  init('test-write-key');
};

const mapIdentifyAnalyticsToTraits = (
  identifyAnalytics:
    | ['identify', string, Traits, ...unknown[]]
    | ['identify', Traits, ...unknown[]],
): Traits => {
  if (hasUserId(identifyAnalytics)) {
    return identifyAnalytics[THIRD_ITEM];
  }
  return identifyAnalytics[SECOND_ITEM];
};

const getTraits = (): Traits => {
  const analytics: [string, ...unknown[]][] =
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    ANALYTICS_WINDOW.analytics as unknown as [string, ...unknown[]][];
  const identifyAnalytics:
    | ['identify', string, Traits, ...unknown[]]
    | ['identify', Traits, ...unknown[]]
    | undefined = analytics.find(findIdentifyAnalytics);
  if (typeof identifyAnalytics === 'undefined') {
    throw new Error('Expected to find identify analytics.');
  }
  return mapIdentifyAnalyticsToTraits(identifyAnalytics);
};

const removeSegmentAnalytics = (): void => {
  delete ANALYTICS_WINDOW.analytics;
};

describe('useIdentify', (): void => {
  describe('without Segment Analytics', (): void => {
    beforeEach(removeSegmentAnalytics);

    it('should not throw an error', (): void => {
      const { result } = renderHook(useIdentify);
      expect(result.error).toBeUndefined();
    });
  });

  describe('with Segment Analytics', (): void => {
    beforeEach(initSegmentAnalytics);
    afterEach(removeSegmentAnalytics);

    it('should not identify with no traits', (): void => {
      renderHook(useIdentify);
      expect(ANALYTICS_WINDOW.analytics).toHaveLength(EMPTY);
    });

    it('should not include empty records', (): void => {
      renderHook(useIdentify, {
        initialProps: {
          id: 'test-id',
        },
      });

      const { address, company } = getTraits();
      expect(address).toBeUndefined();
      expect(company).toBeUndefined();
    });

    it('should include provided traits', (): void => {
      const TEST_BIRTHDAY: Date = new Date('1990 Apr. 27');
      const TEST_CREATED_AT: Date = new Date('2020 Jan. 1');
      renderHook(useIdentify, {
        initialProps: {
          age: 21,
          avatar: 'https://website.com/avatar.jpg',
          birthday: TEST_BIRTHDAY,
          createdAt: TEST_CREATED_AT,
          description: 'test description',
          email: 'test@email.com',
          firstName: 'first',
          gender: 'yes',
          id: 1,
          lastName: 'last',
          name: 'name',
          phone: 1234567890,
          title: 'test title',
          username: 'test',
          website: 'https://website.com',
          address: {
            postalCode: 90210,
          },
          company: {
            id: 'test-company-id',
          },
        },
      });

      expect(getTraits()).toEqual({
        age: 21,
        avatar: 'https://website.com/avatar.jpg',
        birthday: TEST_BIRTHDAY.toISOString(),
        createdAt: TEST_CREATED_AT.toISOString(),
        description: 'test description',
        email: 'test@email.com',
        firstName: 'first',
        gender: 'yes',
        id: '1',
        lastName: 'last',
        name: 'name',
        phone: '1234567890',
        title: 'test title',
        username: 'test',
        website: 'https://website.com',
        address: {
          postalCode: 90210,
        },
        company: {
          id: 'test-company-id',
        },
      });
    });
  });
});
