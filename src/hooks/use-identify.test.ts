import { renderHook } from '@testing-library/react-hooks';
import ANALYTICS_WINDOW from '../test/constants/analytics-window';
import getTraits from '../test/utils/get-traits';
import initSegmentAnalytics from '../test/utils/init-segment-analytics';
import removeSegmentAnalytics from '../test/utils/remove-segment-analytics';
import useIdentify from './use-identify';

const EMPTY = 0;
const ONCE = 1;
const TWICE = 2;

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
    it('should identify when rest traits change', (): void => {
      if (typeof ANALYTICS_WINDOW.analytics === 'undefined') {
        throw new Error('Expected `analytics` to exist on `window`.');
      }

      const MOCK_IDENTIFY = jest.spyOn(ANALYTICS_WINDOW.analytics, 'identify');
      const NEW_TEST_ID = 'new-test-id';
      const OLD_TEST_ID = 'old-test-id';

      const { rerender } = renderHook(useIdentify, {
        initialProps: {
          testId: OLD_TEST_ID,
        },
      });

      expect(MOCK_IDENTIFY).toHaveBeenCalledTimes(ONCE);

      rerender({
        testId: OLD_TEST_ID,
      });

      expect(MOCK_IDENTIFY).toHaveBeenCalledTimes(ONCE);

      rerender({
        testId: NEW_TEST_ID,
      });

      expect(MOCK_IDENTIFY).toHaveBeenCalledTimes(TWICE);
    });
  });
});
