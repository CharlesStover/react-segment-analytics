import { render } from '@testing-library/react';
import Segment from '../..';
import TestAnalyticsBrowser from '../../test/constants/test-analytics-browser';
import TEST_IDENTIFY from '../../test/constants/test-identify';

const FIRST_CALL = 0;
const SECOND_ARGUMENT = 1;

describe('Segment', (): void => {
  it('should render its children', (): void => {
    // Explicitly providing `cdnSettings` prevents Segment from attempting a
    //   network request that would never resolve in a CI pipeline.
    const { getByText } = render(
      <Segment
        cdnSettings={{
          integrations: {},
        }}
        writeKey="test-write-key"
      >
        Hello world
      </Segment>,
    );
    getByText('Hello world');
  });

  it('should not identify with no traits', (): void => {
    render(
      <Segment
        AnalyticsBrowser={TestAnalyticsBrowser}
        writeKey="test-write-key"
      >
        Hello world
      </Segment>,
    );
    expect(TEST_IDENTIFY).not.toHaveBeenCalled();
  });

  it('should not identify empty addresses or companies', (): void => {
    render(
      <Segment
        AnalyticsBrowser={TestAnalyticsBrowser}
        traits={{
          id: 'test-id',
        }}
        writeKey="test-write-key"
      >
        Hello world
      </Segment>,
    );

    expect(TEST_IDENTIFY.mock.calls[FIRST_CALL][SECOND_ARGUMENT]).toEqual({
      id: 'test-id',
    });
  });

  it('should identify traits', (): void => {
    const TEST_BIRTHDAY: Date = new Date('1990 Apr. 27');
    const TEST_CREATED_AT: Date = new Date('2020 Jan. 1');
    render(
      <Segment
        AnalyticsBrowser={TestAnalyticsBrowser}
        traits={{
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
        }}
        writeKey="test-write-key"
      >
        Hello world
      </Segment>,
    );

    expect(TEST_IDENTIFY.mock.calls[FIRST_CALL][SECOND_ARGUMENT]).toEqual({
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
